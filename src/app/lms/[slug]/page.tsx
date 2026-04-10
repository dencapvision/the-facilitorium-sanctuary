
import React from 'react';
import { LMSNavbar } from '@/components/lms/LMSNavbar';
import { COURSES } from '@/constants/courses';
import { 
    Clock, 
    BookOpen, 
    Star, 
    ChevronRight, 
    PlayCircle, 
    Lock, 
    CheckCircle2, 
    Users, 
    Globe, 
    Layout, 
    Sparkles, 
    GraduationCap,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES.find(c => c.slug === slug);
  
  if (!course) return <div className="p-24 text-center">Course not found</div>;

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-24">
      <LMSNavbar />
      
      {/* Hero Section */}
      <section className="bg-royal-blue text-white pt-24 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <Link href="/lms" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Catalog</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase mb-4">
                        {course.category} • {course.level}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight">
                        {course.title}
                    </h1>
                    <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                        {course.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-6 pt-4">
                        <div className="flex items-center gap-2">
                            <Star className="text-gold fill-gold" size={18} />
                            <span className="text-sm font-bold">4.9 (120 Ratings)</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Users size={18} />
                            <span className="text-sm font-medium">1,240 Students Enrolled</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <Globe size={18} />
                            <span className="text-sm font-medium">English & Thai Subtitles</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30">
                            <img src={course.instructor.image} alt={course.instructor.name} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gold uppercase tracking-tighter">Instructor</p>
                            <p className="text-sm font-serif font-bold text-white leading-tight">{course.instructor.name}</p>
                            <p className="text-[10px] text-white/50">{course.instructor.role}</p>
                        </div>
                    </div>
                </div>

                {/* Video Preview Card */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
                    <div className="relative bg-white rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10">
                        <img 
                            src={course.image} 
                            className="w-full aspect-video object-cover"
                            alt="Preview"
                        />
                        <div className="absolute inset-0 bg-royal-blue/40 flex items-center justify-center">
                            <button className="w-24 h-24 bg-white/30 backdrop-blur-xl rounded-full border-4 border-white/50 flex items-center justify-center hover:scale-110 transition-transform group">
                                <PlayCircle size={48} className="text-white fill-white/20" />
                            </button>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-sm tracking-wide">
                            Pre-show: Learn the Core Fundamentals
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Floating Enrollment Card - Sticky on Scroll (Simplified for now) */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left: Syllabus & Details */}
            <div className="lg:col-span-2 space-y-12">
                <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-royal-blue/5">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-serif font-black text-royal-blue">Course Syllabus</h2>
                        <span className="text-sm font-bold text-royal-blue/40">{course.lessonsCount} Lessons • {course.duration}</span>
                    </div>

                    <div className="space-y-4">
                        {course.syllabus.map((module, mIdx) => (
                            <div key={mIdx} className="group border border-royal-blue/5 rounded-3xl overflow-hidden bg-royal-blue/[0.02]">
                                <div className="p-6 flex items-center justify-between bg-white border-b border-royal-blue/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-2xl bg-royal-blue text-gold flex items-center justify-center font-black text-sm">
                                            {mIdx + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-royal-blue leading-none">{module.title}</h3>
                                            <p className="text-[10px] text-royal-blue/40 font-bold uppercase tracking-widest mt-1">
                                                {module.lessons.length} LESSONS
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-royal-blue/20" />
                                </div>
                                <div className="p-4 space-y-2">
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lIdx} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 hover:bg-white transition-all cursor-pointer group/lesson">
                                            <div className="flex items-center gap-3">
                                                {lIdx === 0 && mIdx === 0 ? (
                                                    <PlayCircle size={18} className="text-green-500" />
                                                ) : (
                                                    <Lock size={16} className="text-royal-blue/20" />
                                                )}
                                                <span className={`text-sm font-medium ${lIdx === 0 && mIdx === 0 ? 'text-royal-blue' : 'text-royal-blue/40'}`}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-bold text-royal-blue/20">{lesson.duration}</span>
                                                {lIdx === 0 && mIdx === 0 && (
                                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[8px] font-black uppercase">Preview</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-royal-blue/[0.04] p-8 rounded-[3rem] border border-royal-blue/5">
                        <div className="w-12 h-12 rounded-2xl bg-royal-blue flex items-center justify-center mb-6">
                            <Layout className="text-gold" />
                        </div>
                        <h4 className="text-xl font-serif font-black text-royal-blue mb-4">What you'll learn</h4>
                        <ul className="space-y-3">
                            {['Master the Sanctuary Method', 'Craft compelling narratives', 'Apply DFA Cognitive techniques'].map(item => (
                                <li key={item} className="flex items-start gap-2 text-sm text-royal-blue/70">
                                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gold/[0.04] p-8 rounded-[3rem] border border-gold/10">
                        <div className="w-12 h-12 rounded-2xl bg-royal-blue flex items-center justify-center mb-6">
                            <Sparkles className="text-gold" />
                        </div>
                        <h4 className="text-xl font-serif font-black text-royal-blue mb-4">Includes</h4>
                        <ul className="space-y-3">
                            {['24 Downloadable PDF Guides', 'Lifetime Access to Sanctuary', 'Certificate of Mastery'].map(item => (
                                <li key={item} className="flex items-start gap-2 text-sm text-royal-blue/70">
                                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right: Enrollment Widget */}
            <div className="space-y-8">
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 border border-royal-blue/5 sticky top-24">
                    <div className="text-center mb-8">
                        <p className="text-xs font-black text-royal-blue/40 uppercase tracking-widest mb-2">Masterclass Pricing</p>
                        <div className="flex items-end justify-center gap-2">
                             <span className="text-4xl font-serif font-black text-royal-blue">
                                {course.price ? `฿${course.price.toLocaleString()}` : 'FREE'}
                             </span>
                             {course.price && <span className="text-royal-blue/30 line-through text-sm mb-1">฿8,900</span>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Link 
                            href={`/lms/${course.slug}/player/l1`} 
                            className="w-full bg-royal-blue text-gold h-16 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest hover:bg-gold hover:text-royal-blue transition-all shadow-xl shadow-royal-blue/20"
                        >
                            <PlayCircle size={20} className="mr-3" /> Start Learning Now
                        </Link>
                        <button className="w-full border-2 border-royal-blue/10 text-royal-blue h-16 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest hover:bg-royal-blue hover:text-gold transition-all">
                             Add to Wishlist
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-royal-blue/5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-royal-blue/50 uppercase tracking-tighter">
                            <span>Money Back Guarantee</span>
                            <span className="text-royal-blue">30 Days</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-royal-blue/50 uppercase tracking-tighter">
                            <span>Certificate Included</span>
                            <span className="text-green-600">YES</span>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-4 rounded-2xl bg-[#F8F9FA] text-center border border-dashed border-royal-blue/10">
                        <p className="text-[10px] font-bold text-royal-blue/40 uppercase tracking-widest mb-1">Exclusive Bonus</p>
                        <p className="text-xs font-bold text-royal-blue">Join the Private Community of Facilitators</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
