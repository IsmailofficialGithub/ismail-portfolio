import React from 'react';
import { Plus, X } from 'lucide-react';

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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    // Create object URLs for preview
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...previewUrls] 
    }));
  };

  // Clean up object URLs when component unmounts or images are removed
  React.useEffect(() => {
    return () => {
      // Revoke object URLs to avoid memory leaks
      formData.images.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [formData.images]);

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
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
            errors.name ? 'border-red-500' : 'border-gray-700'
          }`}
          placeholder="Enter project name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
            errors.description ? 'border-red-500' : 'border-gray-700'
          }`}
          placeholder="Enter project description"
        />
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
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
            errors.code ? 'border-red-500' : 'border-gray-700'
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
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
            errors.livePreview ? 'border-red-500' : 'border-gray-700'
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
            className={`flex-1 px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
              errors.techStack ? 'border-red-500' : 'border-gray-700'
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
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:border-purple-500 ${
            errors.images ? 'border-red-500' : 'border-gray-700'
          }`}
        />
        {errors.images && <p className="mt-1 text-sm text-red-400">{errors.images}</p>}
        
        {(formData.images.length > 0 || imageFiles.length > 0) && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">
              Preview ({formData.images.length} / 5 images)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
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
          Maximum 5 images allowed. Supported formats: JPG, PNG, WebP
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