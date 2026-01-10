-- ============================================================================
-- NHL Community Platform - Fix Profile Creation Trigger
-- Migration: 00005_fix_profile_creation_trigger.sql
-- 
-- Updates the handle_new_user() trigger to read user metadata 
-- (full_name, company, title) from auth.users.raw_user_meta_data
-- ============================================================================

-- Drop and recreate the trigger function to include metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  invite_record invitations%ROWTYPE;
  user_tier membership_tier := 'silver';
  user_role_value user_role := 'member';
  user_full_name TEXT;
  user_company TEXT;
  user_title TEXT;
BEGIN
  -- Extract metadata from the new user record
  user_full_name := NEW.raw_user_meta_data->>'full_name';
  user_company := NEW.raw_user_meta_data->>'company';
  user_title := NEW.raw_user_meta_data->>'title';

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
    user_role_value := invite_record.role;
    
    -- Mark invitation as accepted
    UPDATE invitations
    SET status = 'accepted', accepted_at = NOW()
    WHERE id = invite_record.id;
  END IF;
  
  -- Create profile with metadata (ON CONFLICT handles existing users re-authenticating)
  INSERT INTO profiles (id, email, full_name, company, title, tier, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    user_full_name,
    user_company,
    user_title,
    user_tier, 
    user_role_value
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    company = COALESCE(EXCLUDED.company, profiles.company),
    title = COALESCE(EXCLUDED.title, profiles.title),
    updated_at = NOW();
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    -- Still create a basic profile so the user can log in
    BEGIN
      INSERT INTO profiles (id, email, tier, role)
      VALUES (NEW.id, NEW.email, 'silver', 'member')
      ON CONFLICT (id) DO NOTHING;
    EXCEPTION
      WHEN OTHERS THEN
        RAISE WARNING 'Could not create fallback profile: %', SQLERRM;
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger is attached (in case it was dropped)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
