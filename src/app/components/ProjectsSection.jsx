"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";

const getProjectType = (project) => {
  const searchable = [
    project.name,
    project.description,
    ...(project.techStack || []),
  ]
    .join(" ")
    .toLowerCase();

  return /(mobile|android|ios|react native|flutter|swift|kotlin)/.test(searchable)
    ? "Mobile"
    : "Web";
};

const ProjectCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border border-[#33353F] bg-[#181818]">
    <div className="aspect-[16/10] w-full animate-pulse bg-[#20212a]" />
    <div className="space-y-3 px-4 py-5">
      <div className="h-6 w-3/4 animate-pulse rounded bg-[#2a2b35]" />
      <div className="h-4 w-full animate-pulse rounded bg-[#2a2b35]" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-[#2a2b35]" />
    </div>
  </div>
);

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const isCardsInView = useInView(cardsRef, { once: true, amount: 0.15 });

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/projects/featured?page=1&limit=6", {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load featured projects");
        }

        setProjects(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load featured projects");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedProjects();

    return () => controller.abort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (tag === "All") return projects;
    return projects.filter((project) => getProjectType(project) === tag);
  }, [projects, tag]);

  const availableTags = useMemo(() => {
    const types = new Set(projects.map(getProjectType));
    return ["All", ...["Web", "Mobile"].filter((type) => types.has(type))];
  }, [projects]);

  const cardVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="mt-4 mb-4 text-center text-4xl font-bold text-white md:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-[#ADB7BE]">
        Featured product and platform work spanning full-stack web apps, AI
        automation, and systems delivery. Open a project for stack details,
        write-ups, and links — or browse the full projects index.
      </p>

      {availableTags.length > 1 && (
        <motion.div
          className="flex flex-row items-center justify-center gap-2 py-6 text-white"
          initial={{ opacity: 0, y: 16 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {availableTags.map((name) => (
            <ProjectTag
              key={name}
              onClick={setTag}
              name={name}
              isSelected={tag === name}
            />
          ))}
        </motion.div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/20 px-5 py-6 text-center text-red-200">
          {error}
        </div>
      )}

      {!error && (
        <motion.ul
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          animate={isCardsInView ? "animate" : "initial"}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <li key={index}>
                  <ProjectCardSkeleton />
                </li>
              ))
            : filteredProjects.map((project, index) => (
                <motion.li
                  key={project._id}
                  variants={cardVariants}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
        </motion.ul>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <div className="rounded-xl border border-[#33353F] bg-[#181818] px-5 py-8 text-center text-[#ADB7BE]">
          No featured projects found.
        </div>
      )}

      <motion.div
        className="mt-12 flex items-center justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <Link href="/projects">
          <Button text="All Projects" />
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;
