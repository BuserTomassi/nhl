/**
 * Supabase Database Types
 *
 * This file re-exports the auto-generated types from database.types.ts
 * and provides commonly used type aliases for easier access.
 *
 * To regenerate types after schema changes:
 * ```bash
 * supabase gen types typescript --project-id jxmsbgtyvamrwzxmyesn > src/lib/supabase/database.types.ts
 * ```
 */

// Re-export the auto-generated types
export type { Database, Json } from "./database.types";
export { type Database as SupabaseDatabase } from "./database.types";

import type { Database } from "./database.types";

// Helper types for easier access
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Commonly used row types
export type Profile = Tables<"profiles">;
export type Partner = Tables<"partners">;
export type Invitation = Tables<"invitations">;
export type Space = Tables<"spaces">;
export type SpaceMember = Tables<"space_members">;
export type Post = Tables<"posts">;
export type Comment = Tables<"comments">;
export type Event = Tables<"events">;
export type EventAttendee = Tables<"event_attendees">;
export type Cohort = Tables<"cohorts">;
export type CohortMember = Tables<"cohort_members">;
export type Resource = Tables<"resources">;
export type Notification = Tables<"notifications">;
export type Message = Tables<"messages">;
export type Conversation = Tables<"conversations">;
export type ConversationParticipant = Tables<"conversation_participants">;
export type Like = Tables<"likes">;

// Commonly used enum types
export type MembershipTier = Enums<"membership_tier">;
export type UserRole = Enums<"user_role">;
export type PartnerCategory = Enums<"partner_category">;
export type InvitationStatus = Enums<"invitation_status">;
export type SpaceVisibility = Enums<"space_visibility">;
export type SpaceType = Enums<"space_type">;
export type SpaceMemberRole = Enums<"space_member_role">;
export type RsvpStatus = Enums<"rsvp_status">;
export type EventLocationType = Enums<"event_location_type">;
export type CohortMemberStatus = Enums<"cohort_member_status">;
export type ResourceType = Enums<"resource_type">;
export type NotificationType = Enums<"notification_type">;
