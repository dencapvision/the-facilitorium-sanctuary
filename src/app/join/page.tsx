"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function JoinPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setFormData({
          name: data.user.user_metadata?.full_name || '',
          email: data.user.email || '',
        });
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base Stripe link
    const stripeLink = 'https://buy.stripe.com/8x26oA6zC4eJeh60vu5EY02';
    
    // Build parameters for automatic fulfillment
    const params = new URLSearchParams();
    if (user) {
      params.append('client_reference_id', user.id);
      params.append('prefilled_email', user.email || '');
    } else {
      params.append('prefilled_email', formData.email);
    }

    window.location.href = `${stripeLink}?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-sans font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Step 1: Get Your Access
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue mb-4 leading-tight">
              เข้าร่วม <span className="text-gold">FA-OS</span> Ecosystem
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto font-sans text-lg">
              เริ่มต้นการเดินทางสู่การเป็น Facilitator มืออาชีพ 
              พร้อมเครื่องมือและระบบดูแลที่ครบครันที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Value Prop */}
            <div className="bg-white p-8 rounded-2xl shadow-premium border border-gold/10">
              <h3 className="text-xl font-serif font-bold text-royal-blue mb-6">สิ่งที่คุณจะได้รับ:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  { text: 'เข้าเรียนได้ครบทุก Module (อัปเดตต่อเนื่อง)', sub: 'เรียนรู้ตั้งแต่พื้นฐาน → ระดับผู้นำ อย่างเป็นระบบ' },
                  { text: 'AI Coach "Wise Brother" ตลอด 24 ชั่วโมง', sub: 'ช่วยออกแบบ Workshop / กิจกรรม / Script การสื่อสาร ได้ทันที' },
                  { text: 'การดูแลผ่าน LINE แบบใกล้ชิด', sub: 'สอบถาม ปรึกษา และได้รับคำแนะนำจากทีม CAP Vision' },
                  { text: 'ระบบติดตามความก้าวหน้า (Learning Progress)', sub: 'เห็นพัฒนาการของตัวเองอย่างชัดเจน' },
                  { text: 'ใบ Certificate รับรองการเรียนรู้', sub: 'ต่อยอดสู่การเป็น Facilitator / Trainer มืออาชีพ' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div className="font-sans">
                      <p className="text-charcoal font-bold text-sm">{item.text}</p>
                      <p className="text-charcoal/60 text-xs mt-1">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-8 border-t border-charcoal/5">
                <div className="bg-royal-blue/5 p-6 rounded-xl border border-royal-blue/10 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-charcoal font-sans font-bold text-sm">สมาชิกแบบรายเดือน (30 วัน)</span>
                    <span className="text-3xl font-serif font-bold text-royal-blue">฿590</span>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-charcoal/60 font-sans">
                    <p>✔ เข้าถึงความรู้ + เครื่องมือ + AI + Community</p>
                    <p>✔ เทียบเท่าการอบรมหลักพัน แต่ใช้ได้ทั้งเดือน</p>
                    <p>✔ เรียนได้ไม่จำกัด เรียนซ้ำได้ตลอด</p>
                  </div>
                </div>

                {/* Value Hook */}
                <div className="text-center mb-8 italic">
                  <p className="text-gold font-bold mb-2">✨ มากกว่าคอร์สเรียน คือ “พื้นที่เปลี่ยนแปลงตัวตน”</p>
                  <p className="text-charcoal/70 text-sm italic">
                    คุณไม่ได้แค่เรียนรู้... แต่จะได้ “ฝึกคิด ฝึกทำ และเปลี่ยนแปลงจากภายใน”
                  </p>
                  <p className="text-royal-blue font-bold text-sm mt-3 tracking-wide">
                    Inspire People. Transform Mindsets. Create Real Impact.
                  </p>
                </div>

                {/* Target Audience */}
                <div className="pt-6 border-t border-charcoal/5">
                  <h4 className="text-sm font-bold text-royal-blue mb-4 uppercase tracking-widest">เหมาะสำหรับ:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'HR / Training Manager ที่อยากพัฒนาทีมให้ได้ผลจริง',
                      'ผู้นำที่อยากสื่อสารให้ได้ใจและได้งาน',
                      'Facilitator / Trainer ที่อยากยกระดับตัวเอง'
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3 bg-off-white/50 p-3 rounded-lg border border-charcoal/5">
                        <User className="w-4 h-4 text-gold" />
                        <span className="text-xs text-charcoal/80 font-sans">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-royal-blue p-8 rounded-2xl shadow-2xl text-white">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <Zap className="text-gold w-5 h-5" /> Start Your Journey
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="ปรีชา นามสมมติ"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-colors font-sans"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-colors font-sans"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-royal-blue font-sans font-bold py-4 rounded-lg flex flex-col items-center justify-center transition-all transform hover:scale-[1.02] shadow-lg shadow-gold/20"
                  >
                    <span className="flex items-center gap-2 text-lg">สมัครสมาชิก ฿590 <ArrowRight className="w-5 h-5" /></span>
                    <span className="text-[10px] opacity-70 font-normal uppercase mt-1 tracking-widest">Pay Securely via Stripe</span>
                  </button>
                  
                  {/* Micro Copy */}
                  <div className="mt-6 grid grid-cols-1 gap-2">
                    {[
                      'ยกเลิกได้ทุกเมื่อ',
                      'ไม่มีข้อผูกมัดระยะยาว',
                      'เริ่มเรียนได้ทันทีหลังสมัคร'
                    ].map((text, i) => (
                      <div key={i} className="flex items-center justify-center gap-2 text-[11px] text-white/50 font-sans">
                        <CheckCircle2 className="w-3 h-3 text-gold/60" /> {text}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 grayscale opacity-50">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[10px] uppercase tracking-widest">SSL Encrypted Payment</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
