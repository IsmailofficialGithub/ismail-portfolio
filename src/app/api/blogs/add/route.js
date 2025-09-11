import { NextResponse } from "next/server";
import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import { addAssertsInCloudinary } from "@/app/helper/helper";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs"; // Use Node.js runtime for the API route

export const POST = async (req) => {
       const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
     try {
          const data = await req.formData(); // Handle FormData directly
          const title = data.get("title");
          const description = data.get("description");
          const image = data.get("image");
          const category = data.get("categoryId");

          // Validate title and description
          if (!title) {
               return NextResponse.json(
                    { success: false, message: "Please provide Title for the blog" },
                    { status: 400 }
               );
          }
          if (!description) {
               return NextResponse.json(
                    { success: false, message: "Please provide Description for the blog" },
                    { status: 400 }
               );
          }
          if (!category) {
               return NextResponse.json(
                    { success: false, message: "Please provide Category for the blog" },
                    { status: 400 }
               );
          }

          if (image && image instanceof File) {
               // Convert image to Buffer and Base64 format
               const uploadingImage = await addAssertsInCloudinary(image);
               if (uploadingImage.success) {
                    const imageUrl = uploadingImage.imageUrl;
                    await dbConnect();
                    const blogData = new BlogModel({
                         title,
                         description,
                         category,
                         imageUrl, // Save the Cloudinary URL
                    });

                    await blogData.save();

                    return NextResponse.json(
                         { success: true, message: "Successfully added new post", data: blogData },
                         { status: 200 }
                    );
               } else {
                    return NextResponse.json(
                         { success: false, message: "Something went wrong while uploading image", error },
                         { status: 500 }
                    );
               }
          } else {
               await dbConnect();
               const blogData = new BlogModel({
                    title,
                    description,
                    category,
               });

               await blogData.save();

               return NextResponse.json(
                    { success: true, message: "Successfully added new post", data: blogData },
                    { status: 200 }
               );
          }
     } catch (error) {
          console.error("Error:", error);
          return NextResponse.json(
               { success: false, message: "Something went wrong", error },
               { status: 500 }
          );
     }
};
