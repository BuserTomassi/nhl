import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { ContactForm } from "@/components/forms";
import { FadeIn } from "@/components/motion";
import { ContactPageSchema, BreadcrumbSchema } from "@/components/seo";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Next Horizon Leadership. Tell us about your executive hire needs.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Next Horizon Leadership",
    description:
      "Get in touch with Next Horizon Leadership. Tell us about your executive hire needs.",
    url: `${BASE_URL}/contact`,
  },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@nexthorizonleadership.com",
    href: "mailto:hello@nexthorizonleadership.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Global Network",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Contact", url: `${BASE_URL}/contact` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContactPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="Contact Us"
          subtitle="Tell us about your executive hire. We'll respond within one business day."
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          {/* Texture */}
          <div className="absolute inset-0 texture-topo opacity-50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 section-vignette" />

          <div className="container relative z-10">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Contact info sidebar */}
              <div className="lg:col-span-1">
                <FadeIn>
                  <h3 className="font-headline text-2xl font-bold mb-6">
                    Get in Touch
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Ready to discuss your leadership and talent needs? We&apos;re
                    here to help connect you with the right partners and
                    solutions.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-xl icon-container flex items-center justify-center text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-foreground font-medium hover:text-primary transition-colors link-underline"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2">
                <FadeIn delay={0.2}>
                  <div className="rounded-2xl bg-white dark:bg-slate-800/50 p-6 sm:p-10 shadow-lg border border-slate-200/80 dark:border-white/10">
                    <SectionHeading
                      eyebrow="Send a message"
                      title="Share your needs"
                      align="left"
                      className="mb-8"
                    />
                    <ContactForm />
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
