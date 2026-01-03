"use client";

import { Linkedin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { about } from "@/data/copy";
import { founder } from "@/data/social-proof";

export function About() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden section-divider-gradient">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950" />

      {/* Texture */}
      <div className="absolute inset-0 texture-topo opacity-40" />

      {/* Vignette */}
      <div className="absolute inset-0 section-vignette" />

      <div className="container relative z-10">
        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left column - Founder story */}
          <div>
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.title}
              align="left"
              className="mb-8"
            />

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {about.founderStory.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>

            {/* Founder card */}
            <FadeIn delay={0.4}>
              <div className="mt-10 p-6 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
                    {/* Placeholder for founder image */}
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary/60">
                      {founder.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">
                      {founder.name}
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      {founder.title}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {founder.credentials.slice(0, 2).map((cred, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-muted-foreground"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {founder.shortBio}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right column - What We Believe (Manifesto) */}
          <div className="lg:pt-16">
            <FadeIn delay={0.3}>
              <h3 className="font-headline text-2xl font-bold mb-8 text-foreground">
                {about.manifesto.title}
              </h3>
            </FadeIn>

            <StaggerChildren className="space-y-6">
              {about.manifesto.beliefs.map((belief, index) => (
                <StaggerItem key={index}>
                  <div className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors">
                    <h4 className="font-semibold text-foreground mb-2">
                      {belief.headline}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {belief.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            {/* Decorative element */}
            <FadeIn delay={0.6}>
              <div className="mt-12 flex items-center gap-4">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
                <p className="text-sm text-muted-foreground italic">
                  The right connection at the right moment.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
