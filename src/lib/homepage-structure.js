/**
 * Helpers for validating homepage heading outline (agent / no-JS readiness).
 */

/**
 * @param {string} html
 * @returns {{ level: number, text: string }[]}
 */
export function extractHeadings(html) {
  const headings = [];
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const text = match[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    headings.push({ level: Number(match[1]), text });
  }
  return headings;
}

/**
 * @param {string} html
 * @returns {{
 *   ok: boolean,
 *   h1Count: number,
 *   h2Count: number,
 *   h3Count: number,
 *   textChars: number,
 *   issues: string[],
 * }}
 */
export function evaluateHomepageContent(html) {
  const issues = [];
  const headings = extractHeadings(html);
  const h1s = headings.filter((h) => h.level === 1);
  const h2s = headings.filter((h) => h.level === 2);
  const h3s = headings.filter((h) => h.level === 3);

  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const textChars = withoutScripts
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;

  if (h1s.length !== 1) {
    issues.push(`Expected exactly 1 H1 with text, found ${h1s.length}`);
  }
  if (h2s.length < 3) {
    issues.push(`Expected at least 3 meaningful H2s, found ${h2s.length}`);
  }
  if (h3s.length < 2) {
    issues.push(`Expected at least 2 H3s under sections, found ${h3s.length}`);
  }

  // Detect flat outlines: many H2s and zero H3s, or H1→H5 jumps only.
  if (h2s.length > 0 && h3s.length === 0) {
    issues.push("Heading structure is flat (H2s without H3s)");
  }

  const levels = headings.map((h) => h.level);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      issues.push(
        `Skipped heading level from H${levels[i - 1]} to H${levels[i]}`
      );
      break;
    }
  }

  if (textChars < 500) {
    issues.push(`Expected 500+ text characters in raw HTML, found ${textChars}`);
  }

  return {
    ok: issues.length === 0,
    h1Count: h1s.length,
    h2Count: h2s.length,
    h3Count: h3s.length,
    textChars,
    issues,
    headings,
  };
}
