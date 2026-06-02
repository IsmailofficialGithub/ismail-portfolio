import React from 'react';
import { ImagePlus, Plus, Upload, X } from 'lucide-react';
import Image from 'next/image';

const ProjectForm = ({
  formData,
  setFormData,
  techInput,
  setTechInput,
  imageFiles,
  setImageFiles,
  onAddTech,
  onRemoveTech,
  onRemoveImage,
  errors = {} // Add errors prop with default empty object
}) => {
  const fileInputRef = React.useRef(null);
  const imageUrlsRef = React.useRef(formData.images);
  const [isDragging, setIsDragging] = React.useState(false);
  const [imageNotice, setImageNotice] = React.useState('');

  const addImageFiles = React.useCallback((selectedFiles) => {
    const files = Array.from(selectedFiles || []).filter(file => file.type.startsWith('image/'));

    if (files.length === 0) {
      setImageNotice('Add JPG, PNG, or WebP image files.');
      return;
    }

    const remainingSlots = 10 - formData.images.length;
    if (remainingSlots <= 0) {
      setImageNotice('Maximum 10 images allowed.');
      return;
    }

    const acceptedFiles = files.slice(0, remainingSlots);
    const previewUrls = acceptedFiles.map(file => URL.createObjectURL(file));

    setImageFiles(prev => [...prev, ...acceptedFiles]);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...previewUrls]
    }));
    setImageNotice(
      files.length > acceptedFiles.length
        ? `Added ${acceptedFiles.length} image(s). Maximum 10 images allowed.`
        : ''
    );
  }, [formData.images.length, setFormData, setImageFiles]);

  const handleFileSelect = (e) => {
    addImageFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addImageFiles(e.dataTransfer.files);
  };

  const handlePaste = React.useCallback((e) => {
    if (e.defaultPrevented) return;

    const files = Array.from(e.clipboardData?.files || []);
    if (files.length > 0) {
      e.preventDefault();
      addImageFiles(files);
    }
  }, [addImageFiles]);

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  // Clean up object URLs when component unmounts or images are removed
  React.useEffect(() => {
    imageUrlsRef.current = formData.images;
  }, [formData.images]);

  React.useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${errors.name ? 'border-red-500' : 'border-gray-700'
            }`}
          placeholder="Enter project name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *  <span className={`${formData.description.length > 3000 ? 'text-red-400' : 'text-gray-400'}`}> {"3000" - formData.description.length}  characters left</span>
        </label>
        <textarea
          required
          rows={10}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${errors.description ? 'border-red-500' : 'border-gray-700'
            }`}
          placeholder="Enter project description (Markdown supported)"
        />
        <p className="text-xs text-gray-500 mt-1 mb-1">markdown supported</p>
        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          GitHub Repository *
        </label>
        <input
          type="url"
          required
          value={formData.code}
          onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${errors.code ? 'border-red-500' : 'border-gray-700'
            }`}
          placeholder="https://github.com/username/repo"
        />
        {errors.code && <p className="mt-1 text-sm text-red-400">{errors.code}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Live Preview URL
        </label>
        <input
          type="url"
          value={formData.livePreview}
          onChange={(e) => setFormData(prev => ({ ...prev, livePreview: e.target.value }))}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${errors.livePreview ? 'border-red-500' : 'border-gray-700'
            }`}
          placeholder="https://your-project.vercel.app"
        />
        {errors.livePreview && <p className="mt-1 text-sm text-red-400">{errors.livePreview}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tech Stack *
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTech())}
            className={`flex-1 px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${errors.techStack ? 'border-red-500' : 'border-gray-700'
              }`}
            placeholder="Add technology"
          />
          <button
            type="button"
            onClick={onAddTech}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {errors.techStack && <p className="mt-1 text-sm text-red-400">{errors.techStack}</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => onRemoveTech(tech)}
                className="text-purple-400 hover:text-purple-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Images *
        </label>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            if (e.currentTarget.contains(e.relatedTarget)) return;
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-800 px-4 py-8 text-center text-white transition-colors focus:outline-none focus:border-purple-500 ${isDragging ? 'border-purple-400 bg-purple-500/10' : errors.images ? 'border-red-500' : 'border-gray-700 hover:border-purple-500'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
          />
          <Upload className="mb-3 h-8 w-8 text-purple-300" />
          <p className="text-sm font-medium text-gray-200">
            Drop images here, paste from clipboard, or click to browse
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
            <ImagePlus className="h-3 w-3" />
            JPG, PNG, or WebP up to 10 images
          </p>
        </div>
        {errors.images && <p className="mt-1 text-sm text-red-400">{errors.images}</p>}
        {imageNotice && <p className="mt-1 text-sm text-yellow-400">{imageNotice}</p>}

        {(formData.images.length > 0 || imageFiles.length > 0) && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">
              Preview ({formData.images.length} / 10 images)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <Image
                    width={100}
                    height={96}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                  <div className="absolute bottom-1 left-1 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-2 text-xs text-gray-400">
          You can also press Ctrl+V after copying an image.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-300">Featured Project</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
