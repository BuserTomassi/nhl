/**
 * Supabase Middleware Utilities
 * 
 * Used in Next.js middleware to refresh auth sessions
 * and protect routes based on authentication status.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
// import type { Database } from "./types"; // Uncomment after generating types

/**
 * Updates the Supabase session in middleware.
 * This should be called from your middleware.ts file.
 * 
 * @example
 * ```tsx
 * // middleware.ts
 * import { updateSession } from "@/lib/supabase/middleware";
 * 
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 * 
 * export const config = {
 *   matcher: [
 *     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
 *   ],
 * };
 * ```
 */
export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase is not configured, pass through
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    // Uncomment after generating types:
    // const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if exists
  // This is important for keeping the session alive
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes
  const protectedPaths = ["/dashboard", "/spaces", "/profile"];
  const authPaths = ["/login", "/signup"];
  const { pathname } = request.nextUrl;

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

/**
 * Helper to check if user has required tier access.
 * Use this in middleware for tier-gated routes.
 * 
 * Note: For more complex tier checks, use RLS policies instead.
 */
export function checkTierAccess(
  userTier: string | undefined,
  requiredTier: "silver" | "gold" | "platinum" | "diamond"
): boolean {
  const tierLevels: Record<string, number> = {
    silver: 1,
    gold: 2,
    platinum: 3,
    diamond: 4,
  };

  const userLevel = tierLevels[userTier || "silver"] || 0;
  const requiredLevel = tierLevels[requiredTier] || 0;

  return userLevel >= requiredLevel;
}
