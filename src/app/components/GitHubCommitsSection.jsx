"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Calendar, Code, TrendingUp, ExternalLink } from "lucide-react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => import("react-animated-numbers"),
  { ssr: false }
);

const GitHubCommitsSection = ({ username }) => {
  const [commits, setCommits] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        const url = username
          ? `/api/github/commits?username=${username}`
          : `/api/github/commits`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setCommits(data.data.commits);
          setStats(data.data.stats);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to load GitHub commits");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username]);


  // Helper: format date as YYYY-MM-DD using local time (avoids timezone issues with toISOString)
  const formatDateStr = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Get contribution level (0-4) for color coding
  const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  // Get color class based on contribution level
  const getColorClass = (level) => {
    const colors = [
      'bg-[#161b22] border border-[#30363d]', // No contributions
      'bg-[#0e4429] hover:bg-[#006d32]', // 1 contribution
      'bg-[#006d32] hover:bg-[#26a641]', // 2-3 contributions
      'bg-[#26a641] hover:bg-[#39d353]', // 4-5 contributions
      'bg-[#39d353] hover:bg-[#39d353]', // 6+ contributions
    ];
    return colors[level] || colors[0];
  };

  // Generate the full contribution graph as a grid of weeks (columns) × days (rows)
  // Returns { weeks, monthLabels, totalContributions }
  const generateContributionData = (year = null) => {
    const targetYear = year || selectedYear;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build commit count map using local dates
    const commitsByDate = {};
    commits.forEach(commit => {
      const date = new Date(commit.date);
      if (date.getFullYear() === targetYear) {
        const dateStr = formatDateStr(date);
        commitsByDate[dateStr] = (commitsByDate[dateStr] || 0) + 1;
      }
    });

    // Determine the start date: the Sunday on or before Jan 1 of targetYear
    const jan1 = new Date(targetYear, 0, 1);
    jan1.setHours(0, 0, 0, 0);
    const startDate = new Date(jan1);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Go back to Sunday
    startDate.setHours(0, 0, 0, 0);

    // Force end date to be Dec 31 for all years to ensure a full year grid
    const lastDay = new Date(targetYear, 11, 31);
    lastDay.setHours(23, 59, 59, 999);

    // End on the Saturday on or after the last day
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Go forward to Saturday
    endDate.setHours(23, 59, 59, 999);

    // Use timestamps for reliable comparison
    const endTime = endDate.getTime();

    // Generate the weeks grid
    const weeks = [];
    const monthLabels = [];
    let totalContributions = 0;
    let lastMonth = -1;
    const cursor = new Date(startDate);
    cursor.setHours(0, 0, 0, 0);

    // Generate weeks until we've passed the end date
    while (cursor.getTime() <= endTime) {
      const week = [];

      for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
        const cursorTime = cursor.getTime();
        const isInYear = cursor.getFullYear() === targetYear;
        if (isInYear) {
          const dateStr = formatDateStr(cursor);
          const count = commitsByDate[dateStr] || 0;
          totalContributions += count;
          week.push({
            date: new Date(cursor),
            dateStr,
            count,
            level: getContributionLevel(count),
          });
        } else {
          week.push(null); // Outside the target year range
        }

        // Move to next day
        cursor.setDate(cursor.getDate() + 1);
      }

      // Add month label if this week starts a new month
      const firstRealDay = week.find(d => d !== null);
      if (firstRealDay) {
        const month = firstRealDay.date.getMonth();
        if (month !== lastMonth) {
          monthLabels.push({
            weekIdx: weeks.length,
            label: firstRealDay.date.toLocaleDateString('en-US', { month: 'short' })
          });
          lastMonth = month;
        }
      }

      weeks.push(week);
    }

    return { weeks, monthLabels, totalContributions };
  };

  // All hooks must be called before any conditional returns
  const availableYears = useMemo(() => {
    if (!commits.length) return [];
    const years = new Set();
    commits.forEach(commit => {
      const year = new Date(commit.date).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a); // Sort descending (newest first)
  }, [commits]);

  // Set default year to the most recent year with commits
  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  if (loading) {
    return (
      <motion.section
        id="github-activity"
        ref={sectionRef}
        className="py-8 px-4 sm:py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center text-white">
          <p className="text-lg">Loading GitHub activity...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        id="github-activity"
        ref={sectionRef}
        className="py-8 px-4 sm:py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center text-white">
          <p className="text-lg text-red-400">{error}</p>
        </div>
      </motion.section>
    );
  }

  const { weeks, monthLabels, totalContributions } = generateContributionData(selectedYear);

  return (
    <motion.section
      id="github-activity"
      ref={sectionRef}
      className="py-8 px-4 sm:py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        GitHub Activity
      </motion.h2>

      {/* Statistics Cards */}
      {stats && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-orange-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <Code className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Total Commits</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {stats.totalCommits > 0 ? (
                <AnimatedNumbers
                  includeComma
                  className="text-green-400"
                  transitions={(idx) => ({
                    type: "spring",
                    duration: idx + 0.3,
                  })}
                  animateToNumber={stats.totalCommits}
                  configs={(_, idx) => ({
                    mass: 1,
                    friction: 100,
                    tensions: 150 * (idx + 1),
                  })}
                />
              ) : (
                "0"
              )}
            </p>
            <p className="text-sm text-[#ADB7BE] mt-1">Last 2 years</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-orange-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <Github className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Repositories</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {stats.totalRepos > 0 ? (
                <AnimatedNumbers
                  includeComma
                  className="text-green-400"
                  transitions={(idx) => ({
                    type: "spring",
                    duration: idx + 0.3,
                  })}
                  animateToNumber={stats.totalRepos}
                  configs={(_, idx) => ({
                    mass: 1,
                    friction: 100,
                    tensions: 150 * (idx + 1),
                  })}
                />
              ) : (
                "0"
              )}
            </p>
            <p className="text-sm text-[#ADB7BE] mt-1">Active repos</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-orange-500/40 transition">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Languages</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {Object.keys(stats.languages || {}).length}
            </p>
            <p className="text-sm text-[#ADB7BE] mt-1">Technologies used</p>
          </div>
        </motion.div>
      )}

      {/* GitHub-style Contribution Graph */}
      {weeks.length > 0 && (
        <motion.div
          className="mb-12 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-base font-normal text-[#8b949e]">
              <span className="font-semibold text-white">{totalContributions}</span> contributions in {selectedYear}
            </h3>

            {/* Year Filter Dropdown */}
            {availableYears.length > 1 && (
              <div className="flex items-center gap-2">
                <label htmlFor="year-filter" className="text-sm text-[#8b949e]">
                  Year:
                </label>
                <select
                  id="year-filter"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-3 py-1.5 rounded-md bg-[#161b22] border border-[#30363d] text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition cursor-pointer hover:border-[#8b949e]"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year} className="bg-[#161b22]">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-1 w-full mx-auto min-w-[600px]">
              {/* Day labels */}
              <div className="flex flex-col gap-1 mr-2 pt-5 flex-shrink-0">
                {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((day, idx) => (
                  <div key={idx} className="h-3 text-xs text-[#8b949e] leading-3">
                    {day}
                  </div>
                ))}
              </div>

              {/* Graph grid */}
              <div className="flex flex-col gap-1 flex-1">
                {/* Month labels */}
                <div className="flex gap-1 mb-1 h-4 w-full">
                  {weeks.map((week, weekIdx) => {
                    const monthLabel = monthLabels.find(m => m.weekIdx === weekIdx);
                    return (
                      <div key={weekIdx} className="flex-1 relative">
                        {monthLabel && (
                          <span className="absolute left-0 top-0 text-[10px] sm:text-xs text-[#8b949e] whitespace-nowrap">
                            {monthLabel.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contribution squares - GitHub style: weeks as columns, days as rows */}
                <div className="flex gap-1 w-full">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1 flex-1">
                      {week.map((day, dayIdx) => {
                        if (!day) {
                          return <div key={`empty-${weekIdx}-${dayIdx}`} className="w-full aspect-square"></div>;
                        }

                        return (
                          <motion.div
                            key={day.dateStr}
                            className={`w-full aspect-square rounded-sm ${getColorClass(day.level)} transition-colors cursor-pointer`}
                            title={`${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              delay: 0.4 + (weekIdx * 0.01) + (dayIdx * 0.001),
                              duration: 0.2
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-[#8b949e]">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </motion.div>
      )}

      {/* Recent Commits */}
      {commits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Github className="w-5 h-5 text-orange-400" />
            Recent Commits
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-white/5">
            {commits.slice(0, 20).map((commit, index) => (
              <motion.a
                key={commit.sha}
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 hover:border-orange-500/40 hover:bg-white/[0.05] transition group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.03, duration: 0.3 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 ">
                    <p className="text-white font-medium truncate group-hover:text-orange-400 transition">
                      {commit.message.split('\n')[0]}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-[#ADB7BE]">
                      <span className="truncate">{commit.repo.fullName}</span>
                      <span>•</span>
                      <span>{new Date(commit.date).toLocaleDateString()}</span>
                      {commit.repo.language && (
                        <>
                          <span>•</span>
                          <span className="text-orange-400">{commit.repo.language}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#ADB7BE] group-hover:text-orange-400 transition flex-shrink-0" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {commits.length === 0 && !loading && (
        <div className="text-center text-white py-8">
          <p className="text-lg text-[#ADB7BE]">No commits found in the last 2 years</p>
        </div>
      )}
    </motion.section>
  );
};

export default GitHubCommitsSection;
