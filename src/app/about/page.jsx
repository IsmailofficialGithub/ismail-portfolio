import AboutSection from "../components/AboutSection";
import EmailSection from "../components/EmailSection";
import LayoutWrapper from "@/lib/LayoutWrapper";

export const metadata = {
  title: "About Ismail Abbasi",
  description:
    "Learn about Ismail Abbasi, a Software Engineer, AI Developer, Rust Developer, and Full Stack Developer in Pakistan specializing in React, Next.js, Node.js, Supabase, AI automation, and cloud infrastructure.",
  keywords: [
    "About Ismail Abbasi",
    "Ismail Abbasi Software Engineer",
    "Ismail Abbasi AI Developer",
    "Ismail Abbasi Rust Developer",
  ],
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
            Software Engineer, AI Developer & Rust Developer
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-sm text-[#E2E8F0] sm:grid-cols-2">
            <a
              href="mailto:ismail.official295@gmail.com"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-orange-500/50"
            >
              ismail.official295@gmail.com
            </a>
            <a
              href="tel:+923255028225"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-orange-500/50"
            >
              +92 325 5028225
            </a>
            <a
              href="https://devdabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-orange-500/50"
            >
              DevDabs
            </a>
            <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
              Rawalpindi / Islamabad, Pakistan
            </p>
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            <a
              href="https://www.linkedin.com/in/ismailabbasi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-300 hover:text-orange-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/IsmailofficialGithub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-300 hover:text-orange-200"
            >
              GitHub
            </a>
            <a
              href="https://x.com/ismailAbbasi23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-300 hover:text-orange-200"
            >
              X
            </a>
          </div>
        </section>
        <AboutSection />
        <EmailSection />
      </main>
    </LayoutWrapper>
  );
}
