"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileResult } from "@/lib/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "@/lib/supabase/types";
import { Loader2, Check } from "lucide-react";

interface ProfileFormProps {
  profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState<ProfileResult | null, FormData>(
    updateProfile,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          name="full_name"
          type="text"
          required
          defaultValue={profile.full_name || ""}
        />
      </div>

      {/* Email (read-only) */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          disabled
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">
          Contact support to change your email address
        </p>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          type="text"
          defaultValue={profile.company || ""}
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Job title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={profile.title || ""}
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell us about yourself..."
          className="min-h-[100px]"
          maxLength={500}
          defaultValue={profile.bio || ""}
        />
        <p className="text-xs text-muted-foreground">Max 500 characters</p>
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin_url">LinkedIn URL</Label>
        <Input
          id="linkedin_url"
          name="linkedin_url"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          defaultValue={profile.linkedin_url || ""}
        />
      </div>

      {/* Public profile toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_public"
          name="is_public"
          defaultChecked={profile.is_public}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="is_public" className="text-sm font-normal">
          Make my profile visible to other members
        </Label>
      </div>

      {/* Status messages */}
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="h-4 w-4" />
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
