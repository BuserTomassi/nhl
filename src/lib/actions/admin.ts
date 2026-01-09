"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { MembershipTier, UserRole } from "@/lib/supabase/types";

// ============================================================================
// SCHEMAS
// ============================================================================

const invitationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  tier: z.enum(["silver", "gold", "platinum", "diamond"]),
  role: z.enum(["member", "partner", "admin"]).optional(),
  message: z.string().max(500).optional(),
});

const updateMemberSchema = z.object({
  profileId: z.string().uuid(),
  tier: z.enum(["silver", "gold", "platinum", "diamond"]).optional(),
  role: z.enum(["member", "partner", "admin"]).optional(),
});

// ============================================================================
// TYPES
// ============================================================================

export interface AdminResult {
  success: boolean;
  error?: string;
  message?: string;
}

// ============================================================================
// VERIFY ADMIN
// ============================================================================

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return null;
  }

  return user;
}

// ============================================================================
// CREATE INVITATION
// ============================================================================

/**
 * Create a new invitation for a user
 */
export async function createInvitation(
  _prevState: AdminResult | null,
  formData: FormData
): Promise<AdminResult> {
  const admin = await verifyAdmin();
  if (!admin) {
    return { success: false, error: "Unauthorized" };
  }

  const rawData = {
    email: formData.get("email") as string,
    tier: formData.get("tier") as MembershipTier,
    role: (formData.get("role") as UserRole) || "member",
    message: (formData.get("message") as string) || undefined,
  };

  const parsed = invitationSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = createAdminClient();

  // Check if invitation already exists
  const { data: existing } = await supabase
    .from("invitations")
    .select("id, status")
    .eq("email", parsed.data.email)
    .eq("status", "pending")
    .single();

  if (existing) {
    return { success: false, error: "An invitation is already pending for this email" };
  }

  // Check if user already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", parsed.data.email)
    .single();

  if (existingProfile) {
    return { success: false, error: "A user with this email already exists" };
  }

  // Create invitation
  const { error } = await supabase.from("invitations").insert({
    email: parsed.data.email,
    tier: parsed.data.tier,
    role: parsed.data.role || "member",
    message: parsed.data.message || null,
    invited_by: admin.id,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/invitations");

  return { success: true, message: "Invitation sent successfully" };
}

// ============================================================================
// REVOKE INVITATION
// ============================================================================

/**
 * Revoke a pending invitation
 */
export async function revokeInvitation(invitationId: string): Promise<AdminResult> {
  const admin = await verifyAdmin();
  if (!admin) {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("invitations")
    .update({ status: "revoked" })
    .eq("id", invitationId)
    .eq("status", "pending");

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/invitations");

  return { success: true, message: "Invitation revoked" };
}

// ============================================================================
// UPDATE MEMBER
// ============================================================================

/**
 * Update a member's tier or role
 */
export async function updateMember(
  _prevState: AdminResult | null,
  formData: FormData
): Promise<AdminResult> {
  const admin = await verifyAdmin();
  if (!admin) {
    return { success: false, error: "Unauthorized" };
  }

  const rawData = {
    profileId: formData.get("profileId") as string,
    tier: formData.get("tier") as MembershipTier | undefined,
    role: formData.get("role") as UserRole | undefined,
  };

  const parsed = updateMemberSchema.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (parsed.data.tier) updateData.tier = parsed.data.tier;
  if (parsed.data.role) updateData.role = parsed.data.role;

  if (Object.keys(updateData).length === 0) {
    return { success: false, error: "No changes provided" };
  }

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", parsed.data.profileId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/members");

  return { success: true, message: "Member updated successfully" };
}

// ============================================================================
// GET INVITATIONS
// ============================================================================

/**
 * Get all invitations with pagination
 */
export async function getInvitations(page = 1, limit = 20) {
  const admin = await verifyAdmin();
  if (!admin) {
    return { data: [], total: 0 };
  }

  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count } = await supabase
    .from("invitations")
    .select(
      `
      *,
      invited_by:profiles!invitations_invited_by_fkey(full_name)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data: data || [], total: count || 0 };
}

// ============================================================================
// GET MEMBERS
// ============================================================================

/**
 * Get all members with pagination
 */
export async function getMembers(page = 1, limit = 20, tierFilter?: MembershipTier) {
  const admin = await verifyAdmin();
  if (!admin) {
    return { data: [], total: 0 };
  }

  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("profiles").select("*", { count: "exact" });

  if (tierFilter) {
    query = query.eq("tier", tierFilter);
  }

  const { data, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  return { data: data || [], total: count || 0 };
}
