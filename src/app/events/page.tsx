import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Users, Sparkles, GraduationCap, ArrowRight, Clock } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { eventsPage } from "@/data/copy";
import { socialProofNumbers } from "@/data/social-proof";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Roundtables, labs, and live demos curated for each membership tier.",
};

const events = [
  {
    title: "CHRO Roundtable on Succession Readiness",
    description:
      "An invite-only exchange focused on guiding CEO and CHRO transitions. You'll leave with anonymized case studies, 90-day playbooks, and lessons from recent board engagements.",
    date: "Q1 2026",
    spots: 25,
    spotsRemaining: 8,
    tier: "Diamond",
    icon: Users,
    outcomes: [
      "Board-aligned succession framework",
      "Peer-tested 90-day playbook",
      "Connections with fellow CHROs facing similar transitions",
    ],
  },
  {
    title: "AI Talent Demo Day",
    description:
      "A curated showcase of AI innovators focused on intelligent sourcing, internal mobility, and capability mapping. No vendor pitches—just live product walkthroughs and honest implementation stories.",
    date: "Q1 2026",
    spots: 40,
    spotsRemaining: 15,
    tier: "Platinum+",
    icon: Sparkles,
    outcomes: [
      "Hands-on demos from vetted AI vendors",
      "Implementation playbooks",
      "Direct access to product teams",
    ],
  },
  {
    title: "CHRO Board Development Program",
    description:
      "A development program designed to prepare CHROs for board-level roles. You'll work with sitting board members and executive coaches over 6 months.",
    date: "Q2 2026",
    spots: 12,
    spotsRemaining: 4,
    tier: "Diamond",
    icon: GraduationCap,
    outcomes: [
      "Board-ready executive presence",
      "Governance fundamentals",
      "Introductions to board recruiters",
    ],
  },
  {
    title: "Future Board Development Program",
    description:
      "A forward-looking program for rising executives aspiring to board roles. Build the skills, network, and visibility needed to be board-ready in 3-5 years.",
    date: "Q2 2026",
    spots: 20,
    spotsRemaining: 12,
    tier: "Platinum",
    icon: Calendar,
    outcomes: [
      "Multi-year board readiness roadmap",
      "Mentorship from current board members",
      "Visibility opportunities",
    ],
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title={eventsPage.title}
          subtitle={eventsPage.subtitle}
        />

        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            {/* Scarcity note */}
            <FadeIn>
              <p className="text-center text-sm text-muted-foreground mb-10 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                {eventsPage.scarcityNote}
              </p>
            </FadeIn>

            <StaggerChildren className="grid gap-6 md:grid-cols-2">
              {events.map((event) => {
                const Icon = event.icon;
                const spotsPercent = (event.spotsRemaining / event.spots) * 100;
                const isLowAvailability = spotsPercent < 40;

                return (
                  <StaggerItem key={event.title}>
                    <div className="card-surface card-premium card-lift p-8 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex-shrink-0">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-primary font-medium">
                              {event.date}
                            </p>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                              {event.tier}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Outcomes */}
                      <div className="mb-6">
                        <p className="text-sm font-semibold mb-2">
                          You&apos;ll leave with:
                        </p>
                        <ul className="space-y-1.5">
                          {event.outcomes.map((outcome, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary">•</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scarcity indicator */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">
                            Availability
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              isLowAvailability
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {event.spotsRemaining} of {event.spots} spots
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isLowAvailability
                                ? "bg-gradient-to-r from-destructive/80 to-destructive"
                                : "bg-gradient-to-r from-primary/60 to-primary"
                            }`}
                            style={{ width: `${100 - spotsPercent}%` }}
                          />
                        </div>

                        <Link href="/contact" className="block mt-4">
                          <Button
                            variant={isLowAvailability ? "gradient" : "outline"}
                            className="w-full group"
                          >
                            {eventsPage.waitlistCta}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* Past events teaser */}
            <FadeIn delay={0.4}>
              <div className="mt-16 text-center">
                <SectionHeading
                  eyebrow="Track record"
                  title="What past attendees are saying"
                  subtitle={`${socialProofNumbers.eventsPerYear} events per year, averaging ${socialProofNumbers.avgEventSize} attendees each`}
                />
                <p className="text-muted-foreground italic mt-4">
                  &ldquo;The CHRO roundtable gave us a board-aligned plan in two
                  sessions.&rdquo;
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  — CPO, Fortune 100 Retailer
                </p>
              </div>
            </FadeIn>

            {/* Main CTA */}
            <FadeIn delay={0.5}>
              <div className="mt-16 text-center">
                <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Events Calendar Launching Q1 2026
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
                  Join the waitlist to get priority access when registration
                  opens.
                </p>
                <Link href="/contact">
                  <Button variant="gradient" size="lg" className="group">
                    Join the Events Waitlist
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
