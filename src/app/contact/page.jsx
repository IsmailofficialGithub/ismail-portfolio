import EmailSection from "../components/EmailSection";
import LayoutWrapper from "@/lib/LayoutWrapper";
import {
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  JOB_TITLE,
  SITE_NAME,
} from "@/lib/site";

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
            {SITE_NAME} is a {JOB_TITLE} based in {ADDRESS.addressDisplay}.
            Available for product development, AI automation, Rust systems work,
            and cloud infrastructure. Use the details below or the form to start
            a professional inquiry with goals, timeline, and technical
            constraints included.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-sm text-[#E2E8F0] sm:grid-cols-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-orange-500/50"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 hover:border-orange-500/50"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
          <div className="mx-auto mt-8 max-w-2xl text-left text-sm leading-relaxed text-[#E2E8F0]">
            <h2 className="text-lg font-semibold text-white">
              Best-fit engagements
            </h2>
            <p className="mt-2 text-[#ADB7BE]">
              Reach out when you need help shipping or modernizing a web product
              with React, Next.js, Node.js, or Supabase; designing AI automation
              or agent workflows; building Rust services; or hardening deployment
              with Docker, Nginx, CI/CD, and cloud hosting. This contact channel
              is for hiring, contracting, and collaboration — not for spam or
              unrelated promotions.
            </p>
            <h2 className="mt-6 text-lg font-semibold text-white">
              What to include
            </h2>
            <p className="mt-2 text-[#ADB7BE]">
              Share a short problem statement, target stack, success criteria,
              and preferred timeline. Clear briefs receive clearer replies.
              Privacy details for messages you send are described on the{" "}
              <a href="/privacy" className="text-orange-300 hover:text-orange-200">
                privacy policy
              </a>
              .
            </p>
          </div>
        </section>
        <EmailSection />
      </main>
    </LayoutWrapper>
  );
}
