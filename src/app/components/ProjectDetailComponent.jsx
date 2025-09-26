"use client";
import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, Calendar, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProjectDetailSkeleton from './ProjectDetailSkeleton';
import { useParams } from 'next/navigation';

const ProjectDetailComponent = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [project,setProject]=useState([]);
  const [loading,setLoading]=useState(true)
  const params=useParams();

  const gettingData=async()=>{
    setLoading(true)
   try {
     const response=await axios.get(`/api/projects/${params.id}`);
    console.log(response.data);
    if(response.data.success){
        setProject(response.data.data);
    }else{
        toast.error(response.data.message);
    }
    
   } catch (error) {
    toast.error("Something went wrong");
    console.log(error)
   }finally{
    setLoading(false)
   }

  }

  useEffect(()=>{
    gettingData()
  },[params.id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openLightbox = (index) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

    if(loading){
    return <ProjectDetailSkeleton/>
  }
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-gray-400 mb-4">Project not found</div>
          <button
            onClick={gettingData}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                {project.featured && (
                  <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'published' ? 'bg-green-600 text-green-100' :
                  project.status === 'draft' ? 'bg-yellow-600 text-yellow-100' :
                  'bg-gray-600 text-gray-100'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {project.name}
              </h1>

              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-5 h-5" />
                <span>Created on {formatDate(project.createdAt)}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>View Code</span>
                </a>
                {project.livePreview && (
                  <a
                    href={project.livePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Live Preview</span>
                  </a>
                )}
              </div>
            </div>

            {/* Main Image Carousel */}
            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openLightbox(currentImageIndex)}
                />
                
                {/* Navigation arrows */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </div>

              {/* Thumbnail navigation */}
              {project.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-blue-500 scale-105'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gray-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="aspect-video rounded-lg overflow-hidden cursor-pointer group relative"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image}
                  alt={`${project.name} - Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative mt-[5%] max-w-5xl w-full max-h-full">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <img
                src={project.images[lightboxImageIndex]}
                alt={`${project.name} - Full size ${lightboxImageIndex + 1}`}
                className="w-full h-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                {lightboxImageIndex + 1} / {project.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailComponent;