"use client";

import { Users, Sparkles, LayoutGrid } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { StaggerChildren, StaggerItem } from "@/components/motion";
import { whatWeDo } from "@/data/services";

const iconMap = {
  users: Users,
  sparkles: Sparkles,
  layout: LayoutGrid,
};

export function FeatureGrid() {
  return (
    <section className="relative section-light py-20 overflow-hidden">
      {/* Ambient orbs */}
      <div className="ambient-orb orb-accent absolute -right-48 top-1/3 opacity-10" />

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
                <div className="card-surface card-premium card-lift p-8 h-full">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
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

