import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { appendVaryAccept, preferredType } from "./lib/accept.js";

const STATIC_FILE =
  /\.(?:avif|css|js|json|map|ico|png|jpe?g|gif|svg|webp|woff2?|ttf|txt|xml|webmanifest)$/i;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protected admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const res = NextResponse.next();
    appendVaryAccept(res.headers);
    return res;
  }

  // Prevent logged-in users from accessing login page
  if (pathname === "/login") {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard/blog", req.url));
    }
    const res = NextResponse.next();
    appendVaryAccept(res.headers);
    return res;
  }

  // Skip Next internals and most static assets (keep .md for alternate URLs)
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/_vercel/") ||
    (STATIC_FILE.test(pathname) && !pathname.endsWith(".md"))
  ) {
    return NextResponse.next();
  }

  // Explicit .md sibling URL → always Markdown
  if (pathname.endsWith(".md")) {
    const url = req.nextUrl.clone();
    url.pathname = `/api/markdown${pathname.slice(0, -3) || "/"}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone();
    url.pathname =
      pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  if (chosen === null && acceptHeader) {
    return new NextResponse(
      req.method === "HEAD"
        ? null
        : "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept, Accept-Encoding",
        },
      }
    );
  }

  const res = NextResponse.next();
  appendVaryAccept(res.headers);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
