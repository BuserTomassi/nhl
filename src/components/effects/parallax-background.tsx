"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  speed?: number;
  kenBurns?: boolean;
}

export function ParallaxBackground({
  src,
  alt = "",
  className,
  overlayClassName,
  speed = 0.3,
  kenBurns = true,
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <motion.div
        className={cn(
          "absolute inset-0 scale-110",
          kenBurns && "animate-ken-burns"
        )}
        style={{ y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
          quality={90}
        />
      </motion.div>
      
      {/* Gradient overlays */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90",
          overlayClassName
        )}
      />
      
      {/* Accent color wash */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 mix-blend-overlay"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

