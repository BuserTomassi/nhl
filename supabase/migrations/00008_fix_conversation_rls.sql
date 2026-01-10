-- ============================================================================
-- Fix RLS Policy for conversation_participants
-- 
-- The original policy caused infinite recursion by querying conversation_participants
-- within its own SELECT policy. This fix simplifies the policy.
-- ============================================================================

-- Drop the problematic policy
DROP POLICY IF EXISTS "conv_participants_select" ON conversation_participants;

-- Create a simpler policy: users can see their own participations
-- The conversations query already fetches other participants via join
CREATE POLICY "conv_participants_select" ON conversation_participants
  FOR SELECT USING (profile_id = auth.uid());

-- Also fix messages RLS to avoid similar issues
-- The messages table needs to check conversation_participants, which works fine
-- since we're querying a different table
