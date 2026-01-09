import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { CohortCard } from "@/components/cohorts/cohort-card";
import { PageHeader } from "@/components/marketing/page-header";
import { GraduationCap } from "lucide-react";

export default async function CohortsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get user's tier
  const { data: profile } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", user.id)
    .single();

  // Only Platinum and Diamond can access cohorts
  if (!profile || !["platinum", "diamond"].includes(profile.tier)) {
    redirect("/dashboard");
  }

  // Get user's cohorts
  const { data: memberships } = await supabase
    .from("cohort_members")
    .select(
      `
      *,
      cohort:cohorts(
        *,
        facilitator:profiles!cohorts_facilitator_id_fkey(id, full_name, avatar_url)
      )
    `
    )
    .eq("profile_id", user.id);

  // Get available cohorts user can join
  const { data: availableCohorts } = await supabase
    .from("cohorts")
    .select(
      `
      *,
      facilitator:profiles!cohorts_facilitator_id_fkey(id, full_name, avatar_url)
    `
    )
    .eq("is_active", true)
    .order("starts_at", { ascending: true });

  const memberCohortIds = new Set(memberships?.map((m) => m.cohort_id) || []);
  const myCohorts = memberships?.map((m) => m.cohort) || [];
  const otherCohorts =
    availableCohorts?.filter((c) => !memberCohortIds.has(c.id)) || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Learning Cohorts"
        description="Join structured learning programs with peer leaders and expert facilitators."
      />

      {/* My Cohorts */}
      {myCohorts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Your Cohorts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myCohorts.map((cohort) => {
              const membership = memberships?.find(
                (m) => m.cohort_id === cohort.id
              );
              return (
                <CohortCard
                  key={cohort.id}
                  cohort={cohort}
                  progress={membership?.progress_percent}
                  isMember
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Available Cohorts */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Available Cohorts</h2>
        {otherCohorts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No additional cohorts available at this time</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherCohorts.map((cohort) => (
              <CohortCard key={cohort.id} cohort={cohort} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
