import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth callback handler for Supabase magic link authentication
 *
 * This route handles the redirect from Supabase after a user clicks
 * the magic link in their email. It exchanges the auth code for a session.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard";
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set(
      "error",
      errorDescription || "Authentication failed"
    );
    return NextResponse.redirect(loginUrl);
  }

  if (code) {
    const supabase = await createClient();

    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("error", exchangeError.message);
      return NextResponse.redirect(loginUrl);
    }

    // Successfully authenticated - check if profile needs onboarding
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      // Update last_seen_at
      await supabase
        .from("profiles")
        .update({ last_seen_at: new Date().toISOString() })
        .eq("id", user.id);

      // If onboarding not completed, redirect there instead
      if (profile && !profile.onboarding_completed) {
        return NextResponse.redirect(
          new URL("/dashboard/onboarding", request.url)
        );
      }
    }

    // Redirect to the intended destination
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // No code present - redirect to login
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
