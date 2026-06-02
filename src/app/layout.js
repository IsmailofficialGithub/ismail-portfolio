import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import ClientProviders from "./Provider";
import { Analytics } from '@vercel/analytics/next';

const siteUrl = "https://ismailabbasi.qzz.io";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ismail Abbasi | Full Stack & AI Developer",
    template: "%s | Ismail Abbasi",
  },
  description:
    "Ismail Abbasi is a Full Stack and AI Developer specializing in React, Next.js, Node.js, Supabase, Rust, AI automation, and cloud infrastructure.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ismail Abbasi | Full Stack & AI Developer",
    description:
      "Full Stack and AI Developer specializing in React, Next.js, Node.js, Supabase, AI automation, and cloud infrastructure.",
    url: siteUrl,
    siteName: "Ismail Abbasi Portfolio",
    images: [
      {
        url: "/images/hero-portrait.png",
        width: 1200,
        height: 1600,
        alt: "Ismail Abbasi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ismail Abbasi | Full Stack & AI Developer",
    description:
      "Full Stack and AI Developer specializing in React, Next.js, Node.js, Supabase, AI automation, and cloud infrastructure.",
    images: ["/images/hero-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ismail Abbasi",
  url: siteUrl,
  jobTitle: "Full Stack & AI Developer",
  image: `${siteUrl}/images/hero-portrait.png`,
  sameAs: [
    "https://www.linkedin.com/in/ismailabbasi/",
    "https://github.com/IsmailofficialGithub/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Supabase",
    "Rust",
    "AI automation",
    "Cloud infrastructure",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <ClientProviders>
            <Toaster position="bottom-right"/>
            {children}
                    <Analytics />
          </ClientProviders>
        </body>
    </html>
  );
}
