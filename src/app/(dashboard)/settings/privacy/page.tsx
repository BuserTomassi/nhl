import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PrivacySettings } from "./privacy-settings";
import { Shield } from "lucide-react";

export default async function PrivacyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control who can see your profile and how your information is shared.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PrivacySettings profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
