import type { Metadata } from "next";
import { HeaderWrapper } from "@/components/layout/header-wrapper";
import { Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { BreadcrumbSchema } from "@/components/seo";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Next Horizon Leadership. Please read these terms carefully before using our services.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service | Next Horizon Leadership",
    description:
      "Terms of Service for Next Horizon Leadership. Please read these terms carefully before using our services.",
    url: `${BASE_URL}/terms`,
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Terms of Service", url: `${BASE_URL}/terms` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={breadcrumbs} />
      <HeaderWrapper />
      <main>
        <PageHeader
          title="Terms of Service"
          subtitle="Last updated: January 2026"
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          <div className="container relative z-10">
            <div className="prose prose-slate dark:prose-invert max-w-3xl mx-auto">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using the Next Horizon Leadership website and services, you agree
                to be bound by these Terms of Service. If you do not agree to these terms, please
                do not use our services.
              </p>

              <h2>Description of Services</h2>
              <p>
                Next Horizon Leadership provides executive search optimization, AI for talent
                advisory, organizational design, and interim leadership services. We connect
                forward-looking CEOs, CHROs, and talent leaders with world-class search partners,
                AI innovators, and organizational experts.
              </p>

              <h2>Use of Website</h2>
              <p>You agree to use our website only for lawful purposes and in a way that:</p>
              <ul>
                <li>Does not infringe upon the rights of others</li>
                <li>Does not restrict or inhibit anyone&apos;s use of the website</li>
                <li>Does not violate any applicable laws or regulations</li>
                <li>Does not transmit harmful code or attempt to gain unauthorized access</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software,
                is the property of Next Horizon Leadership or its content suppliers and is
                protected by intellectual property laws. You may not reproduce, distribute, modify,
                or create derivative works without our express written permission.
              </p>

              <h2>User Communications</h2>
              <p>
                When you submit information through our contact forms or other communication
                channels, you grant us the right to use that information to respond to your
                inquiry and provide our services. You are responsible for the accuracy of the
                information you provide.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                Our website and services are provided &quot;as is&quot; and &quot;as available&quot; without any
                warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul>
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy, reliability, or completeness of content</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Next Horizon Leadership shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages,
                or any loss of profits or revenues, whether incurred directly or indirectly, or
                any loss of data, use, goodwill, or other intangible losses.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services that are not
                owned or controlled by Next Horizon Leadership. We have no control over, and
                assume no responsibility for, the content, privacy policies, or practices of any
                third-party websites or services.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Next Horizon Leadership and its
                officers, directors, employees, and agents from any claims, damages, obligations,
                losses, liabilities, costs, or expenses arising from your use of our website or
                services or your violation of these Terms.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                United States, without regard to its conflict of law provisions.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of
                any material changes by updating the &quot;Last updated&quot; date at the top of this page.
                Your continued use of the website after any changes constitutes acceptance of the
                new Terms.
              </p>

              <h2>Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that
                provision shall be limited or eliminated to the minimum extent necessary, and the
                remaining provisions shall remain in full force and effect.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{" "}
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
