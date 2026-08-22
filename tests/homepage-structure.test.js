const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

async function loadStructure() {
  const mod = await import(
    pathToFileURL(
      path.join(__dirname, "..", "src/lib/homepage-structure.js")
    ).href
  );
  return mod;
}

describe("Homepage content without JavaScript", async () => {
  const { evaluateHomepageContent, extractHeadings } = await loadStructure();

  const sampleHtml = `
    <html><body>
      <h1>Ismail Abbasi</h1>
      <h2>Software Engineer, AI Developer & Rust Developer</h2>
      <p>${"Portfolio overview text. ".repeat(40)}</p>
      <h2>Skills & stack</h2>
      <h3>Frontend</h3>
      <p>React Next.js TypeScript</p>
      <h3>Backend</h3>
      <h2>Experience</h2>
      <h3>Cloud Rexpo</h3>
      <h2>Software engineering, AI automation, and Rust delivery</h2>
      <h3>Best-fit work</h3>
      <h3>How to explore this site</h3>
      <h2>About Me</h2>
      <h2>My Projects</h2>
      <h2>Latest Blog Posts</h2>
      <h2>Let's Connect</h2>
    </body></html>
  `;

  it("extracts non-empty headings only", () => {
    const headings = extractHeadings(
      `<h1>A</h1><h2></h2><h2><span></span></h2><h3>B</h3>`
    );
    assert.deepEqual(
      headings.map((h) => `${h.level}:${h.text}`),
      ["1:A", "3:B"]
    );
  });

  it("passes a well-structured homepage outline", () => {
    const result = evaluateHomepageContent(sampleHtml);
    assert.equal(result.ok, true, result.issues.join("; "));
    assert.equal(result.h1Count, 1);
    assert.ok(result.h2Count >= 3);
    assert.ok(result.h3Count >= 2);
    assert.ok(result.textChars >= 500);
  });

  it("flags multiple H1s as flat/broken structure", () => {
    const result = evaluateHomepageContent(`
      <h1>One</h1><h1>Two</h1>
      <h2>Section</h2><h3>Sub</h3>
      <p>${"x".repeat(600)}</p>
    `);
    assert.equal(result.ok, false);
    assert.ok(result.issues.some((i) => /H1/i.test(i)));
  });

  it("flags H2-only outlines as flat", () => {
    const result = evaluateHomepageContent(`
      <h1>Title</h1>
      <h2>A</h2><h2>B</h2><h2>C</h2>
      <p>${"x".repeat(600)}</p>
    `);
    assert.equal(result.ok, false);
    assert.ok(result.issues.some((i) => /flat/i.test(i)));
  });

  it("flags skipped heading levels", () => {
    const result = evaluateHomepageContent(`
      <h1>Title</h1>
      <h2>Section</h2>
      <h4>Too deep</h4>
      <p>${"x".repeat(600)}</p>
    `);
    assert.equal(result.ok, false);
    assert.ok(result.issues.some((i) => /Skipped/i.test(i)));
  });
});
