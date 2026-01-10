"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ============================================================================
// SCHEMAS
// ============================================================================

const privacySettingsSchema = z.object({
  isPublic: z.boolean(),
});

// ============================================================================
// TYPES
// ============================================================================

export interface SettingsResult {
  success: boolean;
  error?: string;
  message?: string;
}

// ============================================================================
// UPDATE PRIVACY SETTINGS
// ============================================================================

/**
 * Update the current user's privacy settings
 */
export async function updatePrivacySettings(
  data: z.infer<typeof privacySettingsSchema>
): Promise<SettingsResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Validate
  const parsed = privacySettingsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  // Update profile
  const { error } = await supabase
    .from("profiles")
    .update({
      is_public: parsed.data.isPublic,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/settings/privacy");
  revalidatePath("/settings/profile");
  revalidatePath("/members");

  return { success: true, message: "Privacy settings updated" };
}
