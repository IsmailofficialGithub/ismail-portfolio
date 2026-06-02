import EmailSection from "../components/EmailSection";
import LayoutWrapper from "@/lib/LayoutWrapper";

export const metadata = {
  title: "Contact Ismail Abbasi",
  description:
    "Contact Ismail Abbasi for software engineering, AI development, Rust development, full-stack development, React, Next.js, Node.js, and cloud infrastructure work.",
  keywords: [
    "Contact Ismail Abbasi",
    "Software Engineer Pakistan",
    "AI Developer Pakistan",
    "Rust Developer Pakistan",
    "Full Stack Developer Pakistan",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <LayoutWrapper>
      <main className="pt-8 text-white">
        <section className="px-4 py-10 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Contact Ismail Abbasi
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[#ADB7BE]">
            Software Engineer, AI Developer, Rust Developer, and Full Stack
            Developer based in Rawalpindi / Islamabad, Pakistan. Available for
            product development, automation, Rust systems work, and cloud
            infrastructure.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-sm text-[#E2E8F0] sm:grid-cols-2">
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
          </div>
        </section>
        <EmailSection />
      </main>
    </LayoutWrapper>
  );
}
