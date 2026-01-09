/**
 * Supabase Database Types
 * 
 * This file will be overwritten by auto-generated types.
 * Run the following command after setting up your Supabase project:
 * 
 * ```bash
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/types.ts
 * ```
 * 
 * Or for local development:
 * 
 * ```bash
 * npx supabase gen types typescript --local > src/lib/supabase/types.ts
 * ```
 */

/**
 * Placeholder Database type
 * Replace this with generated types from Supabase CLI
 */
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
          tier: "silver" | "gold" | "platinum" | "diamond";
          role: "member" | "partner" | "admin";
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
          tier?: "silver" | "gold" | "platinum" | "diamond";
          role?: "member" | "partner" | "admin";
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
          tier?: "silver" | "gold" | "platinum" | "diamond";
          role?: "member" | "partner" | "admin";
          updated_at?: string;
        };
      };
      // Add more tables as schema is developed
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      membership_tier: "silver" | "gold" | "platinum" | "diamond";
      user_role: "member" | "partner" | "admin";
      partner_category: "search_firm" | "ai_vendor" | "consultant";
    };
  };
};

/**
 * Helper types for common table operations
 */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
