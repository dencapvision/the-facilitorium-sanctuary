import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { FacilitatorChat } from '@/components/ai/FacilitatorChat';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { Play, BookOpen, PenTool, Users, Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      {/* Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Elegant Hero Header & Banner */}
            <section className="space-y-6 animate-fade-in">
              <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="/images/banner.png" 
                  alt="The Facilitorium Banner" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/60 to-transparent"></div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold tracking-widest uppercase">
                <Sparkles size={12} />
                The Sanctuary for Change-Makers
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-royal-blue leading-tight">
                ปลุกพลังวิทยากร <br />
                <span className="gold-text-gradient">ผู้สร้างการเปลี่ยนแปลง</span>
              </h1>
              <p className="text-lg text-royal-blue/70 max-w-2xl leading-relaxed">
                ยินดีต้อนรับสู่ The Facilitorium พื้นที่แห่งการเรียนรู้ที่รวมทั้งคลังความรู้ เครื่องมือ และคอมมูนิตี้ 
                เพื่อฝึกฝนกระบวนยุทธ์สู่การเป็นสุดยอดวิทยากรที่สร้าง Impact ให้กับสังคม
              </p>
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
            <section className="space-y-8">
               <div className="flex items-center justify-between border-b border-royal-blue/10 pb-4">
                 <h2 className="text-3xl font-serif font-bold text-royal-blue">สัมผัสประสบการณ์ฟรี (Free Exploration)</h2>
                 <button className="text-gold font-bold text-sm hover:underline">ดูทั้งหมด</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PremiumCard 
                    title="Facilitation Quick Starts"
                    tag="FREE PREVIEW"
                    isFree={true}
                    description="5 เทคนิคลับการเปิดวงคุยเพื่อสร้างความไว้เนื้อเชื่อใจ (Safety) ในห้องเรียนยุคใหม่"
                    icon={<Play size={24} />}
                  />
                  <PremiumCard 
                    title="AI Session Designer (v.1)"
                    tag="FREE TOOL"
                    isFree={true}
                    description="ทดลองใช้งาน AI ช่วยร่างโครงสร้างหลักสูตรสั้นๆ ภายใน 3 นาที"
                    icon={<Zap size={24} />}
                  />
                  <PremiumCard 
                    title="Knowledge Base Snippet"
                    tag="FREE INSIGHT"
                    isFree={true}
                    description="สรุปหัวใจสำคัญของ 10 พฤติกรรมที่วิทยากรมือโปรต้องมี"
                    icon={<BookOpen size={24} />}
                  />
                  <PremiumCard 
                    title="Community Guest Room"
                    tag="FREE ACCESS"
                    isFree={true}
                    description="เข้ามาร่วมรับชมกระทู้ยอดนิยมและพูดคุยในฐานะผู้มาเยือน"
                    icon={<Users size={24} />}
                  />
               </div>
            </section>
          </div>

          {/* Sidebar Area (Skool-style) */}
          <div className="lg:col-span-4 space-y-6">
             <div className="sticky top-24 space-y-6">
                
                {/* Main Join Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-royal-blue/5 overflow-hidden">
                   <div className="h-48 bg-royal-blue relative shimmer-effect">
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Globe className="text-gold/20" size={120} />
                      </div>
                      <div className="absolute bottom-4 left-4">
                         <h4 className="text-gold font-serif font-bold bg-royal-blue/60 backdrop-blur-md px-3 py-1 rounded-lg">Official Platform</h4>
                      </div>
                   </div>
                   <div className="p-6 space-y-6">
                      <div className="space-y-2">
                         <h3 className="text-2xl font-serif font-bold text-royal-blue">The Facilitorium Skool</h3>
                         <p className="text-sm text-royal-blue/60">skool.com/the-facilitorium</p>
                      </div>
                      <p className="text-sm leading-relaxed text-royal-blue/80">
                         ปลดล็อกทุกกระบวนยุทธ์ เข้าถึงคลังเครื่องมือทั้งหมด และร่วมชุมชนวิทยากรผู้สร้างการเปลี่ยนแปลง
                      </p>
                      <div className="flex justify-between items-center py-4 border-y border-royal-blue/5">
                         <div className="text-center">
                            <p className="text-xl font-bold text-royal-blue">1.2k</p>
                            <p className="text-[10px] text-royal-blue/40 font-bold uppercase tracking-wider">Members</p>
                         </div>
                         <div className="text-center">
                            <p className="text-xl font-bold text-green-500">12</p>
                            <p className="text-[10px] text-royal-blue/40 font-bold uppercase tracking-wider">Online</p>
                         </div>
                         <div className="text-center">
                            <p className="text-xl font-bold text-royal-blue">4</p>
                            <p className="text-[10px] text-royal-blue/40 font-bold uppercase tracking-wider">Admins</p>
                         </div>
                      </div>
                      <button className="w-full py-4 bg-royal-blue text-gold font-bold rounded-2xl shadow-lg shadow-royal-blue/20 hover:bg-royal-blue-light transition-all active:scale-95 text-lg">
                         Join Waitlist
                      </button>
                      <p className="text-[10px] text-center text-royal-blue/40">
                         * สมาชิกใหม่ต้องผ่านการคัดเลือกหรือชำระค่าบริการรายเดือน
                      </p>
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
