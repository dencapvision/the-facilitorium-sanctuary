'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-[2.5rem] shadow-premium border border-gold/10 overflow-hidden text-center">
            <div className="bg-gold/5 p-12">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/20 animate-pulse">
                <CheckCircle className="text-royal-blue w-10 h-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-royal-blue mb-4">
                ยินดีต้อนรับสู่ <span className="text-gold">FA-OS</span>
              </h1>
              <p className="text-charcoal/70 font-sans max-w-lg mx-auto leading-relaxed">
                การชำระเงินของคุณเสร็จสมบูรณ์แล้ว ระบบปฏิบัติการกำลังเตรียมความพร้อมให้คุณ...
              </p>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-royal-blue/5 p-6 rounded-2xl border border-royal-blue/5">
                  <div className="w-10 h-10 bg-royal-blue rounded-xl flex items-center justify-center mb-4 text-gold">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-royal-blue mb-2">Check Your LINE</h4>
                  <p className="text-charcoal/60 text-xs font-sans leading-relaxed">
                    เราได้ส่งรหัสผ่าน (Access Code) และลิงก์เข้าสู่ระบบไปให้ท่านทาง LINE @denmasterfa เรียบร้อยแล้ว
                  </p>
                </div>

                <div className="bg-gold/5 p-6 rounded-2xl border border-gold/5">
                  <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center mb-4 text-royal-blue">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-royal-blue mb-2">30-Day Access</h4>
                  <p className="text-charcoal/60 text-xs font-sans leading-relaxed">
                    ท่านสามารถใช้งานระบบได้เต็มรูปแบบเป็นเวลา 30 วัน รวมถึง AI Coach และคลังความรู้ทั้งหมด
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 bg-royal-blue text-gold font-sans font-bold px-10 py-4 rounded-xl hover:-translate-y-1 transition-all shadow-xl hover:shadow-royal-blue/20"
                >
                  เข้าสู่ระบบสมาชิก <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="pt-6 border-t border-charcoal/5">
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-sans">
                  Need help? Contact support via LINE OA : @denmasterfa
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
