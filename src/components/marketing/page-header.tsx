"use client";

import { motion } from "framer-motion";
import { NoiseOverlay } from "@/components/effects";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative isolate pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
      {/* Dark mesh gradient background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Mesh gradient layers */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.35 0.12 250 / 0.5), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.65 0.18 195 / 0.35), transparent),
            radial-gradient(ellipse 50% 80% at 50% 100%, oklch(0.35 0.12 250 / 0.2), transparent)
          `,
        }}
      />

      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 70% 20%, oklch(0.65 0.18 195 / 0.3), transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise texture */}
      <NoiseOverlay opacity={0.04} />

      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand orb-small absolute -left-32 top-1/4 opacity-30" />
      <div className="ambient-orb orb-accent orb-small absolute -right-24 bottom-1/4 opacity-25" />

      {/* Grid pattern */}
      <div className="absolute inset-0 texture-grid opacity-30" />

      {/* Content */}
      <div className="container relative z-10 max-w-5xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="mt-5 max-w-2xl text-lg sm:text-xl text-slate-200/90 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom gradient fade - only in dark mode */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-transparent to-transparent dark:from-background" />
    </section>
  );
}
