import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="space-y-2">
          <p className="text-[120px] font-serif font-black text-royal-blue/10 leading-none select-none">
            404
          </p>
          <h1 className="text-3xl font-serif font-bold text-royal-blue -mt-6">
            ไม่พบหน้านี้
          </h1>
          <p className="text-royal-blue/50 font-light leading-relaxed">
            ดูเหมือนหน้าที่คุณกำลังมองหาไม่มีอยู่ในระบบ
            <br />
            หรืออาจถูกย้ายไปแล้ว
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
          >
            <Home size={18} />
            กลับหน้าหลัก
          </Link>
          <Link
            href="/lms"
            className="flex items-center gap-2 px-8 py-4 border border-royal-blue/10 text-royal-blue font-bold rounded-2xl hover:bg-royal-blue/5 transition-all"
          >
            <ArrowLeft size={18} />
            ไปยัง Academy
          </Link>
        </div>

        <p className="text-xs text-royal-blue/30 font-medium">
          The Facilitorium — Facilitation Operating System
        </p>
      </div>
    </main>
  );
}
