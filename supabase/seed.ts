#!/usr/bin/env npx tsx

/**
 * NHL Platform Database Seeder
 *
 * This script populates the database with realistic seed data for development and testing.
 *
 * Usage:
 *   npx tsx supabase/seed.ts           # Seed the database
 *   npx tsx supabase/seed.ts --clear   # Clear existing data and reseed
 *
 * Prerequisites:
 *   - SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   - Database migrations applied
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

// Import seed data
import {
  seedProfiles,
  seedPartners,
  seedSpaces,
  seedPosts,
  seedEvents,
  seedResources,
} from "./seed-data";

import type { Database } from "../src/lib/supabase/database.types";

// ============================================================================
// Configuration
// ============================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing required environment variables:");
  console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  console.error("\nMake sure these are set in .env.local");
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Parse command line arguments
const args = process.argv.slice(2);
const shouldClear = args.includes("--clear");

// ============================================================================
// Helper Functions
// ============================================================================

function log(message: string) {
  console.log(`  ${message}`);
}

function logSection(title: string) {
  console.log(`\n📦 ${title}`);
  console.log("─".repeat(50));
}

function logSuccess(count: number, entity: string) {
  console.log(`  ✅ Created ${count} ${entity}`);
}

function logError(message: string, error: unknown) {
  console.error(`  ❌ ${message}:`, error);
}

// ============================================================================
// Clear Functions
// ============================================================================

async function clearData() {
  logSection("Clearing existing data");

  // Order matters due to foreign key constraints
  const tablesToClear = [
    "likes",
    "comments",
    "posts",
    "space_members",
    "event_attendees",
    "cohort_members",
    "notifications",
    "messages",
    "conversation_participants",
    "conversations",
    "resources",
    "events",
    "cohorts",
    "spaces",
    "partners",
    "invitations",
    // Note: We don't clear profiles as they're linked to auth.users
  ] as const;

  for (const table of tablesToClear) {
    const { error } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      // Some tables might not exist or have constraints
      log(`  ⚠️  Could not clear ${table}: ${error.message}`);
    } else {
      log(`  🗑️  Cleared ${table}`);
    }
  }
}

// ============================================================================
// Seed Functions
// ============================================================================

/**
 * Seed test user profiles using the Admin API
 * Creates auth.users entries which trigger automatic profile creation,
 * then updates profiles with full seed data.
 */
async function seedProfilesData(): Promise<Map<string, string>> {
  logSection("Seeding Profiles (via Auth Admin API)");

  const profileIdMap = new Map<string, string>();
  let created = 0;
  let skipped = 0;

  for (const profile of seedProfiles) {
    try {
      // Check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers?.users?.find(
        (u) => u.email === profile.email
      );

      let userId: string;

      if (existingUser) {
        userId = existingUser.id;
        log(`User ${profile.email} already exists, updating profile...`);
        skipped++;
      } else {
        // Create auth user using Admin API
        // This triggers the handle_new_user() function which creates a basic profile
        const { data: newUser, error: createError } =
          await supabase.auth.admin.createUser({
            email: profile.email,
            password: "SeedPassword123!", // Temporary password for seed users
            email_confirm: true, // Skip email confirmation
            user_metadata: {
              full_name: profile.full_name,
            },
          });

        if (createError) {
          logError(`Failed to create user ${profile.email}`, createError.message);
          continue;
        }

        userId = newUser.user.id;
        created++;
      }

      // Update the profile with full seed data
      // The trigger creates a basic profile, we enhance it here
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          company: profile.company,
          title: profile.title,
          bio: profile.bio,
          linkedin_url: profile.linkedin_url,
          tier: profile.tier,
          role: profile.role,
          is_public: profile.is_public,
          onboarding_completed: profile.onboarding_completed,
        })
        .eq("id", userId);

      if (updateError) {
        logError(`Failed to update profile for ${profile.email}`, updateError.message);
        continue;
      }

      profileIdMap.set(profile.email, userId);
    } catch (error) {
      logError(`Error processing ${profile.email}`, error);
    }
  }

  logSuccess(created, "new auth users created");
  log(`${skipped} existing users updated`);
  log(`${profileIdMap.size} total profiles ready`);

  return profileIdMap;
}

