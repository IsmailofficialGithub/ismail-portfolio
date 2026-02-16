import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET /api/github/commits - Get commits from last 2 years
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') || process.env.GITHUB_USERNAME;
    
    if (!username) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'GitHub username is required. Set GITHUB_USERNAME in .env or pass as query parameter' 
        },
        { status: 400 }
      );
    }

    // Calculate date 2 years ago
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const since = twoYearsAgo.toISOString();

    // Get all repositories for the user
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!reposResponse.ok) {
      if (reposResponse.status === 404) {
        return NextResponse.json(
          { success: false, message: 'GitHub user not found' },
          { status: 404 }
        );
      }
      throw new Error(`GitHub API error: ${reposResponse.statusText}`);
    }

    const repos = await reposResponse.json();

    // Filter out forks and get commits from each repo
    const commitsPromises = repos
      .filter(repo => !repo.fork && !repo.archived)
      .map(async (repo) => {
        try {
          // Get commits from the last 2 years
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?since=${since}&per_page=100`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                ...(process.env.GITHUB_TOKEN && {
                  'Authorization': `token ${process.env.GITHUB_TOKEN}`
                })
              }
            }
          );

          if (!commitsResponse.ok) {
            // Some repos might not be accessible, skip them
            return [];
          }

          const commits = await commitsResponse.json();
          
          return commits.map(commit => ({
            sha: commit.sha,
            message: commit.commit.message,
            author: commit.commit.author.name,
            date: commit.commit.author.date,
            url: commit.html_url,
            repo: {
              name: repo.name,
              fullName: repo.full_name,
              url: repo.html_url,
              language: repo.language,
            }
          }));
        } catch (error) {
          console.error(`Error fetching commits for ${repo.full_name}:`, error);
          return [];
        }
      });

    const commitsArrays = await Promise.all(commitsPromises);
    const allCommits = commitsArrays.flat();

    // Sort by date (newest first)
    allCommits.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate statistics
    const stats = {
      totalCommits: allCommits.length,
      totalRepos: repos.filter(repo => !repo.fork && !repo.archived).length,
      commitsByMonth: {},
      commitsByRepo: {},
      languages: {}
    };

    allCommits.forEach(commit => {
      // Group by month
      const month = new Date(commit.date).toISOString().slice(0, 7);
      stats.commitsByMonth[month] = (stats.commitsByMonth[month] || 0) + 1;

      // Group by repo
      stats.commitsByRepo[commit.repo.fullName] = 
        (stats.commitsByRepo[commit.repo.fullName] || 0) + 1;

      // Count languages
      if (commit.repo.language) {
        stats.languages[commit.repo.language] = 
          (stats.languages[commit.repo.language] || 0) + 1;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        commits: allCommits,
        stats,
        username
      }
    });

  } catch (error) {
    console.error('GET /api/github/commits error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch GitHub commits'
      },
      { status: 500 }
    );
  }
}
