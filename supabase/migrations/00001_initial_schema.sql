-- ============================================================================
-- NHL Community Platform - Initial Schema
-- Migration: 00001_initial_schema.sql
-- 
-- Creates the foundational tables for the tiered community platform:
-- - profiles (user profiles with tier and role)
-- - partners (partner organizations)
-- - invitations (invite-only tier management)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Membership tiers in ascending order of access
CREATE TYPE membership_tier AS ENUM ('silver', 'gold', 'platinum', 'diamond');

-- User roles within the platform
CREATE TYPE user_role AS ENUM ('member', 'partner', 'admin');

-- Partner organization categories
CREATE TYPE partner_category AS ENUM ('search_firm', 'ai_vendor', 'consultant');

-- Invitation status
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get numeric tier level for comparison
CREATE OR REPLACE FUNCTION get_tier_level(tier membership_tier)
RETURNS INTEGER AS $$
BEGIN
  RETURN CASE tier
    WHEN 'silver' THEN 1
    WHEN 'gold' THEN 2
    WHEN 'platinum' THEN 3
    WHEN 'diamond' THEN 4
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to check if user has sufficient tier access
CREATE OR REPLACE FUNCTION has_tier_access(user_tier membership_tier, required_tier membership_tier)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN get_tier_level(user_tier) >= get_tier_level(required_tier);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to get current user's tier
CREATE OR REPLACE FUNCTION get_user_tier()
RETURNS membership_tier AS $$
DECLARE
  user_tier membership_tier;
BEGIN
  SELECT tier INTO user_tier
  FROM profiles
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_tier, 'silver'::membership_tier);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  title TEXT,
  bio TEXT,
  linkedin_url TEXT,
  tier membership_tier NOT NULL DEFAULT 'silver',
  role user_role NOT NULL DEFAULT 'member',
  is_public BOOLEAN NOT NULL DEFAULT true,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_profiles_tier ON profiles(tier);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_company ON profiles USING gin(company gin_trgm_ops);
CREATE INDEX idx_profiles_full_name ON profiles USING gin(full_name gin_trgm_ops);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS Policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view public profiles or their own profile
CREATE POLICY "profiles_select" ON profiles
  FOR SELECT USING (
    is_public = true 
    OR id = auth.uid()
    OR is_admin()
  );

-- Users can only update their own profile
CREATE POLICY "profiles_update" ON profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Only authenticated users can insert (handled by trigger on auth.users)
CREATE POLICY "profiles_insert" ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- Admins can update any profile (for tier/role management)
CREATE POLICY "profiles_admin_update" ON profiles
  FOR UPDATE USING (is_admin());

-- ============================================================================
-- PARTNERS TABLE
-- ============================================================================

CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  category partner_category NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  contact_email TEXT,
  tier_visible_to membership_tier NOT NULL DEFAULT 'silver',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_partners_category ON partners(category);
CREATE INDEX idx_partners_verified ON partners(is_verified);
CREATE INDEX idx_partners_featured ON partners(is_featured);
CREATE INDEX idx_partners_slug ON partners(slug);
CREATE INDEX idx_partners_tier_visible ON partners(tier_visible_to);

CREATE TRIGGER partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS Policies for partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Users can view partners visible to their tier level
CREATE POLICY "partners_select" ON partners
  FOR SELECT USING (
    has_tier_access(get_user_tier(), tier_visible_to)
    OR is_admin()
  );

-- Partners can update their own entry
CREATE POLICY "partners_update_own" ON partners
  FOR UPDATE USING (profile_id = auth.uid());

-- Admins can do everything
CREATE POLICY "partners_admin_all" ON partners
  FOR ALL USING (is_admin());

-- ============================================================================
-- INVITATIONS TABLE
-- ============================================================================

CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  tier membership_tier NOT NULL,
  role user_role NOT NULL DEFAULT 'member',
  invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status invitation_status NOT NULL DEFAULT 'pending',
  message TEXT,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_status ON invitations(status);
CREATE INDEX idx_invitations_tier ON invitations(tier);

-- RLS Policies for invitations
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Only admins can view invitations
CREATE POLICY "invitations_admin_select" ON invitations
  FOR SELECT USING (is_admin());

-- Only admins can create invitations
CREATE POLICY "invitations_admin_insert" ON invitations
  FOR INSERT WITH CHECK (is_admin());

-- Only admins can update invitations
CREATE POLICY "invitations_admin_update" ON invitations
  FOR UPDATE USING (is_admin());

-- ============================================================================
-- AUTOMATIC PROFILE CREATION
-- ============================================================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  invite_record invitations%ROWTYPE;
  user_tier membership_tier := 'silver';
  user_role user_role := 'member';
BEGIN
  -- Check if user was invited
  SELECT * INTO invite_record
  FROM invitations
  WHERE email = NEW.email
    AND status = 'pending'
    AND expires_at > NOW()
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF FOUND THEN
    user_tier := invite_record.tier;
    user_role := invite_record.role;
    
    -- Mark invitation as accepted
    UPDATE invitations
    SET status = 'accepted', accepted_at = NOW()
    WHERE id = invite_record.id;
  END IF;
  
  -- Create profile
  INSERT INTO profiles (id, email, tier, role)
  VALUES (NEW.id, NEW.email, user_tier, user_role);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for partner logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "avatars_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "avatars_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage policies for partner logos (admin only for upload)
CREATE POLICY "partner_logos_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'partner-logos');

CREATE POLICY "partner_logos_admin" ON storage.objects
  FOR ALL USING (
    bucket_id = 'partner-logos' 
    AND is_admin()
  );
