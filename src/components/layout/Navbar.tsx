"use client";

import React, { useState } from 'react';
import { Home, Users, BookOpen, PenTool, Calendar, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState('About');

  const tabs = [
    { name: 'Community', icon: <Users size={18} /> },
    { name: 'Classroom', icon: <BookOpen size={18} /> },
    { name: 'Tools', icon: <PenTool size={18} /> },
    { name: 'Calendar', icon: <Calendar size={18} /> },
    { name: 'Members', icon: <Users size={18} /> },
    { name: 'About', icon: <ShieldCheck size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-royal-blue/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img 
              src="/images/logo.png" 
              alt="The Facilitorium Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.name
                    ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20'
                    : 'text-royal-blue/60 hover:text-royal-blue hover:bg-royal-blue/5'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* User Section (Guest/Login) */}
          <div className="flex items-center gap-3">
             <button className="text-sm font-medium text-royal-blue/80 hover:text-royal-blue transition-colors">
               Log In
             </button>
             <button className="px-4 py-2 bg-royal-blue text-gold font-bold text-sm rounded-lg hover:bg-royal-blue-light transition-all shadow-md active:scale-95">
               Join Waitlist
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
