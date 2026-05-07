
-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  instructor_name TEXT NOT NULL,
  instructor_role TEXT,
  instructor_image TEXT,
  duration TEXT,
  lessons_count INTEGER DEFAULT 0,
  level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  is_premium BOOLEAN DEFAULT true,
  price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  module_title TEXT NOT NULL,
  title TEXT NOT NULL,
  duration TEXT,
  type TEXT CHECK (type IN ('video', 'article', 'quiz')),
  video_url TEXT,
  content TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tools Table
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  tag TEXT,
  is_premium BOOLEAN DEFAULT true,
  image_url TEXT,
  tool_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Policies (Read-only for all for now, filter by is_premium in app logic)
CREATE POLICY "Allow public read access for courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read access for lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read access for tools" ON public.tools FOR SELECT USING (true);

-- Seed Tools
INSERT INTO public.tools (slug, title, category, description, icon_name, tag, is_premium, image_url)
VALUES 
('wise-brother-ai', 'Wise Brother AI', 'AI Tools', 'ผู้ช่วยอัจฉริยะที่ช่วยคุณออกแบบ Workshop, กิจกรรม และ Script การสื่อสารได้ในไม่กี่วินาที', 'Cpu', 'Member Exclusive', true, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop'),
('facilitation-activity-cards', 'Facilitation Activity Cards', 'Workshop Deck', 'สำรับไพ่กิจกรรม Ice Breaking และ Reflection ที่คัดสรรมาแล้วว่าได้ผลจริง', 'Layers', 'Digital Download', true, 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop'),
('session-architect-pro', 'Session Architect Pro', 'Template', 'เทมเพลตสำหรับออกแบบหลักสูตรตามโครงสร้าง 6D CPS Model ที่คุณเด่นใช้จริง', 'Layout', 'Framework', true, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop'),
('visual-facilitation-kit', 'Visual Facilitation Kit', 'Digital Resource', 'รวมภาพ Vector และ Icon สำหรับใช้ในงาน Graphic Recording และสไลด์การสอน', 'Layers', 'Assets', false, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'),
('outcome-driven-checklist', 'Outcome-Driven Checklist', 'Template', 'รายการตรวจสอบสำหรับเตรียมความพร้อมหน้างาน (On-site Preparation)', 'CheckCircle2', 'Free Tool', false, 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop');

-- Seed Courses (Example)
INSERT INTO public.courses (slug, title, category, image_url, description, instructor_name, instructor_role, duration, lessons_count, level, is_premium, price)
VALUES 
('facilitation-mastery-level-1', 'Facilitation Mastery: ศิลปะการสร้างบรรยากาศแห่งการเรียนรู้', 'Facilitation', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800', 'เรียนรู้เทคนิคการเป็น Facilitator ระดับมืออาชีพ ตั้งแต่การสร้าง Cognitive Safety ไปจนถึงการใช้คำถามเพื่อปลุกพลังทีม', 'ครูเด่น DenMasterFa', 'Master Facilitator', '6h 30m', 24, 'Intermediate', true, 4900.00),
('ai-for-change-makers', 'AI for Change-Makers: พลิกโฉมการศึกษาด้วยปัญญาประดิษฐ์', 'AI & Education', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', 'เจาะลึกการใช้ AI ช่วยออกแบบหลักสูตร สร้างสื่อการสอน และประเมินผลการเรียนรู้แบบ Hi-Touch & Hi-Tech', 'TechGuru AI', 'Innovation Consultant', '4h 45m', 15, 'Beginner', false, 0.00);
