-- ============================================================================
-- NHL Community Platform - Events and Cohorts Schema
-- Migration: 00003_events_and_cohorts.sql
-- 
-- Creates tables for:
-- - events (virtual and in-person gatherings)
-- - event_attendees (RSVP tracking)
-- - cohorts (Platinum tier learning groups)
-- - cohort_members (cohort participation)
-- - resources (gated content library)
-- ============================================================================

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE event_location_type AS ENUM ('virtual', 'in_person', 'hybrid');
CREATE TYPE rsvp_status AS ENUM ('registered', 'waitlisted', 'cancelled', 'attended');
CREATE TYPE cohort_member_status AS ENUM ('active', 'completed', 'dropped');
CREATE TYPE resource_type AS ENUM ('document', 'video', 'link', 'template');

-- ============================================================================
-- COHORTS TABLE (Created first since spaces references it)
-- ============================================================================

CREATE TABLE cohorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  tier membership_tier NOT NULL DEFAULT 'platinum',
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  max_members INTEGER,
  member_count INTEGER NOT NULL DEFAULT 0,
  facilitator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_cohorts_slug ON cohorts(slug);
CREATE INDEX idx_cohorts_tier ON cohorts(tier);
CREATE INDEX idx_cohorts_active ON cohorts(is_active) WHERE is_active = true;
CREATE INDEX idx_cohorts_facilitator ON cohorts(facilitator_id);

CREATE TRIGGER cohorts_updated_at
  BEFORE UPDATE ON cohorts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Add foreign key from spaces to cohorts
ALTER TABLE spaces 
  ADD CONSTRAINT spaces_cohort_id_fkey 
  FOREIGN KEY (cohort_id) REFERENCES cohorts(id) ON DELETE SET NULL;

-- ============================================================================
-- COHORT MEMBERS TABLE
-- ============================================================================

CREATE TABLE cohort_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_id UUID NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status cohort_member_status NOT NULL DEFAULT 'active',
  progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(cohort_id, profile_id)
);

-- Indexes
CREATE INDEX idx_cohort_members_cohort ON cohort_members(cohort_id);
CREATE INDEX idx_cohort_members_profile ON cohort_members(profile_id);
CREATE INDEX idx_cohort_members_status ON cohort_members(status);

-- Trigger to update cohort member count
CREATE OR REPLACE FUNCTION update_cohort_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE cohorts SET member_count = member_count + 1 WHERE id = NEW.cohort_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE cohorts SET member_count = member_count - 1 WHERE id = OLD.cohort_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cohort_members_count
  AFTER INSERT OR DELETE ON cohort_members
  FOR EACH ROW
  EXECUTE FUNCTION update_cohort_member_count();

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB, -- Rich description using TipTap
  cover_image_url TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  location_type event_location_type NOT NULL DEFAULT 'virtual',
  location_details TEXT, -- Address for in-person, or additional info
  video_room_url TEXT, -- Integration with video provider
  tier_required membership_tier NOT NULL DEFAULT 'silver',
  max_attendees INTEGER,
  attendee_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_events_space ON events(space_id);
CREATE INDEX idx_events_starts ON events(starts_at);
CREATE INDEX idx_events_tier ON events(tier_required);
CREATE INDEX idx_events_published ON events(is_published) WHERE is_published = true;
CREATE INDEX idx_events_upcoming ON events(starts_at) WHERE is_published = true;
CREATE INDEX idx_events_created_by ON events(created_by);

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- EVENT ATTENDEES TABLE
-- ============================================================================

CREATE TABLE event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status rsvp_status NOT NULL DEFAULT 'registered',
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  attended_at TIMESTAMPTZ,
  UNIQUE(event_id, profile_id)
);

-- Indexes
CREATE INDEX idx_event_attendees_event ON event_attendees(event_id);
CREATE INDEX idx_event_attendees_profile ON event_attendees(profile_id);
CREATE INDEX idx_event_attendees_status ON event_attendees(status);

-- Trigger to update event attendee count
CREATE OR REPLACE FUNCTION update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'registered' THEN
      UPDATE events SET attendee_count = attendee_count + 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != 'registered' AND NEW.status = 'registered' THEN
      UPDATE events SET attendee_count = attendee_count + 1 WHERE id = NEW.event_id;
    ELSIF OLD.status = 'registered' AND NEW.status != 'registered' THEN
      UPDATE events SET attendee_count = attendee_count - 1 WHERE id = NEW.event_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'registered' THEN
      UPDATE events SET attendee_count = attendee_count - 1 WHERE id = OLD.event_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER event_attendees_count
  AFTER INSERT OR UPDATE OR DELETE ON event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_event_attendee_count();

