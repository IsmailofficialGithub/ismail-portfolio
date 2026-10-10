"use client";
import React, { useMemo, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import ProfileCard from "./ProfileCard";

const skillHighlights = [
  {
    title: "DevOps & Cloud",
    items: "AWS (EKS, EC2, RDS, S3, Lambda, VPC) · Kubernetes · Helm · Terraform · ArgoCD · Docker",
  },
  {
    title: "Backend & Systems",
    items: "Node.js · Express.js · Rust (Actix Web, Tokio) · REST APIs · Prisma ORM · WebSockets · WebRTC · MediaSoup",
  },
  {
    title: "Frontend",
    items: "TypeScript · JavaScript · React.js · Next.js · Zustand · React Query · Tailwind CSS",
  },
  {
    title: "Databases",
    items: "PostgreSQL · MongoDB · Redis · MySQL · Supabase · Pgvector (RAG)",
  },
  {
    title: "CI/CD & Observability",
    items: "GitHub Actions · Prometheus · Grafana · Loki · Nginx · Zero-Downtime Deployments",
  },
  {
    title: "AI & Automation",
    items: "OpenAI API · Gemini · LangChain · Vector Embeddings · RAG Pipelines · n8n · Kafka",
  },
];

const experiences = [
  {
    company: "YC Solutions",
    role: "Full-Stack & AI Developer",
    period: "Jan 2024 – Present",
    items: [
      "Architected and shipped production AI SaaS apps using React, Node.js, and TypeScript with RBAC for multi-tenant access.",
      "Built an AI technical interview bot using OpenAI and n8n, automating candidate screening and delivering objective feedback.",
      "Owned full AWS deployment lifecycles using Docker, Nginx, and automated CI/CD pipelines for high-availability infrastructure.",
    ],
  },
  {
    company: "ENCS",
    role: "Backend Developer / DevOps Engineer",
    period: "Mar 2023 – Jan 2024",
    items: [
      "Developed 20+ REST APIs in Node.js/Express with JWT auth, tuning PostgreSQL and MongoDB queries for performance.",
      "Achieved 99.9% uptime by resolving critical bugs and refactoring legacy endpoints with validation, rate limiting, and secrets management.",
      "Built standardized CI/CD workflows, containerized apps with Docker/Compose, and configured DNS, SSL, and Nginx/Apache infrastructure.",
    ],
  },
  {
    company: "Leecare Solutions (Australia)",
    role: "Backend Developer (Remote)",
    period: "Apr 2023 – Aug 2023",
    items: [
      "Optimized backend REST APIs and database queries for a distributed, healthcare-adjacent production SaaS platform.",
      "Built real-time communication features using WebRTC and built an end-to-end meeting app using MediaSoup for connection management.",
      "Implemented secure authentication flows and data-integrity safeguards compliant with healthcare data standards.",
    ],
  },
];

const ROLE_HEADLINE =
  "DevOps Engineer | Full-Stack Developer | AWS Cloud";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  // Keep a real H2 string in the SSR HTML for agents; animate only after mount.
  const [roleAnimationReady, setRoleAnimationReady] = useState(false);

  useEffect(() => {
    setRoleAnimationReady(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExperienceIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const highlightVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18 },
      visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 * index, duration: 0.4, ease: "easeOut" },
      }),
    }),
    []
  );

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-[calc(100vh-5rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-10"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Top Hero Row: Intro & Profile Card */}
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-12 sm:gap-10 lg:gap-14">
        <div className="col-span-1 sm:col-span-7 text-center sm:text-left space-y-4 sm:space-y-5 pt-1 sm:pt-2 order-2 sm:order-1">
          <motion.h1
            className="text-white text-4xl leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-extrabold"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-300 to-orange-500">
              Ismail Abbasi
            </span>
          </motion.h1>

          <motion.h2
            className="min-h-[2.5rem] text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6, ease: "easeOut" }}
          >
            {roleAnimationReady ? (
              <TypeAnimation
                sequence={[
                  "DevOps Engineer",
                  1200,
                  "Full-Stack Developer",
                  1200,
                  "AWS Cloud Architect",
                  1200,
                  "Kubernetes & CI/CD",
                  1200,
                  "Rust Developer",
                  1200,
                  "Forward Deployed Engineer",
                  1200,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            ) : (
              ROLE_HEADLINE
            )}
          </motion.h2>

          <motion.p
            className="text-[#ADB7BE] text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Full-Stack Developer and DevOps Engineer with 4+ years of experience designing, deploying, and scaling production SaaS applications and cloud infrastructure. Proven track record across Next.js, Node.js, and Rust microservices, paired with AWS architecture (EKS, EC2, RDS, Lambda), Kubernetes orchestration, and CI/CD automation (GitHub Actions, ArgoCD, Terraform).
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-3 pt-1 sm:flex-row sm:justify-start sm:gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-semibold shadow-lg shadow-orange-500/20 transition"
            >
              Hire Me
            </Link>
            <a
              href="/Ismail_Abbasi_Resume.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-orange-500 text-orange-200 hover:bg-orange-500/10 font-semibold transition"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          className="col-span-1 sm:col-span-5 order-1 sm:order-2 flex justify-center sm:justify-end items-start"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        >
          <ProfileCard />
        </motion.div>
      </div>

      {/* Skills & Experience Row */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <h2 className="mb-3 text-left text-lg font-semibold text-white sm:text-xl">
            Skills &amp; stack
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-2 flex-1">
            {skillHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-3.5 text-left hover:border-orange-500/40 transition flex flex-col justify-center"
                variants={highlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
              >
                <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-wide">
                  {highlight.title}
                </h3>
                <p className="text-xs text-[#E2E8F0] leading-relaxed mt-0.5">
                  {highlight.items}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <h2 className="mb-3 text-left text-lg font-semibold text-white sm:text-xl">
            Experience
          </h2>
          <div className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-emerald-300 mb-2 font-semibold bg-emerald-500/20 px-2 py-0.5 rounded">
                Active Career
              </span>
              {experiences.map((experience, index) => (
                <div
                  key={experience.company}
                  className={
                    index === currentExperienceIndex ? "block" : "hidden"
                  }
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {experience.company} | {experience.role}
                  </h3>
                  <p className="text-xs text-emerald-300/80 mt-0.5">
                    {experience.period}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[#C8E6D0] list-disc pl-4">
                    {experience.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Carousel progress dots */}
            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
              <span className="text-[11px] text-emerald-300/70">
                {currentExperienceIndex + 1} of {experiences.length} roles
              </span>
              <div className="flex gap-1.5">
                {experiences.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentExperienceIndex(idx)}
                    aria-label={`Go to experience ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentExperienceIndex
                        ? "w-5 bg-emerald-400"
                        : "w-1.5 bg-emerald-500/30 hover:bg-emerald-400/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
