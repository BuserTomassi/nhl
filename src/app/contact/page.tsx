import type { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquareQuote } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { ContactForm } from "@/components/forms";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { ContactPageSchema, BreadcrumbSchema } from "@/components/seo";
import { contactPage } from "@/data/copy";
import { socialProofNumbers, testimonials } from "@/data/social-proof";

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
    value: `Most respond within ${socialProofNumbers.avgResponseTime}`,
    href: null,
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Contact", url: `${BASE_URL}/contact` },
  ];

  // Get a short testimonial for the sidebar
  const sidebarTestimonial = testimonials[4]; // "The Monday brief is the only newsletter..."

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ContactPageSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title={contactPage.title}
          subtitle={contactPage.subtitle}
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
                    {contactPage.formSubheading}
                  </p>

                  <div className="space-y-6 mb-10">
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

                  {/* Mini testimonial */}
                  {sidebarTestimonial && (
                    <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                      <MessageSquareQuote className="h-6 w-6 text-primary/40 mb-3" />
                      <p className="text-sm italic text-muted-foreground mb-3">
                        &ldquo;{sidebarTestimonial.quote}&rdquo;
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        — {sidebarTestimonial.author}, {sidebarTestimonial.title}
                      </p>
                    </div>
                  )}
                </FadeIn>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-2">
                <FadeIn delay={0.2}>
                  <div className="rounded-2xl bg-white dark:bg-slate-800/50 p-6 sm:p-10 shadow-lg border border-slate-200/80 dark:border-white/10">
                    <SectionHeading
                      eyebrow="Send a message"
                      title={contactPage.formHeading}
                      align="left"
                      className="mb-8"
                    />
                    <ContactForm />
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* What happens next section */}
            <FadeIn delay={0.4}>
              <div className="mt-20 max-w-4xl mx-auto">
                <SectionHeading
                  eyebrow="What to expect"
                  title={contactPage.whatHappensNext.title}
                  className="mb-12"
                />

                <StaggerChildren className="grid md:grid-cols-3 gap-8">
                  {contactPage.whatHappensNext.steps.map((step, index) => (
                    <StaggerItem key={step.number}>
                      <div className="text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xl font-bold mb-4">
                          {step.number}
                        </div>
                        <h4 className="font-semibold text-lg mb-2">
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
