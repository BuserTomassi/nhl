"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/dashboard/tier-badge";
import type { Resource, MembershipTier } from "@/lib/supabase/types";
import {
  FileText,
  Video,
  Link as LinkIcon,
  FileCode,
  Download,
  ExternalLink,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource & {
    created_by?: { id: string; full_name: string | null; avatar_url: string | null } | null;
  };
}

const typeIcons = {
  document: FileText,
  video: Video,
  link: LinkIcon,
  template: FileCode,
};

const typeColors = {
  document: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  video: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  link: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  template:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type];
  const colorClass = typeColors[resource.type];

  const handleClick = () => {
    if (resource.external_url) {
      window.open(resource.external_url, "_blank");
    } else if (resource.file_url) {
      window.open(resource.file_url, "_blank");
    }
  };

  return (
    <Card className="card-lift cursor-pointer" onClick={handleClick}>
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{resource.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="capitalize text-xs">
                {resource.type}
              </Badge>
              {resource.tier_required !== "silver" && (
                <TierBadge
                  tier={resource.tier_required}
                  size="sm"
                  showIcon={false}
                />
              )}
            </div>
          </div>
        </div>

        {resource.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {resource.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {resource.download_count} downloads
          </span>
          {resource.external_url ? (
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Download className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
