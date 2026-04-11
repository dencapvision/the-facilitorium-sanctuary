"use client";

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Users, 
  MessageSquare, 
  Lightbulb, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  MessageCircle,
  Eye,
  Plus
} from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const categories = [
    {
      title: 'Ideas & Creative Teaching',
      desc: 'แชร์ไอเดียการจัดการเรียนรู้ กิจกรรม Ice Breaking และเทคนิคการสอนใหม่ๆ',
      icon: <Lightbulb className="w-8 h-8" />,
      tag: 'Teaching Tips',
      color: 'gold',
      size: 'large'
    },
    {
      title: 'Case Study Vault',
      desc: 'ถอดบทเรียนจากเหตุการณ์จริง ปัญหาที่พบ และแนวทางการแก้ไขสไตล์ Facilitator',
      icon: <BookOpen className="w-6 h-6" />,
      tag: 'Real Cases',
      color: 'royal-blue',
      size: 'small'
    },
    {
      title: 'PLC Mastermind',
      desc: 'พื้นที่พูดคุยประเด็นวิชาชีพ ปรึกษา และเติบโตไปด้วยกันในชุมชนวิทยากร',
      icon: <Users className="w-6 h-6" />,
      tag: 'Discussion',
      color: 'royal-blue',
      size: 'small'
    }
  ];

  const discussions = [
    {
      author: 'เด่น Master Fa',
      role: 'Founding Facilitator',
      avatar: 'https://i.pravatar.cc/150?u=den',
      title: 'วิธีจัดการเมื่อเจอลูกคอ (Resistant Participant) ในห้องอบรมแบบสันติวิธี',
      snippet: 'วันนี้ผมไปเจอเคสหนึ่งที่น่าสนใจมากครับ มีผู้เข้าอบรมที่ไม่ยอมร่วมกิจกรรมเลย...',
      tag: 'Case Study',
      stats: { views: '1.2k', comments: 24, sparks: 45 },
      time: '2 hours ago'
    },
    {
      author: 'คุณเปิ้ล Expert',
      avatar: 'https://i.pravatar.cc/150?u=ple',
      title: 'Ice Breaking: กิจกรรม "ภาพสะท้อนใจ" ใช้เวลาแค่ 10 นาที แต่เจาะลึกความรู้สึกได้ดีมาก',
      snippet: 'ส่งต่อกิจกรรมที่ผมใช้เป็นประจำตอนเช้าครับ อุปกรณ์มีแค่กระดาษ A4...',
      tag: 'Idea Share',
      stats: { views: '850', comments: 12, sparks: 32 },
      time: '5 hours ago'
    },
    {
      author: 'วิทยากรนิรนาม',
      avatar: 'https://i.pravatar.cc/150?u=anonymous',
      title: 'ใครมีเครื่องมือ AI ช่วยสรุปเนื้อหาตอนจบ Workshop บ้างครับ?',
      snippet: 'กำลังหาเครื่องมือที่ช่วยให้ผู้เข้าอบรมเห็นภาพรวมสิ่งที่เรียนมาทั้งหมด...',
      tag: 'Question',
      stats: { views: '420', comments: 8, sparks: 15 },
      time: 'Yesterday'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFDFD] relative selection:bg-gold/30">
      <div className="fixed inset-0 sanctuary-grain z-0 opacity-[0.03] pointer-events-none"></div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            <Sparkles size={14} />
            The PLC Sanctuary
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-royal-blue leading-tight mb-6">
            พื้นที่แบ่งปัน <br />
            <span className="gold-text-gradient">ทางปัญญาของวิทยากร</span>
          </h1>
          <p className="text-xl text-royal-blue/60 max-w-2xl mx-auto font-light leading-relaxed">
            เชื่อมต่อกับกัลยาณมิตรวิทยากร ร่วมกันสร้างสังคมแห่งการเรียนรู้ (PLC) <br className="hidden md:block" />
            เพื่อยกระดับขีดความสามารถและสร้างผลกระทบที่ยั่งยืน
          </p>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-20 px-4 bg-royal-blue/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div 
                key={i} 
                className={`group relative p-8 rounded-[2.5rem] glass-morphism border border-white/40 transition-all duration-500 hover:shadow-premium hover:-translate-y-2 flex flex-col h-full ${cat.size === 'large' ? 'md:col-span-1' : 'md:col-span-1'}`}
              >
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl bg-royal-blue/5 ${cat.color === 'gold' ? 'text-gold' : 'text-royal-blue'} group-hover:bg-royal-blue group-hover:text-gold transition-all duration-500`}>
                    {cat.icon}
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/20 text-[10px] font-bold tracking-widest uppercase">
                    {cat.tag}
                  </span>
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-royal-blue mb-3 group-hover:text-gold transition-colors">{cat.title}</h3>
                  <p className="text-royal-blue/50 text-sm leading-relaxed font-light">{cat.desc}</p>
                </div>

                <div className="relative z-10 mt-8 flex items-center gap-2 text-gold font-bold text-xs tracking-widest uppercase translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span>Enter Space</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-royal-blue rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">มีไอเดียหรือเคสการสอนที่น่าสนใจ?</h2>
            <p className="text-white/60 font-sans">ร่วมเป็นส่วนหนึ่งในการสร้างสังคมแห่งการแบ่งปันกับเรา</p>
          </div>
          <button className="relative z-10 px-8 py-4 bg-gold text-royal-blue font-bold rounded-2xl shadow-xl hover:bg-white transition-all flex items-center gap-3 active:scale-95">
            <Plus size={20} />
            แบ่งปันเรื่องราวของคุณ
          </button>
        </div>
      </div>

      {/* Discussion Feed */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-serif font-bold text-royal-blue flex items-center gap-3">
              <MessageSquare className="text-gold" /> Dialogue Feed
            </h3>
            <div className="text-xs font-bold text-royal-blue/40 uppercase tracking-widest flex gap-6">
              <button className="text-gold border-b-2 border-gold pb-1 font-black">Latest</button>
              <button className="hover:text-royal-blue transition-colors">Trending</button>
              <button className="hover:text-royal-blue transition-colors">Cases</button>
            </div>
          </div>

          <div className="space-y-8">
            {discussions.map((disc, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-white border border-charcoal/5 hover:border-gold/30 hover:shadow-premium transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <img src={disc.avatar} alt={disc.author} className="w-12 h-12 rounded-full border-2 border-gold/20" />
                  <div>
                    <h4 className="font-bold text-royal-blue flex items-center gap-2">
                      {disc.author}
                      {disc.role && <span className="bg-gold/10 text-gold text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{disc.role}</span>}
                    </h4>
                    <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">{disc.time}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-royal-blue/5 text-royal-blue/60 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {disc.tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-royal-blue leading-tight group-hover:text-gold transition-colors">
                    {disc.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed line-clamp-2 italic">
                    "{disc.snippet}"
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-charcoal/5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-charcoal/40 group/stat hover:text-gold transition-colors cursor-pointer">
                      <Eye size={16} />
                      <span className="text-[11px] font-bold">{disc.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/40 group/stat hover:text-royal-blue transition-colors cursor-pointer">
                      <MessageCircle size={16} />
                      <span className="text-[11px] font-bold">{disc.stats.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-charcoal/40 group/stat hover:text-red-400 transition-colors cursor-pointer">
                      <Sparkles size={16} />
                      <span className="text-[11px] font-bold">{disc.stats.sparks}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-gold uppercase tracking-[0.2em] hover:translate-x-1 transition-transform">
                    Read More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <button className="px-10 py-4 rounded-2xl border border-royal-blue/10 text-royal-blue font-bold hover:bg-royal-blue hover:text-gold transition-all shadow-sm">
               Load More Wisdom
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
