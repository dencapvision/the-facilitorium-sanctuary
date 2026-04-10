'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MessageCircle, ShieldCheck, Key } from 'lucide-react';

export default function LoginPage() {
  const handleLineLogin = () => {
    // This will be connected to Line Login (LIFF) in the next phase
    console.log('LINE Login initiated');
    alert('ระบบ LINE Login กำลังถูกเชื่อมต่อ... สำหรับการใช้งานจริงจะเปลี่ยนเส้นทางไปที่ LINE OA');
  };

  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-premium border border-gold/10 overflow-hidden">
            <div className="bg-royal-blue p-8 text-center text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[40px] rounded-full -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/30">
                  <Key className="text-gold w-8 h-8" />
                </div>
                <h1 className="text-2xl font-serif font-bold">Member Access</h1>
                <p className="text-white/60 text-sm font-sans mt-2 uppercase tracking-[0.2em]">The Facilitorium FA-OS</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-charcoal/70 text-sm font-sans">
                  ยินดีต้อนรับสู่ระบบปฏิบัติการวิทยากร <br /> กรุณาเข้าสู่ระบบเพื่อเข้าถึงห้องเรียนและ AI Coach
                </p>
              </div>

              <button
                onClick={handleLineLogin}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#06C755]/20"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                Log in via LINE
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-charcoal/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest text-charcoal/30">
                  <span className="bg-white px-4">Secure Access</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <a 
                  href="/join" 
                  className="text-royal-blue text-sm font-sans font-bold hover:text-gold transition-colors block"
                >
                  ยังไม่ได้เป็นสมาชิก? สมัครใช้งาน FA-OS ที่นี่
                </a>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal/40 uppercase tracking-widest font-sans">
                  <ShieldCheck className="w-3 h-3" /> Data encryption active
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-charcoal/30 text-[10px] mt-8 uppercase tracking-[0.3em] font-sans">
            By Den Masterfa • Professional Ecosystem
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