-- ============================================================================
-- RESOURCES TABLE (Content Library)
-- ============================================================================

CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID REFERENCES spaces(id) ON DELETE SET NULL,
  cohort_id UUID REFERENCES cohorts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  type resource_type NOT NULL,
  file_url TEXT,
  external_url TEXT,
  tier_required membership_tier NOT NULL DEFAULT 'silver',
  download_count INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Either file_url or external_url must be set for non-video types
  CONSTRAINT resources_url_check CHECK (
    type = 'video' OR file_url IS NOT NULL OR external_url IS NOT NULL
  )
);

-- Indexes
CREATE INDEX idx_resources_space ON resources(space_id);
CREATE INDEX idx_resources_cohort ON resources(cohort_id);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_tier ON resources(tier_required);
CREATE INDEX idx_resources_created_by ON resources(created_by);

CREATE TRIGGER resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Cohorts RLS
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cohorts_select" ON cohorts
  FOR SELECT USING (
    is_admin() OR
    has_tier_access(get_user_tier(), tier)
  );

CREATE POLICY "cohorts_insert" ON cohorts
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "cohorts_update" ON cohorts
  FOR UPDATE USING (
    is_admin() OR facilitator_id = auth.uid()
  );

CREATE POLICY "cohorts_delete" ON cohorts
  FOR DELETE USING (is_admin());

-- Cohort Members RLS
ALTER TABLE cohort_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cohort_members_select" ON cohort_members
  FOR SELECT USING (
    profile_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM cohorts c
      WHERE c.id = cohort_id AND c.facilitator_id = auth.uid()
    )
  );

CREATE POLICY "cohort_members_insert" ON cohort_members
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "cohort_members_update" ON cohort_members
  FOR UPDATE USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM cohorts c
      WHERE c.id = cohort_id AND c.facilitator_id = auth.uid()
    )
  );

CREATE POLICY "cohort_members_delete" ON cohort_members
  FOR DELETE USING (is_admin());

-- Events RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_select" ON events
  FOR SELECT USING (
    (is_published = true AND has_tier_access(get_user_tier(), tier_required)) OR
    created_by = auth.uid() OR
    is_admin()
  );

CREATE POLICY "events_insert" ON events
  FOR INSERT WITH CHECK (
    created_by = auth.uid() AND
    (is_admin() OR has_tier_access(get_user_tier(), 'platinum'::membership_tier))
  );

CREATE POLICY "events_update" ON events
  FOR UPDATE USING (
    created_by = auth.uid() OR is_admin()
  );

CREATE POLICY "events_delete" ON events
  FOR DELETE USING (
    created_by = auth.uid() OR is_admin()
  );

-- Event Attendees RLS
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "event_attendees_select" ON event_attendees
  FOR SELECT USING (
    profile_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id AND e.created_by = auth.uid()
    )
  );

CREATE POLICY "event_attendees_insert" ON event_attendees
  FOR INSERT WITH CHECK (
    profile_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id
        AND e.is_published = true
        AND has_tier_access(get_user_tier(), e.tier_required)
        AND (e.max_attendees IS NULL OR e.attendee_count < e.max_attendees)
    )
  );

CREATE POLICY "event_attendees_update" ON event_attendees
  FOR UPDATE USING (
    profile_id = auth.uid() OR is_admin()
  );

CREATE POLICY "event_attendees_delete" ON event_attendees
  FOR DELETE USING (
    profile_id = auth.uid() OR is_admin()
  );

-- Resources RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "resources_select" ON resources
  FOR SELECT USING (
    has_tier_access(get_user_tier(), tier_required) OR
    created_by = auth.uid() OR
    is_admin()
  );

CREATE POLICY "resources_insert" ON resources
  FOR INSERT WITH CHECK (
    created_by = auth.uid() AND
    (is_admin() OR has_tier_access(get_user_tier(), 'platinum'::membership_tier))
  );

CREATE POLICY "resources_update" ON resources
  FOR UPDATE USING (
    created_by = auth.uid() OR is_admin()
  );

CREATE POLICY "resources_delete" ON resources
  FOR DELETE USING (
    created_by = auth.uid() OR is_admin()
  );

-- ============================================================================
-- STORAGE BUCKET FOR RESOURCES
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', false) -- Private bucket, accessed via signed URLs
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resources (tier-gated access)
CREATE POLICY "resources_storage_select" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'resources' AND
    (is_admin() OR has_tier_access(get_user_tier(), 'gold'::membership_tier))
  );

CREATE POLICY "resources_storage_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resources' AND
    (is_admin() OR has_tier_access(get_user_tier(), 'platinum'::membership_tier))
  );

CREATE POLICY "resources_storage_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resources' AND is_admin()
  );
