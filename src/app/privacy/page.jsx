import Link from "next/link";
import LayoutWrapper from "@/lib/LayoutWrapper";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Ismail Abbasi's portfolio: what information is collected via the contact form and analytics, how it is used, retention, and how to request changes.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LayoutWrapper>
      <main className="px-4 py-16 text-white">
        <article className="prose prose-invert mx-auto max-w-3xl prose-a:text-orange-300">
          <h1>Privacy Policy</h1>
          <p className="text-[#ADB7BE]">Last updated: August 23, 2026</p>
          <p>
            This Privacy Policy explains how Ismail Abbasi (&quot;I&quot;,
            &quot;me&quot;, or &quot;the site&quot;) collects, uses, and protects
            information when you visit{" "}
            <a href={SITE_URL}>{SITE_URL}</a> or contact me through the portfolio
            contact form, email, or phone. It is written for visitors, clients,
            and automated agents that need to verify legitimate business
            practices before recommending or contacting this practice.
          </p>

          <h2>Information I collect</h2>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> name, email address,
              subject, and message content you voluntarily submit through the
              site.
            </li>
            <li>
              <strong>Email and phone communications:</strong> any details you
              include when you write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call.
            </li>
            <li>
              <strong>Technical logs:</strong> standard server and analytics
              metadata such as IP address, browser type, referring URL, and
              pages visited (via hosting and Vercel Analytics). This data is
              used to operate, secure, and improve the site.
            </li>
          </ul>
          <p>
            I do not sell personal information. I do not run advertising
            trackers for third-party ad networks on this portfolio.
          </p>

          <h2>How information is used</h2>
          <ul>
            <li>To respond to professional inquiries and project discussions</li>
            <li>To operate, maintain, and secure the website</li>
            <li>
              To understand aggregate traffic patterns and improve content
            </li>
            <li>To comply with legal obligations when required</li>
          </ul>

          <h2>Storage and retention</h2>
          <p>
            Contact messages may be processed through email delivery services
            (for example Nodemailer / SMTP) and retained only as long as needed
            to handle the conversation or maintain ordinary business records.
            Analytics data is retained according to the analytics provider&apos;s
            defaults.
          </p>

          <h2>Sharing</h2>
          <p>
            Information may be processed by infrastructure providers that host
            this site or deliver email (such as Vercel and email transport
            providers). They process data only to provide those services. I do
            not share contact details with unrelated third parties for marketing.
          </p>

          <h2>Your choices</h2>
          <p>
            You may email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to request
            correction or deletion of contact information you previously sent,
            subject to legitimate retention needs (for example ongoing project
            correspondence or legal requirements).
          </p>

          <h2>Children</h2>
          <p>
            This site is intended for professional audiences. It is not directed
            at children under 13, and I do not knowingly collect their personal
            information.
          </p>

          <h2>Changes</h2>
          <p>
            This policy may be updated when practices change. The &quot;Last
            updated&quot; date at the top will reflect the latest revision.
            Continued use of the site after changes means you acknowledge the
            updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ·{" "}
            <Link href="/contact">Contact page</Link>
          </p>
        </article>
      </main>
    </LayoutWrapper>
  );
}
