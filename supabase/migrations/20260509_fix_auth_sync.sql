-- Migration: Fix auth.users → public.users sync
-- Adjusted for actual schema: public.users has (id, email, role, created_at)
-- Adds name + line_user_id columns, then creates sync trigger.

-- ============================================================
-- 1. Add missing columns to public.users
-- ============================================================
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS name         TEXT NOT NULL DEFAULT 'FA-OS Member',
  ADD COLUMN IF NOT EXISTS line_user_id TEXT;

-- ============================================================
-- 2. Trigger function: auto-create/update public.users on auth sign-up
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, line_user_id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      'FA-OS Member'
    ),
    -- LINE OIDC stores user ID in the 'sub' claim
    NEW.raw_user_meta_data->>'sub',
    'member'
  )
  ON CONFLICT (id) DO UPDATE SET
    email        = COALESCE(EXCLUDED.email,        public.users.email),
    name         = COALESCE(EXCLUDED.name,         public.users.name),
    line_user_id = COALESCE(EXCLUDED.line_user_id, public.users.line_user_id);

  RETURN NEW;
END;
$$;

-- ============================================================
-- 3. Attach trigger to auth.users
-- ============================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_auth_user();

-- ============================================================
-- 4. Backfill: sync existing auth users missing from public.users
-- ============================================================
INSERT INTO public.users (id, email, name, line_user_id, role)
SELECT
  au.id,
  COALESCE(au.email, ''),
  COALESCE(
    au.raw_user_meta_data->>'full_name',
    au.raw_user_meta_data->>'name',
    'FA-OS Member'
  ),
  au.raw_user_meta_data->>'sub',
  'member'
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
)
ON CONFLICT (id) DO NOTHING;
