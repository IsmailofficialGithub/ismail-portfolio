import Link from "next/link";
import LayoutWrapper from "@/lib/LayoutWrapper";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Use the links below, llms.txt, or the sitemap to find valid content on Ismail Abbasi's portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

const recoveryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export default function NotFound() {
  return (
    <LayoutWrapper>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-[#ADB7BE]">404</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#ADB7BE]">
          This path is not part of Ismail Abbasi&apos;s site. Agents and humans
          can recover using the links below,{" "}
          <a
            className="text-orange-300 hover:text-orange-200"
            href={`${SITE_URL}/llms.txt`}
          >
            llms.txt
          </a>
          , or the{" "}
          <a
            className="text-orange-300 hover:text-orange-200"
            href={`${SITE_URL}/sitemap.xml`}
          >
            sitemap
          </a>
          .
        </p>
        <ul className="mx-auto mt-10 grid w-full max-w-2xl gap-3 text-left sm:grid-cols-2">
          {recoveryLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[#E2E8F0] hover:border-orange-500/50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <pre className="mx-auto mt-10 max-w-2xl overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-left text-xs text-[#ADB7BE] whitespace-pre-wrap">
{`# 404 — Page not found

This URL does not exist.

## Where to look next
- [Home](${SITE_URL}/)
- [About](${SITE_URL}/about)
- [Projects](${SITE_URL}/projects)
- [Blogs](${SITE_URL}/blogs)
- [Contact](${SITE_URL}/contact)
- [Privacy](${SITE_URL}/privacy)
- [llms.txt](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)`}
        </pre>
      </main>
    </LayoutWrapper>
  );
}
