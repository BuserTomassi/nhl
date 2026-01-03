"use client";

import { Crown, Search, Sparkles, GraduationCap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import { whyNHL } from "@/data/services";

const iconMap = {
  crown: Crown,
  search: Search,
  sparkles: Sparkles,
  graduationCap: GraduationCap,
};

export function PillarGrid() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand absolute -left-64 top-1/2 -translate-y-1/2 opacity-10" />
      <div className="ambient-orb orb-accent absolute -right-48 bottom-0 opacity-5" />

      <div className="container relative z-10">
        <SectionHeading
          id="why-next-horizon"
          eyebrow="Why Next Horizon Leadership"
          title="Where leaders and partners come together to shape what's next."
          subtitle="We exist at the intersection of leadership decision-makers, search partners, AI innovators, and rising HR talent. Our curated approach accelerates leadership transitions, introduces breakthrough solutions, and future-proofs organizations."
        />

        <StaggerChildren className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyNHL.map((pillar) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap];
            return (
              <StaggerItem key={pillar.title}>
                <div className="group card-surface card-premium card-lift p-7 text-center h-full">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary transition-transform duration-300 group-hover:scale-110">
                    {Icon && <Icon className="h-7 w-7" />}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

