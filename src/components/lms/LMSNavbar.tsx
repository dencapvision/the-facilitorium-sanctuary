
import React from 'react';
import { Home, Search, BookOpen, User, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const LMSNavbar: React.FC = () => {
  return (
    <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-royal-blue/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Breadcrumb / Project Logo */}
        <div className="flex items-center gap-4">
            <Link href="/" className="text-royal-blue hover:text-gold transition-colors flex items-center gap-2">
                <Home size={18} />
                <span className="text-sm font-bold nav-font">Main</span>
            </Link>
            <ChevronRight size={14} className="text-royal-blue/20" />
            <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-gold" />
                <span className="text-sm font-serif font-black text-royal-blue tracking-tight uppercase">The Sanctuary LMS</span>
            </div>
        </div>

        {/* Dynamic Navigation */}
        <div className="hidden md:flex items-center gap-8">
            <Link href="/lms" className="text-sm font-bold text-royal-blue border-b-2 border-gold pb-1 px-1">Library Catalog</Link>
            <Link href="/lms/dashboard" className="text-sm font-medium text-royal-blue/60 hover:text-royal-blue transition-colors">My Learning</Link>
            <Link href="/lms/community" className="text-sm font-medium text-royal-blue/60 hover:text-royal-blue transition-colors">Discussions</Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
            <button className="p-2 text-royal-blue/40 hover:text-royal-blue transition-colors">
                <Search size={20} />
            </button>
            <div className="w-px h-6 bg-royal-blue/5 mx-2"></div>
            <Link href="/profile" className="flex items-center gap-2 p-1 pr-3 rounded-full bg-royal-blue/5 hover:bg-royal-blue/10 transition-all border border-royal-blue/5">
                <div className="w-8 h-8 rounded-full bg-royal-blue text-gold flex items-center justify-center font-bold text-xs ring-2 ring-gold/20">
                    JD
                </div>
                <span className="text-xs font-bold text-royal-blue hidden sm:inline">Jane Doe</span>
            </Link>
        </div>
      </div>
    </div>
  );
};
