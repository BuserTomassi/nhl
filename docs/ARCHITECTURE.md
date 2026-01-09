# NHL Platform Architecture

This document provides a high-level overview of the Next Horizon Leadership platform architecture.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Animation | Framer Motion |
| Backend | Supabase (PostgreSQL, Auth, Storage, Realtime) |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Marketing      │   Dashboard     │      Community Spaces       │
│  (Public)       │   (Auth)        │      (Real-time)           │
└────────┬────────┴────────┬────────┴──────────────┬──────────────┘
         │                 │                       │
         ▼                 ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER LAYER                            │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  React Server   │  Server Actions │      API Routes            │
│  Components     │  (Mutations)    │      (Webhooks)            │
└────────┬────────┴────────┬────────┴──────────────┬──────────────┘
         │                 │                       │
         ▼                 ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Supabase       │  Supabase       │      Supabase              │
│  PostgreSQL     │  Storage        │      Realtime              │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authenticated routes (future)
│   ├── (marketing)/       # Public marketing pages
│   ├── (dashboard)/       # Member dashboard (future)
│   └── api/               # API routes for webhooks
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── forms/             # Form components with validation
│   ├── layout/            # Header, Footer, Navigation
│   ├── marketing/         # Landing page components
│   ├── dashboard/         # Member dashboard (future)
│   ├── spaces/            # Community spaces (future)
│   ├── effects/           # Visual effects (parallax, noise, etc.)
│   ├── motion/            # Animation wrappers
│   └── seo/               # Structured data components
├── lib/
│   ├── constants.ts       # Shared configuration
│   ├── utils.ts           # Utility functions
│   ├── fonts.ts           # Font configuration
│   ├── schemas/           # Zod validation schemas
│   └── supabase/          # Supabase client setup
├── types/                 # Shared TypeScript types
├── hooks/                 # Custom React hooks
├── data/                  # Static data and copy
└── test/                  # Test utilities
```

## Data Flow Patterns

### Server Components (Read)

```
Page Component (Server)
    ↓
Supabase Server Client
    ↓
PostgreSQL (with RLS)
    ↓
Data returned to component
    ↓
Rendered HTML sent to client
```

### Server Actions (Write)

```
Form Submit (Client)
    ↓
Server Action invoked
    ↓
Zod validation
    ↓
Supabase mutation
    ↓
revalidatePath() / redirect()
```

### Real-time Subscriptions

```
Client Component mounts
    ↓
Subscribe to Supabase channel
    ↓
Receive real-time updates
    ↓
Update local state
    ↓
Cleanup on unmount
```

## Authentication Flow

1. User requests magic link via email
2. Supabase sends email with one-time link
3. User clicks link, redirected with auth token
4. Middleware validates token, creates session
5. Session stored in HTTP-only cookie
6. Tier info stored in user profile (profiles table)

## Tier-Based Access Control

Access control is enforced at multiple levels:

1. **Database (RLS)**: Row-level policies check user tier
2. **Server**: Server components verify access before rendering
3. **Client**: UI adapts based on tier (hide/show features)

See [TIERS.md](./TIERS.md) for the complete permission matrix.

## Key Design Decisions

### Why Supabase?

- PostgreSQL with full SQL capabilities
- Built-in auth with magic links (executive-friendly)
- Row Level Security for tier-based access
- Real-time subscriptions for community features
- File storage with CDN

### Why Server Components by Default?

- Better SEO for marketing pages
- Reduced client bundle size
- Direct database access without API layer
- Automatic request deduplication

### Why Zod for Validation?

- Type-safe schema definitions
- Shared between client and server
- Excellent error messages
- Works with react-hook-form

## Security Considerations

- Tier validation always happens server-side
- Service role key never exposed to client
- Magic links preferred over passwords
- All user inputs validated with Zod
- RLS policies prevent data leaks

See [SUPABASE.md](./SUPABASE.md) for detailed security patterns.
