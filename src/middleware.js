import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;


  // Protected admin routes
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from accessing login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard/blog", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
