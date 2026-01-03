import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { BreadcrumbSchema } from "@/components/seo";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Next Horizon Leadership. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Next Horizon Leadership",
    description:
      "Privacy Policy for Next Horizon Leadership. Learn how we collect, use, and protect your personal information.",
    url: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Privacy Policy", url: `${BASE_URL}/privacy` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="Privacy Policy"
          subtitle="Last updated: January 2026"
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          <div className="container relative z-10">
            <div className="prose prose-slate dark:prose-invert max-w-3xl mx-auto">
              <h2>Introduction</h2>
              <p>
                Next Horizon Leadership (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Fill out a contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Communicate with us via email or other channels</li>
              </ul>
              <p>
                This information may include your name, email address, company name, job title,
                phone number, and any other information you choose to provide.
              </p>

              <h3>Automatically Collected Information</h3>
              <p>
                When you visit our website, we may automatically collect certain information about
                your device and usage patterns, including:
              </p>
              <ul>
                <li>IP address and geographic location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send newsletters and marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information with:
              </p>
              <ul>
                <li>Service providers who assist in operating our website and services</li>
                <li>Professional advisors (lawyers, accountants, etc.) as necessary</li>
                <li>Law enforcement or regulatory agencies when required by law</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2>Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>

              <h2>Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our
                website. You can control cookies through your browser settings.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices of these external sites.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the &quot;Last
                updated&quot; date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@nexthorizonleadership.com" className="text-primary hover:underline">
                  hello@nexthorizonleadership.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
