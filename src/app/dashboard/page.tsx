'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { 
  Trophy, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  ArrowUpRight, 
  Clock,
  ChevronRight,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      // For now, we fetch the latest registered user as a demonstration
      // In production, this will be filtered by the logged-in user's session
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (user) {
        setUserData(user);
        
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('expiry_date', { ascending: false })
          .limit(1)
          .single();
        
        setSubscription(sub);

        const { data: logs } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
        
        setActivities(logs || []);
      }
      setLoading(false);
    }

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="animate-pulse text-royal-blue font-serif font-bold text-xl">Loading FA-OS...</div>
    </div>
  );

  // Derived data
  const progress = 65; // This could be calculated from course_progress table if added
  const expiryDate = subscription?.expiry_date ? new Date(subscription.expiry_date).toLocaleDateString('th-TH') : 'No active subscription';
  const userName = userData?.name || 'Sanctum Member';

  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-gold font-sans font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                Welcome back, {userName}
              </span>
              <h1 className="text-4xl font-serif font-bold text-royal-blue leading-tight">
                Your <span className="text-gold">FA-OS</span> Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-2xl shadow-premium border border-charcoal/5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-sans">Subscription Ends</p>
                  <p className="text-sm font-sans font-bold text-royal-blue">{expiryDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Stats Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Card */}
              <div className="bg-royal-blue rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-gold border border-white/10">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold">Certification Track</h3>
                        <p className="text-white/60 text-xs font-sans">The Facilitorium Professional</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-serif font-bold text-gold">{progress}%</span>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-sans">Current Progress</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-2xl font-serif font-bold text-gold">12</p>
                      <p className="text-[8px] text-white/40 uppercase tracking-widest font-sans mt-1">Lessons Done</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-2xl font-serif font-bold text-gold">04</p>
                      <p className="text-[8px] text-white/40 uppercase tracking-widest font-sans mt-1">Assignments</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-2xl font-serif font-bold text-gold">08</p>
                      <p className="text-[8px] text-white/40 uppercase tracking-widest font-sans mt-1">Reflections</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Access Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/lms" className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-premium border border-charcoal/5 hover:border-gold/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-royal-blue rounded-xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="text-charcoal/20 w-5 h-5 group-hover:text-gold transition-colors" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-royal-blue mb-2">Learning Palace</h4>
                    <p className="text-charcoal/50 text-xs font-sans leading-relaxed">
                      Continue your journey through the sanctuary of knowledge.
                    </p>
                  </div>
                </Link>

                <Link href="/lms/the-facilitorium/player/introduction" className="group">
                  <div className="bg-white p-6 rounded-2xl shadow-premium border border-charcoal/5 hover:border-gold/30 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="text-charcoal/20 w-5 h-5 group-hover:text-gold transition-colors" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-royal-blue mb-2">Wise Brother AI</h4>
                    <p className="text-charcoal/50 text-xs font-sans leading-relaxed">
                      Deep reflections and professional guidance from your AI companion.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar Stats Area */}
            <div className="space-y-8">
              {/* Target / Goal */}
              <div className="bg-white p-8 rounded-3xl shadow-premium border border-charcoal/5">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-gold w-5 h-5" />
                  <h4 className="font-serif font-bold text-royal-blue">Current Focus</h4>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-off-white rounded-xl border-l-4 border-gold">
                    <p className="text-xs text-charcoal/40 uppercase tracking-widest font-sans mb-1">Module 3</p>
                    <p className="text-sm font-sans font-bold text-royal-blue">Designing Group Harmony</p>
                  </div>
                  <button className="w-full bg-royal-blue text-white text-xs font-sans font-bold py-3 rounded-lg hover:bg-gold hover:text-royal-blue transition-all">
                    Resume Learning
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-8 rounded-3xl shadow-premium border border-charcoal/5">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-gold w-5 h-5" />
                  <h4 className="font-serif font-bold text-royal-blue">Recent Activity</h4>
                </div>
                <div className="space-y-6">
                  {activities.length > 0 ? activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold mt-1.5 shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
                      <div>
                        <p className="text-sm font-sans font-bold text-royal-blue leading-tight">
                          {activity.action}
                        </p>
                        <p className="text-[10px] text-charcoal/40 font-sans mt-0.5">
                          {new Date(activity.created_at).toLocaleTimeString('th-TH')}
                        </p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-xs text-charcoal/30 font-sans italic">No recent activity yet.</p>
                  )}
                </div>
                <button className="w-full mt-6 text-xs text-gold font-sans font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                  View Full Logs <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
