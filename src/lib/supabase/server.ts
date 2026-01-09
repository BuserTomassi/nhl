/**
 * Supabase Server Client
 *
 * Use this in Server Components, Server Actions, and API Routes.
 * This client handles cookie-based auth automatically.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Creates a Supabase client for use on the server.
 * Handles session management via cookies automatically.
 *
 * @example
 * ```tsx
 * // In a Server Component
 * import { createClient } from "@/lib/supabase/server";
 *
 * export default async function Page() {
 *   const supabase = await createClient();
 *   const { data } = await supabase.from("profiles").select("*");
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // In a Server Action
 * "use server";
 * import { createClient } from "@/lib/supabase/server";
 *
 * export async function updateProfile(formData: FormData) {
 *   const supabase = await createClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 *   // ...
 * }
 * ```
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // The `setAll` method is called from a Server Component.
          // This can be ignored if you have middleware refreshing sessions.
        }
      },
    },
  });
}

/**
 * Creates a Supabase admin client with the service role key.
 *
 * WARNING: This bypasses RLS! Only use for admin operations.
 * NEVER expose this client or its results to users.
 *
 * @example
 * ```tsx
 * // In an API route for admin operations
 * import { createAdminClient } from "@/lib/supabase/server";
 *
 * export async function POST(request: Request) {
 *   const supabase = createAdminClient();
 *   // Perform admin operations that bypass RLS
 * }
 * ```
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin environment variables. " +
        "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  // Using createServerClient without cookies for service role
  return createServerClient<Database>(supabaseUrl, serviceRoleKey, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        // No-op for service role client
      },
    },
  });
}
