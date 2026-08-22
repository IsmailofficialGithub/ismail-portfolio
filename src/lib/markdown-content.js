import {
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  JOB_TITLE,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site.js";

export function notFoundMarkdown(requestedPath = "") {
  const pathNote = requestedPath
    ? `Requested path: \`${requestedPath}\``
    : "The requested path does not exist.";

  return `# 404 — Page not found

${pathNote}

This URL is not part of ${SITE_NAME}'s site. Agents should not treat missing paths as valid pages.

## Where to look next

- [Home](${SITE_URL}/): Portfolio overview, skills, and featured work
- [About](${SITE_URL}/about): Background, experience, and education
- [Projects](${SITE_URL}/projects): Published project case studies
- [Blogs](${SITE_URL}/blogs): Technical writing and notes
- [Contact](${SITE_URL}/contact): Email and inquiry form
- [Privacy](${SITE_URL}/privacy): Privacy policy
- [llms.txt](${SITE_URL}/llms.txt): Agent index and when-to-use guidance
- [Sitemap](${SITE_URL}/sitemap.xml): Full machine-readable URL list

Tip: request pages with \`Accept: text/markdown\` for a clean Markdown representation.
`;
}

export function homeMarkdown() {
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

**Role:** ${JOB_TITLE}  
**Location:** ${ADDRESS.addressDisplay}  
**Email:** [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})  
**Phone:** [${CONTACT_PHONE_DISPLAY}](tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")})

## What this site is

Personal portfolio for software engineering, AI automation, Rust systems work, and full-stack product delivery. Use it to evaluate fit, review shipped projects, read technical writing, and start a professional inquiry.

## Primary pages

- [About](${SITE_URL}/about)
- [Projects](${SITE_URL}/projects)
- [Blogs](${SITE_URL}/blogs)
- [Contact](${SITE_URL}/contact)
- [Privacy](${SITE_URL}/privacy)
- [llms.txt](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)

## Profiles

${SAME_AS.map((url) => `- ${url}`).join("\n")}
`;
}

export function aboutMarkdown() {
  return `# About ${SITE_NAME}

${SITE_DESCRIPTION}

## Summary

${SITE_NAME} is a ${JOB_TITLE} based in ${ADDRESS.addressDisplay}. Work spans full-stack product delivery (React, Next.js, Node.js, Supabase), AI automation (OpenAI, n8n, orchestration), Rust systems development, and cloud infrastructure (Docker, Nginx, CI/CD, AWS).

## Experience highlights

- **Cloud Rexpo** — Software Engineer, AI Developer & Rust Developer (Jan 2025 – Present): full-stack and AI platforms, AI Interview Bot, Docker/Nginx/CI/CD deployments.
- **ENCS** — Backend Developer (Aug 2023 – Dec 2024): REST APIs, auth, integrations, performance and security hardening.
- **Firefly Tech Solutions** — Database Manager (Jul 2022 – Mar 2023): API backends, SQL/NoSQL schema design, AWS RDS.

## Education & certifications

- BS Computer Science, Government College University Faisalabad (expected 2027)
- AWS Cloud Practitioner
- Google Professional Cloud Developer

## Contact

- Email: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})
- Phone: [${CONTACT_PHONE_DISPLAY}](tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")})
- More: [Contact page](${SITE_URL}/contact) · [llms.txt](${SITE_URL}/llms.txt)
`;
}

export function contactMarkdown() {
  return `# Contact ${SITE_NAME}

Reach ${SITE_NAME} for software engineering, AI development, Rust development, full-stack product work, React/Next.js/Node.js delivery, automation, and cloud infrastructure engagements.

## Direct contact

- **Email:** [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})
- **Phone:** [${CONTACT_PHONE_DISPLAY}](tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")})
- **Location:** ${ADDRESS.addressDisplay}
- **Web form:** [${SITE_URL}/contact](${SITE_URL}/contact)

## Best-fit inquiries

- Building or modernizing a web product with React / Next.js / Node.js
- AI automation or agent workflows (OpenAI, n8n, orchestration)
- Rust systems or performance-sensitive services
- Cloud deployment, Docker, CI/CD, and reliability work
- Technical consulting on architecture and delivery

## Response expectations

Professional inquiries sent by email or the contact form are reviewed directly. Include project goals, timeline, and technical constraints so an agent or human can route the request accurately.

## Related

- [About](${SITE_URL}/about)
- [Projects](${SITE_URL}/projects)
- [Privacy](${SITE_URL}/privacy)
- [llms.txt](${SITE_URL}/llms.txt)
`;
}

export function privacyMarkdown() {
  return `# Privacy Policy

Last updated: August 23, 2026

This Privacy Policy explains how ${SITE_NAME} ("I", "me", or "the site") collects, uses, and protects information when you visit ${SITE_URL} or contact me through the portfolio contact form, email, or phone.

## Information I collect

- **Contact form submissions:** name, email address, subject, and message content you voluntarily submit.
- **Email and phone communications:** any details you include when you write or call.
- **Technical logs:** standard server and analytics metadata such as IP address, browser type, referring URL, and pages visited (via hosting and Vercel Analytics). This is used to operate, secure, and improve the site.

I do not sell personal information. I do not run advertising trackers for third-party ad networks on this portfolio.

## How information is used

- To respond to professional inquiries and project discussions
- To operate, maintain, and secure the website
- To understand aggregate traffic patterns and improve content
- To comply with legal obligations when required

## Storage and retention

Contact messages may be processed through email delivery services (for example Nodemailer / SMTP) and retained only as long as needed to handle the conversation or maintain ordinary business records. Analytics data is retained according to the analytics provider's defaults.

## Sharing

Information may be processed by infrastructure providers that host this site or deliver email (such as Vercel and email transport providers). They process data only to provide those services. I do not share contact details with unrelated third parties for marketing.

## Your choices

You may email [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) to request correction or deletion of contact information you previously sent, subject to legitimate retention needs (for example ongoing project correspondence or legal requirements).

## Children

This site is intended for professional audiences. It is not directed at children under 13, and I do not knowingly collect their personal information.

## Changes

This policy may be updated when practices change. The "Last updated" date at the top will reflect the latest revision. Continued use of the site after changes means you acknowledge the updated policy.

## Contact

Questions about privacy: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) · [${SITE_URL}/contact](${SITE_URL}/contact)
`;
}

export function projectsIndexMarkdown() {
  return `# Projects — ${SITE_NAME}

