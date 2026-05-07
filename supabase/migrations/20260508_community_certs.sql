
-- 1. Forum Tables
CREATE TABLE IF NOT EXISTS public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tag TEXT,
  views_count INTEGER DEFAULT 0,
  sparks_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Certificate Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for dev)
CREATE POLICY "Allow public read access for forum" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access for posts" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access for comments" ON public.forum_comments FOR SELECT USING (true);
CREATE POLICY "Allow user read access for certificates" ON public.certificates FOR SELECT USING (true);

-- Seed Categories
INSERT INTO public.forum_categories (title, slug, description, icon_name, color)
VALUES 
('Ideas & Creative Teaching', 'creative-teaching', 'แชร์ไอเดียการจัดการเรียนรู้ กิจกรรม Ice Breaking และเทคนิคการสอนใหม่ๆ', 'Lightbulb', 'gold'),
('Case Study Vault', 'case-studies', 'ถอดบทเรียนจากเหตุการณ์จริง ปัญหาที่พบ และแนวทางการแก้ไขสไตล์ Facilitator', 'BookOpen', 'royal-blue'),
('PLC Mastermind', 'discussions', 'พื้นที่พูดคุยประเด็นวิชาชีพ ปรึกษา และเติบโตไปด้วยกันในชุมชนวิทยากร', 'Users', 'royal-blue');
