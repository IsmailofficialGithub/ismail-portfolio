import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
     const token = await getToken({ req });

     // if (!token && req.nextUrl.pathname === "/admin/dashboard/blog") {
     //      return NextResponse.redirect(new URL("/login", req.url));
     // }
     // if (token && req.nextUrl.pathname === "/login") {
     //      return NextResponse.redirect(new URL("/admin/dashboard/blog", req.url));
     // }

     return NextResponse.next();
}

export const config = {
     matcher: ["/admin/:path*", '/login'],
};
