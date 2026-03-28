import React from 'react';

interface PremiumCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tag?: string;
  isFree?: boolean;
  className?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  title, 
  description, 
  icon, 
  tag, 
  isFree,
  className = "" 
}) => {
  return (
    <div className={`group relative p-6 rounded-2xl glass-morphism border border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-1 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-royal-blue/10 text-royal-blue group-hover:bg-royal-blue group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        {tag && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isFree ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-gold'}`}>
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-xl font-serif font-bold text-royal-blue mb-2">{title}</h3>
      <p className="text-royal-blue/70 text-sm leading-relaxed">{description}</p>
      
      <div className="mt-4 flex items-center gap-2 text-gold font-medium text-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span>สำรวจรายละเอียด</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
  );
};
