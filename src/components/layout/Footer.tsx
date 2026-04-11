import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-royal-blue text-white pt-20 pb-10 overflow-hidden font-sans">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                THE <span className="text-gold group-hover:text-white transition-colors duration-300">FACILITORIUM</span>
              </h2>
              <div className="h-0.5 w-12 bg-gold mt-1"></div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              โรงเรียนวิทยากรและผู้สร้างการเปลี่ยนแปลงยุคใหม่ มุ่งมั่นยกระดับศักยภาพมนุษย์ด้วยกระบวนการ Facilitation ขั้นสูง
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-white/70">
              {['Home', 'Course Catalog', 'Success Stories', 'Join FA-OS'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gold transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-white/70">
              {['Facilitator Toolbox', 'Free E-Book', 'Member Webinar', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-gold transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h3>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>CAP Vision Institute, Bangkok, Thailand</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>093-223-5919</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:dencapvision@gmail.com" className="hover:text-gold transition-colors">dencapvision@gmail.com</a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://capvisionpartner.com/contact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-white transition-colors border-b border-gold/30 pb-1"
                >
                  Visit Contact Page <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
            © 2026 THE FACILITORIUM. POWERED BY CAP VISION INSTITUTE.
          </p>
          <div className="flex items-center gap-6 text-[10px] text-white/40 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative grain/texture overlay could be added here similar to Navbar */}
    </footer>
  );
};
