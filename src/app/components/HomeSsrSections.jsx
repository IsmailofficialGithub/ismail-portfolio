import {
  ADDRESS,
  CONTACT_EMAIL,
  JOB_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";

/**
 * Agent/crawler-only outline. Kept in the HTML document for no-JS parsers,
 * but visually hidden so it does not affect the homepage design.
 */
export default function HomeSsrSections() {
  return (
    <section id="overview" className="sr-only" aria-hidden="false">
      <h2>Software engineering, AI automation, and Rust delivery</h2>
      <p>
        {SITE_DESCRIPTION} {SITE_NAME} works from {ADDRESS.addressDisplay} and
        partners with teams that need production-ready web products, AI workflow
        automation, Rust services, and reliable cloud deployments. This homepage
        summarizes skills, experience, featured projects, writing, and how to get
        in touch at {CONTACT_EMAIL}.
      </p>
      <h3>Best-fit work</h3>
      <p>
        Hire {SITE_NAME} as a {JOB_TITLE} for React and Next.js product builds,
        Node.js APIs, Supabase-backed apps, OpenAI/n8n automation, Rust systems
        programming, and Docker/Nginx/CI/CD infrastructure. Review the projects
        and blogs below, then use the contact form when you have a concrete
        brief, timeline, and success criteria.
      </p>
      <h3>How to explore this site</h3>
      <ul>
        <li>
          Read the About section for skills, education, and career history.
        </li>
        <li>Browse featured projects and open individual case studies.</li>
        <li>Skim latest blog posts for technical notes and tutorials.</li>
        <li>
          Prefer machine-readable pages:{" "}
          <a href="/llms.txt">llms.txt</a>,{" "}
          <a href="/sitemap.xml">sitemap.xml</a>, or request any URL with
          Accept: text/markdown.
        </li>
      </ul>
    </section>
  );
}
