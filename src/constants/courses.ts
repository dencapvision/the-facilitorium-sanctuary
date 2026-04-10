
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz';
  videoUrl?: string;
  content?: string;
}

export interface module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  instructor: {
    name: string;
    role: string;
    image: string;
  };
  duration: string;
  lessonsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  price?: number;
  syllabus: module[];
}

export const COURSES: Course[] = [
  {
    id: '1',
    slug: 'facilitation-mastery-level-1',
    title: 'Facilitation Mastery: ศิลปะการสร้างบรรยากาศแห่งการเรียนรู้',
    category: 'Facilitation',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    description: 'เรียนรู้เทคนิคการเป็น Facilitator ระดับมืออาชีพ ตั้งแต่การสร้าง Cognitive Safety ไปจนถึงการใช้คำถามเพื่อปลุกพลังทีม',
    instructor: {
      name: 'ครูเด่น DenMasterFa',
      role: 'Master Facilitator',
      image: 'https://i.pravatar.cc/150?u=kruden'
    },
    duration: '6h 30m',
    lessonsCount: 24,
    level: 'Intermediate',
    progress: 35,
    price: 4900,
    syllabus: [
      {
        title: 'Module 1: The Core of Facilitation',
        lessons: [
          { id: 'l1', title: 'บทนำ: Facilitator คือใครในโลกยุคใหม่?', duration: '12:00', type: 'video', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'l2', title: 'ความลับของ Cognitive Safety', duration: '15:20', type: 'video' },
          { id: 'l3', title: 'การเตรียมตัวก่อนเข้า 'Sanctuary'', duration: '08:45', type: 'article' },
        ]
      },
      {
        title: 'Module 2: Process Design Fundamentals',
        lessons: [
          { id: 'l4', title: 'DFA Model: หัวใจของการจัดกระบวนการ', duration: '20:10', type: 'video' },
          { id: 'l5', title: 'ก้าวข้ามกำแพงแห่งความเงียบ', duration: '18:30', type: 'video' },
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'ai-for-change-makers',
    title: 'AI for Change-Makers: พลิกโฉมการศึกษาด้วยปัญญาประดิษฐ์',
    category: 'AI & Education',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    description: 'เจาะลึกการใช้ AI ช่วยออกแบบหลักสูตร สร้างสื่อการสอน และประเมินผลการเรียนรู้แบบ Hi-Touch & Hi-Tech',
    instructor: {
      name: 'TechGuru AI',
      role: 'Innovation Consultant',
      image: 'https://i.pravatar.cc/150?u=techguru'
    },
    duration: '4h 45m',
    lessonsCount: 15,
    level: 'Beginner',
    price: 0,
    syllabus: [
      {
        title: 'Introduction to AI in Learning',
        lessons: [
          { id: 'a1', title: 'Prompt Engineering สำหรับวิทยากร', duration: '25:00', type: 'video' },
          { id: 'a2', title: 'เครื่องมือ AI ยอดนิยมในปี 2026', duration: '15:00', type: 'video' },
        ]
      }
    ]
  },
  {
    id: '3',
    slug: 'leadership-wisdom',
    title: 'Leadership Wisdom: ผู้นำที่คนอยากติดตาม',
    category: 'Leadership',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    description: 'ขัดเกลาทัศนคติและทักษะการนำทีมในยุคแห่งความผันผวน (VUCA World) ผ่านมุมมองจิตวิทยาและการโค้ช',
    instructor: {
      name: 'DenMasterFa',
      role: 'Executive Coach',
      image: 'https://i.pravatar.cc/150?u=denmasterfa'
    },
    duration: '8h 20m',
    lessonsCount: 32,
    level: 'Advanced',
    progress: 0,
    price: 7500,
    syllabus: []
  }
];
