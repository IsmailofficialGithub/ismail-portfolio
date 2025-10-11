import cloudinary from "@/app/helper/Cloudinary";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET,
    );
    if (signature) {
      return NextResponse.json({
        success: true,
        message: "SuccessFully Signature Genereted",
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
      });
    }
    return NextResponse.json({
      success: false,
      message: "Failed to generate Signature",
    },{status:401});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to generate Signatures",
      error,
    });
  }
}
