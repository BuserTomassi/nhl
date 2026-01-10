import { createClient } from "@/lib/supabase/server";
import { Header } from "./header";

/**
 * Server-side wrapper for the Header component.
 * Fetches user profile data server-side and passes it to the client component.
 */
export async function HeaderWrapper() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return <Header initialProfile={profile} />;
}
