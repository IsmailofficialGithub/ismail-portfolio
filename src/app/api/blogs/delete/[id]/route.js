// app/api/blogs/[id]/route.js

import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";
import cloudinary from "../../../../helper/Cloudinary";
import { deleteAssetsFromCloudinary } from "@/app/helper/helper";

export async function DELETE(req, { params }) {
     try {
          const { id } = params;
          await dbConnect();

          const blog = await BlogModel.findById(id);
          if (!blog) {
               return NextResponse.json({ success: false, message: "No Blog Found" }, { status: 404 });
          }

          // If the blog has an image, delete it from Cloudinary
          if (blog.imageUrl) {
               const handleDelete = await deleteAssetsFromCloudinary(blog.imageUrl)
               if (!handleDelete.success) {
                    return NextResponse.json({
                         success: false,
                         message: "Failed to delete image from Cloudinary",
                         handleDelete
                    }, { status: 500 });
               }
          }

          // Proceed with deleting the blog from the database
          const deletedBlog = await BlogModel.findByIdAndDelete(id);
          if (!deletedBlog) {
               return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
          }

          return NextResponse.json({
               success: true,
               message: "Blog deleted successfully",
               blog: { title: deletedBlog.title, _id: deletedBlog._id },
          }, { status: 200 });

     } catch (error) {
          console.error(error);
          return NextResponse.json({
               success: false,
               message: "An error occurred while deleting the blog",
               error: error.message,
          }, { status: 500 });
     }
}
