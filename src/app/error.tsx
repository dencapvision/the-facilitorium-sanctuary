"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="space-y-2">
          <p className="text-[120px] font-serif font-black text-royal-blue/10 leading-none select-none">
            !
          </p>
          <h1 className="text-3xl font-serif font-bold text-royal-blue -mt-6">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-royal-blue/50 font-light leading-relaxed">
            ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิดขึ้น
            <br />
            กรุณาลองใหม่อีกครั้ง
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-8 py-4 bg-royal-blue text-gold font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
          >
            <RefreshCw size={18} />
            ลองใหม่
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 border border-royal-blue/10 text-royal-blue font-bold rounded-2xl hover:bg-royal-blue/5 transition-all"
          >
            <Home size={18} />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  );
}
