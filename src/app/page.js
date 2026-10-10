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
  title: "Ismail Abbasi | DevOps Engineer, Full-Stack Developer & AWS Cloud",
  description:
    "Ismail Abbasi is a DevOps Engineer and Full-Stack Developer with 4+ years of experience across Next.js, Node.js, Rust microservices, AWS cloud architecture, Kubernetes, and CI/CD automation.",
  keywords: [
    "Ismail Abbasi",
    "DevOps Engineer",
    "Full-Stack Developer",
    "AWS Cloud Architect",
    "Forward Deployed Engineer",
    "Rust Developer",
    "Kubernetes",
    "CI/CD Automation",
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
