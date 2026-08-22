import HeroSection from "./components/HeroSection";
import HomeSsrSections from "./components/HomeSsrSections";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import AchievementsSection from "./components/AchievementsSection";
import Blogsection from "./components/Blogsection";
import GitHubCommitsSection from "./components/GitHubCommitsSection";
import LayoutWrapper from "../lib/LayoutWrapper";

export const metadata = {
  title: "Ismail Abbasi | Software Engineer, AI & Rust Developer",
  description:
    "Ismail Abbasi is a Software Engineer, AI Developer, Rust Developer, and Full Stack Developer in Pakistan specializing in React, Next.js, Node.js, Supabase, AI automation, and cloud infrastructure.",
  keywords: [
    "Ismail Abbasi",
    "Software Engineer",
    "AI Developer",
    "Rust Developer",
    "Full Stack Developer Pakistan",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <LayoutWrapper>
      <HeroSection />
      <HomeSsrSections />
      <AchievementsSection />
      <AboutSection />
      <ProjectsSection />
      <GitHubCommitsSection />
      <Blogsection />
      <EmailSection />
    </LayoutWrapper>
  );
}
