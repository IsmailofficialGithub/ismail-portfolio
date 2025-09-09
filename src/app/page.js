import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import AchievementsSection from "./components/AchievementsSection";
import Blogsection from "./components/Blogsection";
import LayoutWrapper from "../lib/LayoutWrapper";

export default function Home() {
  return (
   <LayoutWrapper>
     <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <Blogsection />
        <EmailSection />
   </LayoutWrapper>
  );
}
