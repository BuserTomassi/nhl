import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  MessageSquareQuote,
  ArrowRight,
  TrendingUp,
  Users,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader, SectionHeading } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { insightsPage } from "@/data/copy";
import { testimonials, socialProofNumbers } from "@/data/social-proof";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Leadership transitions, AI in talent, and organizational design—cornerstone ideas, research notes, and playbooks crafted with our community.",
};

const toolkits = [
  {
    title: "Board Update Template for CHRO Transitions",
    description:
      "Slides + narrative structure to keep boards aligned during executive moves. Used by 40+ Fortune 500 CHROs.",
    downloads: 847,
    tier: "Gold+",
  },
  {
    title: "AI Pilot Readiness Checklist",
    description:
      "Assess data, integrations, and change management before launching an AI initiative. 12-point framework.",
    downloads: 623,
    tier: "Gold+",
  },
  {
    title: "Org Design Diagnostic Workbook",
    description:
      "Framework to map bottlenecks, decision rights, and cross-functional coordination. Excel + facilitation guide.",
    downloads: 512,
    tier: "Gold+",
  },
];

const featuredInsights = [
  {
    title: "Why 40% of New Executives Fail—And How to Beat the Odds",
    category: "Leadership",
    readTime: "8 min",
  },
  {
    title: "The AI Talent Landscape: What Actually Works in 2025",
    category: "AI",
    readTime: "12 min",
  },
  {
    title: "Restructuring Without the Drama: A Sequencing Framework",
    category: "Org Design",
    readTime: "10 min",
  },
];

export default function InsightsPage() {
  // Use first 3 testimonials for display
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title={insightsPage.title}
          subtitle={insightsPage.subtitle}
        />

        {/* Free Resource CTA - Reciprocity */}
        <section className="relative py-12 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container">
            <FadeIn>
              <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        Free Resource
                      </span>
                    </div>
                    <h2 className="font-headline text-2xl font-bold mb-2">
                      {insightsPage.freeResource.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {insightsPage.freeResource.description}
                    </p>
                    <p className="text-sm text-muted-foreground/70 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {insightsPage.socialProof}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <Link href="/contact">
                      <Button variant="gradient" size="lg" className="group">
                        {insightsPage.freeResource.cta}
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
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

            <StaggerChildren className="grid gap-6 md:grid-cols-3 mb-8">
              {featuredInsights.map((insight) => (
                <StaggerItem key={insight.title}>
                  <div className="card-surface card-premium card-lift p-6 h-full">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 inline-block">
                      {insight.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {insight.readTime} read
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <FadeIn delay={0.3}>
              <div className="text-center">
                <Link href="/community">
                  <Button variant="outline" className="group">
                    Join to unlock full articles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials with photos */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
          <div className="container">
            <SectionHeading
              eyebrow="Community highlights"
              title="What members are accomplishing with NHL"
              subtitle={`${socialProofNumbers.newsletterSubscribers}+ leaders in our network and growing`}
            />

            <StaggerChildren className="grid gap-6 md:grid-cols-3">
              {displayTestimonials.map((testimonial) => (
                <StaggerItem key={testimonial.author}>
                  <div className="card-surface card-premium p-6 h-full">
                    <MessageSquareQuote className="h-8 w-8 text-primary/40 mb-4" />
                    <blockquote className="text-lg mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3 mt-auto">
                      {/* Author photo placeholder */}
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary/60">
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <FadeIn delay={0.3}>
              <div className="mt-8 text-center">
                <Link href="/events">
                  <Button variant="outline">Explore upcoming events</Button>
                </Link>
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
                  <div className="card-surface card-premium card-lift p-6 h-full flex flex-col">
                    <FileText className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {toolkit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {toolkit.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {toolkit.downloads} downloads
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {toolkit.tier}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2 mt-4">
                      <Download className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="container max-w-3xl text-center">
            <SectionHeading
              eyebrow="Stay informed"
              title="The Monday brief that 500+ CHROs read first"
              subtitle="Weekly insights on leadership transitions, AI in talent, and what's actually working. No fluff."
            />

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="/contact">
                  <Button variant="gradient" size="lg" className="group">
                    Subscribe to Silver
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" size="lg">
                    Or upgrade for full access
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="relative py-12 sm:py-16 border-t border-border">
          <div className="container max-w-3xl text-center">
            <SectionHeading
              eyebrow="Next steps"
              title="Bring our insights into your operating rhythm"
              subtitle="Share the briefings with your leadership team, ask for a custom working session, or request partner introductions."
            />

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" variant="gradient" className="group">
                    Request Diamond invite
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button variant="outline" size="lg">
                    Join Gold for full library
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
