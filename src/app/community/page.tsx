import type { Metadata } from "next";
import { Crown, Gem, Medal, Award, Check } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
} from "@/components/ui/animated-card";

export const metadata: Metadata = {
  title: "Community",
  description:
    "A hub where search firms and hiring teams learn, share, and connect. Best practices, playbooks, and a trusted network.",
};

const membershipTiers = [
  {
    name: "Diamond Membership",
    subtitle: "Invite-Only",
    description:
      "For CHRO/CPOs at scaled organizations — A highly exclusive peer group designed for strategic discussion and confidential collaboration.",
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
  },
  {
    name: "Platinum Membership",
    subtitle: "Invite-Only and Cohort-Based",
    description:
      "For smaller-scale CPOs, CHRO successors, Chief Talent Officers, and Private Capital Talent Officers.",
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
  },
  {
    name: "Gold Membership",
    subtitle: "Paid Membership",
    description:
      "For ambitious HR and Talent professionals seeking development and career growth.",
    icon: Medal,
    benefits: [
      "Invitations to open events and webinars",
      "Career insights and trend reports",
      "Peer networking opportunities",
      "Access to vetted partner directory and resources",
    ],
    featured: false,
    gradient: "from-amber-400 to-amber-600",
  },
  {
    name: "Silver Membership",
    subtitle: "Initial Entry Level",
    description:
      "For anyone interested in career and functional insights and staying connected to like-minded professionals.",
    icon: Award,
    benefits: [
      "Newsletter and trend updates",
      "Limited partner content access",
      "Upgrade path to other levels",
    ],
    featured: false,
    gradient: "from-slate-300 to-slate-500",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeader
          title="Community Portal"
          subtitle="A hub where search firms and hiring teams learn, share, and connect. Best practices, playbooks, and a trusted network."
        />

        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

          {/* Texture */}
          <div className="absolute inset-0 texture-topo opacity-50" />

          {/* Vignette effect */}
          <div className="absolute inset-0 section-vignette" />

          <div className="container relative z-10">
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
                            Most Popular
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

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {tier.description}
                        </p>

                        <div className="border-t border-border pt-5">
                          <p className="text-sm font-semibold mb-4">
                            Benefits include:
                          </p>
                          <ul className="space-y-3">
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
                        </div>
                      </AnimatedCardContent>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>

            {/* Coming Soon */}
            <FadeIn delay={0.4}>
              <div className="mt-20 text-center">
                <div className="inline-block">
                  <div className="relative">
                    <h2 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gradient text-gradient-brand">
                      COMING SOON
                    </h2>
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-2xl -z-10 opacity-50" />
                  </div>
                </div>
                <p className="mt-6 text-lg text-muted-foreground">
                  Community Portal launching soon. Be among the first to join.
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
