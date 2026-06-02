"use client";

import React from "react";
import Image from "next/image";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";

const ProjectCard = ({ project }) => {
  const imageSrc = project.thumbnail || project.images?.[0];

  return (
    <article className="group h-full overflow-hidden rounded-xl border border-[#33353F] bg-[#181818] transition-colors duration-300 hover:border-purple-500">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#20212a]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.name || "Project thumbnail"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#ADB7BE]">
            No image
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#181818]/0 opacity-0 transition-all duration-300 hover:bg-[#181818]/80 hover:opacity-100">
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} code`}
              className="relative h-14 w-14 rounded-full border-2 border-[#ADB7BE] transition-colors hover:border-white"
            >
              <CodeBracketIcon className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-[#ADB7BE] hover:text-white" />
            </a>
          )}
          <a
            href={`/projects/${project._id}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name}`}
            className="relative h-14 w-14 rounded-full border-2 border-[#ADB7BE] transition-colors hover:border-white"
          >
            <EyeIcon className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-[#ADB7BE] hover:text-white" />
          </a>
        </div>
      </div>

      <div className="px-4 py-5">
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white">
          {project.name}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-[#ADB7BE]">
          {project.description}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
