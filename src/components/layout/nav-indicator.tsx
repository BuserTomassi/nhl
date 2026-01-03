"use client";

import { motion } from "framer-motion";

interface NavIndicatorProps {
  layoutId?: string;
}

export function NavIndicator({ layoutId = "nav-indicator" }: NavIndicatorProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 rounded-full bg-primary"
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
      }}
    />
  );
}

