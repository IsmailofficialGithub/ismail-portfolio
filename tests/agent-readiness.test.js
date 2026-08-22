const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function loadModules() {
  const root = path.join(__dirname, "..");
  const accept = await import(
    pathToFileURL(path.join(root, "src/lib/accept.js")).href
  );
  const markdown = await import(
    pathToFileURL(path.join(root, "src/lib/markdown-content.js")).href
  );
  const site = await import(
    pathToFileURL(path.join(root, "src/lib/site.js")).href
  );
  return { accept, markdown, site };
}

describe("Accept negotiation (acceptmarkdown.com)", async () => {
  const { preferredType, parseAccept, appendVaryAccept } = await loadModules().then(
    (m) => m.accept
  );

  it("prefers text/markdown when listed first", () => {
    assert.equal(
      preferredType("text/markdown, text/html;q=0.8"),
      "text/markdown"
    );
  });

  it("prefers text/html for typical browser Accept", () => {
    assert.equal(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      ),
      "text/html"
    );
  });

  it("returns null when client rejects both produced types", () => {
    assert.equal(
      preferredType("application/pdf"),
      null
    );
  });

  it("honors q=0 rejection of text/html", () => {
    assert.equal(
      preferredType("text/html;q=0, text/markdown"),
      "text/markdown"
    );
  });

  it("defaults to text/html when Accept is missing", () => {
    assert.equal(preferredType(null), "text/html");
  });

  it("parses q-values", () => {
    const entries = parseAccept("text/markdown;q=0.5, text/html");
    assert.equal(entries[0].type, "text/markdown");
    assert.equal(entries[0].q, 0.5);
    assert.equal(entries[1].q, 1);
  });

  it("appends Accept and Accept-Encoding to Vary", () => {
    const headers = new Headers({ Vary: "RSC" });
    appendVaryAccept(headers);
    const vary = headers.get("Vary").toLowerCase();
    assert.match(vary, /accept/);
    assert.match(vary, /accept-encoding/);
  });
});

describe("Agent-friendly markdown content", async () => {
  const { markdown, site } = await loadModules();

  it("404 markdown includes recovery links", () => {
    const body = markdown.notFoundMarkdown("/missing-page");
    assert.match(body, /404/);
    assert.match(body, /llms\.txt/);
    assert.match(body, /sitemap\.xml/);
    assert.match(body, /\/about/);
    assert.match(body, /\/contact/);
    assert.match(body, /\/privacy/);
    assert.match(body, /Requested path/);
  });

  it("llms.txt includes when-to-use guidance", () => {
    const body = markdown.llmsTxtMarkdown();
    assert.match(body, /^# Ismail Abbasi/m);
    assert.match(body, /## When to use this/);
    assert.match(body, /How an agent should call this site/);
    assert.match(body, /Accept: text\/markdown/);
    assert.match(body, /Do \*\*not\*\* use this site/);
  });

  it("privacy markdown exceeds 500 characters", () => {
    const body = markdown.privacyMarkdown();
    assert.ok(body.length >= 500);
    assert.match(body, /Privacy Policy/);
  });

  it("contact markdown exceeds 500 characters", () => {
    assert.ok(markdown.contactMarkdown().length >= 500);
  });

  it("about markdown exceeds 500 characters", () => {
    assert.ok(markdown.aboutMarkdown().length >= 500);
  });

  it("normalizes .md sibling paths", () => {
    assert.equal(markdown.normalizePathname("/about.md"), "/about");
    assert.equal(markdown.normalizePathname("/"), "/");
    assert.equal(markdown.normalizePathname("/projects/"), "/projects");
  });

  it("static page map covers trust pages", () => {
    for (const p of ["/", "/about", "/contact", "/privacy", "/llms.txt"]) {
      assert.ok(markdown.getStaticPageMarkdown(p), `missing markdown for ${p}`);
    }
    assert.equal(markdown.getStaticPageMarkdown("/nope"), null);
  });

  it("site constants include contact details", () => {
    assert.ok(site.CONTACT_EMAIL.includes("@"));
    assert.ok(site.CONTACT_PHONE.startsWith("+"));
    assert.equal(site.SITE_URL, "https://ismailabbasi.qzz.io");
  });
});

describe("Organization / Person schema fields", () => {
  it("organization payload includes contactPoint and address", async () => {
    const { site } = await loadModules();
    const organizationSchema = {
      "@type": "Organization",
      name: site.SITE_NAME,
      contactPoint: {
        "@type": "ContactPoint",
        email: site.CONTACT_EMAIL,
        telephone: site.CONTACT_PHONE,
        contactType: "customer service",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.ADDRESS.addressLocality,
        addressCountry: site.ADDRESS.addressCountry,
      },
    };

    assert.equal(organizationSchema.contactPoint.email, site.CONTACT_EMAIL);
    assert.ok(organizationSchema.contactPoint.contactType);
    assert.equal(
      organizationSchema.address["@type"],
      "PostalAddress"
    );
  });

  it("person identity fields required for full score are present", async () => {
    const { site } = await loadModules();
    const person = {
      "@type": "Person",
      name: site.SITE_NAME,
      description: site.SITE_DESCRIPTION,
      url: site.SITE_URL,
      jobTitle: site.JOB_TITLE,
      sameAs: site.SAME_AS,
    };

    assert.ok(person.description.length > 20);
    assert.ok(person.url.startsWith("https://"));
    assert.ok(person.jobTitle.length > 0);
    assert.ok(Array.isArray(person.sameAs) && person.sameAs.length >= 2);
  });
});
