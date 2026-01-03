"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "./section-heading";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Industry Partners" },
  { value: 500, suffix: "+", label: "Leadership Connections" },
  { value: 25, suffix: "+", label: "Years Combined Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    duration: 2000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current)
  );

  if (isInView) {
    springValue.set(value);
  }

  return (
    <motion.span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />

      {/* Noise texture */}
      <div className="absolute inset-0 texture-noise opacity-10" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 texture-grid opacity-10" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="By The Numbers"
          title="Trusted by Leaders Worldwide"
          className="text-white [&_p]:text-white/80 [&_h2]:text-white"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-white mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <p className="text-white/70 text-sm sm:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

