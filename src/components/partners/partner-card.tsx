import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Partner } from "@/lib/supabase/types";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface PartnerCardProps {
  partner: Partner;
}

const categoryLabels = {
  search_firm: "Executive Search",
  ai_vendor: "AI & Technology",
  consultant: "Consulting",
};

const categoryColors = {
  search_firm: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ai_vendor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  consultant: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Link href={`/partners/${partner.slug}`}>
      <Card className="card-lift h-full overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Logo placeholder */}
            <div className="shrink-0 w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
              {partner.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-muted-foreground">
                  {partner.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{partner.name}</h3>
                {partner.is_verified && (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                )}
              </div>

              <Badge
                className={`mt-1.5 ${categoryColors[partner.category]} border-0`}
              >
                {categoryLabels[partner.category]}
              </Badge>
            </div>

            {partner.is_featured && (
              <Badge variant="secondary" className="shrink-0">
                Featured
              </Badge>
            )}
          </div>

          {partner.description && (
            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {partner.description}
            </p>
          )}

          {partner.website_url && (
            <div className="mt-4 flex items-center text-sm text-primary">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              <span className="truncate">
                {new URL(partner.website_url).hostname}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
