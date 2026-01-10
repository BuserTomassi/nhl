"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// ============================================================================
// SCHEMAS
// ============================================================================

const emailSchema = z.string().email("Please enter a valid email address");

const signupSchema = z.object({
  email: emailSchema,
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  title: z.string().optional(),
});

// ============================================================================
// TYPES
// ============================================================================

export interface AuthResult {
  success: boolean;
  error?: string;
  message?: string;
  redirectTo?: string;
}

// ============================================================================
// MAGIC LINK LOGIN
// ============================================================================

/**
 * Send a magic link to the user's email for passwordless login
 */
export async function signInWithMagicLink(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";

  // Validate email
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Check your email for the magic link!",
  };
}

// ============================================================================
// PASSWORD LOGIN (for development/testing)
// ============================================================================

/**
 * Sign in with email and password
 * Primarily used for testing with seed accounts
 */
export async function signInWithPassword(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";

  // Validate email
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      error: "Password must be at least 6 characters",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    redirectTo,
  };
}

// ============================================================================
// SIGN UP WITH INVITE TOKEN
// ============================================================================

/**
 * Sign up a new user, optionally with an invitation token
 */
export async function signUpWithInvite(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const email = formData.get("email") as string;
  const fullName = formData.get("fullName") as string;
  const company = formData.get("company") as string | undefined;
  const title = formData.get("title") as string | undefined;
  const inviteToken = formData.get("inviteToken") as string | undefined;

  // Validate input
  const parsed = signupSchema.safeParse({ email, fullName, company, title });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  const supabase = await createClient();

  // If there's an invite token, verify it first
  if (inviteToken) {
    const { data: invitation, error: inviteError } = await supabase
      .from("invitations")
      .select("*")
      .eq("token", inviteToken)
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString())
      .single();

    if (inviteError || !invitation) {
      return {
        success: false,
        error: "Invalid or expired invitation",
      };
    }

    // Verify email matches invitation
    if (invitation.email.toLowerCase() !== email.toLowerCase()) {
      return {
        success: false,
        error: "Email does not match invitation",
      };
    }
  }

  // Send magic link for signup
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?redirectTo=/dashboard/onboarding`,
      data: {
        full_name: fullName,
        company: company || null,
        title: title || null,
      },
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Check your email to complete signup!",
  };
}

// ============================================================================
// SIGN OUT
// ============================================================================

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ============================================================================
// GET CURRENT USER
// ============================================================================

/**
 * Get the current authenticated user and their profile
 */
export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile,
  };
}

// ============================================================================
// VERIFY INVITATION TOKEN
// ============================================================================

/**
 * Verify an invitation token and return invitation details
 */
export async function verifyInvitationToken(token: string) {
  const supabase = await createClient();

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select(
      `
      *,
      invited_by:profiles!invitations_invited_by_fkey(full_name, avatar_url)
    `
    )
    .eq("token", token)
    .eq("status", "pending")
    .gt("expires_at", new Date().toISOString())
    .single();

  if (error || !invitation) {
    return null;
  }

  return invitation;
}
