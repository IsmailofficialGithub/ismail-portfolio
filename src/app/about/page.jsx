import AboutSection from "../components/AboutSection";
import EmailSection from "../components/EmailSection";
import LayoutWrapper from "@/lib/LayoutWrapper";

export const metadata = {
  title: "About Ismail Abbasi",
  description:
    "Learn about Ismail Abbasi, a Full Stack and AI Developer specializing in React, Next.js, Node.js, Supabase, AI automation, and cloud infrastructure.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <main className="pt-8">
        <section className="px-4 py-10 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Ismail Abbasi</h1>
          <p className="mt-3 text-xl text-[#ADB7BE]">
            Full Stack & AI Developer
          </p>
        </section>
        <AboutSection />
        <EmailSection />
      </main>
    </LayoutWrapper>
  );
}
