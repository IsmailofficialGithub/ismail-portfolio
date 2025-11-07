"use client";
import React, { useMemo } from "react";
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
    items: "MongoDB · MySQL · Supabase",
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

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const heroImageSrc = "/images/hero.svg";

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
      className="lg:py-16"
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
        <div className="col-span-7 place-self-center text-center sm:text-left justify-self-start space-y-6">
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
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left"
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 mb-2">
              Experience Highlight
            </p>
            <h3 className="text-lg font-semibold text-white">
              Cloud Rexpo | Full Stack &amp; AI Developer · Jan 2025 – Present
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-[#C8E6D0] list-disc pl-5">
              <li>
                Lead end-to-end delivery of AI-powered products with admin control, analytics, and pixel-perfect UX.
              </li>
              <li>
                Built an AI Interview Bot leveraging OpenAI and orchestrated with n8n workflows for evaluation and feedback.
              </li>
              <li>
                Delivered zero-downtime deployments with Docker, Nginx, Linux, and CI/CD pipelines for automated scaling.
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="col-span-5 place-self-center w-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative mx-auto max-w-[520px] w-full">
            <div className="group relative aspect-[3/4] rounded-[32px] bg-white/5 shadow-[0_25px_60px_-15px_rgba(12,10,27,0.65)]">
              <div
                className="pointer-events-none absolute -inset-[4px] rounded-[36px] opacity-0 group-hover:opacity-100 transition duration-500 ease-out [animation:none] group-hover:[animation:spin_3s_linear_infinite]"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(249,115,22,0.8) 120deg, rgba(255,255,255,0) 240deg)",
                  filter: "blur(1px)",
                }}
              />
              <div
                className="pointer-events-none absolute -inset-[6px] rounded-[40px] opacity-0 group-hover:opacity-60 transition duration-500 ease-out [animation:none] group-hover:[animation:spin_3s_linear_infinite]"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(249,115,22,0.0) 0deg, rgba(255,176,67,0.35) 120deg, rgba(249,115,22,0.0) 240deg)",
                  filter: "blur(8px)",
                }}
              />
              <Image
                src={heroImageSrc}
                alt="Ismail Abbasi portrait"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 520px"
                className="relative z-[1] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
