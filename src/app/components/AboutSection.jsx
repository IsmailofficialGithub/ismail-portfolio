"use client";
import React, { useTransition, useState, useRef, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { FaLinkedin } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const EXPERIENCE_DATA = [
  {
    company: "YC Solutions",
    role: "Full-Stack & AI Developer",
    period: "Jan 2024 – Present",
    duration: "Present",
    items: [
      "Architected and shipped production-grade AI SaaS applications end-to-end using React, Node.js, and TypeScript with RBAC for multi-tenant access.",
      "Built an AI-powered technical interview bot using OpenAI and n8n, automating candidate screening and delivering objective feedback.",
      "Owned the full AWS deployment lifecycle using Docker and Nginx, creating CI/CD pipelines enabling scalable, high-availability infrastructure.",
    ],
  },
  {
    company: "ENCS",
    role: "Backend Developer / DevOps Engineer",
    period: "Mar 2023 – Jan 2024",
    duration: "11 months",
    items: [
      "Developed and optimized 20+ REST APIs in Node.js/Express with JWT auth, tuning PostgreSQL and MongoDB queries for performance.",
      "Achieved 99.9% application uptime by resolving critical production bugs and refactoring 15+ legacy API endpoints with validation and rate limiting.",
      "Built standardized CI/CD workflows, containerized apps with Docker/Compose, and configured DNS, SSL, and Nginx/Apache infrastructure.",
    ],
  },
  {
    company: "Leecare Solutions (Australia)",
    role: "Backend Developer (Remote)",
    period: "Apr 2023 – Aug 2023",
    duration: "5 months",
    items: [
      "Developed and optimized backend REST APIs for a distributed, healthcare-adjacent production SaaS platform.",
      "Built real-time communication features using WebRTC and built an end-to-end meeting app with MediaSoup for connection management.",
      "Implemented secure authentication flows and data-integrity safeguards compliant with healthcare data standards.",
    ],
  },
];

const ExperienceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % EXPERIENCE_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[200px]">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <h4 className="font-semibold text-white">
          {EXPERIENCE_DATA[currentIndex].company} · {EXPERIENCE_DATA[currentIndex].role}
        </h4>
        <p className="text-sm text-gray-400">
          {EXPERIENCE_DATA[currentIndex].period} · {EXPERIENCE_DATA[currentIndex].duration}
        </p>
        <ul className="list-disc pl-4 space-y-1 text-[#E2E8F0]">
          {EXPERIENCE_DATA[currentIndex].items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4 space-y-2 text-sm text-[#E2E8F0]">
        <li>
          <strong>Languages:</strong> TypeScript, JavaScript, Python, Rust, Bash / Shell Scripting
        </li>
        <li>
          <strong>Cloud &amp; AWS:</strong> EC2, EKS, Lambda, S3, CloudFront, Route 53, RDS, ElastiCache, VPC, IAM, ASG, ALB, CloudWatch
        </li>
        <li>
          <strong>Containerization &amp; DevOps:</strong> Docker, Docker Compose, Kubernetes, Helm, Ingress Controllers, HPA, Cluster Autoscaler, Terraform, ArgoCD, GitHub Actions
        </li>
        <li>
          <strong>Backend &amp; Systems:</strong> Node.js, Express.js, Rust (Actix Web, Tokio, Serde), REST APIs, Prisma ORM, WebSockets, WebRTC, MediaSoup
        </li>
        <li>
          <strong>Frontend:</strong> React.js, Next.js, Zustand, React Query, Tailwind CSS
        </li>
        <li>
          <strong>Databases:</strong> PostgreSQL, MySQL, MongoDB, Redis, Supabase, Pgvector (RAG)
        </li>
        <li>
          <strong>AI &amp; Automation:</strong> OpenAI API, Gemini, LangChain, Vector Embeddings, RAG Pipelines, n8n, Kafka
        </li>
        <li>
          <strong>Monitoring &amp; Web Servers:</strong> Prometheus, Grafana, Loki, Nginx, Apache, SSL/TLS, Let&apos;s Encrypt
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-4 space-y-2 text-sm text-[#E2E8F0]">
        <li>
          <strong>Bachelor of Science in Computer Science (BSCS)</strong>
          <br />
          <span className="text-gray-400">Government College University Faisalabad (GCUF) · 2019 – 2023</span>
        </li>
        <li>
          <strong>Intermediate in Computer Science (ICS)</strong>
          <br />
          <span className="text-gray-400">Best Group of Colleges · 2017 – 2019</span>
        </li>
        <li>
          <strong>Matriculation (Computer Sciences)</strong>
          <br />
          <span className="text-gray-400">The Educators · 2017</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-4 space-y-2 text-sm text-[#E2E8F0]">
        <li>
          <strong>AWS Certified Solutions Architect – Associate</strong>
          <br />
          <span className="text-gray-400">Amazon Web Services · 2024</span>
        </li>
        <li>
          <strong>Relational Database Certification</strong>
          <br />
          <span className="text-gray-400">freeCodeCamp · 2023</span>
        </li>
        <li>
          <strong>The Complete JavaScript Course</strong>
          <br />
          <span className="text-gray-400">Jonas Schmedtmann / Udemy · 2023</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: <ExperienceCarousel />,
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="text-white"
      id="about"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <motion.div
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]"
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative aspect-[588/980] overflow-hidden rounded-[28px]">
            <Image
              src="/images/hero-portrait.png"
              alt="Ismail Abbasi Software Engineer AI Developer Rust Developer"
              fill
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 440px"
              className="object-cover object-top mix-blend-lighten"
            />
          </div>
        </motion.div>
        <motion.div
          className="mt-4 md:mt-0 text-left flex flex-col h-full"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-[#E2E8F0] leading-relaxed">
            I work in Production. Full-Stack Developer and DevOps Engineer with 4+ years of experience designing, deploying, and scaling production SaaS applications and cloud infrastructure.
            <br />
            <br />
            Proven track record across Next.js, Node.js, and Rust microservices, paired with hands-on AWS cloud architecture (EC2, EKS, RDS, S3, CloudFront, Lambda), Kubernetes orchestration, and CI/CD automation (GitHub Actions, ArgoCD, Terraform) delivering 99.9% uptime systems and AI-integrated products.
            <br />
          </p>
          <div className="mt-8">
            <a
              href="https://www.linkedin.com/in/ismailabbasi/"
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-blue-600 to-blue-500 hover:bg-slate-200 text-white font-semibold shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <FaLinkedin size={24} />
              Let&apos;s connect
            </a>
          </div>
          <div className="flex flex-row flex-wrap gap-3 mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              Experience
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
