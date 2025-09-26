import React from "react";
import {
  Edit3,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Calendar,
  ImageIcon,
} from "lucide-react";

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-colors">
    <div className="relative h-48 bg-gray-800">
      {project.images?.[0] ? (
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-gray-600" />
        </div>
      )}
      <div className="absolute top-4 right-4 flex gap-2">
        {project.featured && (
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        )}
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === "published"
              ? "bg-green-500 text-white"
              : project.status === "draft"
              ? "bg-yellow-500 text-black"
              : "bg-gray-500 text-white"
          }`}
        >
          {project.status}
        </div>
      </div>
    </div>

    <div className="p-6">
      <h3
        className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-purple-400 transition-colors"
        onClick={() => {
          window.open(
            `/projects/${project._id}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        {project.name}
      </h3>
      <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Edit3 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => onDelete(project)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
          {project.livePreview && (
            <a
              href={project.livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          )}
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectCard;
