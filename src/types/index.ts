/**
 * Shared TypeScript types for the NHL platform
 * Domain types ready for Supabase integration
 */

// Re-export navigation types
export * from "./navigation";

// =============================================================================
// MEMBERSHIP TIERS
// =============================================================================

/**
 * Membership tier levels in ascending order of access
 * - silver: Free tier, basic access
 * - gold: Paid tier, full public access
 * - platinum: Invite-only, cohort-based learning
 * - diamond: Invite-only, top executives
 */
export type MembershipTier = "silver" | "gold" | "platinum" | "diamond";

/**
 * Numeric tier levels for comparison (higher = more access)
 */
export const TIER_LEVELS: Record<MembershipTier, number> = {
  silver: 1,
  gold: 2,
  platinum: 3,
  diamond: 4,
} as const;

// =============================================================================
// USER & PROFILE
// =============================================================================

/**
 * User role within the platform
 */
export type UserRole = "member" | "partner" | "admin";

/**
 * Partner category for partner directory
 */
export type PartnerCategory = "search_firm" | "ai_vendor" | "consultant";

/**
 * Base user profile structure
 * Will be extended when Supabase types are generated
 */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  company: string | null;
  title: string | null;
  tier: MembershipTier;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

/**
 * Partner profile extension
 */
export interface PartnerProfile extends UserProfile {
  role: "partner";
  partner_category: PartnerCategory;
  partner_verified: boolean;
  partner_featured: boolean;
  partner_description: string | null;
  partner_website: string | null;
}

// =============================================================================
// SPACES & CONTENT
// =============================================================================

/**
 * Space visibility options
 */
export type SpaceVisibility = "public" | "members" | "tier_gated" | "private";

/**
 * Space type classification
 */
export type SpaceType = "general" | "cohort" | "private";

/**
 * Content types within spaces
 */
export type ContentType = "post" | "event" | "resource" | "course";

/**
 * Base space structure
 */
export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  visibility: SpaceVisibility;
  type: SpaceType;
  tier_required: MembershipTier;
  cohort_id: string | null;
  created_at: string;
}

// =============================================================================
// EVENTS
// =============================================================================

/**
 * Event structure
 */
export interface Event {
  id: string;
  space_id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  tier_required: MembershipTier;
  max_attendees: number | null;
  video_room_url: string | null;
  created_at: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Helper type to check if user has required tier access
 */
export function hasTierAccess(
  userTier: MembershipTier,
  requiredTier: MembershipTier
): boolean {
  return TIER_LEVELS[userTier] >= TIER_LEVELS[requiredTier];
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
