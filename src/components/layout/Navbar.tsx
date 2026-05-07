"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Exploration' },
  { href: '/lms', label: 'Academy' },
  { href: '/community', label: 'Community' },
  { href: '/tools', label: 'Tools' },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] w-full flex justify-center py-6 px-4">
      <div className="max-w-7xl w-full glass-morphism rounded-[2rem] px-8 py-4 flex items-center justify-between border border-white/40 shadow-premium">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm border border-royal-blue/5">
            <img
              src="https://nheppvjayzxlblkeanxs.supabase.co/storage/v1/object/public/The%20Facilitorium/Logo%20The%20facilitorium6.png"
              alt="The Facilitorium Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-serif font-bold text-royal-blue tracking-tight group-hover:text-gold transition-colors block leading-tight">
            THE <span className="text-gold">FACILITORIUM</span>
            <span className="block text-[10px] font-sans font-extrabold text-gold tracking-[0.3em] uppercase opacity-70">FA-OS System</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-bold text-royal-blue/40 flex flex-col items-center group transition-all">
              <span className="group-hover:text-royal-blue transition-colors">{link.label}</span>
              <div className="h-1 w-1 bg-gold rounded-full scale-0 group-hover:scale-100 transition-all mt-1"></div>
            </Link>
          ))}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-royal-blue/40 hover:text-royal-blue transition-all">
            Sign In
          </Link>
          <Link href="/membership" className="px-6 py-2.5 bg-royal-blue text-gold font-bold rounded-xl shadow-premium hover:shadow-royal-blue/20 transition-all hover:scale-105 active:scale-95 text-xs tracking-widest uppercase border border-gold/10 flex items-center justify-center">
            Join Sanctuary
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 rounded-xl text-royal-blue hover:bg-royal-blue/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 glass-morphism rounded-[1.5rem] border border-white/40 shadow-premium overflow-hidden lg:hidden">
          <div className="flex flex-col p-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-royal-blue hover:bg-royal-blue/5 hover:text-gold transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-royal-blue/5 mt-2 pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 rounded-xl text-sm font-bold text-royal-blue/40 hover:text-royal-blue hover:bg-royal-blue/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 bg-royal-blue text-gold font-bold rounded-xl text-center text-xs tracking-widest uppercase"
              >
                Join Sanctuary
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
