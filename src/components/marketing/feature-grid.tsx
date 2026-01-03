"use client";

import { Users, Sparkles, LayoutGrid } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardIcon,
  AnimatedCardTitle,
  AnimatedCardDescription,
} from "@/components/ui/animated-card";
import { whatWeDo } from "@/data/services";

const iconMap = {
  users: Users,
  sparkles: Sparkles,
  layout: LayoutGrid,
};

export function FeatureGrid() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

      {/* Grid texture */}
      <div className="absolute inset-0 texture-grid opacity-50" />

      {/* Ambient orbs */}
      <div className="ambient-orb orb-accent absolute -right-48 top-1/3 opacity-10" />
      <div className="ambient-orb orb-brand absolute -left-64 bottom-0 opacity-5" />

      <div className="container relative z-10">
        <SectionHeading
          id="what-we-do"
          eyebrow="What We Do"
          title="A trusted ecosystem for leadership, talent, and transformation."
          subtitle="Next Horizon Leadership brings together senior decision-makers and best-in-class partners to address the most critical people challenges organizations face today."
        />

        <StaggerChildren className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {whatWeDo.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={item.title}>
                <AnimatedCard variant="glow" className="h-full">
                  <AnimatedCardContent>
                    <AnimatedCardIcon>
                      {Icon && <Icon className="h-6 w-6" />}
                    </AnimatedCardIcon>
                    <AnimatedCardTitle>{item.title}</AnimatedCardTitle>
                    <AnimatedCardDescription>
                      {item.description}
                    </AnimatedCardDescription>
                  </AnimatedCardContent>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
