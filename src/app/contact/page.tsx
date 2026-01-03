import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { ContactForm } from "@/components/forms";
import { FadeIn } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Next Horizon Leadership. Tell us about your executive hire needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title="Contact Us"
          subtitle="Tell us about your executive hire. We'll respond within one business day."
        />

        <section className="section-light section-vignette relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10 max-w-3xl">
            <FadeIn>
              <div className="card-surface card-premium p-6 sm:p-8">
                <SectionHeading
                  eyebrow="Get in touch"
                  title="Share your needs"
                  align="left"
                  className="mb-8"
                />
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
