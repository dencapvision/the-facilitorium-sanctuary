
'use client';

import React, { useState } from 'react';
import { COURSES } from '@/constants/courses';
import { 
    ChevronLeft, 
    ChevronRight, 
    Menu, 
    X, 
    PlayCircle, 
    FileText, 
    Download, 
    Save, 
    MessageSquare, 
    Settings,
    ArrowLeft,
    GraduationCap,
    Lock,
    CheckCircle2,
    PenTool
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function LMSPlayer({ params }: { params: Promise<{ slug: string, lessonId: string }> }) {
  const { slug, lessonId } = React.use(params);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'notes'>('overview');
  const [note, setNote] = useState('');

  const course = COURSES.find(c => c.slug === slug);
  if (!course) return notFound();

  // Flatten lessons to find current, prev, next
  const allLessons = course.syllabus.flatMap(m => m.lessons);
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  const prevLesson = allLessons[currentLessonIndex - 1];
  const nextLesson = allLessons[currentLessonIndex + 1];

  return (
    <div className="flex flex-col h-screen bg-royal-blue overflow-hidden selection:bg-gold selection:text-royal-blue">
      {/* Top Header */}
      <header className="h-16 shrink-0 bg-royal-blue border-b border-white/10 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
            <Link href={`/lms/${course.slug}`} className="p-2 text-white/40 hover:text-white transition-colors">
                <ChevronLeft size={24} />
            </Link>
            <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">{course.title}</p>
                <h1 className="text-sm font-serif font-black text-white truncate max-w-[300px] md:max-w-[500px]">
                    {currentLesson.title}
                </h1>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Lesson {currentLessonIndex + 1} of {allLessons.length}</span>
            </div>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
                <Settings size={20} />
            </button>
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gold bg-gold/10 rounded-xl lg:hidden"
            >
                <Menu size={20} />
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto transition-all duration-500 custom-scrollbar ${sidebarOpen ? 'lg:mr-80' : ''}`}>
             {/* Video Section */}
             <div className="w-full bg-black aspect-video relative group">
                {currentLesson.videoUrl ? (
                    <iframe 
                        className="w-full h-full"
                        src={currentLesson.videoUrl}
                        title={currentLesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-4">
                         <PlayCircle size={64} className="animate-pulse" />
                         <p className="font-serif italic">Video Content Loading...</p>
                    </div>
                )}

                {/* Video Overlays (Simplified) */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            {prevLesson && (
                                <Link 
                                    href={`/lms/${course.slug}/player/${prevLesson.id}`}
                                    className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10 hover:bg-white/20 transition-all"
                                >
                                    Previous
                                </Link>
                            )}
                            {nextLesson && (
                                <Link 
                                    href={`/lms/${course.slug}/player/${nextLesson.id}`}
                                    className="px-6 py-2 bg-gold text-royal-blue text-xs font-bold rounded-full hover:bg-white transition-all"
                                >
                                    Next Lesson
                                </Link>
                            )}
                         </div>
                         <button className="flex items-center gap-2 px-6 py-2 bg-green-500/80 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/10 hover:bg-green-500 transition-all">
                            <CheckCircle2 size={14} /> Mark as Completed
                         </button>
                    </div>
                </div>
             </div>

             {/* Content Tabs Section */}
             <div className="max-w-4xl mx-auto p-6 md:p-12">
                <div className="flex gap-8 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'resources', label: 'Resources' },
                        { id: 'notes', label: 'Notes' },
                        { id: 'ai-coach', label: 'Wise Brother AI' },
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-4 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all relative ${
                                activeTab === tab.id ? 'text-gold' : 'text-white/40 hover:text-white'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"></div>}
                        </button>
                    ))}
                </div>

                <div className="min-h-[300px] text-white/80 transition-all animate-fade-in">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-serif font-black text-white">Understanding the Core Process</h2>
                            <p className="text-lg leading-relaxed">
                                ในบทเรียนนี้ เราจะเจาะลึกถึงหัวใจสำคัญของการเป็น Facilitator นั่นคือการสร้างพื้นที่ที่ "ปลอดภัย" 
                                และ "เปิดกว้าง" ให้เกิดการแบ่งปันความรู้ภายในกลุ่ม...
                            </p>
                            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex items-start gap-4">
                                <MessageSquare className="text-gold shrink-0" size={24} />
                                <div>
                                    <p className="font-serif font-bold text-white mb-2">Reflective Question</p>
                                    <p className="italic text-white/60">"อะไรคือความท้าทายที่สุดที่คุณเคยเจอเมื่อต้องรับฟังความเห็นที่แตกต่างในที่ประชุม?"</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'DFA Framework PDF', size: '2.4 MB' },
                                { name: 'Facilitation Canvas v2', size: '1.1 MB' },
                                { name: 'Reading List: Mastery', size: '400 KB' },
                            ].map((res, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gold/10 rounded-xl text-gold">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{res.name}</p>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest">{res.size}</p>
                                        </div>
                                    </div>
                                    <Download size={18} className="text-white/20 hover:text-gold transition-colors" />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gold uppercase tracking-widest">Self-Reflection Note</p>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gold text-royal-blue rounded-full text-[10px] font-black uppercase">
                                    <Save size={12} /> Auto-Saving
                                </button>
                            </div>
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Write your insights, questions, or action plans here..."
                                className="w-full h-64 p-8 bg-white/5 border border-white/10 rounded-[2rem] text-white focus:outline-none focus:border-gold transition-all shadow-inner custom-scrollbar"
                            ></textarea>
                            <div className="flex items-center gap-4 pt-4 text-white/20 text-[10px] font-medium italic">
                                <PenTool size={12} />
                                Your notes are encrypted and private to you in the Sanctuary.
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai-coach' && (
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-[500px]">
                            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-royal-blue shadow-lg shadow-gold/20">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">Wise Brother AI</p>
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-black">Online • Your Companion</p>
                                    </div>
                                </div>
                                <ShieldCheck size={20} className="text-white/20" />
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                                <div className="flex gap-4 max-w-[80%]">
                                    <div className="w-8 h-8 bg-gold/20 rounded-full shrink-0 flex items-center justify-center text-gold border border-gold/20">
                                        พี่
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                        <p className="text-sm leading-relaxed text-white/90">
                                            สวัสดีครับน้อง... พี่ดีใจเหลือเกินที่คุณเลือกมาเติบโตด้วยกันในพื้นที่นี้ 
                                            จากบทเรียนเมื่อครู่ พี่อยากชวนสะท้อนนิดนึงว่า "อะไรคือสิ่งที่คุณรู้สึกว่ายากที่สุดในการสร้าง Safety ให้กับกลุ่ม?" 
                                            เล่าให้พี่ฟังได้เลยนะ พี่พร้อมฟังและประคองการเรียนรู้นี้ไปกับคุณครับ
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-white/5 border-t border-white/10">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="พิมพ์ข้อความคุยกับพี่ชาย..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white pr-12 focus:outline-none focus:border-gold transition-all"
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gold">
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
             </div>
        </div>

        {/* Sidebar Curriculum */}
        <aside 
            className={`fixed inset-y-0 right-0 w-80 bg-royal-blue/95 backdrop-blur-2xl border-l border-white/10 z-40 transition-transform duration-500 transform lg:translate-x-0 overflow-y-auto custom-scrollbar pt-16 lg:pt-0 ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-gold uppercase tracking-[0.25em]">Curriculum</h3>
                    <button className="lg:hidden text-white/40" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-8">
                    {course.syllabus.map((module, mIdx) => (
                        <div key={mIdx} className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-[10px] font-black">
                                    {mIdx + 1}
                                </div>
                                <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest truncate">
                                    {module.title}
                                </h4>
                            </div>
                            
                            <div className="space-y-2">
                                {module.lessons.map((lesson, lIdx) => (
                                    <Link 
                                        key={lIdx}
                                        href={`/lms/${course.slug}/player/${lesson.id}`}
                                        className={`group flex items-start gap-3 p-4 rounded-2xl transition-all border ${
                                            lesson.id === lessonId 
                                            ? 'bg-gold/10 border-gold/40 shadow-lg shadow-gold/5' 
                                            : 'border-transparent hover:bg-white/5'
                                        }`}
                                    >
                                        <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                                            lesson.id === lessonId 
                                            ? 'border-gold text-gold' 
                                            : 'border-white/10 group-hover:border-white/40 text-white/20'
                                        }`}>
                                            {lesson.id === lessonId ? (
                                                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse"></div>
                                            ) : (
                                                <Lock size={10} />
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className={`text-xs font-bold leading-snug transition-colors ${
                                                lesson.id === lessonId ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                                            }`}>
                                                {lesson.title}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold text-white/20 uppercase">{lesson.duration}</span>
                                                <span className="text-[9px] font-medium text-gold/40">• Video</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Sidebar Bottom Action */}
            <div className="p-6 border-t border-white/5">
                <button className="w-full py-4 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <GraduationCap size={14} /> Course Resources
                </button>
            </div>
        </aside>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 0.4);
        }
        .nav-font {
          font-family: var(--font-sans);
        }
      `}</style>
    </div>
  );
}
