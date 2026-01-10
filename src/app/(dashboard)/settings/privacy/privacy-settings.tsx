"use client";

import { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/supabase/types";
import { updatePrivacySettings } from "@/lib/actions/settings";
import {
  Eye,
  EyeOff,
  Users,
  MessageSquare,
  Search,
  Loader2,
  Check,
} from "lucide-react";

interface PrivacySettingsProps {
  profile: Profile;
}

export function PrivacySettings({ profile }: PrivacySettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [isPublic, setIsPublic] = useState(profile.is_public);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showInSearch, setShowInSearch] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updatePrivacySettings({
        isPublic,
      });
      
      if (!result.error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  };

  const hasChanges = isPublic !== profile.is_public;

  return (
    <div className="space-y-6">
      {/* Profile visibility */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Profile Visibility</h3>
        
        <div className="flex items-center justify-between gap-4 p-4 rounded-lg border">
          <div className="flex items-start gap-3">
            {isPublic ? (
              <Eye className="h-5 w-5 mt-0.5 text-primary" />
            ) : (
              <EyeOff className="h-5 w-5 mt-0.5 text-muted-foreground" />
            )}
            <div className="space-y-0.5">
              <Label htmlFor="isPublic" className="text-sm font-medium">
                Public Profile
              </Label>
              <p className="text-sm text-muted-foreground">
                {isPublic 
                  ? "Your profile is visible to all NHL members"
                  : "Your profile is hidden from the member directory"
                }
              </p>
            </div>
          </div>
          <Switch
            id="isPublic"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Note: Regardless of this setting, members in your spaces and cohorts can still see your name and avatar.
        </p>
      </div>

      <Separator />

      {/* Activity visibility */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Activity & Presence</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="onlineStatus" className="text-sm font-medium">
                  Show Online Status
                </Label>
                <p className="text-sm text-muted-foreground">
                  Let others see when you&apos;re active on NHL
                </p>
              </div>
            </div>
            <Switch
              id="onlineStatus"
              checked={showOnlineStatus}
              onCheckedChange={setShowOnlineStatus}
              disabled
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Search className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="searchable" className="text-sm font-medium">
                  Appear in Search
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow other members to find you via search
                </p>
              </div>
            </div>
            <Switch
              id="searchable"
              checked={showInSearch}
              onCheckedChange={setShowInSearch}
              disabled
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground italic">
          These settings will be available in a future update.
        </p>
      </div>

      <Separator />

      {/* Messaging */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Messaging</h3>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div className="space-y-0.5">
              <Label htmlFor="allowMessages" className="text-sm font-medium">
                Allow Direct Messages
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow other members to send you private messages
              </p>
            </div>
          </div>
          <Switch
            id="allowMessages"
            checked={allowMessages}
            onCheckedChange={setAllowMessages}
            disabled
          />
        </div>

        <p className="text-xs text-muted-foreground italic">
          Message settings will be available in a future update.
        </p>
      </div>

      <Separator />

      {/* Save button */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={handleSave} 
          disabled={isPending || !hasChanges}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {hasChanges && !saved && (
          <span className="text-sm text-muted-foreground">
            You have unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}
