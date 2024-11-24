import dbConnect from "@/app/dbconnect/dbconnect";
import { addAssertsInCloudinary, deleteAssetsFromCloudinary } from "@/app/helper/helper";
import BlogModel from "@/app/schema/blogSchema";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
     try {
          const { id } = params;
          const data = await req.formData();
          const title = data.get("title");
          const description = data.get("description");
          const category = data.get('categoryId')
          const image = data.get("image");

          await dbConnect();

          // Fetch existing blog post
          const Blog = await BlogModel.findById(id);
          if (!Blog) {
               return NextResponse.json({
                    success: false,
                    message: "No blog found",
               });
          }

          // Initialize fields to update
          let updatedFields = { title, description, category };

          // Check if a new image is uploaded
          if (image && image instanceof File) {
               // Delete old image if exists
               const oldImageUrl = Blog.imageUrl;
               if (oldImageUrl) {
                    const deletingOldImage = await deleteAssetsFromCloudinary(oldImageUrl);
                    if (!deletingOldImage.success) {
                         return NextResponse.json({
                              success: false,
                              message: "Failed to delete old image",
                         });
                    }
               }

               // Upload new image
               const uploadingImage = await addAssertsInCloudinary(image);
               if (!uploadingImage.success) {
                    return NextResponse.json({
                         success: false,
                         message: "Failed to upload new image",
                    });
               }
               // Update the image URL in the fields
               updatedFields.imageUrl = uploadingImage.imageUrl;
          }

          // Update the document with new data
          const updatedData = await BlogModel.findByIdAndUpdate(
               id,
               updatedFields,
               { new: true, runValidators: true }
          );

          return NextResponse.json(
               { success: true, message: "Successfully Updated Post", data: updatedData },
               { status: 200 }
          );

     } catch (error) {
          console.error(error);
          return NextResponse.json(
               {
                    success: false,
                    message: "Something went wrong while updating the blog",
                    error,
               },
               { status: 500 }
          );
     }
};
