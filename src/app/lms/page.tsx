
import React from 'react';
import { LMSNavbar } from '@/components/lms/LMSNavbar';
import { CourseCard } from '@/components/lms/CourseCard';
import { COURSES } from '@/constants/courses';
import { Search, Filter, GraduationCap, Award, Zap, Trophy, TrendingUp } from 'lucide-react';

export default function LMSCatalog() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <LMSNavbar />
      
      {/* Header / Hero Area */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/cover%20the%20facilitorium.png"
                className="w-full h-full object-cover"
                alt="Sanctuary Cover"
            />
            <div className="absolute inset-0 bg-royal-blue/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-widest uppercase mb-6">
                <GraduationCap size={12} />
                Knowledge Sanctuary
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black mb-4 leading-tight">
                ปลุกจิตวิญญาณ <span className="gold-text-gradient">การเรียนรู้</span> <br className="hidden md:block" />
                สู่การเป็นวิทยากรระดับสากล
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
                ยกระดับกระบวนยุทธ์และเทคนิคการ Faciliation ผ่านหลักสูตรที่กลั่นกรองจากประสบการณ์จริง 
                และเครื่องมือที่ช่วยให้การออกแบบหลักสูตรเป็นเรื่องง่าย
            </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 pb-24">
        
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
                { label: 'Active Learners', value: '4.2k+', icon: <Zap className="text-gold" size={20} /> },
                { label: 'Master Courses', value: '48+', icon: <Award className="text-gold" size={20} /> },
                { label: 'Avg. Course Rating', value: '4.95', icon: <Trophy className="text-gold" size={20} /> },
                { label: 'Completion Rate', value: '82%', icon: <TrendingUp className="text-gold" size={20} /> },
            ].map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-royal-blue/5 shadow-xl flex items-center gap-4">
                    <div className="p-3 bg-royal-blue/5 rounded-2xl">{stat.icon}</div>
                    <div>
                        <p className="text-[10px] font-bold text-royal-blue/40 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xl font-serif font-black text-royal-blue leading-none">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>

        {/* Search & Filter Component */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 lg:p-8 mb-12 border border-royal-blue/5">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="relative w-full lg:w-[60%] group">
                    <input 
                        type="text" 
                        placeholder="Search for courses, tools, or techniques..."
                        className="w-full pl-14 pr-6 py-5 bg-[#F8F9FA] rounded-[1.5rem] border-2 border-transparent focus:border-gold transition-all outline-none text-royal-blue font-medium shadow-inner" 
                    />
                    <Search className="absolute left-6 top-5 text-royal-blue/30 group-focus-within:text-gold transition-colors" size={22} />
                </div>
                
                <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {['All Courses', 'Facilitation', 'Leadership', 'AI & Tech', 'Mindset'].map((cat, i) => (
                        <button 
                            key={cat}
                            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                                i === 0 ? 'bg-royal-blue text-gold shadow-lg shadow-royal-blue/20' : 'bg-[#F8F9FA] text-royal-blue/60 hover:bg-royal-blue/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                    <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-royal-blue/5 text-royal-blue/60 font-bold text-xs hover:bg-gold hover:text-white transition-all">
                        <Filter size={14} /> Filter
                    </button>
                </div>
            </div>
        </div>

        {/* Course Catalog Grid */}
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-royal-blue">Recommended for Your Growth</h2>
                <div className="flex gap-2">
                    <button className="p-2 bg-white border border-royal-blue/10 rounded-xl hover:bg-royal-blue/5 transition-colors text-royal-blue/40">
                        <TrendingUp size={18} />
                    </button>
                    <button className="p-2 bg-white border border-royal-blue/10 rounded-xl hover:bg-royal-blue/5 transition-colors text-royal-blue/40">
                        <Search size={18} />
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COURSES.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            
            <div className="text-center pt-8">
                <button className="px-12 py-4 border-2 border-royal-blue text-royal-blue font-black rounded-2xl hover:bg-royal-blue hover:text-gold transition-all nav-font text-sm uppercase tracking-widest active:scale-95">
                    Explore Advanced Masterclasses
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}
