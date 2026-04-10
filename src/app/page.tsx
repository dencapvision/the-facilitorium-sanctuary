import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FacilitatorChat } from '@/components/ai/FacilitatorChat';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { Play, BookOpen, PenTool, Users, Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';


export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] relative overflow-hidden font-sans selection:bg-gold/30">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 sanctuary-grain z-0 opacity-[0.03] pointer-events-none"></div>
      
      <Navbar />
      
      {/* Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-16 relative z-10">
            
            {/* Elegant Hero Header & Banner */}
            <section className="space-y-8 animate-fade-in text-center lg:text-left">
              <div className="group relative w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-premium mb-10 border-4 border-white">
                <img 
                  src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Bradner%20The%20facilitorium.png" 
                  alt="The Facilitorium Banner" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/80 via-royal-blue/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start lg:items-start text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                    <Sparkles size={14} />
                    Established 2024
                  </div>
                  <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    The <span className="text-gold">Facilitorium</span> Sanctuary
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-royal-blue leading-[1.1]">
                  ปลุกพลังวิทยากร <br />
                  <span className="gold-text-gradient">ผู้สร้างการเปลี่ยนแปลง</span>
                </h2>
                <p className="text-xl text-royal-blue/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  พื้นที่ศักดิ์สิทธิ์สำหรับการบ่มเพาะวิทยากรผู้สร้างผลกระทบ <br className="hidden md:block" />
                  รวมฐานความรู้และเครื่องมือระดับสากลไว้ในที่เดียว
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <Link href="/lms" className="px-8 py-4 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:shadow-royal-blue/20 transition-all hover:-translate-y-1">
                    เริ่มการเดินทาง
                  </Link>
                  <button className="px-8 py-4 bg-white border border-royal-blue/10 text-royal-blue font-bold rounded-2xl hover:bg-royal-blue/5 transition-all">
                    เรียนรู้เพิ่มเติม
                  </button>
                </div>
              </div>
            </section>

            {/* Platform Narrative / About */}
            <section className="relative rounded-3xl overflow-hidden bg-royal-blue p-8 md:p-12 text-white shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
               <div className="relative z-10 space-y-6">
                 <h2 className="text-3xl font-serif font-bold">Why The Facilitorium?</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="p-2 bg-white/10 rounded-lg"><Zap size={20} className="text-gold" /></div>
                      <div>
                        <h4 className="font-bold mb-1">Knowledge Library</h4>
                        <p className="text-sm text-white/70">เข้าถึงคลังวิดีโอและบทความเชิงลึกที่หาไม่ได้จากที่อื่น</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2 bg-white/10 rounded-lg"><PenTool size={20} className="text-gold" /></div>
                      <div>
                        <h4 className="font-bold mb-1">Advanced Tools</h4>
                        <p className="text-sm text-white/70">เครื่องมือ Facilitation และ AI ช่วยออกแบบหลักสูตรที่ช่วยคุณประหยัดเวลา</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2 bg-white/10 rounded-lg"><Users size={20} className="text-gold" /></div>
                      <div>
                        <h4 className="font-bold mb-1">Vibrant Community</h4>
                        <p className="text-sm text-white/70">เครือข่ายวิทยากรแถวหน้าเพื่อการแลกเปลี่ยนและเติบโตไปด้วยกัน</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={20} className="text-gold" /></div>
                      <div>
                        <h4 className="font-bold mb-1">Trusted Standards</h4>
                        <p className="text-sm text-white/70">หลักสูตรที่ผ่านการรับรองและใช้ได้จริงในระดับมืออาชีพ</p>
                      </div>
                    </div>
                 </div>
               </div>
            </section>

            {/* Free Exploration Section (USER REQUEST) */}
            <section className="space-y-10">
               <div className="flex items-end justify-between border-b border-royal-blue/5 pb-6">
                 <div>
                   <h2 className="text-4xl font-serif font-bold text-royal-blue">สัมผัสประสบการณ์ฟรี</h2>
                   <p className="text-royal-blue/40 mt-2">สำรวจคลังความรู้พื้นฐานและเครื่องมือช่วยสอนเบื้องต้น</p>
                 </div>
                 <button className="text-gold font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                   ดูทั้งหมด <Zap size={16} />
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 bento-grid-custom">
                  <Link href="/lms" className="md:col-span-2 group">
                    <div className="relative overflow-hidden rounded-[2rem] bg-royal-blue p-10 text-white min-h-[300px] flex flex-col justify-end shadow-premium hover:-translate-y-2 transition-all duration-500">
                      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 blur-[100px] -mr-20 -mt-20 group-hover:bg-gold/20 transition-colors"></div>
                      <div className="relative z-10 max-w-lg space-y-4">
                        <span className="px-4 py-1.5 bg-gold/20 backdrop-blur-md rounded-full text-gold text-[10px] font-bold tracking-widest uppercase">Featured Content</span>
                        <h3 className="text-4xl font-serif font-bold">Facilitation Quick Starts</h3>
                        <p className="text-white/70 leading-relaxed text-lg">
                          5 เทคนิคลับการเปิดวงคุยเพื่อสร้างความไว้เนื้อเชื่อใจ (Safety) ในห้องเรียนยุคใหม่ 
                          ที่วิทยากรมืออาชีพเลือกใช้เพื่อให้ผู้เรียนเปิดใจตั้งแต่นาทีแรก
                        </p>
                        <div className="pt-4 flex items-center gap-3 text-gold font-bold">
                          เริ่มเรียนเลย <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <PremiumCard 
                    title="AI Session Designer"
                    tag="FREE TOOL"
                    isFree={true}
                    description="ทดลองใช้งาน AI ช่วยร่างโครงสร้างหลักสูตรสั้นๆ ภายใน 3 นาที"
                    icon={<Zap size={24} />}
                    className="h-full"
                  />
                  <PremiumCard 
                    title="Community Access"
                    tag="FREE GUEST"
                    isFree={true}
                    description="เข้ามาร่วมรับชมกระทู้ยอดนิยมและพูดคุยในฐานะผู้มาเยือน Sanctuary"
                    icon={<Users size={24} />}
                    className="h-full"
                  />
               </div>
            </section>
          </div>

          {/* Sidebar Area (Skool-style) */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-24 space-y-6">
                
                {/* Main Join Card */}
                <div className="bg-white rounded-[2.5rem] shadow-premium border border-royal-blue/5 overflow-hidden group">
                   <div className="h-56 bg-royal-blue relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 multiply"></div>
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                         <Globe className="text-gold/10" size={160} />
                      </div>
                      <div className="absolute bottom-6 left-6">
                         <h4 className="text-gold font-serif font-bold bg-royal-blue/40 backdrop-blur-xl border border-gold/20 px-4 py-2 rounded-2xl text-sm">
                           Elite Community
                         </h4>
                      </div>
                   </div>
                   <div className="p-8 space-y-8">
                      <div className="space-y-3">
                         <h3 className="text-3xl font-serif font-bold text-royal-blue leading-tight">The Sanctum Member</h3>
                         <p className="text-sm text-royal-blue/40 font-medium tracking-wide">SKOOL.COM/THE-FACILITORIUM</p>
                      </div>
                      <p className="text-md leading-relaxed text-royal-blue/70 font-light">
                        ร่วมเป็นส่วนหนึ่งของสถาบันที่รวบรวมวิทยากรแถวหน้าของประเทศไทย เพื่อยกระดับทักษะและการเรียนรู้ร่วมกัน
                      </p>
                      <div className="flex justify-between items-center py-6 border-y border-royal-blue/5">
                         <div className="text-left">
                            <p className="text-2xl font-serif font-bold text-royal-blue">1.2k+</p>
                            <p className="text-[10px] text-gold font-bold uppercase tracking-wider">Followers</p>
                         </div>
                         <div className="h-8 w-[1px] bg-royal-blue/5"></div>
                         <div className="text-left">
                            <p className="text-2xl font-serif font-bold text-green-500">Active</p>
                            <p className="text-[10px] text-royal-blue/40 font-bold uppercase tracking-wider">Community</p>
                         </div>
                      </div>
                      <button className="w-full py-5 bg-royal-blue text-gold font-bold rounded-[1.5rem] shadow-premium hover:shadow-royal-blue/30 transition-all hover:-translate-y-1 text-lg">
                         Apply for Sanctuary Access
                      </button>
                      <div className="flex items-center justify-center gap-2">
                        <ShieldCheck size={14} className="text-gold" />
                        <p className="text-[10px] text-royal-blue/40 font-medium italic">
                          Exclusive for Certified Facilitators
                        </p>
                      </div>
                   </div>
                </div>

                {/* Secondary Info Card */}
                <div className="glass-morphism p-6 rounded-3xl border border-royal-blue/5">
                   <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="text-royal-blue" size={20} />
                      <h4 className="font-bold text-royal-blue">ระบบสมาชิก VIP</h4>
                   </div>
                   <p className="text-xs text-royal-blue/70 mb-4">
                      สมาชิกจะได้รับสิทธิ์เข้าถึงเครื่องมือ AI ออกแบบการสอน และคอร์สออนไลน์ระดับ Advanced ทั้งหมด
                   </p>
                   <button className="w-full py-2 border border-royal-blue/20 text-royal-blue text-sm font-bold rounded-xl hover:bg-royal-blue/5 transition-colors">
                      ดูแผนสมาชิก
                   </button>
                </div>

             </div>
          </div>

        </div>
      </div>

      <FacilitatorChat />
    </main>
  );
}
