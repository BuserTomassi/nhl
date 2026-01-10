-- ============================================================================
-- SECURITY DEFINER functions for conversation queries
-- 
-- These functions bypass RLS to fetch conversation data including
-- other participants' profiles.
-- ============================================================================

-- Function to get all conversations for the current user with participant details
CREATE OR REPLACE FUNCTION get_user_conversations()
RETURNS TABLE (
  conversation_id UUID,
  updated_at TIMESTAMPTZ,
  other_user_id UUID,
  other_user_name TEXT,
  other_user_avatar TEXT,
  other_user_tier TEXT,
  last_message_text TEXT,
  last_message_at TIMESTAMPTZ,
  last_message_is_mine BOOLEAN
) AS $$
DECLARE
  current_user_id UUID := auth.uid();
BEGIN
  RETURN QUERY
  SELECT 
    c.id AS conversation_id,
    c.updated_at,
    other_profile.id AS other_user_id,
    other_profile.full_name AS other_user_name,
    other_profile.avatar_url AS other_user_avatar,
    other_profile.tier::TEXT AS other_user_tier,
    last_msg.content_text AS last_message_text,
    last_msg.created_at AS last_message_at,
    (last_msg.sender_id = current_user_id) AS last_message_is_mine
  FROM conversations c
  -- Get the current user's participation
  INNER JOIN conversation_participants my_part 
    ON c.id = my_part.conversation_id 
    AND my_part.profile_id = current_user_id
  -- Get the other participant
  INNER JOIN conversation_participants other_part 
    ON c.id = other_part.conversation_id 
    AND other_part.profile_id != current_user_id
  -- Get the other user's profile
  INNER JOIN profiles other_profile 
    ON other_part.profile_id = other_profile.id
  -- Get the last message (lateral join for efficiency)
  LEFT JOIN LATERAL (
    SELECT m.content_text, m.created_at, m.sender_id
    FROM messages m
    WHERE m.conversation_id = c.id
    ORDER BY m.created_at DESC
    LIMIT 1
  ) last_msg ON true
  ORDER BY c.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to get a single conversation with the other user's details
CREATE OR REPLACE FUNCTION get_conversation_details(conv_id UUID)
RETURNS TABLE (
  conversation_id UUID,
  other_user_id UUID,
  other_user_name TEXT,
  other_user_avatar TEXT,
  other_user_tier TEXT,
  other_user_title TEXT,
  other_user_company TEXT
) AS $$
DECLARE
  current_user_id UUID := auth.uid();
  is_participant BOOLEAN;
BEGIN
  -- Verify the current user is a participant (using explicit table reference)
  SELECT EXISTS (
    SELECT 1 FROM public.conversation_participants cp
    WHERE cp.conversation_id = conv_id AND cp.profile_id = current_user_id
  ) INTO is_participant;
  
  IF NOT is_participant THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT 
    c.id AS conversation_id,
    other_profile.id AS other_user_id,
    other_profile.full_name AS other_user_name,
    other_profile.avatar_url AS other_user_avatar,
    other_profile.tier::TEXT AS other_user_tier,
    other_profile.title AS other_user_title,
    other_profile.company AS other_user_company
  FROM public.conversations c
  INNER JOIN public.conversation_participants other_part 
    ON c.id = other_part.conversation_id 
    AND other_part.profile_id != current_user_id
  INNER JOIN public.profiles other_profile 
    ON other_part.profile_id = other_profile.id
  WHERE c.id = conv_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_user_conversations() TO authenticated;
GRANT EXECUTE ON FUNCTION get_conversation_details(UUID) TO authenticated;
