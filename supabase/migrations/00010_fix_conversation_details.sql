-- Fix get_conversation_details function to properly bypass RLS
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
