/**
 * Supabase Browser Client
 * 
 * Use this in Client Components that need Supabase access.
 * Only use when you need client-side interactivity (real-time, auth state).
 * 
 * For data fetching, prefer Server Components with the server client.
 */

import { createBrowserClient } from "@supabase/ssr";
// import type { Database } from "./types"; // Uncomment after generating types

/**
 * Creates a Supabase client for use in the browser.
 * This client uses the anon key and respects RLS policies.
 * 
 * @example
 * ```tsx
 * "use client";
 * import { createClient } from "@/lib/supabase/client";
 * 
 * export function RealtimeComponent() {
 *   const supabase = createClient();
 *   // Use for real-time subscriptions, auth state, etc.
 * }
 * ```
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
    // Uncomment after generating types:
    // return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  );
}
