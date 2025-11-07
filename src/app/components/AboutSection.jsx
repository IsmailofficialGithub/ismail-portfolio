"use client";
import React, { useTransition, useState, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { FaLinkedin } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Frontend:</strong> JavaScript, React.js, Next.js 15, TypeScript
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express.js, TypeScript
        </li>
        <li>
          <strong>Database:</strong> MongoDB, MySQL, Supabase
        </li>
        <li>
          <strong>DevOps:</strong> Docker, Docker Compose, AWS, CI/CD,
          Microservices, Monitoring, Secrets Management
        </li>
        <li>
          <strong>AI Automation:</strong> n8n, Make, Zapier, Low/No-Code tools
        </li>
        <li>
          <strong>Mobile:</strong> React Native, Expo CLI, Android, iOS
        </li>
        <li>
          <strong>More:</strong> GitHub, C++ (Basic), Postman, Shadcn,
          WebSockets (Socket.io), Redux Toolkit
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Bachelor of Science in Computer Science</li>
        <li>Government College University Faisalabad (GCUF)</li>
        <li>Expected Graduation: 2027.</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <div className="space-y-3">
        <h4 className="font-semibold text-white">
          Cloud Rexpo · Full Stack &amp; AI Developer (Jan 2025 – Present)
        </h4>
        <ul className="list-disc pl-4 space-y-2 text-[#E2E8F0]">
          <li>
            Delivering full-stack and AI-driven platforms from UX concepts to production-ready releases with admin control &amp; analytics.
          </li>
          <li>
            Built an AI Interview Bot powered by OpenAI and orchestrated with n8n for adaptive question generation and performance feedback.
          </li>
          <li>
            Deployed scalable systems using Docker, Nginx, Linux, and CI/CD pipelines with load balancing for automation and 100% uptime.
          </li>
        </ul>
      </div>
    ),
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
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="/images/about-image.svg"
            width={500}
            height={500}
            alt="aboutImage"
          />
        </motion.div>
        <motion.div
          className="mt-4 md:mt-0 text-left flex flex-col h-full"
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-[#E2E8F0] leading-relaxed">
            I architect full-stack experiences infused with AI automations that keep businesses moving quickly and intelligently. From product discovery through production reliability, I partner with teams to iterate fast and ship impact.
            <br />
            <br />
            I thrive in cross-functional settings, translating complex requirements into scalable, secure, and delightful products that customers love using every day.
            <br />
            <a
              href="https://www.linkedin.com/in/ismailabbasi/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="underline text-[#5959ff] flex items-center">
                <FaLinkedin className="mt-[5px]" /> Let&apos;s connect
              </span>
            </a>
          </p>
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
