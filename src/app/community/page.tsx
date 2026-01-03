import type { Metadata } from "next";
import { Crown, Gem, Medal, Award } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { PageHeader } from "@/components/marketing";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";

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

        <section className="section-light section-vignette section-divider relative py-12 sm:py-16">
          <div className="absolute inset-0 texture-topo opacity-50" />
          <div className="container relative z-10">
            <StaggerChildren className="grid gap-6 md:grid-cols-2">
              {membershipTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <StaggerItem key={tier.name}>
                    <div
                      className={`card-surface card-premium card-lift p-8 h-full ${
                        tier.featured
                          ? "ring-2 ring-primary/50 dark:ring-primary/30"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{tier.name}</h3>
                          <p className="text-sm text-primary font-medium">
                            {tier.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {tier.description}
                      </p>
                      <p className="text-sm font-semibold mb-2">
                        Benefits include:
                      </p>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
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
                  Community Portal launching soon
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

