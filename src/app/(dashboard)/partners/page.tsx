import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { PartnerGrid } from "@/components/partners/partner-grid";
import { PartnerFilters } from "@/components/partners/partner-filters";
import { PageHeader } from "@/components/marketing/page-header";
import type { PartnerCategory } from "@/lib/supabase/types";

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

  // Apply search filter
  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%`
    );
  }

  const { data: partners } = await query;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
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
