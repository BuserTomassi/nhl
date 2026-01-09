-- ============================================================================
-- NHL Community Platform - Spaces and Content Schema
-- Migration: 00002_spaces_and_content.sql
-- 
-- Creates tables for:
-- - spaces (community discussion areas with tier gating)
-- - space_members (membership tracking)
-- - posts (discussion posts with rich content)
-- - comments (threaded replies)
-- - likes (engagement tracking)
-- ============================================================================

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE space_visibility AS ENUM ('public', 'members', 'tier_gated', 'private');
CREATE TYPE space_type AS ENUM ('general', 'cohort', 'private');
CREATE TYPE space_member_role AS ENUM ('member', 'moderator', 'admin');

-- ============================================================================
-- SPACES TABLE
-- ============================================================================

CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- Emoji or icon identifier
  cover_image_url TEXT,
  visibility space_visibility NOT NULL DEFAULT 'members',
  type space_type NOT NULL DEFAULT 'general',
  tier_required membership_tier NOT NULL DEFAULT 'silver',
  cohort_id UUID, -- References cohorts table (created in later migration)
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  member_count INTEGER NOT NULL DEFAULT 0,
  post_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_spaces_slug ON spaces(slug);
CREATE INDEX idx_spaces_tier ON spaces(tier_required);
CREATE INDEX idx_spaces_visibility ON spaces(visibility);
CREATE INDEX idx_spaces_type ON spaces(type);
CREATE INDEX idx_spaces_archived ON spaces(is_archived) WHERE is_archived = false;

CREATE TRIGGER spaces_updated_at
  BEFORE UPDATE ON spaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- SPACE MEMBERS TABLE
-- ============================================================================

CREATE TABLE space_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role space_member_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  UNIQUE(space_id, profile_id)
);

-- Indexes
CREATE INDEX idx_space_members_space ON space_members(space_id);
CREATE INDEX idx_space_members_profile ON space_members(profile_id);
CREATE INDEX idx_space_members_role ON space_members(role);

-- Trigger to update space member count
CREATE OR REPLACE FUNCTION update_space_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE spaces SET member_count = member_count + 1 WHERE id = NEW.space_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE spaces SET member_count = member_count - 1 WHERE id = OLD.space_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER space_members_count
  AFTER INSERT OR DELETE ON space_members
  FOR EACH ROW
  EXECUTE FUNCTION update_space_member_count();

-- ============================================================================
-- POSTS TABLE
-- ============================================================================

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id UUID NOT NULL REFERENCES spaces(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  content JSONB NOT NULL, -- TipTap JSON content
  content_text TEXT NOT NULL DEFAULT '', -- Plain text for search
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_posts_space ON posts(space_id);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);
CREATE INDEX idx_posts_pinned ON posts(is_pinned) WHERE is_pinned = true;
CREATE INDEX idx_posts_content_search ON posts USING gin(content_text gin_trgm_ops);

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Trigger to update space post count
CREATE OR REPLACE FUNCTION update_space_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE spaces SET post_count = post_count + 1 WHERE id = NEW.space_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE spaces SET post_count = post_count - 1 WHERE id = OLD.space_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_space_count
  AFTER INSERT OR DELETE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_space_post_count();

-- ============================================================================
-- COMMENTS TABLE
-- ============================================================================

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For nested replies
  content JSONB NOT NULL, -- TipTap JSON content
  content_text TEXT NOT NULL DEFAULT '', -- Plain text for search
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_created ON comments(created_at);

CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Trigger to update post comment count
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comments_post_count
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comment_count();

-- ============================================================================
-- LIKES TABLE
-- ============================================================================

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Either post_id or comment_id must be set, not both
  CONSTRAINT likes_target_check CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  ),
  -- Prevent duplicate likes
  CONSTRAINT likes_unique_post UNIQUE(profile_id, post_id),
  CONSTRAINT likes_unique_comment UNIQUE(profile_id, comment_id)
);

-- Indexes
CREATE INDEX idx_likes_profile ON likes(profile_id);
CREATE INDEX idx_likes_post ON likes(post_id) WHERE post_id IS NOT NULL;
CREATE INDEX idx_likes_comment ON likes(comment_id) WHERE comment_id IS NOT NULL;

-- Trigger to update like counts
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.post_id IS NOT NULL THEN
      UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    ELSIF NEW.comment_id IS NOT NULL THEN
      UPDATE comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.post_id IS NOT NULL THEN
      UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
    ELSIF OLD.comment_id IS NOT NULL THEN
      UPDATE comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER likes_update_counts
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  EXECUTE FUNCTION update_like_counts();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Spaces RLS
ALTER TABLE spaces ENABLE ROW LEVEL SECURITY;

