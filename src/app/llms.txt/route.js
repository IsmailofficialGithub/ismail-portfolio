import { llmsTxtMarkdown } from "@/lib/markdown-content";

export const dynamic = "force-static";

export async function GET() {
  return new Response(llmsTxtMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      Vary: "Accept, Accept-Encoding",
    },
  });
}
