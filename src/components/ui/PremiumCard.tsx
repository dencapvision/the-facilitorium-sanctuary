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
    <div className={`group relative p-8 rounded-[2rem] glass-morphism border border-white/40 transition-all duration-500 hover:shadow-premium hover:-translate-y-2 flex flex-col h-full ${className}`}>
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="p-4 rounded-2xl bg-royal-blue/5 text-royal-blue group-hover:bg-royal-blue group-hover:text-gold transition-all duration-500 group-hover:shadow-lg group-hover:shadow-royal-blue/10">
          {icon}
        </div>
        {tag && (
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${isFree ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gold/10 text-gold border border-gold/20'}`}>
            {tag}
          </span>
        )}
      </div>
      
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-serif font-bold text-royal-blue mb-3 group-hover:text-gold-dark transition-colors">{title}</h3>
        <p className="text-royal-blue/50 text-sm leading-relaxed font-light">{description}</p>
      </div>
      
      <div className="relative z-10 mt-8 flex items-center gap-2 text-gold font-bold text-xs tracking-widest uppercase translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <span>Explore Deeply</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
  );
};
