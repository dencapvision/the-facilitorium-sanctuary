
"use client";

import React from 'react';
import Link from 'next/link';
import { Award, Download, Share2, ShieldCheck, Star, Calendar, User, BookOpen } from 'lucide-react';

interface CertificateProps {
  userName: string;
  courseTitle: string;
  issueDate: string;
  certNumber: string;
  instructorName: string;
}

const CertificateTemplate: React.FC<CertificateProps> = ({
  userName,
  courseTitle,
  issueDate,
  certNumber,
  instructorName
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-1 md:p-4 shadow-2xl rounded-sm border-[16px] border-royal-blue relative overflow-hidden certificate-container">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -mr-32 -mt-32 border border-gold/10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-blue/5 rounded-full -ml-48 -mb-48 border border-royal-blue/10"></div>
      
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <Award size={600} />
      </div>

      <div className="relative z-10 border-4 border-gold/30 p-12 md:p-20 flex flex-col items-center text-center space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-royal-blue rounded-full flex items-center justify-center text-gold shadow-xl border-4 border-white">
              <Award size={48} />
            </div>
          </div>
          <h1 className="text-sm font-sans font-black text-gold uppercase tracking-[0.4em]">Certificate of Completion</h1>
          <p className="text-4xl md:text-5xl font-serif font-black text-royal-blue">The Facilitorium Sanctuary</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-lg font-serif italic text-charcoal/60">This is to certify that</p>
          <h2 className="text-5xl md:text-6xl font-serif font-black text-royal-blue gold-text-gradient py-2 px-4 border-b-2 border-gold/20 inline-block">
            {userName}
          </h2>
          <p className="text-lg font-serif italic text-charcoal/60 pt-4">has successfully completed the masterclass</p>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-royal-blue max-w-2xl mx-auto leading-tight">
            {courseTitle}
          </h3>
        </div>

        {/* Footer Info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-royal-blue/5">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 flex items-end">
               <p className="font-serif font-bold text-royal-blue text-xl">{instructorName}</p>
            </div>
            <div className="w-40 border-t border-charcoal/30 pt-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">Master Facilitator</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
             <ShieldCheck size={48} className="text-gold opacity-80 mb-2" />
             <p className="text-[9px] font-bold text-charcoal/30 uppercase tracking-tighter">Verified by FA-OS Blockchain</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 flex items-end">
               <p className="font-sans font-bold text-royal-blue text-sm">{issueDate}</p>
            </div>
            <div className="w-40 border-t border-charcoal/30 pt-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/40">Date of Issue</p>
            </div>
          </div>
        </div>

        {/* Certificate ID */}
        <div className="absolute bottom-8 right-12 text-right">
           <p className="text-[8px] font-black text-charcoal/20 uppercase tracking-[0.2em]">Certificate No: {certNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default function CertificatePage() {
  // Mock data - In real app, fetch from Supabase
  const certData = {
    userName: "คุณวิทยากร ผู้ใฝ่เรียนรู้",
    courseTitle: "Facilitation Mastery: ศิลปะการสร้างบรรยากาศแห่งการเรียนรู้ (Level 1)",
    issueDate: "8 พฤษภาคม 2569",
    certNumber: "FA-OS-2026-X89K-Q2",
    instructorName: "เด่น Master Fa"
  };

  return (
    <main className="min-h-screen bg-off-white pb-24">
      {/* Action Bar */}
      <div className="bg-royal-blue text-white py-4 px-8 sticky top-0 z-50 shadow-xl flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gold/60 hover:text-gold transition-colors">
               <BookOpen size={20} />
            </Link>
            <h1 className="font-serif font-bold hidden md:block">Your Achievement Sanctuary</h1>
         </div>
         <div className="flex items-center gap-3">
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold flex items-center gap-2 transition-all">
               <Share2 size={14} /> Share
            </button>
            <button className="px-5 py-2 bg-gold text-royal-blue rounded-full text-xs font-black flex items-center gap-2 transition-all shadow-lg shadow-gold/20 active:scale-95">
               <Download size={14} /> Download PDF
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16">
         <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold tracking-[0.2em] uppercase">
               <Star size={12} className="fill-gold" /> Success Path
            </div>
            <h2 className="text-4xl font-serif font-black text-royal-blue">ยินดีด้วยกับก้าวสำคัญของคุณ!</h2>
            <p className="text-royal-blue/50 max-w-xl mx-auto font-light">
               ใบประกาศนียบัตรนี้คือเครื่องยืนยันถึงความมุ่งมั่นและการเติบโตของคุณในฐานะ Facilitator ผู้สร้างผลกระทบ
            </p>
         </div>

         <CertificateTemplate {...certData} />
         
         {/* Verification Info */}
         <div className="max-w-xl mx-auto mt-20 p-8 rounded-3xl bg-white border border-royal-blue/5 text-center space-y-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-100">
               <ShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-serif font-bold text-royal-blue">การรับรองความถูกต้อง</h4>
            <p className="text-sm text-royal-blue/60 font-light leading-relaxed">
               ใบประกาศนียบัตรฉบับนี้ออกโดยสถาบัน The Facilitorium และมีการบันทึกรหัสตรวจสอบในระบบ FA-OS Sanctuary 
               คุณสามารถส่งรหัส <b>{certData.certNumber}</b> ให้กับองค์กรหรือผู้ที่เกี่ยวข้องเพื่อตรวจสอบความถูกต้องได้ทุกเมื่อ
            </p>
            <div className="pt-4">
               <Link href="/lms" className="text-gold font-bold text-sm underline decoration-2 underline-offset-4">
                  ดูหลักสูตรระดับ Master ต่อไป
               </Link>
            </div>
         </div>
      </div>
    </main>
  );
}
