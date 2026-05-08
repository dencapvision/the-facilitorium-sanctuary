-- Migration: Proper Row Level Security policies
-- Based on actual schema — only applies to tables that exist.
-- Scoped per-user access; service_role handles admin writes.

-- ============================================================
-- REVOKE blanket grants from initial migration
-- ============================================================
REVOKE ALL ON public.users         FROM anon;
REVOKE ALL ON public.subscriptions FROM anon;
REVOKE ALL ON public.access_codes  FROM anon;
REVOKE ALL ON public.activity_logs FROM anon;

REVOKE ALL ON public.users         FROM authenticated;
REVOKE ALL ON public.subscriptions FROM authenticated;
REVOKE ALL ON public.access_codes  FROM authenticated;
REVOKE ALL ON public.activity_logs FROM authenticated;

-- Re-grant scoped permissions
GRANT SELECT, UPDATE ON public.users TO authenticated;
GRANT SELECT           ON public.subscriptions TO authenticated;
GRANT SELECT, INSERT   ON public.activity_logs TO authenticated;

GRANT ALL ON public.users         TO service_role;
GRANT ALL ON public.subscriptions TO service_role;
GRANT ALL ON public.access_codes  TO service_role;
GRANT ALL ON public.activity_logs TO service_role;

-- ============================================================
-- public.users
-- ============================================================
DROP POLICY IF EXISTS "users_select_own"  ON public.users;
DROP POLICY IF EXISTS "users_update_own"  ON public.users;
DROP POLICY IF EXISTS "users_insert_self" ON public.users;

CREATE POLICY "users_select_own"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_insert_self"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- public.subscriptions — read own; write via service_role only
-- ============================================================
DROP POLICY IF EXISTS "subscriptions_select_own" ON public.subscriptions;

CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================
-- public.activity_logs — read own + insert own
-- ============================================================
DROP POLICY IF EXISTS "logs_select_own" ON public.activity_logs;
DROP POLICY IF EXISTS "logs_insert_own" ON public.activity_logs;

CREATE POLICY "logs_select_own"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "logs_insert_own"
  ON public.activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- public.access_codes — service_role only (no user policy = no access)
-- ============================================================
-- RLS already enabled; absence of policy = deny all non-service_role ✓

-- ============================================================
-- Forum + Certificate tables (create if not yet migrated)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name   TEXT,
  color       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  tag         TEXT,
  views_count  INTEGER DEFAULT 0,
  sparks_count INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_comments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.certificates (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID REFERENCES public.users(id) ON DELETE CASCADE,
  course_id          UUID,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at          TIMESTAMPTZ DEFAULT NOW(),
  metadata           JSONB DEFAULT '{}',
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates     ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.forum_categories TO anon, authenticated;
GRANT SELECT, INSERT ON public.forum_posts     TO authenticated;
GRANT SELECT, INSERT ON public.forum_comments  TO authenticated;
GRANT ALL ON public.forum_categories TO service_role;
GRANT ALL ON public.forum_posts      TO service_role;
GRANT ALL ON public.forum_comments   TO service_role;
GRANT ALL ON public.certificates     TO service_role;

-- Forum: read all public; write own
DROP POLICY IF EXISTS "forum_categories_public_read" ON public.forum_categories;
CREATE POLICY "forum_categories_public_read"
  ON public.forum_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "posts_public_read"  ON public.forum_posts;
DROP POLICY IF EXISTS "posts_insert_auth"  ON public.forum_posts;
DROP POLICY IF EXISTS "posts_update_own"   ON public.forum_posts;
DROP POLICY IF EXISTS "posts_delete_own"   ON public.forum_posts;

CREATE POLICY "posts_public_read"  ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "posts_insert_auth"  ON public.forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "posts_update_own"   ON public.forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "posts_delete_own"   ON public.forum_posts FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "comments_public_read" ON public.forum_comments;
DROP POLICY IF EXISTS "comments_insert_auth" ON public.forum_comments;
DROP POLICY IF EXISTS "comments_update_own"  ON public.forum_comments;
DROP POLICY IF EXISTS "comments_delete_own"  ON public.forum_comments;

CREATE POLICY "comments_public_read" ON public.forum_comments FOR SELECT USING (true);
CREATE POLICY "comments_insert_auth" ON public.forum_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_update_own"  ON public.forum_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "comments_delete_own"  ON public.forum_comments FOR DELETE USING (auth.uid() = user_id);

-- Certificates: read own only
DROP POLICY IF EXISTS "certificates_select_own" ON public.certificates;
CREATE POLICY "certificates_select_own"
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);
