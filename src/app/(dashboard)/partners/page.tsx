import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { PartnerGrid } from "@/components/partners/partner-grid";
import { PartnerFilters } from "@/components/partners/partner-filters";
import { DashboardPageHeader } from "@/components/dashboard";
import type { PartnerCategory } from "@/lib/supabase/types";

/**
 * Sanitize search input to prevent Supabase filter injection.
 * Escapes characters that could be used to inject filter operators.
 */
function sanitizeSearchInput(input: string): string {
  // Remove/escape characters that could inject filter operators:
  // . (operator separator), , (condition separator), ( ) (grouping)
  // Also limit length to prevent abuse
  return input
    .replace(/[.,()]/g, " ") // Replace filter operators with spaces
    .replace(/\s+/g, " ")    // Normalize whitespace
    .trim()
    .slice(0, 100);          // Limit length
}

interface PartnersPageProps {
  searchParams: Promise<{
    category?: PartnerCategory;
    search?: string;
  }>;
}

export default async function PartnersPage({ searchParams }: PartnersPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("partners")
    .select("*")
    .eq("is_verified", true)
    .order("is_featured", { ascending: false })
    .order("name");

  // Apply category filter
  if (params.category) {
    query = query.eq("category", params.category);
  }

  // Apply search filter with sanitized input
  if (params.search) {
    const sanitizedSearch = sanitizeSearchInput(params.search);
    if (sanitizedSearch) {
      query = query.or(
        `name.ilike.%${sanitizedSearch}%,description.ilike.%${sanitizedSearch}%`
      );
    }
  }

  const { data: partners } = await query;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Partner Directory"
        description="Connect with our vetted network of executive search firms, AI innovators, and organizational design experts."
      />

      <PartnerFilters
        currentCategory={params.category}
        currentSearch={params.search}
      />

      <PartnerGrid partners={partners || []} />
    </div>
  );
}
