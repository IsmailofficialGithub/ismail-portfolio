import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
     try {
          // Get 'skip' parameter from query (default to 0) and set limit to 6 for the first request, 3 for subsequent requests
          const { searchParams } = new URL(req.url);
          const skip = parseInt(searchParams.get("skip")) || 0;
          const limit = skip === 0 ? 6 : 3;

          // Fetch blogs from database with skip and limit
          const blogs = await BlogModel.find()
               .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
               .skip(skip)
               .limit(limit);

          // Check if no blogs are found
          if (!blogs || blogs.length === 0) {
               return NextResponse.json({ success: false, message: "No more blogs found" }, { status: 200 });
          }

          return NextResponse.json({ success: true, blogs }, { status: 200 });

     } catch (error) {
          console.log(error);
          return NextResponse.json({
               success: false,
               message: "Something went wrong while getting blogs",
               error
          }, { status: 500 });
     }
};
