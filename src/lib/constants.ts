/**
 * Shared site configuration and constants
 * Single source of truth for site metadata used across the application
 */

export const SITE_CONFIG = {
  url: "https://www.nexthorizonleadership.com",
  name: "Next Horizon Leadership",
  shortName: "NHL",
  description:
    "Next Horizon Leadership empowers forward-looking CEOs, CHROs, and talent leaders by connecting them with world-class search partners, leading AI innovators, and organizational experts.",
  shortDescription:
    "Shaping the Future of Leadership. Connect with world-class search partners, AI innovators, and organizational experts.",
  email: "hello@nexthorizonleadership.com",
  foundingYear: "2024",
  locale: "en_US",
  language: "en",
} as const;

/**
 * Social media links (add as they become available)
 */
export const SOCIAL_LINKS = {
  // linkedin: "https://linkedin.com/company/nexthorizonleadership",
  // twitter: "https://twitter.com/nexthorizonltd",
} as const;

/**
 * OG Image configuration
 */
export const OG_IMAGE = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "Next Horizon Leadership - Shaping the Future of Leadership",
} as const;

/**
 * Logo configuration
 */
export const LOGO = {
  url: "/images/logo.svg",
  width: 164,
  height: 184,
} as const;

/**
 * Membership tier levels (in ascending order of access)
 */
export const MEMBERSHIP_TIERS = {
  silver: 1,
  gold: 2,
  platinum: 3,
  diamond: 4,
} as const;

/**
 * API endpoints (use environment variables where applicable)
 */
export const API_ENDPOINTS = {
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "",
} as const;
