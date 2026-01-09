import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { MembershipTier } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { Crown, Gem, Award, Star } from "lucide-react";

interface TierBadgeProps extends Omit<BadgeProps, "variant"> {
  tier: MembershipTier;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const tierIcons = {
  silver: Star,
  gold: Award,
  platinum: Crown,
  diamond: Gem,
};

const tierLabels = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

export function TierBadge({
  tier,
  showIcon = true,
  size = "md",
  className,
  ...props
}: TierBadgeProps) {
  const Icon = tierIcons[tier];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  };

  return (
    <Badge
      variant={tier}
      className={cn("gap-1", sizeClasses[size], className)}
      {...props}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {tierLabels[tier]}
    </Badge>
  );
}
