export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cohort_members: {
        Row: {
          cohort_id: string
          completed_at: string | null
          id: string
          joined_at: string
          profile_id: string
          progress_percent: number
          status: Database["public"]["Enums"]["cohort_member_status"]
        }
        Insert: {
          cohort_id: string
          completed_at?: string | null
          id?: string
          joined_at?: string
          profile_id: string
          progress_percent?: number
          status?: Database["public"]["Enums"]["cohort_member_status"]
        }
        Update: {
          cohort_id?: string
          completed_at?: string | null
          id?: string
          joined_at?: string
          profile_id?: string
          progress_percent?: number
          status?: Database["public"]["Enums"]["cohort_member_status"]
        }
        Relationships: [
          {
            foreignKeyName: "cohort_members_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cohort_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          created_at: string
          description: string | null
          ends_at: string | null
          facilitator_id: string | null
          id: string
          is_active: boolean
          max_members: number | null
          member_count: number
          name: string
          slug: string
          starts_at: string | null
          tier: Database["public"]["Enums"]["membership_tier"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          facilitator_id?: string | null
          id?: string
          is_active?: boolean
          max_members?: number | null
          member_count?: number
          name: string
          slug: string
          starts_at?: string | null
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          ends_at?: string | null
          facilitator_id?: string | null
          id?: string
          is_active?: boolean
          max_members?: number | null
          member_count?: number
          name?: string
          slug?: string
          starts_at?: string | null
          tier?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cohorts_facilitator_id_fkey"
            columns: ["facilitator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: Json
          content_text: string
          created_at: string
          id: string
          like_count: number
          parent_id: string | null
          post_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: Json
          content_text?: string
          created_at?: string
          id?: string
          like_count?: number
          parent_id?: string | null
          post_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: Json
          content_text?: string
          created_at?: string
          id?: string
          like_count?: number
          parent_id?: string | null
          post_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string
          last_read_at: string | null
          profile_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          profile_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string
          last_read_at?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          attended_at: string | null
          event_id: string
          id: string
          profile_id: string
          registered_at: string
          status: Database["public"]["Enums"]["rsvp_status"]
        }
        Insert: {
          attended_at?: string | null
          event_id: string
          id?: string
          profile_id: string
          registered_at?: string
          status?: Database["public"]["Enums"]["rsvp_status"]
        }
        Update: {
          attended_at?: string | null
          event_id?: string
          id?: string
          profile_id?: string
          registered_at?: string
          status?: Database["public"]["Enums"]["rsvp_status"]
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          attendee_count: number
          content: Json | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          id: string
          is_published: boolean
          location_details: string | null
          location_type: Database["public"]["Enums"]["event_location_type"]
          max_attendees: number | null
          space_id: string | null
          starts_at: string
          tier_required: Database["public"]["Enums"]["membership_tier"]
          timezone: string
          title: string
          updated_at: string
          video_room_url: string | null
        }
        Insert: {
          attendee_count?: number
          content?: Json | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_published?: boolean
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["event_location_type"]
          max_attendees?: number | null
          space_id?: string | null
          starts_at: string
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          timezone?: string
          title: string
          updated_at?: string
          video_room_url?: string | null
        }
        Update: {
          attendee_count?: number
          content?: Json | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          is_published?: boolean
          location_details?: string | null
          location_type?: Database["public"]["Enums"]["event_location_type"]
          max_attendees?: number | null
          space_id?: string | null
          starts_at?: string
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          timezone?: string
          title?: string
          updated_at?: string
          video_room_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string | null
          message: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["invitation_status"]
          tier: Database["public"]["Enums"]["membership_tier"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          message?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["invitation_status"]
          tier: Database["public"]["Enums"]["membership_tier"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string | null
          message?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["invitation_status"]
          tier?: Database["public"]["Enums"]["membership_tier"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          comment_id: string | null
          created_at: string
          id: string
          post_id: string | null
          profile_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          profile_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: Json
          content_text: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean
          sender_id: string
        }
        Insert: {
          content: Json
          content_text?: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id: string
        }
        Update: {
          content?: Json
          content_text?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string | null
          body: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          metadata: Json | null
          profile_id: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          metadata?: Json | null
          profile_id: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          actor_id?: string | null
          body?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          metadata?: Json | null
          profile_id?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          category: Database["public"]["Enums"]["partner_category"]
          contact_email: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          is_verified: boolean
          logo_url: string | null
          name: string
          profile_id: string | null
          slug: string
          tier_visible_to: Database["public"]["Enums"]["membership_tier"]
          updated_at: string
          website_url: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["partner_category"]
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name: string
          profile_id?: string | null
          slug: string
          tier_visible_to?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["partner_category"]
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name?: string
          profile_id?: string | null
          slug?: string
          tier_visible_to?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partners_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          comment_count: number
          content: Json
          content_text: string
          created_at: string
          id: string
          is_locked: boolean
          is_pinned: boolean
          like_count: number
          space_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          comment_count?: number
          content: Json
          content_text?: string
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          like_count?: number
          space_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          comment_count?: number
          content?: Json
          content_text?: string
          created_at?: string
          id?: string
          is_locked?: boolean
          is_pinned?: boolean
          like_count?: number
          space_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_public: boolean
          last_seen_at: string | null
          linkedin_url: string | null
          onboarding_completed: boolean
          role: Database["public"]["Enums"]["user_role"]
          tier: Database["public"]["Enums"]["membership_tier"]
          title: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_public?: boolean
          last_seen_at?: string | null
          linkedin_url?: string | null
          onboarding_completed?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          tier?: Database["public"]["Enums"]["membership_tier"]
          title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_public?: boolean
          last_seen_at?: string | null
          linkedin_url?: string | null
          onboarding_completed?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          tier?: Database["public"]["Enums"]["membership_tier"]
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          cohort_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          download_count: number
          external_url: string | null
          file_url: string | null
          id: string
          space_id: string | null
          tier_required: Database["public"]["Enums"]["membership_tier"]
          title: string
          type: Database["public"]["Enums"]["resource_type"]
          updated_at: string
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          space_id?: string | null
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          title: string
          type: Database["public"]["Enums"]["resource_type"]
          updated_at?: string
        }
        Update: {
          cohort_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          space_id?: string | null
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          title?: string
          type?: Database["public"]["Enums"]["resource_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      space_members: {
        Row: {
          id: string
          joined_at: string
          last_read_at: string | null
          profile_id: string
          role: Database["public"]["Enums"]["space_member_role"]
          space_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          last_read_at?: string | null
          profile_id: string
          role?: Database["public"]["Enums"]["space_member_role"]
          space_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          last_read_at?: string | null
          profile_id?: string
          role?: Database["public"]["Enums"]["space_member_role"]
          space_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "space_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "space_members_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          cohort_id: string | null
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_archived: boolean
          member_count: number
          name: string
          post_count: number
          slug: string
          tier_required: Database["public"]["Enums"]["membership_tier"]
          type: Database["public"]["Enums"]["space_type"]
          updated_at: string
          visibility: Database["public"]["Enums"]["space_visibility"]
        }
        Insert: {
          cohort_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_archived?: boolean
          member_count?: number
          name: string
          post_count?: number
          slug: string
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          type?: Database["public"]["Enums"]["space_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["space_visibility"]
        }
        Update: {
          cohort_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_archived?: boolean
          member_count?: number
          name?: string
          post_count?: number
          slug?: string
          tier_required?: Database["public"]["Enums"]["membership_tier"]
          type?: Database["public"]["Enums"]["space_type"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["space_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "spaces_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_space: {
        Args: { space_record: Database["public"]["Tables"]["spaces"]["Row"] }
        Returns: boolean
      }
      create_notification: {
        Args: {
          p_actor_id?: string
          p_body?: string
          p_link?: string
          p_metadata?: Json
          p_profile_id: string
          p_title: string
          p_type: Database["public"]["Enums"]["notification_type"]
        }
        Returns: string
      }
      get_or_create_conversation: {
        Args: { other_user_id: string }
        Returns: string
      }
      get_tier_level: {
        Args: { tier: Database["public"]["Enums"]["membership_tier"] }
        Returns: number
      }
      get_user_tier: {
        Args: never
        Returns: Database["public"]["Enums"]["membership_tier"]
      }
      has_tier_access: {
        Args: {
          required_tier: Database["public"]["Enums"]["membership_tier"]
          user_tier: Database["public"]["Enums"]["membership_tier"]
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      mark_notifications_read: {
        Args: { notification_ids?: string[] }
        Returns: number
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      cohort_member_status: "active" | "completed" | "dropped"
      event_location_type: "virtual" | "in_person" | "hybrid"
      invitation_status: "pending" | "accepted" | "expired" | "revoked"
      membership_tier: "silver" | "gold" | "platinum" | "diamond"
      notification_type:
        | "mention"
        | "reply"
        | "like"
        | "event_reminder"
        | "new_post"
        | "invitation"
        | "system"
      partner_category: "search_firm" | "ai_vendor" | "consultant"
      resource_type: "document" | "video" | "link" | "template"
      rsvp_status: "registered" | "waitlisted" | "cancelled" | "attended"
      space_member_role: "member" | "moderator" | "admin"
      space_type: "general" | "cohort" | "private"
      space_visibility: "public" | "members" | "tier_gated" | "private"
      user_role: "member" | "partner" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cohort_member_status: ["active", "completed", "dropped"],
      event_location_type: ["virtual", "in_person", "hybrid"],
      invitation_status: ["pending", "accepted", "expired", "revoked"],
      membership_tier: ["silver", "gold", "platinum", "diamond"],
      notification_type: [
        "mention",
        "reply",
        "like",
        "event_reminder",
        "new_post",
        "invitation",
        "system",
      ],
      partner_category: ["search_firm", "ai_vendor", "consultant"],
      resource_type: ["document", "video", "link", "template"],
      rsvp_status: ["registered", "waitlisted", "cancelled", "attended"],
      space_member_role: ["member", "moderator", "admin"],
      space_type: ["general", "cohort", "private"],
      space_visibility: ["public", "members", "tier_gated", "private"],
      user_role: ["member", "partner", "admin"],
    },
  },
} as const
