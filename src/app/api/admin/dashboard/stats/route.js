import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import CategoryModel from "@/app/schema/categorySchema";
import Project from "@/app/schema/projectSchema";
import { getToken } from "next-auth/jwt";

// src/app/api/admin/dashboard/stats/route.js
export async function GET(req) {
        import dbConnect from '@/app/dbconnect/dbconnect';
import Project from '@/app/schema/projectSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Get query params
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1'); // default page = 1
        const limit = parseInt(searchParams.get('limit') || '6'); // default limit = 6
        const skip = (page - 1) * limit;

        // Fetch projects with pagination
        const featuredProjects = await Project.find({ 
            featured: true, 
            status: 'published' 
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        // Optional: get total count for pagination info
        const totalProjects = await Project.countDocuments({ 
            featured: true, 
            status: 'published' 
        });

        return NextResponse.json({
            success: true,
            data: featuredProjects,
            pagination: {
                page,
                limit,
                totalPages: Math.ceil(totalProjects / limit),
                totalProjects
            },
            message: 'Featured projects retrieved successfully'
        });

    } catch (error) {
        console.error('GET /api/projects/featured error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch featured projects'
        }, { status: 500 });
    }
}
 const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
          if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );}
      
  try {
    await dbConnect();

    const [blogCount, categoryCount, projectCount] = await Promise.all([
      BlogModel.countDocuments(),
      CategoryModel.countDocuments(),
      Project.countDocuments()
    ]);

    return Response.json({
      success: true,
      data: {
        blogs: blogCount,
        categories: categoryCount,
        projects: projectCount,
        schemas: 3
      }
    });

  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}