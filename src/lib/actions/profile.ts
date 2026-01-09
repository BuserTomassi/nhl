"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ============================================================================
// SCHEMAS
// ============================================================================

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  title: z.string().optional(),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  linkedin_url: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  is_public: z.boolean().optional(),
});

const onboardingSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().max(500).optional(),
  linkedin_url: z.string().url().optional().or(z.literal("")),
});

// ============================================================================
// TYPES
// ============================================================================

export interface ProfileResult {
  success: boolean;
  error?: string;
  message?: string;
}

// ============================================================================
// UPDATE PROFILE
// ============================================================================

/**
 * Update the current user's profile
 */
export async function updateProfile(
  _prevState: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Parse form data
  const rawData = {
    full_name: formData.get("full_name") as string,
    company: (formData.get("company") as string) || undefined,
    title: (formData.get("title") as string) || undefined,
    bio: (formData.get("bio") as string) || undefined,
    linkedin_url: (formData.get("linkedin_url") as string) || undefined,
    is_public: formData.get("is_public") === "on",
  };

  // Validate
  const parsed = profileSchema.safeParse(rawData);
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
      full_name: parsed.data.full_name,
      company: parsed.data.company || null,
      title: parsed.data.title || null,
      bio: parsed.data.bio || null,
      linkedin_url: parsed.data.linkedin_url || null,
      is_public: parsed.data.is_public ?? true,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/settings/profile");
  revalidatePath("/dashboard");

  return { success: true, message: "Profile updated successfully" };
}

// ============================================================================
// COMPLETE ONBOARDING
// ============================================================================

/**
 * Complete the onboarding process
 */
export async function completeOnboarding(
  _prevState: ProfileResult | null,
  formData: FormData
): Promise<ProfileResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Parse form data
  const rawData = {
    full_name: formData.get("full_name") as string,
    company: formData.get("company") as string,
    title: formData.get("title") as string,
    bio: (formData.get("bio") as string) || undefined,
    linkedin_url: (formData.get("linkedin_url") as string) || undefined,
  };

  // Validate
  const parsed = onboardingSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  // Update profile and mark onboarding complete
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.full_name,
      company: parsed.data.company,
      title: parsed.data.title,
      bio: parsed.data.bio || null,
      linkedin_url: parsed.data.linkedin_url || null,
      onboarding_completed: true,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");

  return { success: true, message: "Welcome to NHL!" };
}

// ============================================================================
// UPLOAD AVATAR
// ============================================================================

/**
 * Upload a new avatar image
 */
export async function uploadAvatar(formData: FormData): Promise<ProfileResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const file = formData.get("avatar") as File;

  if (!file || file.size === 0) {
    return { success: false, error: "No file provided" };
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: "Invalid file type. Use JPEG, PNG, GIF, or WebP." };
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "File too large. Maximum size is 5MB." };
  }

  // Generate unique filename
  const ext = file.name.split(".").pop();
  const fileName = `${user.id}/${Date.now()}.${ext}`;

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  // Get public URL
  const { data: publicUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  // Update profile with new avatar URL
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl.publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/settings/profile");
  revalidatePath("/dashboard");

  return { success: true, message: "Avatar updated successfully" };
}

// ============================================================================
// GET PROFILE
// ============================================================================

/**
 * Get a profile by ID
 */
export async function getProfile(profileId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .single();

  if (error) {
    return null;
  }

  return data;
}
