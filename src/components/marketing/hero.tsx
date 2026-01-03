"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[65vh] sm:min-h-[70vh] lg:min-h-[75vh] items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_45%] sm:object-[center_50%]"
          sizes="100vw"
        />
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/50 to-slate-900/90" />
        
        {/* Accent color wash */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-accent/10 mix-blend-overlay"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Ambient orbs */}
      <div className="ambient-orb orb-brand orb-small absolute -left-32 top-1/4 opacity-20" />
      <div className="ambient-orb orb-accent orb-small absolute -right-24 bottom-1/4 opacity-15" />

      {/* Content */}
      <div className="container relative z-10 mt-20 sm:mt-24 md:mt-28 max-w-5xl text-left text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Shaping the Future
          <br className="hidden sm:block" /> of Leadership
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-200/90 leading-relaxed"
        >
          Next Horizon Leadership empowers forward-looking CEOs, CHROs, and
          talent leaders by connecting them with world-class search partners,
          leading AI innovators, and organizational experts.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="/contact"
            className="btn-glow inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="/services"
            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

