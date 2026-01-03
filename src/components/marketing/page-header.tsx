"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative isolate pt-28 sm:pt-32 pb-14 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Mesh gradient layers */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.35 0.12 250 / 0.4), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, oklch(0.65 0.18 195 / 0.3), transparent),
            radial-gradient(ellipse 50% 80% at 50% 100%, oklch(0.35 0.12 250 / 0.15), transparent)
          `,
        }}
      />

      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 70% 20%, oklch(0.65 0.18 195 / 0.25), transparent)",
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand orb-small absolute -left-32 top-1/4 opacity-30" />
      <div className="ambient-orb orb-accent orb-small absolute -right-24 bottom-1/4 opacity-25" />

      {/* Content */}
      <div className="container relative z-10 max-w-5xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-lg text-slate-200/90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

