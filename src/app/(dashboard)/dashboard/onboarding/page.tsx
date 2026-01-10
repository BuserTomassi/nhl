import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingForm } from "./onboarding-form";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Handle missing profile (error or null data)
  if (error || !profile) {
    redirect("/auth/login");
  }

  // If already completed onboarding, go to dashboard
  if (profile.onboarding_completed) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to NHL</h1>
          <p className="text-muted-foreground">
            Let&apos;s set up your profile so other members can connect with you
          </p>
        </div>

        <div className="card-surface p-6 sm:p-8">
          <OnboardingForm profile={profile} />
        </div>
      </div>
    </div>
  );
}
