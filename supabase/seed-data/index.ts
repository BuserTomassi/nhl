/**
 * Seed Data Barrel Exports
 *
 * Central export for all seed data modules.
 */

// Profiles
export { seedProfiles, getProfilesByTier, getAdminProfiles, getPartnerProfiles, getAvatarUrl } from "./profiles";
export type { SeedProfile } from "./profiles";

// Partners
export { seedPartners, getPartnersByCategory, getFeaturedPartners } from "./partners";
export type { SeedPartner } from "./partners";

// Spaces and Posts
export {
  seedSpaces,
  seedPosts,
  getPostsForSpace,
  getSpacesByVisibility,
  getSpacesByTier,
} from "./spaces";
export type { SeedSpace, SeedPost } from "./spaces";

// Events
export {
  seedEvents,
  getEventsByLocationType,
  getUpcomingEvents,
  getPastEvents,
} from "./events";
export type { SeedEvent } from "./events";

// Resources
export {
  seedResources,
  getResourcesByType,
  getResourcesByTier,
  getResourcesForSpace,
} from "./resources";
export type { SeedResource } from "./resources";

// Messages
export {
  seedConversations,
  getAllParticipantEmails,
  getMessageContent,
  getMessageTimestamp,
} from "./messages";
export type { SeedConversation, SeedMessage } from "./messages";
