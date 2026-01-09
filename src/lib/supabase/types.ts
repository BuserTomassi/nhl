/**
 * Supabase Database Types
 *
 * This file contains typed definitions for the NHL database schema.
 * After running migrations, regenerate with:
 *
 * ```bash
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/types.ts
 * ```
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          company: string | null;
          title: string | null;
          bio: string | null;
          linkedin_url: string | null;
          tier: Database["public"]["Enums"]["membership_tier"];
          role: Database["public"]["Enums"]["user_role"];
          is_public: boolean;
          onboarding_completed: boolean;
          last_seen_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          title?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          tier?: Database["public"]["Enums"]["membership_tier"];
          role?: Database["public"]["Enums"]["user_role"];
          is_public?: boolean;
          onboarding_completed?: boolean;
          last_seen_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          company?: string | null;
          title?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          tier?: Database["public"]["Enums"]["membership_tier"];
          role?: Database["public"]["Enums"]["user_role"];
          is_public?: boolean;
          onboarding_completed?: boolean;
          last_seen_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          id: string;
          profile_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          website_url: string | null;
          category: Database["public"]["Enums"]["partner_category"];
          is_verified: boolean;
          is_featured: boolean;
          contact_email: string | null;
          tier_visible_to: Database["public"]["Enums"]["membership_tier"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          category: Database["public"]["Enums"]["partner_category"];
          is_verified?: boolean;
          is_featured?: boolean;
          contact_email?: string | null;
          tier_visible_to?: Database["public"]["Enums"]["membership_tier"];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string | null;
          category?: Database["public"]["Enums"]["partner_category"];
          is_verified?: boolean;
          is_featured?: boolean;
          contact_email?: string | null;
          tier_visible_to?: Database["public"]["Enums"]["membership_tier"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "partners_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      invitations: {
        Row: {
          id: string;
          email: string;
          tier: Database["public"]["Enums"]["membership_tier"];
          role: Database["public"]["Enums"]["user_role"];
          invited_by: string | null;
          token: string;
          status: Database["public"]["Enums"]["invitation_status"];
          message: string | null;
          expires_at: string;
          accepted_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          tier: Database["public"]["Enums"]["membership_tier"];
          role?: Database["public"]["Enums"]["user_role"];
          invited_by?: string | null;
          token?: string;
          status?: Database["public"]["Enums"]["invitation_status"];
          message?: string | null;
          expires_at?: string;
          accepted_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          tier?: Database["public"]["Enums"]["membership_tier"];
          role?: Database["public"]["Enums"]["user_role"];
          invited_by?: string | null;
          token?: string;
          status?: Database["public"]["Enums"]["invitation_status"];
          message?: string | null;
          expires_at?: string;
          accepted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "invitations_invited_by_fkey";
            columns: ["invited_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      spaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          cover_image_url: string | null;
          visibility: Database["public"]["Enums"]["space_visibility"];
          type: Database["public"]["Enums"]["space_type"];
          tier_required: Database["public"]["Enums"]["membership_tier"];
          cohort_id: string | null;
          created_by: string | null;
          is_archived: boolean;
          member_count: number;
          post_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          cover_image_url?: string | null;
          visibility?: Database["public"]["Enums"]["space_visibility"];
          type?: Database["public"]["Enums"]["space_type"];
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          cohort_id?: string | null;
          created_by?: string | null;
          is_archived?: boolean;
          member_count?: number;
          post_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          cover_image_url?: string | null;
          visibility?: Database["public"]["Enums"]["space_visibility"];
          type?: Database["public"]["Enums"]["space_type"];
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          cohort_id?: string | null;
          created_by?: string | null;
          is_archived?: boolean;
          member_count?: number;
          post_count?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "spaces_cohort_id_fkey";
            columns: ["cohort_id"];
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          }
        ];
      };
      space_members: {
        Row: {
          id: string;
          space_id: string;
          profile_id: string;
          role: Database["public"]["Enums"]["space_member_role"];
          joined_at: string;
          last_read_at: string | null;
        };
        Insert: {
          id?: string;
          space_id: string;
          profile_id: string;
          role?: Database["public"]["Enums"]["space_member_role"];
          joined_at?: string;
          last_read_at?: string | null;
        };
        Update: {
          id?: string;
          space_id?: string;
          profile_id?: string;
          role?: Database["public"]["Enums"]["space_member_role"];
          joined_at?: string;
          last_read_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "space_members_space_id_fkey";
            columns: ["space_id"];
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_members_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          id: string;
          space_id: string;
          author_id: string;
          title: string | null;
          content: Json;
          content_text: string;
          is_pinned: boolean;
          is_locked: boolean;
          like_count: number;
          comment_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          space_id: string;
          author_id: string;
          title?: string | null;
          content: Json;
          content_text?: string;
          is_pinned?: boolean;
          is_locked?: boolean;
          like_count?: number;
          comment_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string;
          author_id?: string;
          title?: string | null;
          content?: Json;
          content_text?: string;
          is_pinned?: boolean;
          is_locked?: boolean;
          like_count?: number;
          comment_count?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_space_id_fkey";
            columns: ["space_id"];
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          parent_id: string | null;
          content: Json;
          content_text: string;
          like_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          parent_id?: string | null;
          content: Json;
          content_text?: string;
          like_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          parent_id?: string | null;
          content?: Json;
          content_text?: string;
          like_count?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            referencedRelation: "comments";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          id: string;
          space_id: string | null;
          title: string;
          description: string | null;
          content: Json | null;
          cover_image_url: string | null;
          starts_at: string;
          ends_at: string | null;
          timezone: string;
          location_type: Database["public"]["Enums"]["event_location_type"];
          location_details: string | null;
          video_room_url: string | null;
          tier_required: Database["public"]["Enums"]["membership_tier"];
          max_attendees: number | null;
          attendee_count: number;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          space_id?: string | null;
          title: string;
          description?: string | null;
          content?: Json | null;
          cover_image_url?: string | null;
          starts_at: string;
          ends_at?: string | null;
          timezone?: string;
          location_type?: Database["public"]["Enums"]["event_location_type"];
          location_details?: string | null;
          video_room_url?: string | null;
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          max_attendees?: number | null;
          attendee_count?: number;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string | null;
          title?: string;
          description?: string | null;
          content?: Json | null;
          cover_image_url?: string | null;
          starts_at?: string;
          ends_at?: string | null;
          timezone?: string;
          location_type?: Database["public"]["Enums"]["event_location_type"];
          location_details?: string | null;
          video_room_url?: string | null;
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          max_attendees?: number | null;
          attendee_count?: number;
          is_published?: boolean;
          created_by?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_space_id_fkey";
            columns: ["space_id"];
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "events_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      event_attendees: {
        Row: {
          id: string;
          event_id: string;
          profile_id: string;
          status: Database["public"]["Enums"]["rsvp_status"];
          registered_at: string;
          attended_at: string | null;
        };
        Insert: {
          id?: string;
          event_id: string;
          profile_id: string;
          status?: Database["public"]["Enums"]["rsvp_status"];
          registered_at?: string;
          attended_at?: string | null;
        };
        Update: {
          id?: string;
          event_id?: string;
          profile_id?: string;
          status?: Database["public"]["Enums"]["rsvp_status"];
          registered_at?: string;
          attended_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey";
            columns: ["event_id"];
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "event_attendees_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      cohorts: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          tier: Database["public"]["Enums"]["membership_tier"];
          starts_at: string | null;
          ends_at: string | null;
          is_active: boolean;
          max_members: number | null;
          member_count: number;
          facilitator_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          tier?: Database["public"]["Enums"]["membership_tier"];
          starts_at?: string | null;
          ends_at?: string | null;
          is_active?: boolean;
          max_members?: number | null;
          member_count?: number;
          facilitator_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          tier?: Database["public"]["Enums"]["membership_tier"];
          starts_at?: string | null;
          ends_at?: string | null;
          is_active?: boolean;
          max_members?: number | null;
          member_count?: number;
          facilitator_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cohorts_facilitator_id_fkey";
            columns: ["facilitator_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      cohort_members: {
        Row: {
          id: string;
          cohort_id: string;
          profile_id: string;
          status: Database["public"]["Enums"]["cohort_member_status"];
          progress_percent: number;
          joined_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          cohort_id: string;
          profile_id: string;
          status?: Database["public"]["Enums"]["cohort_member_status"];
          progress_percent?: number;
          joined_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          cohort_id?: string;
          profile_id?: string;
          status?: Database["public"]["Enums"]["cohort_member_status"];
          progress_percent?: number;
          joined_at?: string;
          completed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cohort_members_cohort_id_fkey";
            columns: ["cohort_id"];
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cohort_members_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      resources: {
        Row: {
          id: string;
          space_id: string | null;
          cohort_id: string | null;
          title: string;
          description: string | null;
          type: Database["public"]["Enums"]["resource_type"];
          file_url: string | null;
          external_url: string | null;
          tier_required: Database["public"]["Enums"]["membership_tier"];
          download_count: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          space_id?: string | null;
          cohort_id?: string | null;
          title: string;
          description?: string | null;
          type: Database["public"]["Enums"]["resource_type"];
          file_url?: string | null;
          external_url?: string | null;
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          download_count?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          space_id?: string | null;
          cohort_id?: string | null;
          title?: string;
          description?: string | null;
          type?: Database["public"]["Enums"]["resource_type"];
          file_url?: string | null;
          external_url?: string | null;
          tier_required?: Database["public"]["Enums"]["membership_tier"];
          download_count?: number;
          created_by?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "resources_space_id_fkey";
            columns: ["space_id"];
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resources_cohort_id_fkey";
            columns: ["cohort_id"];
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "resources_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          profile_id: string;
          type: Database["public"]["Enums"]["notification_type"];
          title: string;
          body: string | null;
          link: string | null;
          is_read: boolean;
          actor_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          type: Database["public"]["Enums"]["notification_type"];
          title: string;
          body?: string | null;
          link?: string | null;
          is_read?: boolean;
          actor_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          type?: Database["public"]["Enums"]["notification_type"];
          title?: string;
          body?: string | null;
          link?: string | null;
          is_read?: boolean;
          actor_id?: string | null;
          metadata?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_actor_id_fkey";
            columns: ["actor_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: Json;
          content_text: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: Json;
          content_text?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: Json;
          content_text?: string;
          is_read?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey";
            columns: ["conversation_id"];
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "messages_sender_id_fkey";
            columns: ["sender_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      conversations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      conversation_participants: {
        Row: {
          id: string;
          conversation_id: string;
          profile_id: string;
          last_read_at: string | null;
          joined_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          profile_id: string;
          last_read_at?: string | null;
          joined_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          profile_id?: string;
          last_read_at?: string | null;
          joined_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey";
            columns: ["conversation_id"];
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversation_participants_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      likes: {
        Row: {
          id: string;
          profile_id: string;
          post_id: string | null;
          comment_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          post_id?: string | null;
          comment_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          post_id?: string | null;
          comment_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_comment_id_fkey";
            columns: ["comment_id"];
            referencedRelation: "comments";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_tier_level: {
        Args: { tier: Database["public"]["Enums"]["membership_tier"] };
        Returns: number;
      };
      has_tier_access: {
        Args: {
          user_tier: Database["public"]["Enums"]["membership_tier"];
          required_tier: Database["public"]["Enums"]["membership_tier"];
        };
        Returns: boolean;
      };
      get_user_tier: {
        Args: Record<PropertyKey, never>;
        Returns: Database["public"]["Enums"]["membership_tier"];
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      membership_tier: "silver" | "gold" | "platinum" | "diamond";
      user_role: "member" | "partner" | "admin";
      partner_category: "search_firm" | "ai_vendor" | "consultant";
      invitation_status: "pending" | "accepted" | "expired" | "revoked";
      space_visibility: "public" | "members" | "tier_gated" | "private";
      space_type: "general" | "cohort" | "private";
      space_member_role: "member" | "moderator" | "admin";
      rsvp_status: "registered" | "waitlisted" | "cancelled" | "attended";
      event_location_type: "virtual" | "in_person" | "hybrid";
      cohort_member_status: "active" | "completed" | "dropped";
      resource_type: "document" | "video" | "link" | "template";
      notification_type:
        | "mention"
        | "reply"
        | "like"
        | "event_reminder"
        | "new_post"
        | "invitation"
        | "system";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Helper types for easier access
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Commonly used types
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
export type Like = Tables<"likes">;

export type MembershipTier = Enums<"membership_tier">;
export type UserRole = Enums<"user_role">;
export type PartnerCategory = Enums<"partner_category">;
export type ResourceType = Enums<"resource_type">;
