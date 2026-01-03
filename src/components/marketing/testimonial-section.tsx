"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "./section-heading";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Next Horizon Leadership connected us with the perfect executive search partner. The quality of connections and the trust within the network is unmatched.",
    author: "Sarah Chen",
    role: "Chief People Officer",
    company: "Fortune 500 Tech Company",
  },
  {
    quote:
      "Being part of this community has transformed how we approach talent acquisition. The insights from fellow CHROs are invaluable.",
    author: "Michael Rodriguez",
    role: "VP of Human Resources",
    company: "Global Financial Services",
  },
  {
    quote:
      "The curated approach to matching leaders with partners creates genuine, lasting relationships that drive real results.",
    author: "Jennifer Walsh",
    role: "CEO",
    company: "Healthcare Innovation Group",
  },
];

export function TestimonialSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950" />

      {/* Texture */}
      <div className="absolute inset-0 texture-topo opacity-30" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by Industry Leaders"
          subtitle="Hear from the executives and partners who have experienced the Next Horizon Leadership difference."
        />

        <div className="grid gap-6 lg:gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              <div className="h-full rounded-2xl bg-white dark:bg-slate-800/50 p-6 sm:p-8 shadow-sm border border-slate-200/70 dark:border-white/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                {/* Quote icon */}
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Quote className="h-5 w-5" />
                </div>

                {/* Quote text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

