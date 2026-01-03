"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingShapesProps {
  className?: string;
}

export function FloatingShapes({ className }: FloatingShapesProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Large gradient orb */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.18 195 / 0.15), transparent 70%)",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium floating shape */}
      <motion.div
        className="absolute top-1/3 -left-20 w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.35 0.12 250 / 0.12), transparent 70%)",
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small accent shape */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.15 55 / 0.1), transparent 70%)",
        }}
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Geometric shape - diamond */}
      <motion.div
        className="absolute top-1/2 right-10 w-16 h-16 rotate-45"
        style={{
          background: "linear-gradient(135deg, oklch(0.65 0.18 195 / 0.1), oklch(0.35 0.12 250 / 0.1))",
          borderRadius: "4px",
        }}
        animate={{
          y: [0, -30, 0],
          rotate: [45, 135, 45],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

