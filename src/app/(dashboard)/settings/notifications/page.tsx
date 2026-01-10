import { createClient } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationSettings } from "./notification-settings";
import { Bell } from "lucide-react";

export default async function NotificationsPage() {
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
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how and when you want to be notified about activity in NHL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationSettings profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
