"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { MoveUpRight, Calendar, Clock, ExternalLink } from 'lucide-react';
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// Custom hook for intersection observer (lazy loading)
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

// Enhanced BlogCard Component with Lazy Loading
const BlogCard = ({ blog, id, priority = false }) => {
  const [imageRef, isImageVisible] = useIntersectionObserver();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true); // Stop showing loading state
  }, []);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group min-w-[320px] max-w-[380px] flex-shrink-0">
      {/* Image Container with Lazy Loading */}
      <div 
        ref={imageRef}
        className="relative overflow-hidden rounded-lg mb-4 h-48 bg-gray-700"
      >
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-500 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-xs">Image unavailable</div>
            </div>
          </div>
        )}

        {/* Actual Image - Only load when visible or priority */}
        {(isImageVisible || priority) && !imageError && (
          <>
            <Image
              width={380}
              height={192}
              src={blog.imageUrl}
              alt={blog.title}
              className={`w-full h-48 object-cover group-hover:scale-105 transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyatinyPWDfWi+WPyz2CWLRv//Z"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Date */}
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(blog.createdAt)}
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold leading-tight group-hover:text-blue-400 transition-colors duration-300">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {stripHtml(blog.description)}
        </p>

        {/* Read More Link */}
        <div className="pt-2">
          <Link 
            href={`blogs/${id}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium group/btn transition-colors duration-300"
          >
            Read More
            <MoveUpRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const BlogSkeleton = () => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 min-w-[320px] max-w-[380px] flex-shrink-0 animate-pulse">
    <div className="bg-gray-700 rounded-lg h-48 mb-4" />
    <div className="space-y-3">
      <div className="bg-gray-700 rounded h-4 w-24" />
      <div className="bg-gray-700 rounded h-6 w-full" />
      <div className="bg-gray-700 rounded h-4 w-3/4" />
      <div className="bg-gray-700 rounded h-4 w-1/2" />
      <div className="bg-gray-700 rounded h-4 w-20" />
    </div>
  </div>
);

// Main Blog Section Component
const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/blogs/readless");
      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingBlogs();
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen py-12 px-4" id="blogs">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-[#a855f7]">Blog Posts</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on modern software development, AI, and technology trends.
          </p>
        </div>

        {/* Blog Cards Container */}
        <div className="relative">
          {loading ? (
            // Loading State
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {Array.from({ length: 5 }).map((_, index) => (
                <BlogSkeleton key={index} />
              ))}
            </div>
          ) : (
            // Blog Cards with Lazy Loading
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {blogs.map((blog, index) => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  id={blog._id}
                  priority={index < 2} // Load first 2 images with priority
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        {!loading && blogs.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/blogs" target="_blank" rel="noopener noreferrer">
              <Button text="View All Posts"/>
            </Link>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No blog posts found.</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4B5563;
          border-radius: 3px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
          background-color: #6B7280;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1F2937;
          border-radius: 3px;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogSection;