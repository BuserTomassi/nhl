/**
 * Stripe Integration
 *
 * This file contains utilities for Stripe payment integration.
 * For full implementation, install @stripe/stripe-js and stripe packages.
 *
 * To complete this integration:
 * 1. npm install stripe @stripe/stripe-js
 * 2. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
 * 3. Create products and prices in Stripe Dashboard
 * 4. Implement webhook handler for subscription events
 */

// Price IDs from Stripe Dashboard (replace with actual values)
export const STRIPE_PRICES = {
  gold_monthly: process.env.STRIPE_GOLD_MONTHLY_PRICE_ID || "price_gold_monthly",
  gold_annual: process.env.STRIPE_GOLD_ANNUAL_PRICE_ID || "price_gold_annual",
} as const;

// Subscription status types
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "trialing"
  | "unpaid";

/**
 * Check if Stripe is configured
 */
export function isStripeConfigured(): boolean {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
}

/**
 * Placeholder for Stripe server-side client
 * Uncomment and use when Stripe is installed:
 *
 * import Stripe from 'stripe';
 * export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 *   apiVersion: '2023-10-16',
 * });
 */
