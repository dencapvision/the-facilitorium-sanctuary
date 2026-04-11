'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useVIPStatus } from '@/hooks/useVIPStatus';
import { 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Infinity,
  Gem
} from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  const { isVIP, loading } = useVIPStatus();

  return (
    <main className="min-h-screen bg-[#FDFDFD] relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 sanctuary-grain z-0 opacity-[0.03] pointer-events-none"></div>
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-[0.2em] uppercase animate-fade-in">
            <Gem size={14} />
            The Sanctuary Access
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-royal-blue leading-tight">
            ยกระดับสู่ <br />
            <span className="gold-text-gradient">วิทยากรระดับพรีเมียม</span>
          </h1>
          <p className="text-xl text-royal-blue/60 max-w-2xl mx-auto font-light leading-relaxed">
            ปลดล็อกเครื่องมือ AI ขั้นสูง คลังความรู้วิทยากรมืออาชีพ <br className="hidden md:block" />
            และเข้ารวมคอมมูนิตี้เฉพาะทางที่จะพาคุณเติบโตไปด้วยกัน
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-royal-blue/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl font-serif font-bold text-royal-blue leading-tight">
                ทำไมต้องเป็น <br />
                <span className="text-gold">VIP Member?</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'AI Session Designer', desc: 'ปลดล็อกเครื่องมือ AI ช่วยออกแบบหลักสูตรแบบละเอียด ทุกขั้นตอน' },
                  { title: 'Advanced Course Library', desc: 'เข้าถึงคอร์สระดับ Advanced ทั้งหมดที่กลั่นกรองจากประสบการณ์จริง' },
                  { title: 'Exclusive Community', desc: 'เข้าร่วมกระทู้ถาม-ตอบ และพูดคุยเชิงลึกกับวิทยากรแถวหน้า' },
                  { title: 'Certification Support', desc: 'รับใบประกาศนียบัตรรับรองจาก The Facilitorium' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-gold group-hover:bg-gold group-hover:text-white transition-all">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-royal-blue">{feature.title}</h4>
                      <p className="text-sm text-royal-blue/50 font-light">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/10 blur-[100px] rounded-full"></div>
              <div className="relative bg-white p-10 rounded-[3rem] shadow-premium border border-royal-blue/5 space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-royal-blue">VIP Membership</h3>
                    <p className="text-sm text-gold font-bold uppercase tracking-widest mt-1">Full Sanctuary Access</p>
                  </div>
                  <div className="bg-royal-blue/5 p-4 rounded-3xl">
                    <Infinity size={32} className="text-royal-blue" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-serif font-black text-royal-blue">฿590</span>
                    <span className="text-royal-blue/40 font-bold uppercase tracking-widest text-sm">/ Monthly</span>
                  </div>
                  <p className="text-sm text-royal-blue/60 font-medium">รวมภาษีและค่าธรรมเนียมทั้งหมดแล้ว ยกเลิกได้ตลอดเวลา</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-royal-blue/5">
                   {isVIP ? (
                    <div className="w-full py-5 bg-green-500 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2">
                      <ShieldCheck size={20} /> คุณเป็นสมาชิก VIP แล้ว
                    </div>
                   ) : (
                    <Link href="/join" className="w-full py-5 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:shadow-royal-blue/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group">
                      สมัครสมาชิก VIP <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                   )}
                   <p className="text-center text-[10px] text-royal-blue/40 font-bold tracking-widest uppercase">
                     Secure Payment via Stripe Security
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
           <h3 className="text-royal-blue/40 font-bold uppercase tracking-[0.3em] text-xs">Trusted By Professional Facilitators</h3>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             {[
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/Thai_Red_Cross_Society_Logo_(2022).svg',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/Universal_Robina-Logo.wine.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/SWU.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/sook.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/obec.go.th.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/oncb.go.th.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/central%20food%20retail%20(CFR).png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/Airports_of_Thailand_Logo.svg.png',
               'https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/media/clients%20logo/tistr.or.th.svg'
             ].map((logo, i) => (
               <div key={i} className="h-10 md:h-12 w-auto flex items-center justify-center">
                 <img 
                   src={logo} 
                   alt="Client Logo" 
                   className="h-full w-auto object-contain max-w-[120px]"
                 />
               </div>
             ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
