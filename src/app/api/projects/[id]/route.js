import dbConnect from "@/app/dbconnect/dbconnect";
import Project from "@/app/schema/projectSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { getPublicIdFromUrl } from "@/app/helper/helper";
import { getToken } from "next-auth/jwt";

// GET /api/projects/[id] - Get single project
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 },
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      message: "Project retrieved successfully",
    });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project",
      },
      { status: 500 },
    );
  }
}
// / PUT /api/projects/[id] - Update project
export async function PUT(request, { params }) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        { status: 400 },
      );
    }

    // Check for duplicate name (excluding current project)
    if (body.name) {
      const duplicateName = await Project.findOne({
        name: { $regex: `^${body.name}$`, $options: "i" },
        _id: { $ne: id },
      });

      if (duplicateName) {
        return NextResponse.json(
          {
            success: false,
            message: "Project with this name already exists",
          },
          { status: 409 },
        );
      }
    }

    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update project",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request, { params }) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid project ID" },
        { status: 400 }
      );
    }

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const imagesToDelete = project.images || [];

    for (const publicId of imagesToDelete) {
      try {

        const result = await deleteFromCloudinary(getPublicIdFromUrl(publicId));
        console.log(result)

        if (result.result !== "ok") {
          // Optionally return an error, but don’t re-insert the project
          console.log('Failed to delted image ', publicId);
          await deleteFromCloudinary(getPublicIdFromUrl(publicId));
        }
      } catch (err) {
        console.error("Cloudinary delete error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      data: { deletedId: id },
      message: "Project and related images deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}