"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { FaLinkedin } from "react-icons/fa";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          <strong>Frontend:</strong> JavaScript, React.js, Next.js, TypeScript
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
          <strong>More:</strong> GitHub, C++ (Basic), Postman, Shadcn,
          WebSockets (Socket.io), State Management (Redux-Toolkit)
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
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.svg"
          width={500}
          height={500}
          alt="aboutImage"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript ,TypeScript ,Next.js, React.js, Redux,
            Node.js, Express, mySql, MongoDB, HTML, CSS, and Git. I am always
            looking to expand my knowledge and skill set.
            <br /> 
            <a
              href="https://www.linkedin.com/in/ismailabbasi/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="underline text-[#5959ff] flex items-center">
                <FaLinkedin className="mt-[5px]" /> Let's connect
              </span>
            </a>
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
