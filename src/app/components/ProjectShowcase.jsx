"use client";
import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Code, Eye, Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaGitAlt, FaPython, FaJava } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiMongodb, SiTailwindcss, SiTypescript, SiRedux, SiGraphql, SiDocker, SiKubernetes, SiPostgresql, SiMysql, SiSupabase, SiFirebase, SiVercel, SiNetlify, SiGithub, SiVisualstudiocode } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";


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

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  // Mock API call - replace with your actual API endpoint
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects/featured');
      if (response.data.success) {
        setProjects(response.data.projects);
      } else {
       toast.error("Failed to fetch projects");
      }
      setProjects(response.data.data);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
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
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
      <div className="relative group">
        <Image
        width={100}
        height={192}
          src={project.images[0]}
          alt={project.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
          {project.name}
        </h3>

        <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200"
            >
              {techIcons[tech] || <span>🔧</span>}
              <span>{tech}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <Code className="w-4 h-4 mr-2" />
            Code <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Globe className="w-4 h-4 mr-2" />
              Live Demo <ExternalLink className="w-4 h-4 ml-1" />
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

  return (
    <div className="min-h-screen mt-0 md:mt-[-60px]">
      {/* Header */}
      <header className="relative py-16 px-6 text-center h-[35vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-600/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent" >
            
            My Projects
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore my latest work and creative endeavors. Each project
            represents a unique challenge solved with passion and innovation.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 sm:mx-3 md:mx-3">
        {loading && <LoadingSkeleton />}

        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-red-400 text-xl font-semibold mb-2">
                Error Loading Projects
              </h3>
              <p className="text-red-300">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectShowcase;
