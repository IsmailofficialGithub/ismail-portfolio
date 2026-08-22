/**
 * Accept header parsing for text/markdown content negotiation
 * (acceptmarkdown.com / RFC 9110 §12.5.1).
 */

const PRODUCES = ["text/html", "text/markdown"];

/**
 * @typedef {{ type: string, q: number, specificity: number }} AcceptEntry
 */

/**
 * @param {string} header
 * @returns {AcceptEntry[]}
 */
export function parseAccept(header) {
  return header.split(",").map((raw) => {
    const parts = raw
      .trim()
      .split(";")
      .map((s) => s.trim());
    const type = (parts[0] || "").toLowerCase();
    let q = 1;
    for (const param of parts.slice(1)) {
      const [name, value] = param.split("=").map((s) => s.trim());
      if (name === "q") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }
    }
    const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
    return { type, q, specificity };
  });
}

/**
 * @param {AcceptEntry} entry
 * @param {string} candidate
 */
function matches(entry, candidate) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

/**
 * Pick the best representation among PRODUCES for the given Accept header.
 * Returns null when the client explicitly rejects everything we produce.
 *
 * @param {string | null} header
 * @returns {string | null}
 */
export function preferredType(header) {
  if (!header) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let bestType = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched = null;
    let matchedPosition = Infinity;

    for (let idx = 0; idx < entries.length; idx++) {
      const e = entries[idx];
      if (!matches(e, candidate)) continue;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    }

    if (matched === null) continue;
    if (matched.q <= 0) continue;

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/**
 * @param {Headers} headers
 */
export function appendVaryAccept(headers) {
  const existing = headers.get("Vary") || "";
  const tokens = existing
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // Prefer append so Next can merge with its own Vary tokens (RSC, etc.).
  if (!tokens.includes("accept")) {
    headers.append("Vary", "Accept");
  }
  if (!tokens.includes("accept-encoding")) {
    headers.append("Vary", "Accept-Encoding");
  }
}

export { PRODUCES };
