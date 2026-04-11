"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Users, BookOpen, PenTool, Globe, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[100] w-full flex justify-center py-6 px-4">
      <div className="max-w-7xl w-full glass-morphism rounded-[2rem] px-8 py-4 flex items-center justify-between border border-white/40 shadow-premium">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm border border-royal-blue/5">
            <img 
              src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Logo%20The%20facilitorium6.png" 
              alt="Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-serif font-bold text-royal-blue tracking-tight group-hover:text-gold transition-colors block leading-tight">
            THE <span className="text-gold">FACILITORIUM</span>
            <span className="block text-[10px] font-sans font-extrabold text-gold tracking-[0.3em] uppercase opacity-70">FA-OS System</span>
          </span>
        </Link>
        
        {/* Dynamic Navigation Tabs */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-sm font-bold text-royal-blue flex flex-col items-center group transition-all">
            <span className="group-hover:text-gold transition-colors">Exploration</span>
            <div className="h-1 w-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-all mt-1"></div>
          </Link>
          <Link href="/lms" className="text-sm font-bold text-royal-blue/40 flex flex-col items-center group transition-all">
            <span className="group-hover:text-royal-blue transition-colors">Academy</span>
            <div className="h-1 w-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-all mt-1"></div>
          </Link>
          <Link href="/community" className="text-sm font-bold text-royal-blue/40 flex flex-col items-center group transition-all">
            <span className="group-hover:text-royal-blue transition-colors">Community</span>
            <div className="h-1 w-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-all mt-1"></div>
          </Link>
          <Link href="/tools" className="text-sm font-bold text-royal-blue/40 flex flex-col items-center group transition-all">
            <span className="group-hover:text-royal-blue transition-colors">Tools</span>
            <div className="h-1 w-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-all mt-1"></div>
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-sm font-bold text-royal-blue/40 hover:text-royal-blue transition-all">
            Sign In
          </button>
          <Link href="/membership" className="px-6 py-2.5 bg-royal-blue text-gold font-bold rounded-xl shadow-premium hover:shadow-royal-blue/20 transition-all hover:scale-105 active:scale-95 text-xs tracking-widest uppercase border border-gold/10 flex items-center justify-center">
            Join Sanctuary
          </Link>
        </div>
      </div>
    </nav>
  );
};
