"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { scarcity } from "@/data/copy";
import { socialProofNumbers } from "@/data/social-proof";

interface WaitlistFormProps {
  tier?: "diamond" | "platinum" | "gold" | "silver" | "general";
  showTierSelect?: boolean;
  scarcityMessage?: string;
  className?: string;
}

const tierOptions = [
  { value: "diamond", label: "Diamond - Invite-Only for CHROs" },
  { value: "platinum", label: "Platinum - Cohort-Based for Rising Leaders" },
  { value: "gold", label: "Gold - Full Access Membership" },
  { value: "silver", label: "Silver - Newsletter & Updates" },
];

export function WaitlistForm({
  tier = "general",
  showTierSelect = false,
  scarcityMessage,
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [selectedTier, setSelectedTier] = useState(tier);
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

  const defaultScarcityMessage =
    selectedTier === "diamond"
      ? `${socialProofNumbers.diamondSeatsTotal} seats per year. ${socialProofNumbers.diamondSeatsAvailable} currently available.`
      : scarcity.charterBenefits;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-center ${className}`}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <span className="font-semibold text-emerald-800 dark:text-emerald-200">
            You&apos;re on the list!
          </span>
        </div>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          We&apos;ll be in touch when spots open up. Charter members get priority access and founding rates.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 ${className}`}
    >
      {/* Scarcity indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
        <p className="text-sm font-medium text-primary">
          {scarcityMessage || defaultScarcityMessage}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {showTierSelect && (
          <div className="space-y-2">
            <Label htmlFor="tier" className="text-sm font-medium">
              I&apos;m interested in:
            </Label>
            <select
              id="tier"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as typeof tier)}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
            >
              {tierOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your.email@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-11 rounded-xl"
            required
          />
          <Button
            type="submit"
            variant="gradient"
            disabled={status === "loading"}
            className="shrink-0"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Join Waitlist
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Social proof */}
      <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
        <Users className="h-3 w-3" />
        {socialProofNumbers.newsletterSubscribers}+ leaders already in the network
      </p>
    </motion.div>
  );
}

