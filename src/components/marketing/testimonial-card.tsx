"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import type { Testimonial } from "@/data/social-proof";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function TestimonialCard({
  testimonial,
  variant = "default",
  className = "",
}: TestimonialCardProps) {
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 ${className}`}
      >
        {/* Large quote icon */}
        <MessageSquareQuote className="absolute top-6 right-6 h-16 w-16 text-primary/10" />

        <blockquote className="relative z-10">
          <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 text-foreground">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            {/* Author photo */}
            <div className="relative h-14 w-14 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary/60">
                  {initials}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.title}, {testimonial.company}
              </p>
            </div>
          </div>
        </blockquote>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`p-5 rounded-xl bg-primary/5 border border-primary/10 ${className}`}
      >
        <MessageSquareQuote className="h-6 w-6 text-primary/40 mb-3" />
        <p className="text-sm italic text-muted-foreground mb-3">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="text-xs text-muted-foreground/70">
          — {testimonial.author}, {testimonial.title}
        </p>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`card-surface card-premium p-6 h-full ${className}`}
    >
      <MessageSquareQuote className="h-8 w-8 text-primary/40 mb-4" />
      <blockquote className="text-lg mb-4 italic text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 mt-auto">
        {/* Author photo */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary/60 flex-shrink-0">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

