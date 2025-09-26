"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import TimeAgo from "@/app/helper/moment";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaCopy, 
  FaCalendarAlt, 
  FaClock,
  FaUser,
  FaArrowLeft
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Enhanced Loading Component
const ArticleLoader = () => (
  <div className="max-w-4xl mx-auto p-4 animate-pulse">
    <div className="text-center sm:mt-20 md:mt-28 mt-16 lg:mt-28">
      {/* Title skeleton */}
      <div className="h-12 bg-gray-700 rounded-lg mb-6 mx-auto max-w-2xl"></div>
      <div className="h-px bg-gray-700 mb-4"></div>
      
      {/* Author info skeleton */}
      <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-700 rounded w-24 mx-auto mb-6"></div>
      
      {/* Social buttons skeleton */}
      <div className="flex justify-end space-x-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-5 w-5 bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
    
    {/* Image skeleton */}
    <div className="h-64 md:h-80 bg-gray-700 rounded-xl mb-8"></div>
    
    {/* Content skeleton */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      ))}
    </div>
  </div>
);

// Share Button Component
const ShareButton = ({ onClick, icon: Icon, label, className = "" }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const ArticleCard = () => {
  const params = useParams();
  const router = useRouter();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(null);

  // Safe way to get page URL
  const getPageUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPageUrl())}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      if (typeof window !== 'undefined') {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard!', {
          duration: 2000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
      }
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  const shareOnTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      getPageUrl()
    )}&text=${encodeURIComponent(`Check out this article: ${blogData?.title || ''}`)}`;
    window.open(twitterShareUrl, "_blank", "width=600,height=400");
  };

  const shareOnInstagram = () => {
    toast.info("Instagram doesn't support direct URL sharing. Copy the link and share manually!", {
      duration: 3000,
    });
  };

  const fetchingData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/blogs/readOne/${params.id}`);
      
      if (response.data.success) {
        setBlogData(response.data.blog);
      } else {
        setError('Failed to load article');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchingData();
    }
  }, [params.id]);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Error state
  if (error && !loading) {
    return (
      <>
        <Navbar />
        <div className="bg-[#121212] min-h-screen text-white flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#121212] min-h-screen text-white">
        <div className="max-w-4xl mx-auto p-4">
          {loading ? (
            <ArticleLoader />
          ) : (
            <>
              {/* Back Button */}
              <Link href="/blogs" className="">
              <button
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 sm:mt-20 md:mt-28 mt-16 lg:mt-28 mb-8"
              >
                   <FaArrowLeft className="mr-2" />
                Back to Articles
              </button>
               </Link>

              {/* Article Header */}
              <header className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {blogData?.title}
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
                
                {/* Author & Meta Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 mb-6">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-blue-400" />
                    <span>Written by <strong className="text-blue-400">Ismail Abbasi</strong></span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-400" />
                    <span>{formatDate(blogData?.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaClock className="text-yellow-400" />
                    <span>{formatTime(blogData?.createdAt)}</span>
                  </div>
                </div>

                {/* Time Ago */}
                <div className="text-xs text-gray-400 mb-8">
                  <TimeAgo createdAt={blogData?.createdAt} />
                </div>

                {/* Social Share Buttons */}
                <div className="flex justify-center space-x-2 mb-8">
                  <ShareButton
                    onClick={shareOnFacebook}
                    icon={FaFacebookF}
                    label="Share on Facebook"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  />
                  <ShareButton
                    onClick={shareOnTwitter}
                    icon={FaTwitter}
                    label="Share on Twitter"
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  />
                  <ShareButton
                    onClick={shareOnInstagram}
                    icon={FaInstagram}
                    label="Share on Instagram"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  />
                  <ShareButton
                    onClick={copyToClipboard}
                    icon={FaCopy}
                    label="Copy URL"
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  />
                </div>
              </header>

              {/* Featured Image */}
              {blogData?.imageUrl && (
                <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400">Loading image...</div>
                    </div>
                  )}
                  <img
                    src={blogData.imageUrl}
                    alt={blogData.title}
                    className={`w-full h-auto md:h-80 lg:h-96 object-cover transition-opacity duration-500 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              {/* Article Content */}
              <article className="prose prose-lg prose-invert max-w-none">
                <div 
                  className="text-lg leading-relaxed text-gray-100"
                  dangerouslySetInnerHTML={{ __html: blogData?.description }}
                />
              </article>

              {/* Article Footer */}
              <footer className="mt-16 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Enjoyed this article?</h3>
                  <p className="text-gray-400 mb-6">Share it with your friends and colleagues!</p>
                  
                  {/* Social Share Buttons (repeated) */}
                  <div className="flex justify-center space-x-2">
                    <ShareButton
                      onClick={shareOnFacebook}
                      icon={FaFacebookF}
                      label="Share on Facebook"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    />
                    <ShareButton
                      onClick={shareOnTwitter}
                      icon={FaTwitter}
                      label="Share on Twitter"
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                    />
                    <ShareButton
                      onClick={copyToClipboard}
                      icon={FaCopy}
                      label="Copy URL"
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                    />
                  </div>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-[#121212] text-white">
        <Footer />
      </div>
    </>
  );
};

export default ArticleCard;