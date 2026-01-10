-- ============================================================================
-- NHL Community Platform - Simplified Trigger for Debugging
-- Migration: 00007_simplified_trigger.sql
-- 
-- Simplifies the handle_new_user trigger to diagnose issues
-- ============================================================================

-- Simplify the trigger to just create a basic profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_company TEXT;
  user_title TEXT;
BEGIN
  -- Extract metadata from the new user record
  user_full_name := NEW.raw_user_meta_data->>'full_name';
  user_company := NEW.raw_user_meta_data->>'company';
  user_title := NEW.raw_user_meta_data->>'title';
  
  -- Create profile with metadata directly - no invitation lookup
  INSERT INTO public.profiles (id, email, full_name, company, title, tier, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    user_full_name,
    user_company,
    user_title,
    'silver'::public.membership_tier, 
    'member'::public.user_role
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    company = COALESCE(EXCLUDED.company, public.profiles.company),
    title = COALESCE(EXCLUDED.title, public.profiles.title),
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Ensure the trigger is attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
