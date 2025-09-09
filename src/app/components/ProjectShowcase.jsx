"use client"
import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Eye, Globe } from 'lucide-react';
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - replace with actual axios call
      const mockProjects = [
        {
          id: 1,
          name: "E-Commerce Platform",
          description: "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
          images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"],
          code: "https://github.com/example/ecommerce",
          livePreview: "https://example-ecommerce.vercel.app"
        },
        {
          id: 2,
          name: "Weather Dashboard",
          description: "Real-time weather dashboard with beautiful visualizations and forecasts. Built with React and integrated with multiple weather APIs for accurate data.",
          images: ["https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop"],
          code: "https://github.com/example/weather",
          livePreview: "https://weather-app.vercel.app"
        },
        {
          id: 3,
          name: "Task Management App",
          description: "Collaborative task management application with drag-and-drop functionality, team collaboration features, and real-time updates.",
          images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop"],
          code: "https://github.com/example/tasks"
        },
        {
          id: 4,
          name: "Portfolio Website",
          description: "Modern portfolio website showcasing creative works with smooth animations and responsive design. Built with Next.js and Framer Motion.",
          images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop"],
          code: "https://github.com/example/portfolio",
          livePreview: "https://portfolio.vercel.app"
        },
        {
          id: 5,
          name: "Social Media Analytics",
          description: "Comprehensive social media analytics dashboard with data visualization, sentiment analysis, and automated reporting features.",
          images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"],
          code: "https://github.com/example/analytics"
        },
        {
          id: 6,
          name: "Recipe Finder",
          description: "AI-powered recipe finder that suggests meals based on available ingredients. Includes nutritional information and cooking instructions.",
          images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop"],
          code: "https://github.com/example/recipes",
          livePreview: "https://recipe-finder.vercel.app"
        },
      ];
      
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to fetch projects');
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
        <div key={i} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 animate-pulse">
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
        <img 
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
        
        <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3">
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <Code className="w-4 h-4 mr-2" />
            Code
          </a>
          
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
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
    <div className="min-h-screen mt-[-60px]">
      {/* Header */}
      <header className="relative py-16 px-6 text-center  h-[35vh] ">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-600/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore my latest work and creative endeavors. Each project represents a unique challenge solved with passion and innovation.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16 sm:mx-3 md:mx-3 mt-0 md:mt-[-60px] ">
        {loading && <LoadingSkeleton />}
        
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-red-400 text-xl font-semibold mb-2">Error Loading Projects</h3>
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
    <AnimatedProjectCard key={project.id} project={project} index={index} />
  ))}
</div>

        )}
      </main>
    </div>
  );
};

export default ProjectShowcase;