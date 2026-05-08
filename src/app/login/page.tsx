'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MessageCircle, ShieldCheck, Key, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const CLIENT_LOGOS = [
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/Thai_Red_Cross_Society_Logo_(2022).svg', alt: 'Thai Red Cross Society' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/Universal_Robina-Logo.wine.png', alt: 'Universal Robina Corporation' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/SWU.png', alt: 'Srinakharinwirot University' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/sook.png', alt: 'Sook' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/obec.go.th.png', alt: 'สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน (OBEC)' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/oncb.go.th.png', alt: 'สำนักงาน ป.ป.ส. (ONCB)' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/central%20food%20retail%20(CFR).png', alt: 'Central Food Retail' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/Airports_of_Thailand_Logo.svg.png', alt: 'Airports of Thailand (AOT)' },
  { src: 'https://assets.capvisionpartner.com/media/clients%20logo/tistr.or.th.svg', alt: 'สถาบันวิจัยวิทยาศาสตร์และเทคโนโลยีแห่งประเทศไทย (TISTR)' },
];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Read ?error= from URL without useSearchParams (avoids Next.js Suspense requirement)
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'auth_failed') {
      setError('การเข้าสู่ระบบผ่าน LINE ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  }, []);

  const handleLineLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'custom:line' as any,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ' + error.message);
      setLoading(false);
    }
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

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleLineLogin}
                disabled={loading}
                className="w-full bg-[#06C755] hover:bg-[#05b34c] disabled:opacity-70 disabled:cursor-not-allowed text-white font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#06C755]/20"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                )}
                {loading ? 'กำลังเชื่อมต่อ LINE...' : 'Log in via LINE'}
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

      {/* Trusted By Professional Facilitators */}
      <section className="py-16 px-4 border-t border-charcoal/5">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h3 className="text-charcoal/40 font-sans font-bold uppercase tracking-[0.3em] text-xs">
            Trusted By Professional Facilitators
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {CLIENT_LOGOS.map((logo, i) => (
              <div key={i} className="h-9 md:h-11 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto object-contain max-w-[110px]"
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
