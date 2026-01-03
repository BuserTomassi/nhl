"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ctaVariants } from "@/data/copy";
import { socialProofNumbers } from "@/data/social-proof";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">You&apos;re in!</span>
        </div>
        <p className="text-sm text-white/60">
          Check your inbox Monday morning. Welcome to the community.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={ctaVariants.newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
          required
        />
        <Button
          type="submit"
          variant="gradient"
          size="default"
          disabled={status === "loading"}
          className="shrink-0"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {ctaVariants.newsletter.primary}
              <ArrowRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </form>
      <p className="text-xs text-white/40">
        {socialProofNumbers.mondayBriefOpenRate} open rate. Unsubscribe anytime.
      </p>
    </div>
  );
}
