"use client";

import { Crown, Search, Sparkles, GraduationCap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerChildren, StaggerItem, FadeIn } from "@/components/motion";
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardIcon,
  AnimatedCardTitle,
  AnimatedCardDescription,
} from "@/components/ui/animated-card";
import { whyNHL } from "@/data/services";
import { whyNHLSection } from "@/data/copy";

const iconMap = {
  crown: Crown,
  search: Search,
  sparkles: Sparkles,
  graduationCap: GraduationCap,
};

export function PillarGrid() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900" />

      {/* Texture */}
      <div className="absolute inset-0 texture-topo opacity-30" />

      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand absolute -left-64 top-1/2 -translate-y-1/2 opacity-10" />
      <div className="ambient-orb orb-accent absolute -right-48 bottom-0 opacity-5" />

      <div className="container relative z-10">
        <SectionHeading
          id="why-next-horizon"
          eyebrow={whyNHLSection.eyebrow}
          title={whyNHLSection.title}
          subtitle={whyNHLSection.subtitle}
        />

        {/* Identity statement - speaks to who they are */}
        <FadeIn delay={0.2}>
          <p className="text-center text-lg font-medium text-primary max-w-2xl mx-auto mb-12">
            {whyNHLSection.identityStatement}
          </p>
        </FadeIn>

        <StaggerChildren className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyNHL.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={pillar.title}>
                <AnimatedCard variant="glow" className="h-full text-center group">
                  <AnimatedCardContent className="flex flex-col items-center">
                    <AnimatedCardIcon className="mx-auto h-16 w-16 rounded-2xl">
                      {Icon && <Icon className="h-7 w-7" />}
                    </AnimatedCardIcon>
                    <AnimatedCardTitle className="text-lg">
                      {pillar.title}
                    </AnimatedCardTitle>
                    <AnimatedCardDescription className="text-sm">
                      {pillar.description}
                    </AnimatedCardDescription>
                    {/* Identity-based messaging - shown on hover */}
                    <p className="mt-3 text-xs text-primary/80 italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {pillar.identity}
                    </p>
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
