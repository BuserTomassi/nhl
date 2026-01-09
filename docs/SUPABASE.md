# Supabase Integration Guide

This document covers Supabase setup, patterns, and best practices for the NHL platform.

## Setup

### 1. Create Supabase Project

1. Create a project at [supabase.com](https://supabase.com)
2. Note your project URL and keys
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Link Local Development

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
```

### 3. Generate Types

After any schema changes:

```bash
npx supabase gen types typescript --local > src/lib/supabase/types.ts
# or from remote
npx supabase gen types typescript --project-id your-project-ref > src/lib/supabase/types.ts
```

## Client Usage

### Server Components

```typescript
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .single();
  
  if (error) throw error;
  return <div>{data.full_name}</div>;
}
```

### Server Actions

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: formData.get("name") })
    .eq("id", user.id);
  
  if (error) throw error;
  revalidatePath("/profile");
}
```

### Client Components (Only When Necessary)

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function RealtimeMessages({ spaceId }: { spaceId: string }) {
  const [messages, setMessages] = useState([]);
  const supabase = createClient();
  
  useEffect(() => {
    const channel = supabase
      .channel(`space:${spaceId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `space_id=eq.${spaceId}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [spaceId, supabase]);
  
  return <MessageList messages={messages} />;
}
```

## Row Level Security (RLS)

### Principle: Always Enable RLS

Every table with user data MUST have RLS enabled:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### Common Policy Patterns

#### Users can only read their own profile

```sql
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);
```

#### Users can update their own profile

```sql
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

#### Tier-based content access

```sql
-- Helper function to get user's tier level
CREATE OR REPLACE FUNCTION user_tier_level()
RETURNS integer AS $$
  SELECT CASE tier
    WHEN 'silver' THEN 1
    WHEN 'gold' THEN 2
    WHEN 'platinum' THEN 3
    WHEN 'diamond' THEN 4
    ELSE 0
  END FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Policy using the helper
CREATE POLICY "Tier-gated content access"
ON content FOR SELECT
USING (
  CASE tier_required
    WHEN 'silver' THEN 1
    WHEN 'gold' THEN 2
    WHEN 'platinum' THEN 3
    WHEN 'diamond' THEN 4
  END <= user_tier_level()
);
```

#### Space membership access

```sql
CREATE POLICY "Space members can read messages"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM space_members
    WHERE space_members.space_id = messages.space_id
    AND space_members.profile_id = auth.uid()
  )
);
```

## Database Schema

### Core Tables

```sql
-- Membership tiers enum
CREATE TYPE membership_tier AS ENUM ('silver', 'gold', 'platinum', 'diamond');
CREATE TYPE user_role AS ENUM ('member', 'partner', 'admin');
CREATE TYPE partner_category AS ENUM ('search_firm', 'ai_vendor', 'consultant');

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  title TEXT,
  tier membership_tier DEFAULT 'silver',
  role user_role DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner-specific data
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category partner_category NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  description TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community spaces
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  visibility TEXT DEFAULT 'members',
  type TEXT DEFAULT 'general',
  tier_required membership_tier DEFAULT 'silver',
  cohort_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Migrations

Always use migrations for schema changes:

```bash
# Create a new migration
npx supabase migration new add_spaces_table

# Apply migrations locally
npx supabase db reset

# Push to production
npx supabase db push
```

## Authentication

### Magic Link (Recommended)

```typescript
const { error } = await supabase.auth.signInWithOtp({
  email: "user@example.com",
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

### Auth Callback Route

```typescript
// app/auth/callback/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/auth/error", request.url));
}
```

### Middleware for Protected Routes

```typescript
// middleware.ts
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/spaces/:path*"],
};
```

## Security Best Practices

1. **Never expose service role key** - Only use on server, never in client code
2. **Always use RLS** - Every table with user data needs policies
3. **Validate server-side** - Never trust client-side tier claims
4. **Use prepared statements** - Supabase client handles this automatically
5. **Audit Diamond access** - Log access to sensitive executive content

## Testing RLS Policies

```sql
-- Test as a specific user
SET request.jwt.claims = '{"sub": "user-uuid-here"}';

-- Check what they can see
SELECT * FROM content;

-- Reset
RESET request.jwt.claims;
```

## Common Pitfalls

### 1. Forgetting RLS on new tables

Always enable RLS immediately after creating a table.

### 2. Using service role in client

Never import `SUPABASE_SERVICE_ROLE_KEY` in client components.

### 3. Not handling auth state changes

Use Supabase's auth state listener for client-side auth awareness.

### 4. Blocking queries without proper policies

If a query returns empty when it shouldn't, check RLS policies first.
