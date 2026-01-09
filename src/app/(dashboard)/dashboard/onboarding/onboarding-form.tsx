"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { completeOnboarding, type ProfileResult } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "@/lib/supabase/types";
import {
  User,
  Building2,
  Briefcase,
  FileText,
  Linkedin,
  ArrowRight,
  Loader2,
} from "lucide-react";

interface OnboardingFormProps {
  profile: Profile;
}

export function OnboardingForm({ profile }: OnboardingFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ProfileResult | null, FormData>(
    completeOnboarding,
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Jane Smith"
            className="pl-10"
            required
            defaultValue={profile.full_name || ""}
          />
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company *</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Acme Corp"
            className="pl-10"
            required
            defaultValue={profile.company || ""}
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Job title *</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Chief People Officer"
            className="pl-10"
            required
            defaultValue={profile.title || ""}
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">
          Bio{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself and your leadership journey..."
            className="pl-10 min-h-[100px]"
            maxLength={500}
            defaultValue={profile.bio || ""}
          />
        </div>
        <p className="text-xs text-muted-foreground">Max 500 characters</p>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin_url">
          LinkedIn{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            className="pl-10"
            defaultValue={profile.linkedin_url || ""}
          />
        </div>
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button
        type="submit"
        className="w-full btn-gradient group"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4 btn-arrow-icon" />
          </>
        )}
      </Button>
    </form>
  );
}
