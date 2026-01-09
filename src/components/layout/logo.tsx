"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 sm:h-9",
  md: "h-10 sm:h-12",
  lg: "h-12 sm:h-14",
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Image
          src="/images/logo.svg"
          alt="Next Horizon Leadership"
          width={36}
          height={40}
          className={cn("relative w-auto", sizeClasses[size])}
          priority
        />
      </motion.div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-headline text-base sm:text-lg font-semibold leading-tight tracking-tight">
            <span className="text-gradient-cyan">Next</span>{" "}
            <span className="text-foreground">Horizon</span>
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium">
            Leadership
          </span>
        </div>
      )}
    </Link>
  );
}
