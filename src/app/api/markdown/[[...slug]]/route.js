import {
  blogMarkdown,
  getStaticPageMarkdown,
  normalizePathname,
  notFoundMarkdown,
  projectMarkdown,
} from "@/lib/markdown-content";
import dbConnect from "@/app/dbconnect/dbconnect";
import BlogModel from "@/app/schema/blogSchema";
import Project from "@/app/schema/projectSchema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept, Accept-Encoding",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=86400",
};

function markdownResponse(body, status = 200) {
  return new Response(body, { status, headers: MARKDOWN_HEADERS });
}

/**
 * @param {string[]} slugParts
 */
async function resolveMarkdown(slugParts) {
  const pathname = normalizePathname(
    slugParts.length === 0 ? "/" : `/${slugParts.join("/")}`
  );

  const staticMd = getStaticPageMarkdown(pathname);
  if (staticMd) {
    return { body: staticMd, status: 200, pathname };
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    try {
      await dbConnect();
      const project = await Project.findById(projectMatch[1]).lean();
      if (!project || project.status !== "published") {
        return {
          body: notFoundMarkdown(pathname),
          status: 404,
          pathname,
        };
      }
      return {
        body: projectMarkdown({
          ...project,
          id: String(project._id),
        }),
        status: 200,
        pathname,
      };
    } catch {
      return {
        body: notFoundMarkdown(pathname),
        status: 404,
        pathname,
      };
    }
  }

  const blogMatch = pathname.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) {
    try {
      await dbConnect();
      const blog = await BlogModel.findById(blogMatch[1]).lean();
      if (!blog) {
        return {
          body: notFoundMarkdown(pathname),
          status: 404,
          pathname,
        };
      }
      return {
        body: blogMarkdown({
          ...blog,
          id: String(blog._id),
        }),
        status: 200,
        pathname,
      };
    } catch {
      return {
        body: notFoundMarkdown(pathname),
        status: 404,
        pathname,
      };
    }
  }

  return {
    body: notFoundMarkdown(pathname),
    status: 404,
    pathname,
  };
}

export async function GET(_req, { params }) {
  const slug = params?.slug;
  const slugParts = Array.isArray(slug) ? slug : slug ? [slug] : [];
  const { body, status } = await resolveMarkdown(slugParts);
  return markdownResponse(body, status);
}
