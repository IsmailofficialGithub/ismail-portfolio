"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Code,
  Eye,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Masonry from "react-masonry-css";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiGithub,
  SiVisualstudiocode,
} from "react-icons/si";

// Technology → Icon map
const techIcons = {
  React: <FaReact className="text-blue-400" />,
  "Next.js": <SiNextdotjs className="text-gray-300" />,
  "Node.js": <FaNodeJs className="text-green-500" />,
  Express: <SiExpress className="text-gray-400" />,
  MongoDB: <SiMongodb className="text-green-600" />,
  HTML: <FaHtml5 className="text-orange-500" />,
  CSS: <FaCss3Alt className="text-blue-500" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  TailwindCSS: <SiTailwindcss className="text-sky-400" />,
  Redux: <SiRedux className="text-purple-500" />,
  GraphQL: <SiGraphql className="text-pink-500" />,
  PostgreSQL: <SiPostgresql className="text-sky-700" />,
  MySQL: <SiMysql className="text-blue-600" />,
  Supabase: <SiSupabase className="text-green-500" />,
  Firebase: <SiFirebase className="text-yellow-500" />,
  Docker: <SiDocker className="text-blue-400" />,
  Kubernetes: <SiKubernetes className="text-blue-500" />,
  Git: <FaGitAlt className="text-orange-500" />,
  GitHub: <SiGithub className="text-gray-200" />,
  Vercel: <SiVercel className="text-white" />,
  Netlify: <SiNetlify className="text-green-400" />,
  Database: <FaDatabase className="text-purple-400" />,
  Python: <FaPython className="text-yellow-400" />,
  Java: <FaJava className="text-red-500" />,
  VSCode: <SiVisualstudiocode className="text-blue-500" />,
};

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    totalPages: 0,
    totalProjects: 0,
  });

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  // Fetch projects with pagination
  const fetchProjects = async (page = 1, limit = 11) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/projects/featured?page=${page}&limit=${limit}`,
      );
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || "Failed to fetch projects");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const getPageFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get("page")) || 1;
  };
  const updateUrl = (page) => {
    const url = new URL(window.location);
    if (page === 1) {
      url.searchParams.delete("page"); // Clean URL for page 1
    } else {
      url.searchParams.set("page", page.toString());
    }
    window.history.pushState({}, "", url); // Update URL without page reload
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
      updateUrl(newPage);

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(pagination.limit)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-800"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-800 rounded-md w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
            </div>
            <div className="flex space-x-3 pt-4">
              <div className="h-10 bg-gray-800 rounded-lg w-24"></div>
              <div className="h-10 bg-gray-800 rounded-lg w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-[1.02] flex flex-col h-full">
      <div
        onClick={() => window.open(`/projects/${project._id}`, "_blank", "noopener,noreferrer")}
        className="relative group cursor-pointer bg-gray-800 overflow-hidden"
      >
        <img
          src={project.images?.[0] || "/api/placeholder/400/200"}
          alt={project.name}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.slice(0, 5).map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300 border border-gray-700/50"
            >
              <span className="text-xs">{techIcons[tech] || <span>_</span>}</span>
              <span>{tech}</span>
            </div>
          ))}

          {project.techStack?.length > 5 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-400 border border-gray-700/50">
              +{project.techStack.length - 5}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium group/btn"
            >
              <Code className="w-4 h-4 mr-2 text-purple-400 group-hover/btn:text-purple-300" />
              Code
            </a>
          )}

          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-lg shadow-purple-900/20"
            >
              <Globe className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const AnimatedProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-6"
      >
        <ProjectCard project={project} />
      </motion.div>
    );
  };

  const Pagination = () => {
    if (pagination.totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const current = currentPage;
      const total = pagination.totalPages;

      // Always show first page
      pages.push(1);

      // Add ellipsis if needed
      if (current > 3) {
        pages.push("...");
      }

      // Add pages around current
      for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      // Add ellipsis if needed
      if (current < total - 2) {
        pages.push("...");
      }

      // Always show last page if more than 1 page
      if (total > 1) {
        pages.push(total);
      }

      return pages;
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-12 pb-12">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => page !== "..." && handlePageChange(page)}
              disabled={page === "..."}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${page === currentPage
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-900/30"
                : page === "..."
                  ? "text-gray-500 cursor-default"
                  : "text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div className="relative max-w-4xl mx-auto z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
            Featured Projects
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of my technical projects, featuring web applications,
            mobile apps, and open source contributions.
          </p>

          {/* Project count info */}
          {!loading && pagination.totalProjects > 0 && (
            <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800 text-gray-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Showing {projects.length} of {pagination.totalProjects} projects
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 max-w-[1600px] mx-auto">
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <h3 className="text-red-400 text-xl font-semibold mb-2">
                Unable to Load Projects
              </h3>
              <p className="text-red-300/80 mb-6">{error}</p>
              <button
                onClick={() => fetchProjects(currentPage)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-900/20"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-32">
            <div className="text-gray-500">
              <Eye className="w-20 h-20 mx-auto mb-6 opacity-20" />
              <h3 className="text-2xl font-bold mb-3 text-gray-400">No Projects Found</h3>
              <p className="text-gray-500">Check back soon for new additions to the portfolio.</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {projects.map((project, index) => (
                <AnimatedProjectCard
                  key={project._id || project.id}
                  project={project}
                  index={index}
                />
              ))}
            </Masonry>

            <Pagination />
          </>
        )}
      </main>
    </div>
  );
};

export default ProjectShowcase;
