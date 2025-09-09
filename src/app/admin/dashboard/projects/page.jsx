'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';

// Dynamic imports for better code splitting
const ProjectCard = dynamic(() => import('@/app/components/admin/ProjectCard'), {
  loading: () => <div className="bg-gray-900 rounded-xl h-96 animate-pulse"></div>
});

const ProjectModal = dynamic(() => import('@/app/components/admin/ProjectModal'));
const ProjectForm = dynamic(() => import('@/app/components/admin/ProjectForm'));
const DeleteConfirmModal = dynamic(() => import('@/app/components/admin/DeleteConfirmModal'));
const ProjectControls = dynamic(() => import('@/app/components/admin/ProjectControls'));
const Pagination = dynamic(() => import('@/app/components/admin/Pagination'));
const LoadingSkeleton = dynamic(() => import('@/app/components/admin/LoadingSkeleton'));

export default function AdminProjectsDashboard() {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [techStackFilter, setTechStackFilter] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [],
    code: '',
    livePreview: '',
    techStack: [],
    featured: false,
    status: 'published'
  });
  const [techInput, setTechInput] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(techStackFilter && { techStack: techStackFilter }),
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data.projects);
        setPagination(data.data.pagination);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchTerm, statusFilter, techStackFilter]);

  // Upload images
  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const response = await fetch('/api/projects/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data.images.map(img => img.url);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      images: [],
      code: '',
      livePreview: '',
      techStack: [],
      featured: false,
      status: 'published'
    });
    setTechInput('');
    setImageFiles([]);
  };

  // Handle add project
  const handleAdd = async () => {
    try {
      setSubmitting(true);
      
      let imageUrls = formData.images;
      if (imageFiles.length > 0) {
        setUploading(true);
        imageUrls = await uploadImages(imageFiles);
        setUploading(false);
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images: imageUrls }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      setShowAddModal(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  // Handle edit project
  const handleEdit = async () => {
    try {
      setSubmitting(true);
      
      let imageUrls = formData.images;
      if (imageFiles.length > 0) {
        setUploading(true);
        const newImageUrls = await uploadImages(imageFiles);
        imageUrls = [...imageUrls, ...newImageUrls];
        setUploading(false);
      }

      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images: imageUrls }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      setShowEditModal(false);
      resetForm();
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  // Handle delete project
  const handleDelete = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      setShowDeleteModal(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Open edit modal
  const openEditModal = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      images: project.images,
      code: project.code,
      livePreview: project.livePreview || '',
      techStack: project.techStack,
      featured: project.featured,
      status: project.status
    });
    setShowEditModal(true);
  };

  // Add tech to stack
  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  // Remove tech from stack
  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  // Remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Project Management</h1>
        <p className="text-gray-400">Manage your portfolio projects</p>
      </div>

      {/* Controls */}
      <Suspense fallback={<div className="h-16 bg-gray-800 rounded-lg animate-pulse"></div>}>
        <ProjectControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          techStackFilter={techStackFilter}
          setTechStackFilter={setTechStackFilter}
          onAddProject={() => setShowAddModal(true)}
        />
      </Suspense>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-300">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingSkeleton />
        </Suspense>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Suspense key={project._id} fallback={<div className="bg-gray-900 rounded-xl h-96 animate-pulse"></div>}>
                <ProjectCard 
                  project={project} 
                  onEdit={openEditModal}
                  onDelete={(project) => {
                    setSelectedProject(project);
                    setShowDeleteModal(true);
                  }}
                />
              </Suspense>
            ))}
          </div>

          {/* Pagination */}
          <Suspense fallback={<div className="h-12 mt-8"></div>}>
            <Pagination 
              pagination={pagination}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Suspense>
        </>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <Suspense fallback={null}>
          <ProjectModal
            isOpen={showAddModal || showEditModal}
            onClose={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              resetForm();
              setSelectedProject(null);
            }}
            title={showAddModal ? "Add New Project" : "Edit Project"}
            onSubmit={showAddModal ? handleAdd : handleEdit}
            submitting={submitting}
            uploading={uploading}
          >
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              techInput={techInput}
              setTechInput={setTechInput}
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              onAddTech={addTech}
              onRemoveTech={removeTech}
              onRemoveImage={removeImage}
            />
          </ProjectModal>
        </Suspense>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Suspense fallback={null}>
          <DeleteConfirmModal
            isOpen={showDeleteModal}
            project={selectedProject}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            submitting={submitting}
          />
        </Suspense>
      )}
    </div>
  );
}