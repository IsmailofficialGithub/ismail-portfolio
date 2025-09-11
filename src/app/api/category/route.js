import dbConnect from "@/app/dbconnect/dbconnect";
import CategoryModel from "@/app/schema/categorySchema";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Handle GET (Retrieve all categories)
export async function GET() {
     try {
          await dbConnect();
          const categories = await CategoryModel.find();
          return NextResponse.json({
               success: true,
               message: "SuccessFully getting All category",
               categories
          }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
     }
}

// Handle POST (Create a new category)
export async function POST(req) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
     
       if (!token) {
         return NextResponse.json(
           { success: false, message: "Unauthorized" },
           { status: 401 }
         );
       }
     try {

          await dbConnect();
          const body = await req.json();

          // Check if the category already exists
          const existingCategory = await CategoryModel.findOne({ category: body.category });
          if (existingCategory) {
               return NextResponse.json(
                    { success: false, message: "Category already exists" },
                    { status: 400 }
               );
          }

          // If not, create a new category
          const newCategory = new CategoryModel({ category: body.category });
          const savedCategory = await newCategory.save();

          return NextResponse.json(
               { success: true, message: "Category successfully created", savedCategory },
               { status: 201 }
          );
     } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
     }
}

// Handle PUT (Update a category)
export async function PUT(req) {
     try {
          await dbConnect();
          const body = await req.json();
          const updatedCategory = await CategoryModel.findByIdAndUpdate(
               body.id,
               { category: body.category },
               { new: true }
          );

          if (!updatedCategory) {
               return NextResponse.json({ error: "Category not found" }, { status: 404 });
          }

          return NextResponse.json(updatedCategory, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
     }
}

// Handle DELETE (Remove a category)
export async function DELETE(req) {
     try {
          await dbConnect();
          const { searchParams } = new URL(req.url);
          const id = searchParams.get("id");

          if (!id) {
               return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
          }

          const deletedCategory = await CategoryModel.findByIdAndDelete(id);

          if (!deletedCategory) {
               return NextResponse.json({ error: "Category not found" }, { status: 404 });
          }

          return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: error.message }, { status: 400 });
     }
}
