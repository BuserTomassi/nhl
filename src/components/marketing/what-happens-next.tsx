"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion";
import { SectionHeading } from "./section-heading";
import { contactPage } from "@/data/copy";

interface WhatHappensNextProps {
  variant?: "default" | "compact";
  showHeading?: boolean;
  className?: string;
}

export function WhatHappensNext({
  variant = "default",
  showHeading = true,
  className = "",
}: WhatHappensNextProps) {
  const steps = contactPage.whatHappensNext.steps;

  if (variant === "compact") {
    return (
      <div className={className}>
        {showHeading && (
          <h4 className="font-semibold text-foreground mb-4">
            {contactPage.whatHappensNext.title}
          </h4>
        )}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs font-bold flex items-center justify-center">
                {step.number}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant - full width with cards
  return (
    <div className={className}>
      {showHeading && (
        <SectionHeading
          eyebrow="What to expect"
          title={contactPage.whatHappensNext.title}
          className="mb-12"
        />
      )}

      <StaggerChildren className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StaggerItem key={step.number}>
            <div className="relative text-center">
              {/* Connecting line - hidden on mobile and last item */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white text-xl font-bold mb-4 shadow-lg"
              >
                {step.number}
              </motion.div>
              <h4 className="font-semibold text-lg mb-2 text-foreground">
                {step.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Reassurance */}
      <FadeIn delay={0.4}>
        <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
          No pitch decks. No hard sells. No obligations. Just a real conversation about whether we can help.
        </p>
      </FadeIn>
    </div>
  );
}

