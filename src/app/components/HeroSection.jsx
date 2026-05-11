"use client";
import React, { useMemo, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

const skillHighlights = [
  {
    title: "Frontend",
    items: "JavaScript · React.js · Next.js 15 · TypeScript",
  },
  {
    title: "Backend",
    items: "Node.js · Express.js · TypeScript",
  },
  {
    title: "Database",
    items: "MongoDB · MySQL · PostgreSQL · Supabase",
  },
  {
    title: "DevOps",
    items: "Docker · Docker Compose · AWS · CI/CD · Microservices · Monitoring · Secrets Management",
  },
  {
    title: "AI Automation",
    items: "n8n · Make · Zapier · No-Code Integrations",
  },
  {
    title: "Mobile",
    items: "React Native · Expo CLI · Android · iOS",
  },
  {
    title: "More",
    items: "GitHub · C++ (Basic) · Postman · Shadcn · Socket.io · Redux Toolkit",
  },
];

const experiences = [
  {
    company: "Cloud Rexpo",
    role: "Full Stack & AI Developer",
    period: "Jan 2025 – Present",
    items: [
      "Lead end-to-end delivery of AI-powered products with admin control, analytics, and pixel-perfect UX.",
      "Built an AI Interview Bot leveraging OpenAI and orchestrated with n8n workflows for evaluation and feedback.",
      "Delivered zero-downtime deployments with Docker, Nginx, Linux, and CI/CD pipelines for automated scaling.",
    ],
  },
  {
    company: "ENCS",
    role: "Backend Developer",
    period: "August 2023 – December 2024",
    items: [
      "Developed and maintained scalable backend systems, including RESTful APIs, database schemas, authentication flows, and third-party integrations.",
      "Optimized legacy APIs, improved query performance, fixed production issues, and implemented best practices in security and code quality.",
    ],
  },
  {
    company: "Firefly Tech Solutions",
    role: "Database Manager",
    period: "July 2022 – March 2023",
    items: [
      "Developed and maintained scalable backend systems including RESTful APIs, authentication flows, automation workflows, and server-side logic.",
      "Designed and optimized SQL/NoSQL databases, created efficient schemas, tuned queries, and managed cloud databases using AWS RDS.",
    ],
  },
];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });
  const heroImageSrc = "/images/hero-portrait.png";
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);

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
      className="py-8 sm:py-12 lg:py-16"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
        <div className="col-span-1 sm:col-span-7 place-self-center text-center sm:text-left justify-self-start space-y-4 sm:space-y-6">
          <motion.h1
            className="text-white text-4xl sm:text-5xl lg:text-7xl lg:leading-tight font-extrabold"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-300 to-orange-500">
              Hello, I&apos;m
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Ismail Abbasi",
                1200,
                "Full-Stack AI Developer",
                1200,
                "MERN Specialist",
                1200,
                "Automation Engineer",
                1200,
                "Technical Lead",
                1200,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.h1>

          <motion.p
            className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Full-Stack AI Developer proficient in the MERN stack (MongoDB, Express.js, React.js, Node.js, Next.js) with expertise in AI-driven automation and n8n integrations. I design and ship dynamic, intelligent, and scalable web applications that keep teams productive and users delighted.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-semibold shadow-lg shadow-orange-500/20 transition"
            >
              Hire Me
            </Link>
            <a
              href="/Ismail_Abbasi_Resume.pdf"
              download
              className="px-6 py-3 rounded-full border border-orange-500 text-orange-200 hover:bg-orange-500/10 font-semibold transition"
            >
              Download CV
            </a>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className="rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-4 text-left hover:border-orange-500/40 transition"
                variants={highlightVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
              >
                <p className="text-sm font-semibold text-orange-300 uppercase tracking-wide">
                  {highlight.title}
                </p>
                <p className="text-sm text-[#E2E8F0] leading-relaxed mt-1">
                  {highlight.items}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={currentExperienceIndex}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left min-h-[180px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 mb-2">
              Experience Highlight
            </p>
            <h3 className="text-lg font-semibold text-white">
              {experiences[currentExperienceIndex].company} |{" "}
              {experiences[currentExperienceIndex].role} ·{" "}
              {experiences[currentExperienceIndex].period}
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-[#C8E6D0] list-disc pl-5">
              {experiences[currentExperienceIndex].items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="col-span-1 sm:col-span-5 place-self-center w-full mt-4 sm:mt-0"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative mx-auto max-w-[520px] w-full">
            <div className="relative aspect-[3/4] rounded-[32px] bg-white/5 shadow-[0_25px_60px_-15px_rgba(12,10,27,0.65)] overflow-hidden">
              <Image
                src={heroImageSrc}
                alt="Ismail Abbasi portrait"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 520px"
                className="relative z-[1] object-cover"
                style={{ 
                  objectPosition: 'center bottom',
                  top: '80px',
                  left: '-10px',
                  right: '0px',
                  bottom: '0px'
                }}
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t  via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
