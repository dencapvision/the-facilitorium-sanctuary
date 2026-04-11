"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Wrench, 
  Cpu, 
  Layout, 
  Download, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  Layers,
  Sparkles,
  Lock
} from 'lucide-react';

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI Tools', 'Workshop Deck', 'Digital Resource', 'Template'];

  const tools = [
    {
      id: 1,
      title: 'Wise Brother AI',
      category: 'AI Tools',
      desc: 'ผู้ช่วยอัจฉริยะที่ช่วยคุณออกแบบ Workshop, กิจกรรม และ Script การสื่อสารได้ในไม่กี่วินาที',
      icon: <Cpu className="w-6 h-6" />,
      tag: 'Member Exclusive',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Facilitation Activity Cards',
      category: 'Workshop Deck',
      desc: 'สำรับไพ่กิจกรรม Ice Breaking และ Reflection ที่คัดสรรมาแล้วว่าได้ผลจริง',
      icon: <Layers className="w-6 h-6" />,
      tag: 'Digital Download',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Session Architect Pro',
      category: 'Template',
      desc: 'เทมเพลตสำหรับออกแบบหลักสูตรตามโครงสร้าง 6D CPS Model ที่คุณเด่นใช้จริง',
      icon: <Layout className="w-6 h-6" />,
      tag: 'Framework',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Visual Facilitation Kit',
      category: 'Digital Resource',
      desc: 'รวมภาพ Vector และ Icon สำหรับใช้ในงาน Graphic Recording และสไลด์การสอน',
      icon: <Layers className="w-6 h-6" />,
      tag: 'Assets',
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Outcome-Driven Checklist',
      category: 'Template',
      desc: 'รายการตรวจสอบสำหรับเตรียมความพร้อมหน้างาน (On-site Preparation)',
      icon: <CheckCircle2 className="w-6 h-6" />,
      tag: 'Free Tool',
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Feedback Loop Generator',
      category: 'AI Tools',
      desc: 'เครื่องมือสร้างแบบสอบถามประเมินผล Workshop ที่วัดผลลัพธ์ได้จริง',
      icon: <Zap className="w-6 h-6" />,
      tag: 'Beta',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1664575196412-ed801e8333a1?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FDFDFD] relative selection:bg-gold/30">
      <div className="fixed inset-0 sanctuary-grain z-0 opacity-[0.03] pointer-events-none"></div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <Wrench size={14} className="text-gold" />
            The Toolkit Sanctuary
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-royal-blue leading-tight mb-6">
             ยกระดับการสอนด้วย <br />
            <span className="gold-text-gradient">ชุดเครื่องมือระดับโปร</span>
          </h1>
          <p className="text-xl text-royal-blue/60 max-w-2xl mx-auto font-light leading-relaxed">
            ห้องสมุดรวบรวมเครื่องมือ ดิจิทัลทรัพยากร และ AI ช่วยสอน <br className="hidden md:block" />
            ที่ออกแบบมาเพื่อ Facilitator มืออาชีพโดยเฉพาะ
          </p>
        </div>
      </section>

      {/* Library Filter & Search */}
      <section className="py-8 px-4 border-y border-royal-blue/5 bg-white/50 backdrop-blur-sm sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-royal-blue text-gold shadow-lg shadow-royal-blue/20' 
                  : 'text-royal-blue/40 hover:text-royal-blue hover:bg-royal-blue/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-blue/30 group-focus-within:text-gold transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาเครื่องมือ..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-royal-blue/5 border-transparent border-2 focus:border-gold focus:bg-white outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredTools.map((tool) => (
              <div 
                key={tool.id} 
                className="group relative bg-white rounded-[2.5rem] border border-royal-blue/5 overflow-hidden transition-all duration-500 hover:shadow-premium hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Tool Image Header */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-royal-blue/20 group-hover:bg-transparent transition-colors duration-500 z-10 transition-all"></div>
                  <img 
                    src={tool.image} 
                    alt={tool.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 z-20">
                     <span className="px-4 py-2 rounded-full glass-morphism text-[10px] font-black uppercase tracking-widest text-royal-blue">
                       {tool.tag}
                     </span>
                  </div>
                  {tool.isPremium && (
                    <div className="absolute top-6 left-6 z-20">
                      <div className="w-10 h-10 rounded-full bg-gold/90 backdrop-blur shadow-lg flex items-center justify-center text-royal-blue">
                        <Lock size={18} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4 text-gold">
                    <div className="p-2 rounded-lg bg-gold/10 group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                      {tool.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tool.category}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-royal-blue mb-3 group-hover:text-gold transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-sm text-royal-blue/50 leading-relaxed font-light mb-8">
                    {tool.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-royal-blue/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-royal-blue/30 font-bold mb-1">Access Type</span>
                      <span className="text-xs font-black text-royal-blue">
                        {tool.isPremium ? 'FA-OS Membership' : 'Public Access'}
                      </span>
                    </div>
                    <button className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                      tool.isPremium 
                      ? 'bg-gold text-royal-blue hover:bg-royal-blue hover:text-gold shadow-lg shadow-gold/20' 
                      : 'border border-royal-blue/10 text-royal-blue hover:bg-royal-blue hover:text-white'
                    }`}>
                      {tool.isPremium ? 'Unlock Tool' : 'Open Tool'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="py-32 text-center">
              <div className="inline-block p-6 rounded-3xl bg-royal-blue/5 text-royal-blue/20 mb-6">
                <Search size={48} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-royal-blue">ยังไม่พบเครื่องมือในหมวดหมู่นี้</h3>
              <p className="text-royal-blue/40 font-light mt-2">ลองล้างการค้นหาหรือเปลี่ยนหมวดหมู่ดูนะครับ</p>
              <button onClick={() => setActiveCategory('All')} className="mt-8 text-gold font-bold underline decoration-2 underline-offset-4">
                แสดงผลทั้งหมด
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-royal-blue p-12 md:p-20 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gold/5 sanctuary-grain z-0"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold opacity-[0.05] blur-[150px] -mb-64 -mr-64"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-3/5 text-center md:text-left">
                <div className="flex items-center gap-3 text-gold mb-6 justify-center md:justify-start">
                  <Sparkles />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">Signature Tool</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight mb-8">
                  <span className="text-gold italic">Wise Brother</span> <br />
                  AI Coach อัจฉริยะของคุณ
                </h2>
                <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-10 max-w-xl">
                  ให้ AI ที่ผ่านการเทรนจากองค์ความรู้ของ CAP Vision ช่วยคุณร่างโครงสร้าง Workshop 
                  เตรียมคีย์เวิร์ดทรงพลัง และแก้ปัญหาเฉพาะหน้าในห้องอบรมได้ทันที
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
                  <button className="px-10 py-5 bg-gold text-royal-blue font-black rounded-2xl shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1">
                    ทดลองใช้งานผ่าน VIP
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                    Learn more <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <div className="md:w-2/5 flex justify-center">
                 <div className="relative">
                   <div className="absolute inset-0 bg-gold blur-[80px] opacity-20 animate-pulse"></div>
                   <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 flex items-center justify-center p-12 shadow-2xl">
                      <Cpu size={120} className="text-gold opacity-80" strokeWidth={1} />
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