Published project case studies from ${SITE_NAME}'s portfolio. Each project page includes description, stack, and links when available.

- Browse HTML: [${SITE_URL}/projects](${SITE_URL}/projects)
- Agent tip: request a project URL with \`Accept: text/markdown\`
- Index: [llms.txt](${SITE_URL}/llms.txt) · [Sitemap](${SITE_URL}/sitemap.xml)
`;
}

export function blogsIndexMarkdown() {
  return `# Blogs — ${SITE_NAME}

Technical writing and notes by ${SITE_NAME}.

- Browse HTML: [${SITE_URL}/blogs](${SITE_URL}/blogs)
- Agent tip: request a blog URL with \`Accept: text/markdown\`
- Index: [llms.txt](${SITE_URL}/llms.txt) · [Sitemap](${SITE_URL}/sitemap.xml)
`;
}

/**
 * @param {{ name?: string, title?: string, description?: string, id?: string, _id?: string, techStack?: string[], technologies?: string[], code?: string, githubUrl?: string, livePreview?: string, liveUrl?: string }} project
 */
export function projectMarkdown(project) {
  const techList = project.techStack || project.technologies;
  const tech = Array.isArray(techList) ? techList.join(", ") : "";
  const live = project.livePreview || project.liveUrl;
  const repo = project.code || project.githubUrl;
  const links = [
    live ? `- Live: ${live}` : null,
    repo ? `- GitHub: ${repo}` : null,
    `- Page: ${SITE_URL}/projects/${project.id || project._id}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `# ${project.name || project.title || "Project"}

${project.description || "No description provided."}

${tech ? `**Technologies:** ${tech}\n` : ""}
## Links

${links}
`;
}

/**
 * @param {{ title?: string, content?: string, description?: string, id?: string, _id?: string }} blog
 */
export function blogMarkdown(blog) {
  const body =
    blog.description ||
    blog.content ||
    "No content available for this blog post.";

  return `# ${blog.title || "Blog post"}

${body}

---
Source: ${SITE_URL}/blogs/${blog.id || blog._id}
`;
}

export function llmsTxtMarkdown() {
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a ${JOB_TITLE} in ${ADDRESS.addressDisplay}. This file is the agent entry point for the portfolio at ${SITE_URL}.

Prefer \`Accept: text/markdown\` on page URLs to receive clean Markdown. Start with this file, then fetch only the linked pages you need.

## When to use this

Use this site when you need to:

- Evaluate ${SITE_NAME} as a hire or contractor for full-stack web (React, Next.js, Node.js, Supabase), AI automation (OpenAI, n8n), Rust development, or cloud/DevOps work
- Cite verified contact details (email, phone, location) or professional profiles before recommending or introducing him
- Summarize shipped projects, technical blog posts, skills, or experience for recruiting, client matching, or due diligence
- Answer "who is Ismail Abbasi" / "how do I contact him" with primary sources from this domain

Do **not** use this site as a generic tutorial corpus, SaaS product docs, or API reference. There is no public write API for agents — contact is human email/form only.

### How an agent should call this site

1. Fetch [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt) for orientation.
2. Request needed pages with header \`Accept: text/markdown\` (and expect \`Content-Type: text/markdown\` plus \`Vary: Accept\`).
3. For discovery of all public URLs, use [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml).
4. For introductions or outreach, use [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) or [${SITE_URL}/contact](${SITE_URL}/contact) — do not invent availability, rates, or commitments.

## Core pages

- [Home](${SITE_URL}/): Portfolio overview and featured sections
- [About](${SITE_URL}/about): Background, skills, experience, education
- [Projects](${SITE_URL}/projects): Project index and case studies
- [Blogs](${SITE_URL}/blogs): Technical writing index
- [Contact](${SITE_URL}/contact): Email, phone, and inquiry form
- [Privacy](${SITE_URL}/privacy): Privacy policy and data practices

## Machine-readable

- [Sitemap](${SITE_URL}/sitemap.xml): Complete public URL list
- [robots.txt](${SITE_URL}/robots.txt): Crawl allowances (\`/admin\`, \`/api\`, \`/login\` disallowed)

## Optional

- [LinkedIn](https://www.linkedin.com/in/ismailabbasi/): Professional network profile
- [GitHub](https://github.com/IsmailofficialGithub/): Source repositories
- [X](https://x.com/ismailAbbasi23): Public updates
- [DevDabs](https://devdabs.com): Related organization
`;
}

/**
 * Map a normalized pathname to static markdown, or null if dynamic/unknown.
 * @param {string} pathname
 * @returns {string | null}
 */
export function getStaticPageMarkdown(pathname) {
  const path = normalizePathname(pathname);

  switch (path) {
    case "/":
      return homeMarkdown();
    case "/about":
      return aboutMarkdown();
    case "/contact":
      return contactMarkdown();
    case "/privacy":
      return privacyMarkdown();
    case "/projects":
      return projectsIndexMarkdown();
    case "/blogs":
      return blogsIndexMarkdown();
    case "/llms.txt":
      return llmsTxtMarkdown();
    default:
      return null;
  }
}

/**
 * @param {string} pathname
 */
export function normalizePathname(pathname) {
  if (!pathname || pathname === "") return "/";
  let path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (path.endsWith(".md")) {
    path = path.slice(0, -3) || "/";
  }
  return path || "/";
}
