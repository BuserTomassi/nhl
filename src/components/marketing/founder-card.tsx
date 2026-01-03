"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { founder } from "@/data/social-proof";

interface FounderCardProps {
  variant?: "compact" | "full";
  className?: string;
}

export function FounderCard({ variant = "compact", className = "" }: FounderCardProps) {
  if (variant === "full") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`p-8 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 ${className}`}
      >
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Photo */}
          <div className="md:col-span-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              {/* Placeholder for founder image */}
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/40">
                {founder.name.split(" ").map(n => n[0]).join("")}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-headline text-2xl font-bold text-foreground">
                  {founder.name}
                </h3>
                <p className="text-primary font-medium">{founder.title}</p>
              </div>
              <a
                href={founder.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 mb-6">
              {founder.credentials.map((cred, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-muted-foreground"
                >
                  {cred}
                </span>
              ))}
            </div>

            {/* Full bio */}
            <div className="space-y-4">
              {founder.fullBio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
          {/* Placeholder for founder image */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary/60">
            {founder.name.split(" ").map(n => n[0]).join("")}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{founder.name}</h4>
          <p className="text-sm text-primary font-medium">{founder.title}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {founder.credentials.slice(0, 2).map((cred, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-muted-foreground"
              >
                {cred}
              </span>
            ))}
          </div>
        </div>
        <a
          href={founder.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {founder.shortBio}
      </p>
    </motion.div>
  );
}

