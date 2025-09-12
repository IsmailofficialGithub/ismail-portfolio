import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // add at top of route.js

export const GET = async (req) => {
    
     try {
          // Get 'skip' parameter from query (default to 0)
          const { searchParams } = new URL(req.url);
          const skip = Number.isNaN(parseInt(searchParams.get("skip"))) ? 0 : parseInt(searchParams.get("skip"));
          const INITIAL_LIMIT = 6;
          const SUBSEQUENT_LIMIT = 3;
          const limit = skip === 0 ? INITIAL_LIMIT : SUBSEQUENT_LIMIT;

          // Fetch blogs from database
          await dbConnect()
          const blogs = await BlogModel.find()
               .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order
               .skip(skip)
               .limit(limit);

          // Respond with blogs or an empty array if none are found
          return NextResponse.json({ success: true, message: "Successfully getting blogs", blogs }, { status: 200 });
  


     } catch (error) {
          console.error("Error fetching blogs:", error);
          return NextResponse.json({
               success: false,
               message: "Something went wrong while getting blogs",
          }, { status: 500 });
     }
};
