"use client";

import { Users, Sparkles, LayoutGrid } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardIcon,
  AnimatedCardTitle,
  AnimatedCardDescription,
} from "@/components/ui/animated-card";
import { whatWeDo } from "@/data/services";
import { whatWeDoSection } from "@/data/copy";

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
          eyebrow={whatWeDoSection.eyebrow}
          title={whatWeDoSection.title}
          subtitle={whatWeDoSection.subtitle}
        />

        {/* Pacing statement - acknowledges their reality before leading */}
        <FadeIn delay={0.2}>
          <p className="text-center text-lg text-muted-foreground italic max-w-2xl mx-auto mb-12">
            {whatWeDoSection.pacingStatement}
          </p>
        </FadeIn>

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
                    {/* Problem statement first - creates resonance */}
                    <p className="text-sm text-primary font-medium mb-2">
                      {item.problem}
                    </p>
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
