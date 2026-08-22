import {
  ADDRESS,
  CONTACT_EMAIL,
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";

/**
 * Server-rendered homepage sections so agents/crawlers get a real
 * H1→H2→H3 outline and 500+ characters without executing JavaScript.
 * Visually compact; matches the dark portfolio palette.
 */
export default function HomeSsrSections() {
  return (
    <section
      id="overview"
      className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-white sm:px-8"
    >
      <h2 className="text-2xl font-bold sm:text-3xl">
        Software engineering, AI automation, and Rust delivery
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#ADB7BE] sm:text-lg">
        {SITE_DESCRIPTION} {SITE_NAME} works from {ADDRESS.addressDisplay} and
        partners with teams that need production-ready web products, AI workflow
        automation, Rust services, and reliable cloud deployments. This homepage
        summarizes skills, experience, featured projects, writing, and how to get
        in touch at {CONTACT_EMAIL}.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-orange-300">
        Best-fit work
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#E2E8F0] sm:text-base">
        Hire {SITE_NAME} as a {JOB_TITLE} for React and Next.js product builds,
        Node.js APIs, Supabase-backed apps, OpenAI/n8n automation, Rust systems
        programming, and Docker/Nginx/CI/CD infrastructure. Review the projects
        and blogs below, then use the contact form when you have a concrete
        brief, timeline, and success criteria.
      </p>

      <h3 className="mt-6 text-lg font-semibold text-orange-300">
        How to explore this site
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#E2E8F0] sm:text-base">
        <li>
          Read the About section for skills, education, and career history.
        </li>
        <li>Browse featured projects and open individual case studies.</li>
        <li>Skim latest blog posts for technical notes and tutorials.</li>
        <li>
          Prefer machine-readable pages:{" "}
          <a className="text-orange-300 hover:text-orange-200" href="/llms.txt">
            llms.txt
          </a>
          ,{" "}
          <a
            className="text-orange-300 hover:text-orange-200"
            href="/sitemap.xml"
          >
            sitemap.xml
          </a>
          , or request any URL with Accept: text/markdown.
        </li>
      </ul>
    </section>
  );
}
