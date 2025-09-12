import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
     try {
          const { id } = params;
          await dbConnect();
          const blog = await BlogModel.findById(id);
          if (!blog) {

               return NextResponse.json({ success: false, message: "No blog found" }, { status: 404 })
          }
          return NextResponse.json({ success: true, message: "SuccessFully getting data", blog }, { status: 200 })
     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: "something wents wronge while getting blog",
               error
          }, { status: 500 })

     }
}