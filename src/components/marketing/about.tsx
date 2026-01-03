"use client";

import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/motion";

export function About() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden section-divider-gradient">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950" />

      {/* Texture */}
      <div className="absolute inset-0 texture-topo opacity-40" />

      {/* Vignette */}
      <div className="absolute inset-0 section-vignette" />

      <div className="container relative z-10 max-w-4xl">
        <SectionHeading
          eyebrow="About"
          title="About Next Horizon Leadership"
        />

        <FadeIn delay={0.2}>
          <div className="space-y-6 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Next Horizon Leadership was founded to help organizations and
              leaders navigate the defining leadership and talent challenges of
              our time.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              By carefully curating both the community and its partners, Next
              Horizon Leadership creates a trusted environment where meaningful
              connections lead to real impact.
            </p>
          </div>
        </FadeIn>

        {/* Decorative element */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
