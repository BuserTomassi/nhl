"use client";

import { useState, useRef } from "react";
import { uploadAvatar } from "@/lib/actions/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/supabase/types";
import { Camera, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  profile: Profile;
}

export function AvatarUpload({ profile }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile.email[0].toUpperCase();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const result = await uploadAvatar(formData);

      if (!result.success) {
        setError(result.error || "Upload failed");
        setPreviewUrl(null);
      }
    } catch {
      setError("An error occurred during upload");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={previewUrl || profile.avatar_url || undefined} />
          <AvatarFallback className="text-xl bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Photo
        </Button>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG, GIF, or WebP. Max 5MB.
        </p>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
