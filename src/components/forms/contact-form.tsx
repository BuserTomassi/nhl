"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, AlertCircle, ArrowRight, Calendar } from "lucide-react";
import { ctaVariants } from "@/data/copy";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykynnpq";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const timelineOptions = [
  { value: "", label: "Select a timeline" },
  { value: "immediately", label: "Immediately - We're ready now" },
  { value: "30-days", label: "Within 30 days" },
  { value: "90-days", label: "Within 90 days" },
  { value: "exploring", label: "Just exploring options" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 px-5 py-4 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">Message sent!</p>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              We typically respond within 4 hours during business days. You&apos;ll hear from a real person, not a bot.
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 px-5 py-4 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800/30"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">Sorry, something went wrong. Please try again or email us directly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            {...register("name")}
            className={cn(
              "h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
              errors.name && "border-destructive focus:ring-destructive/20"
            )}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            {...register("email")}
            className={cn(
              "h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
              errors.email && "border-destructive focus:ring-destructive/20"
            )}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="company"
            placeholder="Your company"
            {...register("company")}
            className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-sm font-medium">
            Timeline <span className="text-muted-foreground">(optional)</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              id="timeline"
              {...register("timeline")}
              className="h-12 w-full pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm appearance-none cursor-pointer"
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          What are you trying to solve?
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your situation—leadership transitions, AI evaluation, org design challenges, or something else..."
          rows={6}
          {...register("message")}
          className={cn(
            "rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none",
            errors.message && "border-destructive focus:ring-destructive/20"
          )}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-destructive"
            >
              {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full sm:w-auto group"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {ctaVariants.contact.primary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          No pitch decks. No pressure. Just a real conversation.
        </p>
      </div>
    </motion.form>
  );
}
