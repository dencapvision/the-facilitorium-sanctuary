'use client';

import React from 'react';
import { Play, Clock, BookOpen, Star, Lock, ShieldCheck } from 'lucide-react';
import { Course } from '@/constants/courses';
import Link from 'next/link';
import { useVIPStatus } from '@/hooks/useVIPStatus';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isVIP } = useVIPStatus();
  const isEnrolled = (course.progress ?? 0) > 0;
  const isAdvanced = course.level === 'Advanced';
  const isLocked = isAdvanced && !isVIP;
  
  return (
    <Link 
      href={isLocked ? '/membership' : `/lms/${course.slug}`} 
      className={`group relative block bg-white rounded-[2rem] overflow-hidden border border-royal-blue/5 shadow-sm hover:shadow-2xl transition-all duration-500 ${isLocked ? 'cursor-pointer' : ''}`}
    >
      {/* Course Image Area */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isLocked ? 'grayscale opacity-50' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-gold/90 backdrop-blur-md p-4 rounded-full border border-white/30 transform scale-90 group-hover:scale-100 transition-transform">
                {isLocked ? <Lock size={24} className="text-royal-blue" /> : <Play size={24} className="text-royal-blue fill-royal-blue" />}
            </div>
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-royal-blue text-[10px] font-bold rounded-lg shadow-sm tracking-wider uppercase">
                {course.category}
            </span>
            {isAdvanced && (
                <span className="px-3 py-1 bg-royal-blue text-gold text-[10px] font-bold rounded-lg shadow-sm tracking-wider uppercase flex items-center gap-1">
                    <ShieldCheck size={10} /> VIP
                </span>
            )}
        </div>

        {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-royal-blue/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-gold/30 shadow-2xl flex items-center gap-3">
                    <Lock size={18} className="text-gold" />
                    <span className="text-gold font-bold text-sm tracking-widest uppercase">VIP ACCESS</span>
                </div>
            </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 space-y-4">
        {/* Level & Stars */}
        <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-gold/20 text-gold'
            }`}>
                {course.level}
            </span>
            <div className="flex items-center gap-1 text-gold">
                <Star size={10} fill="currentColor" />
                <span className="text-[10px] font-bold text-royal-blue/40">4.9 (120 reviews)</span>
            </div>
        </div>

        <h3 className="text-lg font-serif font-bold text-royal-blue group-hover:text-gold transition-colors leading-snug line-clamp-2">
            {course.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-royal-blue/60">
            <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gold" />
                <span className="text-xs font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-gold" />
                <span className="text-xs font-medium">{course.lessonsCount} lessons</span>
            </div>
        </div>

        {/* Progress or Pricing */}
        <div className="pt-4 border-t border-royal-blue/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                    <img src={course.instructor.image} alt={course.instructor.name} />
                </div>
                <span className="text-[10px] font-medium text-royal-blue/70">{course.instructor.name}</span>
            </div>
            
            <div className="text-right">
                {isEnrolled ? (
                    <div className="space-y-1.5">
                        <p className="text-[9px] font-bold text-royal-blue/40 uppercase tracking-widest text-right">Progress {course.progress}%</p>
                        <div className="w-24 h-1 bg-royal-blue/5 rounded-full overflow-hidden">
                            <div className="bg-gold h-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                        </div>
                    </div>
                ) : (
                    <span className="text-lg font-serif font-bold text-royal-blue">
                        {course.price ? `฿${course.price.toLocaleString()}` : <span className="text-green-600">FREE</span>}
                    </span>
                )}
            </div>
        </div>
      </div>
    </Link>
  );
};