-- Helper function to check space access
CREATE OR REPLACE FUNCTION can_access_space(space_record spaces)
RETURNS BOOLEAN AS $$
BEGIN
  -- Admins can access everything
  IF is_admin() THEN
    RETURN true;
  END IF;
  
  -- Archived spaces are hidden
  IF space_record.is_archived THEN
    RETURN false;
  END IF;
  
  -- Check visibility
  CASE space_record.visibility
    WHEN 'public' THEN
      RETURN true;
    WHEN 'members' THEN
      RETURN auth.uid() IS NOT NULL;
    WHEN 'tier_gated' THEN
      RETURN has_tier_access(get_user_tier(), space_record.tier_required);
    WHEN 'private' THEN
      RETURN EXISTS (
        SELECT 1 FROM space_members
        WHERE space_id = space_record.id AND profile_id = auth.uid()
      );
  END CASE;
  
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "spaces_select" ON spaces
  FOR SELECT USING (can_access_space(spaces.*));

CREATE POLICY "spaces_insert" ON spaces
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "spaces_update" ON spaces
  FOR UPDATE USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM space_members
      WHERE space_id = spaces.id
        AND profile_id = auth.uid()
        AND role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "spaces_delete" ON spaces
  FOR DELETE USING (is_admin());

-- Space Members RLS
ALTER TABLE space_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "space_members_select" ON space_members
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM spaces WHERE id = space_id AND can_access_space(spaces.*))
  );

CREATE POLICY "space_members_insert" ON space_members
  FOR INSERT WITH CHECK (
    profile_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM spaces s
      WHERE s.id = space_id
        AND s.visibility != 'private'
        AND has_tier_access(get_user_tier(), s.tier_required)
    )
  );

CREATE POLICY "space_members_delete" ON space_members
  FOR DELETE USING (
    profile_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM space_members sm
      WHERE sm.space_id = space_members.space_id
        AND sm.profile_id = auth.uid()
        AND sm.role IN ('moderator', 'admin')
    )
  );

-- Posts RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posts_select" ON posts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM spaces WHERE id = space_id AND can_access_space(spaces.*))
  );

CREATE POLICY "posts_insert" ON posts
  FOR INSERT WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM space_members
      WHERE space_id = posts.space_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "posts_update" ON posts
  FOR UPDATE USING (
    author_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM space_members
      WHERE space_id = posts.space_id
        AND profile_id = auth.uid()
        AND role IN ('moderator', 'admin')
    )
  );

CREATE POLICY "posts_delete" ON posts
  FOR DELETE USING (
    author_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM space_members
      WHERE space_id = posts.space_id
        AND profile_id = auth.uid()
        AND role IN ('moderator', 'admin')
    )
  );

-- Comments RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_select" ON comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM posts p
      JOIN spaces s ON s.id = p.space_id
      WHERE p.id = post_id AND can_access_space(s.*)
    )
  );

CREATE POLICY "comments_insert" ON comments
  FOR INSERT WITH CHECK (
    author_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM posts p
      JOIN space_members sm ON sm.space_id = p.space_id
      WHERE p.id = post_id AND sm.profile_id = auth.uid()
    ) AND
    -- Check post is not locked
    EXISTS (
      SELECT 1 FROM posts WHERE id = post_id AND is_locked = false
    )
  );

CREATE POLICY "comments_update" ON comments
  FOR UPDATE USING (author_id = auth.uid() OR is_admin());

CREATE POLICY "comments_delete" ON comments
  FOR DELETE USING (
    author_id = auth.uid() OR
    is_admin() OR
    EXISTS (
      SELECT 1 FROM posts p
      JOIN space_members sm ON sm.space_id = p.space_id
      WHERE p.id = post_id
        AND sm.profile_id = auth.uid()
        AND sm.role IN ('moderator', 'admin')
    )
  );

-- Likes RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "likes_select" ON likes
  FOR SELECT USING (true);

CREATE POLICY "likes_insert" ON likes
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "likes_delete" ON likes
  FOR DELETE USING (profile_id = auth.uid());

-- ============================================================================
-- STORAGE BUCKET FOR CONTENT
-- ============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('content', 'content', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for content (space images, post attachments)
CREATE POLICY "content_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'content');

CREATE POLICY "content_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'content' AND
    auth.uid() IS NOT NULL
  );

CREATE POLICY "content_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'content' AND
    (auth.uid()::text = (storage.foldername(name))[1] OR is_admin())
  );
