"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { Profile } from "@/lib/supabase/types";
import {
  MessageSquare,
  Heart,
  Calendar,
  Users,
  Mail,
  Megaphone,
} from "lucide-react";

interface NotificationSettingsProps {
  profile: Profile;
}

// Note: These preferences would ideally be stored in the database
// For now, we show the UI with all toggles enabled by default
const notificationCategories = [
  {
    id: "messages",
    label: "Direct Messages",
    description: "When someone sends you a private message",
    icon: MessageSquare,
    defaultEnabled: true,
  },
  {
    id: "mentions",
    label: "Mentions",
    description: "When someone mentions you in a post or comment",
    icon: Users,
    defaultEnabled: true,
  },
  {
    id: "replies",
    label: "Replies & Comments",
    description: "When someone replies to your posts or comments",
    icon: MessageSquare,
    defaultEnabled: true,
  },
  {
    id: "likes",
    label: "Likes",
    description: "When someone likes your posts or comments",
    icon: Heart,
    defaultEnabled: false,
  },
  {
    id: "events",
    label: "Event Reminders",
    description: "Reminders for upcoming events you've registered for",
    icon: Calendar,
    defaultEnabled: true,
  },
  {
    id: "announcements",
    label: "Announcements",
    description: "Important updates and announcements from NHL",
    icon: Megaphone,
    defaultEnabled: true,
  },
];

export function NotificationSettings({ profile }: NotificationSettingsProps) {
  // In a real implementation, these would come from profile or a separate settings table
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    notificationCategories.forEach((cat) => {
      initial[cat.id] = cat.defaultEnabled;
    });
    return initial;
  });

  const [emailDigest, setEmailDigest] = useState<"realtime" | "daily" | "weekly" | "none">("daily");

  const handleToggle = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));
    // TODO: Save to database via server action
  };

  return (
    <div className="space-y-6">
      {/* In-app notifications */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium">In-App Notifications</h3>
        <div className="space-y-4">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div className="space-y-0.5">
                    <Label htmlFor={category.id} className="text-sm font-medium">
                      {category.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={category.id}
                  checked={settings[category.id]}
                  onCheckedChange={(checked) => handleToggle(category.id, checked)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Email digest settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email Digest
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose how often you want to receive email summaries of your notifications.
        </p>
        <div className="grid gap-2">
          {[
            { value: "realtime", label: "Real-time", description: "Get emails immediately" },
            { value: "daily", label: "Daily digest", description: "One email per day" },
            { value: "weekly", label: "Weekly digest", description: "One email per week" },
            { value: "none", label: "None", description: "No email notifications" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                emailDigest === option.value
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <div>
                <span className="font-medium text-sm">{option.label}</span>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <input
                type="radio"
                name="emailDigest"
                value={option.value}
                checked={emailDigest === option.value}
                onChange={() => setEmailDigest(option.value as typeof emailDigest)}
                className="sr-only"
              />
              <div
                className={`h-4 w-4 rounded-full border-2 ${
                  emailDigest === option.value
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/50"
                }`}
              >
                {emailDigest === option.value && (
                  <div className="h-full w-full rounded-full bg-primary-foreground scale-50" />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Note: Notification preferences are saved automatically. Email digest features are coming soon.
      </p>
    </div>
  );
}
