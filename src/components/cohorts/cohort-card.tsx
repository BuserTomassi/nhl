import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/dashboard/tier-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Cohort, MembershipTier } from "@/lib/supabase/types";
import { format } from "date-fns";
import { Users, Calendar, GraduationCap } from "lucide-react";

interface CohortCardProps {
  cohort: Cohort & {
    facilitator?: { id: string; full_name: string | null; avatar_url: string | null } | null;
  };
  progress?: number;
  isMember?: boolean;
}

export function CohortCard({ cohort, progress, isMember }: CohortCardProps) {
  const facilitatorInitials = cohort.facilitator?.full_name
    ? cohort.facilitator.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <Link href={`/cohorts/${cohort.slug}`}>
      <Card className="card-lift h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{cohort.name}</h3>
                {isMember && (
                  <Badge variant="outline" className="text-xs">
                    Enrolled
                  </Badge>
                )}
              </div>
              <TierBadge tier={cohort.tier} size="sm" className="mt-1" />
            </div>
          </div>

          {cohort.description && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {cohort.description}
            </p>
          )}

          {/* Progress bar if member */}
          {isMember && progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {cohort.member_count}
                {cohort.max_members && ` / ${cohort.max_members}`}
              </span>
            </div>

            {cohort.starts_at && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(cohort.starts_at), "MMM d, yyyy")}</span>
              </div>
            )}
          </div>

          {/* Facilitator */}
          {cohort.facilitator && (
            <div className="mt-3 pt-3 border-t flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={cohort.facilitator.avatar_url || undefined} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {facilitatorInitials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                Facilitated by {cohort.facilitator.full_name || "TBD"}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
