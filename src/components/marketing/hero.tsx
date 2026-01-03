"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ParallaxBackground, NoiseOverlay, Spotlight } from "@/components/effects";
import { Button } from "@/components/ui/button";
import { hero } from "@/data/copy";

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const headlineWords = hero.headline;

  return (
    <section className="relative isolate flex min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh] items-center overflow-hidden">
      {/* Parallax background with Ken Burns effect */}
      <ParallaxBackground
        src="/images/nhlHorizon.jpg"
        kenBurns={true}
        speed={0.25}
      />

      {/* Noise texture overlay */}
      <NoiseOverlay opacity={0.04} />

      {/* Mouse-following spotlight */}
      <Spotlight size={800} className="opacity-50" />

      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand orb-small absolute -left-32 top-1/4 opacity-25" />
      <div className="ambient-orb orb-accent orb-small absolute -right-24 bottom-1/4 opacity-20" />

      {/* Content */}
      <motion.div
        className="container relative z-10 mt-20 sm:mt-24 md:mt-28 pb-24 lg:pb-32 max-w-5xl text-left text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline with word-by-word animation */}
        <motion.h1
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          variants={itemVariants}
        >
          {headlineWords.slice(0, 2).map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              className={
                i === 1
                  ? "bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-transparent"
                  : ""
              }
            >
              {word}{" "}
            </motion.span>
          ))}
          <br className="hidden sm:block" />
          {headlineWords.slice(2).map((word, i) => (
            <motion.span
              key={i + 2}
              custom={i + 2}
              variants={wordVariants}
              className={
                i === 0
                  ? "bg-gradient-to-r from-cyan-300 via-cyan-400 to-white bg-clip-text text-transparent"
                  : ""
              }
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle - loss-framed persuasive copy */}
        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-8 max-w-2xl text-lg sm:text-xl text-slate-200/90 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* Urgency indicator */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm text-cyan-300/80 font-medium"
        >
          {hero.urgencyIndicator}
        </motion.p>

        {/* CTAs - updated with persuasive language */}
        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-10 flex flex-wrap gap-4"
        >
          <Link href="/contact">
            <Button variant="gradient" size="lg" className="group">
              {hero.ctas.primary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="glass" size="lg" className="group">
              {hero.ctas.secondary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

      </motion.div>

      {/* Scroll indicator - positioned outside content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>

      {/* Bottom gradient fade - only in dark mode */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-transparent to-transparent dark:from-background dark:via-background/50" />
    </section>
  );
}
