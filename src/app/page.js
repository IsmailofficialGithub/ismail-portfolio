import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import AchievementsSection from "./components/AchievementsSection";
import Blogsection from "./components/Blogsection";
import GitHubCommitsSection from "./components/GitHubCommitsSection";
import LayoutWrapper from "../lib/LayoutWrapper";

export const metadata = {
  title: "Ismail Abbasi | Full Stack & AI Developer",
  description:
    "Ismail Abbasi is a Full Stack and AI Developer specializing in React, Next.js, Node.js, Supabase, Rust, AI automation, and cloud infrastructure.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
   <LayoutWrapper>
     <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <GitHubCommitsSection />
        <Blogsection />
        <EmailSection />
   </LayoutWrapper>
  );
}
