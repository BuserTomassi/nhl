import type { Metadata } from "next";
import { Calendar, Users, Sparkles, GraduationCap } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import { BreadcrumbSchema } from "@/components/seo";

const BASE_URL = "https://www.nexthorizonleadership.com";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Roundtables, labs, and live demos curated for each membership tier.",
  alternates: {
    canonical: `${BASE_URL}/events`,
  },
  openGraph: {
    title: "Events | Next Horizon Leadership",
    description:
      "Roundtables, labs, and live demos curated for each membership tier.",
    url: `${BASE_URL}/events`,
  },
};

const events = [
  {
    title: "CHRO Roundtable on Succession Readiness",
    description:
      "An invite-only exchange focused on guiding CEO and CHRO transitions. We will share anonymized case studies, 90-day playbooks, and lessons from recent board engagements.",
    date: "TBD",
    icon: Users,
  },
  {
    title: "AI Talent Demo Day",
    description:
      "A curated showcase of AI innovators focused on intelligent sourcing, internal mobility, and capability mapping. Includes live product walkthroughs and implementation playbooks.",
    date: "TBD",
    icon: Sparkles,
  },
  {
    title: "CHRO Board Development Program",
    description:
      "A development program designed to prepare CHROs for board-level roles and responsibilities.",
    date: "TBD",
    icon: GraduationCap,
  },
  {
    title: "Future Board Development Program",
    description:
      "A forward-looking program focused on developing the next generation of board leaders.",
    date: "TBD",
    icon: Calendar,
  },
];

export default function EventsPage() {
  const breadcrumbs = [
    { name: "Home", url: BASE_URL },
    { name: "Events", url: `${BASE_URL}/events` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <PageHeader
          title="Events"
          subtitle="Roundtables, labs, and live demos curated for each membership tier."
        />

        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            <StaggerChildren className="grid gap-6 md:grid-cols-2">
              {events.map((event) => {
                const Icon = event.icon;
                return (
                  <StaggerItem key={event.title}>
                    <div className="card-surface card-premium card-lift p-8 h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          <p className="text-sm text-primary font-medium">
                            Date: {event.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* Coming Soon */}
            <FadeIn delay={0.4}>
              <div className="mt-16 text-center">
                <h2 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-slate-200 dark:text-slate-800 select-none">
                  COMING SOON
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Events calendar launching soon
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
