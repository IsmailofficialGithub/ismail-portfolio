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
        url: "/ismail-abbasi.jpg",
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
    images: ["/ismail-abbasi.jpg"],
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
  email: "mailto:ismail.official295@gmail.com",
  telephone: "+923255028225",
  image: `${siteUrl}/ismail-abbasi.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rawalpindi / Islamabad",
    addressCountry: "PK",
  },
  worksFor: {
    "@type": "Organization",
    name: "DevDabs",
    url: "https://devdabs.com",
  },
  sameAs: [
    "https://www.linkedin.com/in/ismailabbasi/",
    "https://github.com/IsmailofficialGithub/",
    "https://x.com/ismailAbbasi23",
    "https://devdabs.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "ismail.official295@gmail.com",
    telephone: "+923255028225",
    contactType: "Professional inquiries",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Urdu"],
  },
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ismail Abbasi",
  url: siteUrl,
  description:
    "Portfolio, projects, blogs, and professional contact details for Ismail Abbasi, Full Stack & AI Developer.",
  publisher: {
    "@type": "Person",
    name: "Ismail Abbasi",
  },
};

const imageSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  url: `${siteUrl}/ismail-abbasi.jpg`,
  contentUrl: `${siteUrl}/ismail-abbasi.jpg`,
  name: "Ismail Abbasi Full Stack AI Developer",
  caption: "Ismail Abbasi, Full Stack & AI Developer",
  representativeOfPage: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
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
