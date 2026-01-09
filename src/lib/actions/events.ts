"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ============================================================================
// TYPES
// ============================================================================

export interface EventResult {
  success: boolean;
  error?: string;
  message?: string;
}

// ============================================================================
// GET EVENTS
// ============================================================================

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      *,
      created_by:profiles!events_created_by_fkey(id, full_name, avatar_url),
      space:spaces!events_space_id_fkey(id, name, slug)
    `
    )
    .eq("is_published", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

/**
 * Get past events
 */
export async function getPastEvents(limit = 20) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      *,
      created_by:profiles!events_created_by_fkey(id, full_name, avatar_url)
    `
    )
    .eq("is_published", true)
    .lt("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

/**
 * Get a single event by ID
 */
export async function getEvent(eventId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      *,
      created_by:profiles!events_created_by_fkey(id, full_name, avatar_url, tier),
      space:spaces!events_space_id_fkey(id, name, slug)
    `
    )
    .eq("id", eventId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// ============================================================================
// RSVP
// ============================================================================

/**
 * RSVP to an event
 */
export async function rsvpToEvent(eventId: string): Promise<EventResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Check if already registered
  const { data: existing } = await supabase
    .from("event_attendees")
    .select("id, status")
    .eq("event_id", eventId)
    .eq("profile_id", user.id)
    .single();

  if (existing) {
    if (existing.status === "registered") {
      return { success: false, error: "Already registered for this event" };
    }
    // Update existing registration
    await supabase
      .from("event_attendees")
      .update({ status: "registered" })
      .eq("id", existing.id);
  } else {
    // Create new registration
    const { error } = await supabase.from("event_attendees").insert({
      event_id: eventId,
      profile_id: user.id,
      status: "registered",
    });

    if (error) {
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/events");

  return { success: true, message: "Successfully registered!" };
}

/**
 * Cancel RSVP
 */
export async function cancelRsvp(eventId: string): Promise<EventResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("event_attendees")
    .update({ status: "cancelled" })
    .eq("event_id", eventId)
    .eq("profile_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/events");

  return { success: true, message: "Registration cancelled" };
}

/**
 * Check if user is registered for an event
 */
export async function isRegisteredForEvent(eventId: string): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data } = await supabase
    .from("event_attendees")
    .select("status")
    .eq("event_id", eventId)
    .eq("profile_id", user.id)
    .single();

  return data?.status === "registered";
}

/**
 * Get attendees for an event
 */
export async function getEventAttendees(eventId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("event_attendees")
    .select(
      `
      *,
      profile:profiles!event_attendees_profile_id_fkey(id, full_name, avatar_url, tier, title, company)
    `
    )
    .eq("event_id", eventId)
    .eq("status", "registered")
    .order("registered_at", { ascending: true });

  return data || [];
}
