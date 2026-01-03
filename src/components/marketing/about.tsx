"use client";

import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/motion";

export function About() {
  return (
    <section className="relative section-light section-vignette section-divider py-20 overflow-hidden">
      <div className="absolute inset-0 texture-topo opacity-50" />

      <div className="container relative z-10 max-w-4xl">
        <SectionHeading eyebrow="About" title="About Next Horizon Leadership" />

        <FadeIn delay={0.2}>
          <div className="prose prose-lg dark:prose-invert mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              Next Horizon Leadership was founded to help organizations and
              leaders navigate the defining leadership and talent challenges of
              our time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By carefully curating both the community and its partners, Next
              Horizon Leadership creates a trusted environment where meaningful
              connections lead to real impact.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

