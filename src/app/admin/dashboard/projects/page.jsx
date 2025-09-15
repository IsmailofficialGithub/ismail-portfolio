"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import dynamic from "next/dynamic";
import { X, RefreshCw } from "lucide-react";
import LayoutWrapper from "@/lib/LayoutWrapper";
import toast from "react-hot-toast";
import axios from "axios";

// Dynamic imports for better code splitting
const ProjectCard = dynamic(
  () => import("@/app/components/admin/ProjectCard"),
  {
    loading: () => (
      <div className="bg-gray-900 rounded-xl h-96 animate-pulse"></div>
    ),
  },
);

const ProjectModal = dynamic(() =>
  import("@/app/components/admin/ProjectModal"),
);
const ProjectForm = dynamic(() => import("@/app/components/admin/ProjectForm"));
const DeleteConfirmModal = dynamic(() =>
  import("@/app/components/admin/DeleteConfirmModal"),
);
const ProjectControls = dynamic(() =>
  import("@/app/components/admin/ProjectControls"),
);
const Pagination = dynamic(() => import("@/app/components/admin/Pagination"));
const LoadingSkeleton = dynamic(() =>
  import("@/app/components/admin/LoadingSkeleton"),
);

// Validation functions based on the schema
const validateForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Project name is required';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (formData.name.trim().length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  // Description validation
  if (!formData.description.trim()) {
    errors.description = 'Description is required';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (formData.description.trim().length > 3000) {
    errors.description = 'Description cannot exceed 3000 characters';
  }

  // Images validation
  if (formData.images.length === 0) {
    errors.images = 'At least one image is required';
  } else if (formData.images.length > 10) {
    errors.images = 'Cannot have more than 10 images';
  }

  // Code validation
  if (!formData.code.trim()) {
    errors.code = 'Code repository URL is required';
  } else if (!formData.code.startsWith('https://github.com/')) {
    errors.code = 'Code URL must be a valid GitHub repository';
  }

  // Live preview validation
  if (formData.livePreview && !formData.livePreview.startsWith('http')) {
    errors.livePreview = 'Live preview must be a valid URL';
  }

  // Tech stack validation
  if (formData.techStack.length === 0) {
    errors.techStack = 'At least one technology is required';
  } else if (formData.techStack.length > 10) {
    errors.techStack = 'Cannot have more than 10 technologies';
  }

  return errors;
};

export default function AdminProjectsDashboard() {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [techStackFilter, setTechStackFilter] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [autoRetryTimer, setAutoRetryTimer] = useState(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    code: "",
    livePreview: "",
    techStack: [],
    featured: false,
    status: "published",
  });
  const [formErrors, setFormErrors] = useState({});
  const [techInput, setTechInput] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Auto retry mechanism
  useEffect(() => {
    if (error && retryCount > 0) {
      const timer = setTimeout(() => {
        fetchProjects();
      }, 5000); // Retry after 5 seconds

      setAutoRetryTimer(timer);

      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(techStackFilter && { techStack: techStackFilter }),
      });

      const response = await axios.get(`/api/projects?${params}`);
      const data = response.data;

      if (data.success) {
        setProjects(data.data.projects);
        setPagination(data.data.pagination);
        setRetryCount(0); // Reset retry count on success
        if (autoRetryTimer) {
          clearTimeout(autoRetryTimer);
          setAutoRetryTimer(null);
        }
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch projects";
      toast.error(errorMessage);
      setError(errorMessage);
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, statusFilter, techStackFilter, autoRetryTimer]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Manual retry function
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchProjects();
  };

  // Cancel auto retry
  const cancelAutoRetry = () => {
    if (autoRetryTimer) {
      clearTimeout(autoRetryTimer);
      setAutoRetryTimer(null);
    }
    setRetryCount(0);
    setError(null);
  };

  // Upload images
  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const response = await fetch("/api/projects/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.success) {
      toast.error(data.message);
      throw new Error(data.message);
    }
    return data.data.images.map((img) => img.url);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      images: [],
      code: "",
      livePreview: "",
      techStack: [],
      featured: false,
      status: "published",
    });
    setFormErrors({});
    setTechInput("");
    setImageFiles([]);
  };

  // Validate and submit form
  const validateAndSubmit = async (isEdit = false) => {
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    if (isEdit) {
      await handleEdit();
    } else {
      await handleAdd();
    }
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

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images: imageUrls }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      toast.success("Project added successfully");

      setShowAddModal(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error(err.message);
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images: imageUrls }),
      });

      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      toast.success("Project updated successfully");

      setShowEditModal(false);
      resetForm();
      setSelectedProject(null);
      fetchProjects();
    } catch (err) {
      toast.error(err.message);
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
      setError(null);

      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Failed to delete project");
        throw new Error(`Failed to delete project: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Failed to delete project");
        throw new Error(data.message || "Failed to delete project");
      }
      toast.success("Project deleted successfully");

      // Success - close modal and refresh
      setShowDeleteModal(false);
      setSelectedProject(null);
      await fetchProjects();
    } catch (err) {
      toast.error("Delete project error");
      console.error("Delete project error:", err);
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
      livePreview: project.livePreview || "",
      techStack: project.techStack,
      featured: project.featured,
      status: project.status,
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Add tech to stack
const addTech = () => {
  if (techInput.trim()) {
    // split by comma, trim spaces, and filter empty values
    const newTechs = techInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !formData.techStack.includes(t));

    if (newTechs.length > 0) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, ...newTechs],
      }));
      setTechInput("");

      // Clear error if techStack was empty
      if (formErrors.techStack) {
        setFormErrors((prev) => ({ ...prev, techStack: undefined }));
      }
    }
  }
};

  // Remove tech from stack
  const removeTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  // Remove image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    // Clear images error if we still have images
    if (formData.images.length > 1 && formErrors.images) {
      setFormErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen text-white ">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Management</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>

        {/* Controls */}
        <Suspense
          fallback={
            <div className="h-16 bg-gray-800 rounded-lg animate-pulse"></div>
          }
        >
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

        {/* Error Display with Retry */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-300">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Error: {error}</span>
              <button
                onClick={cancelAutoRetry}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>
                {autoRetryTimer ? `Retrying in ${5 - (retryCount > 5 ? 5 : retryCount)} seconds...` : 'Auto retry cancelled'}
              </span>
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* No Projects Found */}
        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg">
            <div className="text-gray-400 text-lg mb-4">
              {debouncedSearchTerm || statusFilter || techStackFilter
                ? "No projects found matching your criteria"
                : "No projects found. Add your first project to get started!"}
            </div>
            {debouncedSearchTerm || statusFilter || techStackFilter ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                  setTechStackFilter("");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
              >
                Add First Project
              </button>
            )}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LoadingSkeleton />
          </Suspense>
        ) : projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Suspense
                  key={project._id}
                  fallback={
                    <div className="bg-gray-900 rounded-xl h-96 animate-pulse"></div>
                  }
                >
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
        ) : null}

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
              onSubmit={() => validateAndSubmit(showEditModal)}
              submitting={submitting}
              uploading={uploading}
              errors={Object.keys(formErrors).length > 0}
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
                errors={formErrors}
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
    </LayoutWrapper>
  );
}