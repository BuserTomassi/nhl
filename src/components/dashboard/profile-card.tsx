import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TierBadge } from "./tier-badge";
import type { Profile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProfileCardProps {
  profile: Profile;
  showTier?: boolean;
  showCompany?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function ProfileCard({
  profile,
  showTier = true,
  showCompany = true,
  size = "md",
  href,
  className,
}: ProfileCardProps) {
  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : profile.email?.[0]?.toUpperCase() ?? "?";

  const avatarSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const nameSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={avatarSizes[size]}>
        <AvatarImage src={profile.avatar_url || undefined} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "font-medium truncate",
              nameSizes[size],
              !profile.full_name && "text-muted-foreground"
            )}
          >
            {profile.full_name || "Member"}
          </p>
          {showTier && <TierBadge tier={profile.tier} size="sm" />}
        </div>
        {showCompany && (profile.title || profile.company) && (
          <p className="text-sm text-muted-foreground truncate">
            {[profile.title, profile.company].filter(Boolean).join(" at ")}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:bg-muted/50 rounded-lg p-2 -m-2">
        {content}
      </Link>
    );
  }

  return content;
}
