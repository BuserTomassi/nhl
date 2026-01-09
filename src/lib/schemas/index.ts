/**
 * Shared Zod schemas for validation
 * Used across forms, API routes, and server actions
 */

import { z } from "zod";

// =============================================================================
// AUTH SCHEMAS
// =============================================================================

export const emailSchema = z.string().email("Please enter a valid email address");

export const signInSchema = z.object({
  email: emailSchema,
});

// =============================================================================
// PROFILE SCHEMAS
// =============================================================================

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  avatar_url: z.string().url().optional().nullable(),
});

// =============================================================================
// CONTACT SCHEMAS
// =============================================================================

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  company: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// =============================================================================
// SPACE SCHEMAS
// =============================================================================

export const createSpaceSchema = z.object({
  name: z.string().min(3, "Space name must be at least 3 characters"),
  description: z.string().optional(),
  visibility: z.enum(["public", "members", "tier_gated", "private"]),
  tier_required: z.enum(["silver", "gold", "platinum", "diamond"]),
});

// =============================================================================
// EVENT SCHEMAS
// =============================================================================

export const createEventSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  description: z.string().optional(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime().optional(),
  max_attendees: z.number().int().positive().optional(),
  tier_required: z.enum(["silver", "gold", "platinum", "diamond"]),
});
