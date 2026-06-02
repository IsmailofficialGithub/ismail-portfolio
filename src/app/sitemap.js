import dbConnect from "./dbconnect/dbconnect";
import BlogModel from "./schema/blogSchema";
import Project from "./schema/projectSchema";

const siteUrl = "https://ismailabbasi.qzz.io";

export default async function sitemap() {
  const lastModified = new Date();
  let blogs = [];
  let projects = [];

  try {
    await dbConnect();

    [blogs, projects] = await Promise.all([
      BlogModel.find({}, { _id: 1, updatedAt: 1, createdAt: 1 }).lean(),
      Project.find(
        { status: "published" },
        { _id: 1, updatedAt: 1, createdAt: 1 }
      ).lean(),
    ]);
  } catch (error) {
    console.error("sitemap generation error:", error);
  }

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const blogRoutes = blogs.map((blog) => ({
    url: `${siteUrl}/blogs/${blog._id}`,
    lastModified: blog.updatedAt || blog.createdAt || lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project._id}`,
    lastModified: project.updatedAt || project.createdAt || lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