/**
 * Get an admin profile ID from the seeded profiles
 */
async function getAdminProfileId(
  profileIdMap: Map<string, string>
): Promise<string | null> {
  // First, try to find an admin from our seed data
  const adminEmail = seedProfiles.find((p) => p.role === "admin")?.email;
  if (adminEmail && profileIdMap.has(adminEmail)) {
    const adminId = profileIdMap.get(adminEmail)!;
    log(`Using seeded admin profile: ${adminId}`);
    return adminId;
  }

  // Fallback: try to get any existing admin profile
  const { data: existingAdmin } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "admin")
    .limit(1)
    .single();

  if (existingAdmin) {
    log(`Using existing admin profile: ${existingAdmin.id}`);
    return existingAdmin.id;
  }

  log("No admin profile found. Content will be created without author assignments.");
  return null;
}

/**
 * Get a profile ID by tier for varied content authorship
 */
function getProfileIdByTier(
  profileIdMap: Map<string, string>,
  tier: string
): string | null {
  const profile = seedProfiles.find(
    (p) => p.tier === tier && profileIdMap.has(p.email)
  );
  return profile ? profileIdMap.get(profile.email) || null : null;
}

/**
 * Seed partners
 */
async function seedPartnersData(creatorId: string | null) {
  logSection("Seeding Partners");

  const partnersToInsert = seedPartners.map((partner) => ({
    ...partner,
    profile_id: null, // Partners aren't linked to profiles in seed data
  }));

  const { data, error } = await supabase
    .from("partners")
    .insert(partnersToInsert)
    .select("id");

  if (error) {
    logError("Failed to seed partners", error);
    return [];
  }

  logSuccess(data?.length || 0, "partners");
  return data || [];
}

/**
 * Seed spaces
 */
async function seedSpacesData(creatorId: string | null): Promise<Map<string, string>> {
  logSection("Seeding Spaces");

  const spaceIdMap = new Map<string, string>();

  const spacesToInsert = seedSpaces.map((space) => ({
    name: space.name,
    slug: space.slug,
    description: space.description,
    icon: space.icon,
    cover_image_url: space.cover_image_url,
    visibility: space.visibility,
    type: space.type,
    tier_required: space.tier_required,
    is_archived: space.is_archived,
    created_by: creatorId,
    member_count: 0,
    post_count: 0,
  }));

  const { data, error } = await supabase
    .from("spaces")
    .insert(spacesToInsert)
    .select("id, slug");

  if (error) {
    logError("Failed to seed spaces", error);
    return spaceIdMap;
  }

  // Build slug -> id map
  data?.forEach((space) => {
    spaceIdMap.set(space.slug, space.id);
  });

  logSuccess(data?.length || 0, "spaces");
  return spaceIdMap;
}

/**
 * Seed posts for spaces with varied authors by tier
 */
async function seedPostsData(
  spaceIdMap: Map<string, string>,
  profileIdMap: Map<string, string>,
  defaultAuthorId: string | null
) {
  logSection("Seeding Posts");

  if (!defaultAuthorId && profileIdMap.size === 0) {
    log("Skipping posts - no author profiles available.");
    return;
  }

  const postsToInsert = seedPosts
    .filter((post) => spaceIdMap.has(post.spaceSlug))
    .map((post) => {
      // Try to get an author matching the post's authorTier
      const authorId =
        getProfileIdByTier(profileIdMap, post.authorTier) || defaultAuthorId;

      return {
        space_id: spaceIdMap.get(post.spaceSlug)!,
        author_id: authorId,
        title: post.title,
        content: post.content,
        content_text: post.content_text,
        is_pinned: post.is_pinned,
        is_locked: post.is_locked,
        like_count: 0,
        comment_count: 0,
      };
    })
    .filter((post) => post.author_id !== null);

  if (postsToInsert.length === 0) {
    log("No posts to insert (no matching spaces or authors found).");
    return;
  }

  const { data, error } = await supabase
    .from("posts")
    .insert(postsToInsert)
    .select("id");

  if (error) {
    logError("Failed to seed posts", error);
    return;
  }

  logSuccess(data?.length || 0, "posts");
}

