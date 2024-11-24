import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";

export async function POST(req) {

     try {
          const body = await req.json();
          const ids = body.selectedCategoryIds;
          if (ids.length < 1) {
               return NextResponse.json({
                    success: false,
                    message: "Id is required"
               }, { status: 404 })
          }
          await dbConnect()
          const blogs = await BlogModel.find({ category: { $in: ids } });
          console.log(blogs)
          return NextResponse.json({
               success: true,
               message: "Success",
               blogs
          }, { status: 200 })



     } catch (error) {
          console.log(error)
          return NextResponse.json({
               success: false,
               message: "SomeThing Wents wrong",
               blogs
          }, { status: 500 })


     }

}
