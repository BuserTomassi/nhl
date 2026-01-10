import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { MemberCard } from "@/components/members/member-card";
import { MemberFilters } from "@/components/members/member-filters";
import { DashboardPageHeader } from "@/components/dashboard";
import type { MembershipTier } from "@/lib/supabase/types";
import { Users } from "lucide-react";

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

interface MembersPageProps {
  searchParams: Promise<{
    tier?: MembershipTier;
    search?: string;
  }>;
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("profiles")
    .select("*")
    .eq("is_public", true)
    .order("tier", { ascending: false })
    .order("full_name");

  // Apply tier filter
  if (params.tier) {
    query = query.eq("tier", params.tier);
  }

  // Apply search filter with sanitized input
  if (params.search) {
    const sanitizedSearch = sanitizeSearchInput(params.search);
    if (sanitizedSearch) {
      query = query.or(
        `full_name.ilike.%${sanitizedSearch}%,company.ilike.%${sanitizedSearch}%,title.ilike.%${sanitizedSearch}%`
      );
    }
  }

  const { data: members } = await query.limit(100);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Member Directory"
        description="Connect with fellow leaders, CHROs, and talent executives in our community."
      />

      <MemberFilters
        currentTier={params.tier}
        currentSearch={params.search}
      />

      {members && members.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="font-medium text-lg">No members found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}
