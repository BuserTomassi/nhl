import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles, LayoutGrid, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
} from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo";
import { services } from "@/data/services";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services from Next Horizon Leadership.",
  alternates: {
    canonical: `${BASE_URL}/services`,
  },
  openGraph: {
    title: "Services | Next Horizon Leadership",
    description:
      "Executive Search, AI For Talent Advisory, Org Design, and Interim Leadership services from Next Horizon Leadership.",
    url: `${BASE_URL}/services`,
  },
};

const iconMap = {
  search: Search,
  sparkles: Sparkles,
  layout: LayoutGrid,
  users: Users,
};

export default function ServicesPage() {
  const serviceItems = services.map((s) => ({
    name: s.title,
    description: s.description,
  }));

  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Services", url: `${BASE_URL}/services` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServiceSchema services={serviceItems} />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="You've Been Here Before"
          subtitle="The search that dragged on. The AI vendor that overpromised. The reorg that created more problems than it solved. We help you avoid the landmines."
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          {/* Texture */}
          <div className="absolute inset-0 texture-topo opacity-50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 section-vignette" />

          <div className="container relative z-10">
            <StaggerChildren className="space-y-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <StaggerItem key={service.title}>
                    <AnimatedCard variant="glow" className="overflow-hidden">
                      <AnimatedCardContent className="p-0">
                        <div className="grid lg:grid-cols-3 gap-0">
                          {/* Main content */}
                          <div className="lg:col-span-2 p-6 sm:p-8">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
                                {Icon && <Icon className="h-6 w-6" />}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold mb-1">
                                  {service.title}
                                </h3>
                                {/* Problem first - creates resonance */}
                                <p className="text-sm text-destructive/80 font-medium">
                                  {service.problem}
                                </p>
                              </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed mb-6">
                              {service.description}
                            </p>

                            {/* Who this is for */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-2">
                                  Who this is for:
                                </p>
                                <ul className="space-y-1.5">
                                  {service.whoThisIsFor.map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-muted-foreground mb-2">
                                  Who this isn&apos;t for:
                                </p>
                                <ul className="space-y-1.5">
                                  {service.whoThisIsNotFor.map((item, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-muted-foreground/70"
                                    >
                                      • {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Testimonial */}
                            {service.testimonial && (
                              <div className="border-l-2 border-primary/30 pl-4 py-2">
                                <p className="text-sm italic text-muted-foreground mb-1">
                                  &ldquo;{service.testimonial.quote}&rdquo;
                                </p>
                                <p className="text-xs text-muted-foreground/70">
                                  — {service.testimonial.author}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Outcomes sidebar */}
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-border">
                            <p className="text-sm font-semibold text-foreground mb-4">
                              Expected outcomes:
                            </p>
                            <ul className="space-y-3">
                              {service.outcomes.map((outcome, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                    <span className="text-xs font-bold text-primary">
                                      {i + 1}
                                    </span>
                                  </div>
                                  <span className="text-muted-foreground">
                                    {outcome}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AnimatedCardContent>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* Not sure which service? */}
            <FadeIn delay={0.4}>
              <div className="mt-16 text-center">
                <SectionHeading
                  eyebrow="Not sure where to start?"
                  title="Let's figure it out together"
                  subtitle="Tell us what you're facing. We'll recommend the right approach—even if it's not us."
                />
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/contact">
                    <Button variant="gradient" size="lg" className="group">
                      Tell Us What You&apos;re Solving
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