/**
 * Seed events
 */
async function seedEventsData(
  spaceIdMap: Map<string, string>,
  creatorId: string | null
) {
  logSection("Seeding Events");

  const eventsToInsert = seedEvents.map((event) => ({
    title: event.title,
    description: event.description,
    content: event.content,
    cover_image_url: event.cover_image_url,
    starts_at: event.starts_at.toISOString(),
    ends_at: event.ends_at?.toISOString() || null,
    timezone: event.timezone,
    location_type: event.location_type,
    location_details: event.location_details,
    video_room_url: event.video_room_url,
    tier_required: event.tier_required,
    max_attendees: event.max_attendees,
    is_published: event.is_published,
    space_id: event.spaceSlug ? spaceIdMap.get(event.spaceSlug) || null : null,
    created_by: creatorId,
    attendee_count: 0,
  }));

  const { data, error } = await supabase
    .from("events")
    .insert(eventsToInsert)
    .select("id");

  if (error) {
    logError("Failed to seed events", error);
    return;
  }

  logSuccess(data?.length || 0, "events");
}

/**
 * Seed resources
 */
async function seedResourcesData(
  spaceIdMap: Map<string, string>,
  creatorId: string | null
) {
  logSection("Seeding Resources");

  const resourcesToInsert = seedResources.map((resource) => ({
    title: resource.title,
    description: resource.description,
    type: resource.type,
    file_url: resource.file_url,
    external_url: resource.external_url,
    tier_required: resource.tier_required,
    space_id: resource.spaceSlug ? spaceIdMap.get(resource.spaceSlug) || null : null,
    cohort_id: null, // Not linking to cohorts in seed
    created_by: creatorId,
    download_count: 0,
  }));

  const { data, error } = await supabase
    .from("resources")
    .insert(resourcesToInsert)
    .select("id");

  if (error) {
    logError("Failed to seed resources", error);
    return;
  }

  logSuccess(data?.length || 0, "resources");
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  console.log("\n🌱 NHL Database Seeder");
  console.log("═".repeat(50));

  if (shouldClear) {
    await clearData();
    // Also clear auth users if clearing
    await clearAuthUsers();
  }

  // Seed profiles first (creates auth.users + profiles)
  const profileIdMap = await seedProfilesData();

  // Get an admin profile ID for authorship
  const adminProfileId = await getAdminProfileId(profileIdMap);

  // Seed entities
  await seedPartnersData(adminProfileId);
  const spaceIdMap = await seedSpacesData(adminProfileId);
  await seedPostsData(spaceIdMap, profileIdMap, adminProfileId);
  await seedEventsData(spaceIdMap, adminProfileId);
  await seedResourcesData(spaceIdMap, adminProfileId);

  console.log("\n" + "═".repeat(50));
  console.log("✨ Seeding complete!");
  console.log("\nTest accounts created:");
  console.log("  All accounts use password: SeedPassword123!");
  console.log("  Admin: admin@nexthorizonleadership.com");
  console.log("  Diamond: diamond1@example.com");
  console.log("  Platinum: platinum1@example.com");
  console.log("  Gold: gold1@example.com");
  console.log("  Silver: silver1@example.com");
  console.log("\nRun 'npm run dev' to start the application\n");
}

/**
 * Clear auth users created during seeding
 */
async function clearAuthUsers() {
  log("Clearing seed auth users...");

  for (const profile of seedProfiles) {
    try {
      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users?.users?.find((u) => u.email === profile.email);

      if (user) {
        await supabase.auth.admin.deleteUser(user.id);
      }
    } catch {
      // Ignore errors when clearing
    }
  }

  log("Seed auth users cleared.");
}

main().catch((error) => {
  console.error("\n❌ Seeding failed:", error);
  process.exit(1);
});
