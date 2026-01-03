"use client";

import { motion } from "framer-motion";
import { NoiseOverlay, Spotlight } from "@/components/effects";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative isolate pt-32 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Aurora gradient layers - animated waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 10% 50%, oklch(0.35 0.15 250 / 0.6), transparent 50%),
            radial-gradient(ellipse 80% 60% at 90% 30%, oklch(0.55 0.2 195 / 0.4), transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sweeping aurora wave 1 */}
      <motion.div
        className="absolute -inset-[100px] origin-center"
        style={{
          background: `
            conic-gradient(
              from 180deg at 70% 60%,
              transparent 0deg,
              oklch(0.6 0.18 195 / 0.25) 60deg,
              oklch(0.5 0.15 220 / 0.15) 120deg,
              transparent 180deg
            )
          `,
        }}
        animate={{
          rotate: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sweeping aurora wave 2 */}
      <motion.div
        className="absolute -inset-[50px] origin-center"
        style={{
          background: `
            conic-gradient(
              from 270deg at 30% 70%,
              transparent 0deg,
              oklch(0.45 0.12 280 / 0.2) 40deg,
              oklch(0.55 0.15 195 / 0.15) 80deg,
              transparent 140deg
            )
          `,
        }}
        animate={{
          rotate: [0, -10, 0],
          scale: [1.05, 1, 1.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Horizon glow line - the "next horizon" effect */}
      <div className="absolute left-0 right-0 bottom-[5%] h-px">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              oklch(0.65 0.18 195 / 0.5) 20%,
              oklch(0.75 0.15 195 / 0.8) 50%,
              oklch(0.65 0.18 195 / 0.5) 80%,
              transparent 100%
            )`,
            boxShadow: `
              0 0 30px oklch(0.65 0.18 195 / 0.4),
              0 0 60px oklch(0.65 0.18 195 / 0.2),
              0 0 100px oklch(0.55 0.15 220 / 0.1)
            `,
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scaleX: [0.9, 1, 0.9],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Upward glow from horizon */}
        <motion.div
          className="absolute left-[20%] right-[20%] bottom-0 h-32"
          style={{
            background: `linear-gradient(to top, 
              oklch(0.65 0.18 195 / 0.15) 0%,
              oklch(0.55 0.12 220 / 0.05) 40%,
              transparent 100%
            )`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated floating orbs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.18 195 / 0.2), transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[30%] left-[5%] w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.45 0.12 250 / 0.25), transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[30%] right-[25%] w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.15 180 / 0.3), transparent 70%)",
          filter: "blur(25px)",
        }}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Geometric accent shapes */}
      <motion.div
        className="absolute top-[20%] right-[30%] w-20 h-20 border border-cyan-400/20 rounded-lg"
        style={{ transform: "rotate(45deg)" }}
        animate={{
          rotate: [45, 135, 45],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[35%] left-[15%] w-12 h-12 border border-blue-400/15 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[45%] right-[8%] w-6 h-6 bg-cyan-400/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal light streaks */}
      <motion.div
        className="absolute inset-0 overflow-hidden opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="absolute top-0 -left-[50%] w-[200%] h-px"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.7 0.15 195 / 0.5) 30%, oklch(0.7 0.15 195 / 0.5) 70%, transparent)",
            transform: "rotate(-15deg) translateY(80px)",
          }}
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 -left-[50%] w-[200%] h-px"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.6 0.12 220 / 0.3) 40%, oklch(0.6 0.12 220 / 0.3) 60%, transparent)",
            transform: "rotate(-15deg) translateY(150px)",
          }}
          animate={{ x: ["5%", "-15%", "5%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Mouse-following spotlight */}
      <Spotlight size={700} className="opacity-40" />

      {/* Noise texture for depth */}
      <NoiseOverlay opacity={0.035} />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, oklch(0.08 0.02 250 / 0.6) 100%)`,
        }}
      />

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

    </section>
  );
}
