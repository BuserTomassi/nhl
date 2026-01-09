import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/dashboard/tier-badge";
import type { Space } from "@/lib/supabase/types";
import { Users, MessageSquare, Lock } from "lucide-react";

interface SpaceCardProps {
  space: Space;
  isMember: boolean;
}

export function SpaceCard({ space, isMember }: SpaceCardProps) {
  const isPrivate = space.visibility === "private";

  return (
    <Link href={`/spaces/${space.slug}`}>
      <Card className="card-lift h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
              {space.icon || "💬"}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{space.name}</h3>
                {isPrivate && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
              </div>

              <div className="flex items-center gap-2 mt-1">
                {space.tier_required !== "silver" && (
                  <TierBadge tier={space.tier_required} size="sm" showIcon={false} />
                )}
                {isMember && (
                  <Badge variant="outline" className="text-xs">
                    Joined
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {space.description && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {space.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {space.member_count} members
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {space.post_count} posts
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
