import { createClient } from "@/lib/supabase/server";
import { SpaceCard, SpaceFilters } from "@/components/spaces";
import { DashboardPageHeader } from "@/components/dashboard";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

interface SpacesPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function SpacesPage({ searchParams }: SpacesPageProps) {
  const supabase = await createClient();
  const { search } = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Build query for spaces
  let query = supabase
    .from("spaces")
    .select("*")
    .eq("is_archived", false);

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data: spaces } = await query.order("member_count", { ascending: false });

  // Get user's memberships
  const { data: memberships } = user
    ? await supabase
        .from("space_members")
        .select("space_id")
        .eq("profile_id", user.id)
    : { data: [] };

  const memberSpaceIds = new Set(memberships?.map((m) => m.space_id) || []);

  // Separate joined and other spaces
  const joinedSpaces = spaces?.filter((s) => memberSpaceIds.has(s.id)) || [];
  const otherSpaces = spaces?.filter((s) => !memberSpaceIds.has(s.id)) || [];

  const hasResults = joinedSpaces.length > 0 || otherSpaces.length > 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Spaces"
        description="Join discussions with peers, share insights, and connect with leaders in your field."
      />

      {/* Search */}
      <SpaceFilters currentSearch={search} />

      {/* No results */}
      {!hasResults && search && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No spaces found matching &quot;{search}&quot;</p>
        </div>
      )}

      {/* Joined spaces */}
      {joinedSpaces.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Your Spaces</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {joinedSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} isMember={true} />
            ))}
          </div>
        </section>
      )}

      {/* Discover spaces */}
      {otherSpaces.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Discover Spaces</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} isMember={false} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state when no search */}
      {!hasResults && !search && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No spaces available yet</p>
        </div>
      )}
    </div>
  );
}
