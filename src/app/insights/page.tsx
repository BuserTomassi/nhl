import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  MessageSquareQuote,
  ArrowRight,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Leadership transitions, AI in talent, and organizational design—cornerstone ideas, research notes, and playbooks crafted with our community.",
};

const testimonials = [
  {
    quote:
      "The Diamond roundtable gave us a board-aligned plan in two sessions. The playbook we left with is now our standard.",
    author: "Global CHRO, Fortune 100 retailer",
  },
  {
    quote:
      "We piloted an AI hiring flow in under 45 days thanks to NHL's curated vendor roster.",
    author: "Head of Talent Acquisition, high-growth FinTech",
  },
  {
    quote:
      "The org design lab produced a sequencing roadmap our CEO and CFO could align on immediately.",
    author: "Chief People Officer, multinational media company",
  },
];

const toolkits = [
  {
    title: "Board Update Template for CHRO Transitions",
    description:
      "Slides + narrative structure to keep boards aligned during executive moves.",
  },
  {
    title: "AI Pilot Readiness Checklist",
    description:
      "Assess data, integrations, and change management before launching an AI initiative.",
  },
  {
    title: "Org Design Diagnostic Workbook",
    description:
      "Framework to map bottlenecks, decision rights, and cross-functional coordination.",
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title="Insights"
          subtitle="Leadership transitions, AI in talent, and organizational design—cornerstone ideas, research notes, and playbooks crafted with our community."
        />

        {/* Subscribe CTA */}
        <section className="relative py-12 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container max-w-3xl text-center">
            <FadeIn>
              <h2 className="font-headline text-2xl font-bold mb-4">
                Subscribe
              </h2>
              <p className="text-muted-foreground mb-6">
                Join Silver to receive monthly briefings plus early access to
                Gold programming.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Subscribe to Silver</Link>
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* Featured Analysis */}
        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            <SectionHeading
              eyebrow="Featured analysis"
              title="What we're learning with members"
              subtitle="Exclusive research and playbooks available to NHL members and subscribers."
            />

            <FadeIn delay={0.2}>
              <div className="flex justify-center gap-4 mb-8">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Leadership
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  AI
                </span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Org design
                </span>
              </div>
              <p className="text-center text-muted-foreground italic">
                Loading insights…
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
          <div className="container">
            <SectionHeading
              eyebrow="Community highlights"
              title="Signals from the network"
              subtitle="What members are accomplishing with NHL."
            />

            <StaggerChildren className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <StaggerItem key={testimonial.author}>
                  <div className="card-surface card-premium p-6 h-full">
                    <MessageSquareQuote className="h-8 w-8 text-primary/40 mb-4" />
                    <blockquote className="text-lg mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-muted-foreground font-medium">
                      {testimonial.author}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <FadeIn delay={0.3}>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link href="/events">
                    Explore upcoming events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Toolkits */}
        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            <SectionHeading
              eyebrow="Research library"
              title="Toolkits you can deploy now"
              subtitle="Available to Gold members and above."
            />

            <StaggerChildren className="grid gap-6 md:grid-cols-3">
              {toolkits.map((toolkit) => (
                <StaggerItem key={toolkit.title}>
                  <div className="card-surface card-premium card-lift p-6 h-full">
                    <FileText className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {toolkit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {toolkit.description}
                    </p>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download preview
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container max-w-3xl text-center">
            <SectionHeading
              eyebrow="Next steps"
              title="Bring our insights into your operating rhythm"
              subtitle="Share the briefings with your leadership team, ask for a custom working session, or request partner introductions."
            />

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Request Diamond invite</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/community">Join Gold for full library</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="relative py-16">
          <div className="container text-center">
            <FadeIn>
              <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 dark:text-slate-800 select-none">
                COMING SOON
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Insights and resources launching soon
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

