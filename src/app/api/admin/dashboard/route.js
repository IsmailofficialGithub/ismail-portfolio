// src/app/api/admin/dashboard/route.js
import BlogModel from "@/app/schema/blogSchema.js";
import CategoryModel from "@/app/schema/categorySchema.js";
import Project from "@/app/schema/projectSchema.js";
import dbConnect from "@/app/dbconnect/dbconnect";
import { getToken } from "next-auth/jwt";

export async function GET() {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    await dbConnect();

    // Parallel queries for better performance
    const [
      blogStats,
      categoryStats,
      projectStats,
      recentBlogs,
      recentProjects,
      blogsByCategory,
      projectsByTech,
    ] = await Promise.all([
      // Blog statistics
      BlogModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            thisMonth: {
              $sum: {
                $cond: [
                  {
                    $gte: [
                      "$createdAt",
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1,
                      ),
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            thisWeek: {
              $sum: {
                $cond: [
                  {
                    $gte: [
                      "$createdAt",
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),

      // Category statistics
      CategoryModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
          },
        },
      ]),

      // Project statistics
      Project.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),

      // Recent blogs (last 5)
      BlogModel.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("category", "category")
        .select("title createdAt category")
        .lean(),

      // Recent projects (last 5)
      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name status createdAt techStack")
        .lean(),

      // Blogs by category
      BlogModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: "$categoryInfo",
        },
        {
          $group: {
            _id: "$categoryInfo.category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ]),

      // Projects by tech stack
      Project.aggregate([
        {
          $unwind: "$techStack",
        },
        {
          $group: {
            _id: "$techStack",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
      ]),
    ]);

    // Process project stats
    const projectStatsProcessed = {
      total: 0,
      published: 0,
      draft: 0,
      archived: 0,
      featured: 0,
    };

    projectStats.forEach((stat) => {
      projectStatsProcessed.total += stat.count;
      projectStatsProcessed[stat._id] = stat.count;
    });

    // Get featured projects count
    const featuredCount = await Project.countDocuments({ featured: true });
    projectStatsProcessed.featured = featuredCount;

    // Format response
    const dashboardData = {
      overview: {
        blogs: {
          total: blogStats[0]?.total || 0,
          thisMonth: blogStats[0]?.thisMonth || 0,
          thisWeek: blogStats[0]?.thisWeek || 0,
        },
        categories: {
          total: categoryStats[0]?.total || 0,
        },
        projects: projectStatsProcessed,
        schemas: {
          total: 3, // Blog, Category, Project schemas
          collections: 3,
          relations: 1, // Blog -> Category relation
        },
      },
      recentActivity: [
        ...recentBlogs.map((blog) => ({
          id: blog._id,
          type: "blog",
          title: blog.title,
          category: blog.category?.category,
          createdAt: blog.createdAt,
          status: "published",
        })),
        ...recentProjects.map((project) => ({
          id: project._id,
          type: "project",
          title: project.name,
          techStack: project.techStack?.slice(0, 3), // First 3 tech stacks
          createdAt: project.createdAt,
          status: project.status,
        })),
      ]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8),
      analytics: {
        blogsByCategory: blogsByCategory.map((item) => ({
          category: item._id,
          count: item.count,
        })),
        projectsByTech: projectsByTech.map((item) => ({
          technology: item._id,
          count: item.count,
        })),
      },
      growth: {
        blogsGrowth: blogStats[0]?.thisMonth || 0,
        projectsGrowth: projectStatsProcessed.total || 0,
        categoriesGrowth: categoryStats[0]?.total || 0,
      },
    };

    return Response.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch dashboard data",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
