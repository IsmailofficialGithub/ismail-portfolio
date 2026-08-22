import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import ClientProviders from "./Provider";
import { Analytics } from '@vercel/analytics/next';
import {
  ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  JOB_TITLE,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const siteUrl = SITE_URL;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ismail Abbasi | Software Engineer, AI & Rust Developer",
    template: "%s | Ismail Abbasi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ismail Abbasi",
    "Ismail Abbasi Developer",
    "Software Engineer Pakistan",
    "AI Developer Pakistan",
    "Rust Developer Pakistan",
    "Full Stack Developer Pakistan",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "AI automation developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ismail Abbasi | Software Engineer, AI & Rust Developer",
    description: SITE_DESCRIPTION,
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
    title: "Ismail Abbasi | Software Engineer, AI & Rust Developer",
    description: SITE_DESCRIPTION,
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
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: siteUrl,
  jobTitle: JOB_TITLE,
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Software Engineer",
    },
    {
      "@type": "Occupation",
      name: "AI Developer",
    },
    {
      "@type": "Occupation",
      name: "Rust Developer",
    },
    {
      "@type": "Occupation",
      name: "Full Stack Developer",
    },
  ],
  email: `mailto:${CONTACT_EMAIL}`,
  telephone: CONTACT_PHONE,
  image: `${siteUrl}/ismail-abbasi.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    addressCountry: ADDRESS.addressCountry,
  },
  worksFor: {
    "@type": "Organization",
    name: "DevDabs",
    url: "https://devdabs.com",
  },
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    contactType: "Professional inquiries",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Urdu"],
  },
  knowsAbout: [
    "Software engineering",
    "Full stack development",
    "React",
    "Next.js",
    "Node.js",
    "Supabase",
    "Rust",
    "Rust development",
    "AI automation",
    "Cloud infrastructure",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: SITE_NAME,
  url: siteUrl,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  logo: `${siteUrl}/ismail-abbasi.jpg`,
  image: `${siteUrl}/ismail-abbasi.jpg`,
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    contactType: "customer service",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Urdu"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: ADDRESS.addressLocality,
    addressRegion: ADDRESS.addressRegion,
    addressCountry: ADDRESS.addressCountry,
  },
  founder: {
    "@type": "Person",
    name: SITE_NAME,
    url: siteUrl,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
  description:
    "Portfolio, projects, blogs, and professional contact details for Ismail Abbasi, Software Engineer, AI Developer, Rust Developer, and Full Stack Developer in Pakistan.",
  publisher: {
    "@type": "Person",
    name: SITE_NAME,
  },
};

const imageSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  url: `${siteUrl}/ismail-abbasi.jpg`,
  contentUrl: `${siteUrl}/ismail-abbasi.jpg`,
  name: "Ismail Abbasi Software Engineer AI Developer Rust Developer",
  caption: "Ismail Abbasi, Software Engineer, AI Developer & Rust Developer",
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
