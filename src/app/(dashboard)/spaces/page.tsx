import { createClient } from "@/lib/supabase/server";
import { SpaceCard } from "@/components/spaces/space-card";
import { DashboardPageHeader } from "@/components/dashboard";
import { MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SpacesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get all accessible spaces
  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .eq("is_archived", false)
    .order("member_count", { ascending: false });

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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DashboardPageHeader
        title="Spaces"
        description="Join discussions with peers, share insights, and connect with leaders in your field."
      />

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
      <section>
        <h2 className="text-lg font-semibold mb-4">Discover Spaces</h2>
        {otherSpaces.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No more spaces to discover</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} isMember={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
