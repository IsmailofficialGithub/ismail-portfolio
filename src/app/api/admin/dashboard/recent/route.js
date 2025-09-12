import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import Project from "@/app/schema/projectSchema";
export const dynamic = "force-dynamic"; // add at top of route.js


// src/app/api/admin/dashboard/recent/route.js
export async function GET() {

  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;

    const [recentBlogs, recentProjects] = await Promise.all([
      BlogModel.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('category', 'category')
        .select('title description createdAt category imageUrl')
        .lean(),

      Project.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('name description status createdAt techStack featured')
        .lean()
    ]);

    const combinedRecent = [
      ...recentBlogs.map(blog => ({
        ...blog,
        type: 'blog',
        categoryName: blog.category?.category
      })),
      ...recentProjects.map(project => ({
        ...project,
        type: 'project',
        title: project.name
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
     .slice(0, limit);

    return Response.json({
      success: true,
      data: combinedRecent
    });

  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to fetch recent items' },
      { status: 500 }
    );
  }
}