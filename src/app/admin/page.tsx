'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  CreditCard, 
  Activity, 
  ShieldCheck,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Key,
  Calendar,
  BookOpen,
  Plus,
  PlayCircle,
  Clock,
  Star
} from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'members' | 'courses'>('members');
  const [stats, setStats] = useState({ total: 0, active: 0, revenue: 0 });
  const [members, setMembers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAdminData() {
      // Fetch Stats
      const { count: totalCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: activeCount } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active');
      
      setStats({
        total: totalCount || 0,
        active: activeCount || 0,
        revenue: (activeCount || 0) * 590
      });

      // Fetch Members with latest subscription
      const { data: membersData } = await supabase
        .from('users')
        .select(`
          *,
          subscriptions (status, expiry_date),
          access_codes (code)
        `)
        .order('created_at', { ascending: false });

      setMembers(membersData || []);

      // Fetch Courses
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      
      setCourses(coursesData || []);

      // Fetch Recent Activity
      const { data: logsData } = await supabase
        .from('activity_logs')
        .select('*, users(name)')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentLogs(logsData || []);
      setLoading(false);
    }

    fetchAdminData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-royal-blue font-serif font-bold text-xl animate-pulse">Initializing Admin Engine...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-gold font-sans font-bold tracking-widest uppercase text-xs mb-1">Central Command</p>
              <h1 className="text-4xl font-serif font-bold text-royal-blue">
                FA-OS <span className="text-gold">Admin</span> Portal
              </h1>
            </div>
            <div className="flex items-center gap-3">
               <button className="px-4 py-2 bg-royal-blue text-white rounded-lg text-xs font-sans font-bold flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-gold" /> Authorized Access
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Members', value: stats.total, icon: Users, color: 'bg-royal-blue' },
              { label: 'Active Subscriptions', value: stats.active, icon: CreditCard, color: 'bg-emerald-600' },
              { label: 'Revenue MTD', value: `฿${stats.revenue.toLocaleString()}`, icon: Activity, color: 'bg-gold' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-premium border border-charcoal/5 flex items-center gap-5 transition-all hover:scale-[1.02]">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-sans font-bold">{stat.label}</p>
                  <p className="text-2xl font-serif font-bold text-royal-blue">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-8 border-b border-charcoal/10">
            <button 
              onClick={() => setActiveTab('members')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'members' ? 'text-royal-blue' : 'text-charcoal/40 hover:text-royal-blue'}`}
            >
              Members
              {activeTab === 'members' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('courses')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'courses' ? 'text-royal-blue' : 'text-charcoal/40 hover:text-royal-blue'}`}
            >
              Course Manager
              {activeTab === 'courses' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-full"></div>}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'members' ? (
                /* Member List Table */
                <div className="bg-white rounded-3xl shadow-premium border border-charcoal/5 overflow-hidden">
                  <div className="p-6 border-b border-charcoal/5 flex items-center justify-between bg-off-white/50">
                    <h3 className="font-serif font-bold text-royal-blue flex items-center gap-2">
                      <Users className="w-5 h-5 text-gold" /> Member Management
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                        <input 
                          type="text" 
                          placeholder="Search email..." 
                          className="pl-9 pr-4 py-2 bg-white border border-charcoal/10 rounded-lg text-xs focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-off-white/30 text-[10px] uppercase tracking-widest font-sans font-bold text-charcoal/40 border-b border-charcoal/5">
                          <th className="px-6 py-4">Member Info</th>
                          <th className="px-6 py-4">Latest Code</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Expiry</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal/5 text-sm font-sans">
                        {members.map((member) => (
                          <tr key={member.id} className="hover:bg-off-white/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-royal-blue/10 rounded-full flex items-center justify-center text-royal-blue font-bold text-xs">
                                  {member.name[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-royal-blue">{member.name}</p>
                                    <p className="text-[10px] text-charcoal/40 flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> {member.email}
                                    </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1 text-gold font-bold">
                                <Key className="w-3 h-3" /> {member.access_codes?.[0]?.code || 'N/A'}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                member.subscriptions?.[0]?.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-rose-100 text-rose-700'
                              }`}>
                                {member.subscriptions?.[0]?.status || 'no account'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-bold text-charcoal/60">
                               {member.subscriptions?.[0]?.expiry_date 
                                 ? new Date(member.subscriptions[0].expiry_date).toLocaleDateString('th-TH')
                                 : '-'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-charcoal/40" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Course Management List */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-royal-blue">All Masterclasses</h3>
                    <button className="px-6 py-2 bg-royal-blue text-gold rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                       <Plus size={16} /> New Course
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <div key={course.id} className="bg-white rounded-3xl p-6 shadow-premium border border-charcoal/5 group hover:border-gold/30 transition-all">
                        <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                           <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-royal-blue/20"></div>
                           <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase text-royal-blue">
                                {course.category}
                              </span>
                           </div>
                        </div>
                        <h4 className="font-serif font-bold text-royal-blue mb-2 line-clamp-1">{course.title}</h4>
                        <div className="flex items-center justify-between text-xs text-charcoal/40 font-bold uppercase tracking-tighter">
                           <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1"><PlayCircle size={14} className="text-gold" /> {course.lessons_count} Lessons</span>
                              <span className="flex items-center gap-1"><Clock size={14} className="text-gold" /> {course.duration}</span>
                           </div>
                           <div className="flex items-center gap-1 text-gold">
                              <Star size={12} className="fill-gold" /> 4.9
                           </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-charcoal/5 flex items-center justify-between">
                           <p className="text-sm font-black text-royal-blue">
                             {course.price > 0 ? `฿${course.price.toLocaleString()}` : 'FREE'}
                           </p>
                           <div className="flex gap-2">
                              <button className="p-2 bg-off-white rounded-lg hover:bg-gold/10 transition-colors">
                                 <MoreHorizontal size={14} className="text-charcoal/40" />
                              </button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity Sidebar */}
            <div className="bg-white rounded-3xl shadow-premium border border-charcoal/5 overflow-hidden flex flex-col h-fit">
               <div className="p-6 border-b border-charcoal/5 bg-off-white/50">
                  <h3 className="font-serif font-bold text-royal-blue flex items-center gap-2">
                    <Activity className="w-5 h-5 text-gold" /> System Activity
                  </h3>
               </div>
               <div className="p-6 space-y-6">
                 {recentLogs.map((log) => (
                   <div key={log.id} className="relative pl-6 pb-6 border-l border-charcoal/10 last:pb-0">
                     <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-gold ring-4 ring-white"></div>
                     <p className="text-xs font-bold text-royal-blue leading-tight mb-1">
                       {log.users?.name || 'Unknown'} {log.action}
                     </p>
                     <div className="flex items-center gap-3 text-[10px] text-charcoal/40 font-sans">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(log.created_at).toLocaleDateString('th-TH')}</span>
                        <span>{new Date(log.created_at).toLocaleTimeString('th-TH')}</span>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="p-6 bg-off-white/50 border-t border-charcoal/5">
                 <button className="w-full text-xs font-bold text-gold uppercase tracking-widest hover:text-royal-blue transition-colors">
                   View All Activity Logs
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
