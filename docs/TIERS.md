# NHL Membership Tiers

This document defines the permission matrix for each membership tier.

## Tier Overview

| Tier | Access Level | Target Audience |
|------|-------------|-----------------|
| **Diamond** | 4 (Highest) | CHROs, top HR executives |
| **Platinum** | 3 | Senior HR leaders, CHRO successors |
| **Gold** | 2 | Ambitious HR professionals |
| **Silver** | 1 (Lowest) | Free tier, general audience |

## Access Matrix

### Content & Resources

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| Public articles | ✅ Read | ✅ Read | ✅ Read | ✅ Read |
| Premium insights | ❌ | ✅ Read | ✅ Read | ✅ Read |
| Trend reports | ❌ | ✅ Download | ✅ Download | ✅ Early Access |
| Research papers | ❌ | ❌ | ✅ Read | ✅ Read |

### Partner Directory

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| View partners | ⚠️ Limited | ✅ Full | ✅ Full | ✅ Full |
| Partner profiles | ❌ | ✅ View | ✅ View | ✅ View |
| Request intro | ❌ | ❌ | ✅ Limited | ✅ Unlimited |
| Priority matching | ❌ | ❌ | ❌ | ✅ Concierge |

### Events

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| Public webinars | ✅ View | ✅ RSVP | ✅ RSVP | ✅ RSVP |
| Member events | ❌ | ✅ RSVP | ✅ Priority | ✅ Priority |
| Cohort sessions | ❌ | ❌ | ✅ Participate | ✅ Host |
| Intimate gatherings | ❌ | ❌ | ❌ | ✅ Invite |
| Leadership summits | ❌ | ❌ | ❌ | ✅ Invite |

### Community Spaces

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| Public spaces | ❌ | ✅ Read/Write | ✅ Read/Write | ✅ Read/Write |
| Cohort spaces | ❌ | ❌ | ✅ Own cohort | ✅ All cohorts |
| Private roundtables | ❌ | ❌ | ❌ | ✅ Full access |
| Create discussions | ❌ | ✅ | ✅ | ✅ |

### Networking

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| Member directory | ❌ | ⚠️ Limited | ✅ Full | ✅ Full |
| View profiles | ❌ | ⚠️ Basic | ✅ Full | ✅ Full |
| Direct messages | ❌ | ❌ | ⚠️ 5/month | ✅ Unlimited |
| Connection requests | ❌ | ❌ | ✅ Send | ✅ Send |

### Learning

| Feature | Silver | Gold | Platinum | Diamond |
|---------|--------|------|----------|---------|
| On-demand content | ❌ | ✅ Basic | ✅ Full | ✅ Full |
| AI tool demos | ❌ | ❌ | ✅ Early access | ✅ First look |
| Expert briefings | ❌ | ❌ | ✅ Attend | ✅ Request topics |
| Mentorship access | ❌ | ❌ | ✅ Receive | ✅ Give/Receive |

## Tier Upgrade Paths

```
Silver (Free)
    ↓ Purchase subscription
Gold ($X/month)
    ↓ Invitation from admin
Platinum (Invite + $Y/month)
    ↓ Invitation from admin
Diamond (Invite-only)
```

## Implementation Notes

### Database Representation

```sql
CREATE TYPE membership_tier AS ENUM ('silver', 'gold', 'platinum', 'diamond');

-- Tier levels for comparison
-- silver = 1, gold = 2, platinum = 3, diamond = 4
```

### RLS Policy Example

```sql
CREATE POLICY "tier_access" ON content
USING (
  tier_required <= (
    SELECT CASE tier
      WHEN 'silver' THEN 1
      WHEN 'gold' THEN 2
      WHEN 'platinum' THEN 3
      WHEN 'diamond' THEN 4
    END FROM profiles WHERE id = auth.uid()
  )
);
```

### TypeScript Helper

```typescript
import { hasTierAccess, type MembershipTier } from "@/types";

// Check if user can access content
if (hasTierAccess(user.tier, content.tier_required)) {
  // Grant access
}
```

## Billing Integration

| Tier | Stripe Product | Billing |
|------|---------------|---------|
| Silver | N/A | Free |
| Gold | `prod_gold_xxx` | Monthly |
| Platinum | `prod_plat_xxx` | Monthly + Approval |
| Diamond | N/A | Invite-only |

Diamond tier is managed manually by admins, not through Stripe subscriptions.
