import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import CategoryModel from "@/app/schema/categorySchema";
import Project from "@/app/schema/projectSchema";
import { getToken } from "next-auth/jwt";

// src/app/api/admin/dashboard/stats/route.js
export async function GET() {
         const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      
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