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

  // Fetch projects with pagination
  const fetchProjects = async (page = 1, limit = 6) => {
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
  <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 flex flex-col">
    <div onClick={() => window.open(`/projects/${project.id}`, "_blank", "noopener,noreferrer")} className="relative group cursor-pointer aspect-video bg-gray-800">
      <img
        src={project.images?.[0] || "/api/placeholder/400/200"}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    
    <div className="p-3 sm:p-6 flex-1 flex flex-col">
      {/* Title - smaller on mobile */}
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors">
        {project.name}
      </h3>
      
      {/* Description - smaller font and spacing on mobile */}
      <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
        {project.description}
      </p>
      
      {/* Tech Stack - responsive sizing and count */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {project.techStack?.slice(0, window.innerWidth < 640 ? 3 : 5).map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm text-gray-200"
          >
            <span className="text-xs sm:text-sm">{techIcons[tech] || <span>🔧</span>}</span>
            <span>{tech}</span>
          </div>
        ))}
        
        {project.techStack?.length > (window.innerWidth < 640 ? 3 : 5) && (
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-gray-700 rounded-full text-xs sm:text-sm text-gray-300">
            +{project.techStack.length - (window.innerWidth < 640 ? 3 : 5)} more
          </div>
        )}
      </div>
      
      {/* Buttons - responsive sizing and text */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
        {project.code && (
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Code</span>
            <span className="sm:hidden">Code</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </a>
        )}
        
        {project.livePreview && (
          <a
            href={project.livePreview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Live</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  </div>
);

  const AnimatedProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ duration: 0.5, delay: index * 0.2 }}
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
      <div className="flex justify-center items-center space-x-2 mt-12">
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
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                page === currentPage
                  ? "bg-purple-600 text-white border-purple-600"
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="relative py-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-600/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore my latest work and creative endeavors. Each project
            represents a unique challenge solved with passion and innovation.
          </p>

          {/* Project count info */}
          {!loading && pagination.totalProjects > 0 && (
            <div className="mt-4 text-gray-400">
              Showing {projects.length} of {pagination.totalProjects} projects
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-0 lg:pb-16 px-6 max-w-7xl mx-auto">
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-red-400 text-xl font-semibold mb-2">
                Error Loading Projects
              </h3>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={() => fetchProjects(currentPage)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400">
              <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p>Check back soon for new projects!</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <AnimatedProjectCard
                  key={project._id || project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>

            <Pagination />
          </>
        )}
      </main>
    </div>
  );
};

export default ProjectShowcase;
