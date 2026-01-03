import type { Metadata } from "next";
import Link from "next/link";
import { Crown, Gem, Medal, Award, Check, ArrowRight, Users } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
} from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/seo";
import { communityPage, scarcity } from "@/data/copy";
import { socialProofNumbers } from "@/data/social-proof";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Community",
  description:
    "A hub where search firms and hiring teams learn, share, and connect. Best practices, playbooks, and a trusted network.",
  alternates: {
    canonical: `${BASE_URL}/community`,
  },
  openGraph: {
    title: "Community | Next Horizon Leadership",
    description:
      "A hub where search firms and hiring teams learn, share, and connect. Best practices, playbooks, and a trusted network.",
    url: `${BASE_URL}/community`,
  },
};

const membershipTiers = [
  {
    name: "Diamond Membership",
    subtitle: "Invite-Only",
    scarcityNote: `${socialProofNumbers.diamondSeatsTotal} seats per year. ${socialProofNumbers.diamondSeatsAvailable} currently available.`,
    description: communityPage.tierIdentity.diamond,
    icon: Gem,
    benefits: [
      "Private, off-the-record peer roundtables",
      "Career support for future operating or board roles and priority introductions to top executive search firms",
      "Early access to AI innovations and market insights",
      "Invitations to intimate leadership gatherings",
      "Online virtual cohorts",
      "Members' only communication channel",
      "Assigned relationship manager",
    ],
    featured: true,
    gradient: "from-cyan-500 to-blue-600",
    cta: "Apply for Diamond",
    ctaVariant: "gradient" as const,
  },
  {
    name: "Platinum Membership",
    subtitle: "Invite-Only and Cohort-Based",
    scarcityNote: "Limited cohorts starting Q1 2026",
    description: communityPage.tierIdentity.platinum,
    icon: Crown,
    benefits: [
      "Cohort-based peer learning and mentorship",
      "Career development and targeted introductions to search partners",
      "Early access to AI demos and briefings",
      "Thought leadership and visibility opportunities",
      "Invitations to select in-person development events",
    ],
    featured: false,
    gradient: "from-slate-400 to-slate-600",
    cta: "Request Platinum Invite",
    ctaVariant: "outline" as const,
  },
  {
    name: "Gold Membership",
    subtitle: "Paid Membership",
    scarcityNote: "Charter rates available until launch",
    description: communityPage.tierIdentity.gold,
    icon: Medal,
    benefits: [
      "Invitations to open events and webinars",
      "Career insights and trend reports",
      "Peer networking opportunities",
      "Access to vetted partner directory and resources",
    ],
    featured: false,
    gradient: "from-amber-400 to-amber-600",
    cta: "Join Gold Waitlist",
    ctaVariant: "outline" as const,
  },
  {
    name: "Silver Membership",
    subtitle: "Free Entry Level",
    scarcityNote: null,
    description: communityPage.tierIdentity.silver,
    icon: Award,
    benefits: [
      "Newsletter and trend updates",
      "Limited partner content access",
      "Upgrade path to other levels",
    ],
    featured: false,
    gradient: "from-slate-300 to-slate-500",
    cta: "Subscribe to Silver",
    ctaVariant: "secondary" as const,
  },
];

export default function CommunityPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Community", url: `${BASE_URL}/community` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title={communityPage.title}
          subtitle={communityPage.subtitle}
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          {/* Texture */}
          <div className="absolute inset-0 texture-topo opacity-50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 section-vignette" />

          <div className="container relative z-10">
            {/* Charter member callout */}
            <FadeIn>
              <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Charter Member Opportunity
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {communityPage.charterMessage}
                </p>
              </div>
            </FadeIn>

            <StaggerChildren className="grid gap-6 lg:gap-8 md:grid-cols-2">
              {membershipTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <StaggerItem key={tier.name}>
                    <AnimatedCard
                      variant={tier.featured ? "gradient-border" : "glow"}
                      className={`h-full ${
                        tier.featured
                          ? "ring-2 ring-primary/30 dark:ring-primary/20"
                          : ""
                      }`}
                    >
                      <AnimatedCardContent className="p-6 sm:p-8">
                        {/* Featured badge */}
                        {tier.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-white">
                            Most Exclusive
                          </div>
                        )}

                        <div className="flex items-start gap-4 mb-5">
                          <div
                            className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${tier.gradient} text-white shadow-lg`}
                          >
                            <Icon className="h-7 w-7" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{tier.name}</h3>
                            <p className="text-sm text-primary font-medium">
                              {tier.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Scarcity note */}
                        {tier.scarcityNote && (
                          <p className="text-sm font-medium text-destructive/80 mb-4 flex items-center gap-2">
                            <span className="inline-block h-2 w-2 rounded-full bg-destructive/60 animate-pulse" />
                            {tier.scarcityNote}
                          </p>
                        )}

                        {/* Identity-based description */}
                        <p className="text-muted-foreground mb-6 leading-relaxed italic">
                          {tier.description}
                        </p>

                        <div className="border-t border-border pt-5">
                          <p className="text-sm font-semibold mb-4">
                            Benefits include:
                          </p>
                          <ul className="space-y-3 mb-6">
                            {tier.benefits.map((benefit, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-primary" />
                                </div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <Link href="/contact">
                            <Button
                              variant={tier.ctaVariant}
                              className="w-full group"
                            >
                              {tier.cta}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </AnimatedCardContent>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* Not sure which tier? */}
            <FadeIn delay={0.4}>
              <div className="mt-16 text-center max-w-2xl mx-auto">
                <SectionHeading
                  eyebrow="Not sure which tier is right for you?"
                  title="Let's talk about where you are—and where you're headed"
                  subtitle="Your current role, goals, and timeline will help us recommend the right level of engagement."
                />
                <div className="mt-8">
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="group">
                      Help Me Choose
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Waitlist with scarcity */}
            <FadeIn delay={0.5}>
              <div className="mt-20 text-center">
                <div className="inline-block">
                  <div className="relative">
                    <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient text-gradient-brand">
                      Launching Q1 2026
                    </h2>
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-2xl -z-10 opacity-50" />
                  </div>
                </div>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
                  {communityPage.waitlistCta}. {scarcity.charterBenefits}.
                </p>
                <div className="mt-6">
                  <Link href="/contact">
                    <Button variant="gradient" size="lg" className="group">
                      Join the Waitlist
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
