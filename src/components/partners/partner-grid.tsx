import { PartnerCard } from "./partner-card";
import type { Partner } from "@/lib/supabase/types";
import { Building2 } from "lucide-react";

interface PartnerGridProps {
  partners: Partner[];
}

export function PartnerGrid({ partners }: PartnerGridProps) {
  if (partners.length === 0) {
    return (
      <div className="text-center py-16">
        <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="font-medium text-lg">No partners found</h3>
        <p className="text-muted-foreground mt-1">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} />
      ))}
    </div>
  );
}
