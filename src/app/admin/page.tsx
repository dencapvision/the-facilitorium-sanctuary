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
  Calendar
} from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, revenue: 0 });
  const [members, setMembers] = useState<any[]>([]);
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
              <div className="px-4 py-2 bg-royal-blue text-white rounded-lg text-xs font-sans font-bold flex items-center gap-2 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-gold" /> Authorized Access
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Total Members', value: stats.total, icon: Users, color: 'bg-royal-blue' },
              { label: 'Active Subscriptions', value: stats.active, icon: CreditCard, color: 'bg-emerald-600' },
              { label: 'Revenue MTD', value: `฿${stats.revenue.toLocaleString()}`, icon: Activity, color: 'bg-gold' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-premium border border-charcoal/5 flex items-center gap-5">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Member List Table */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-premium border border-charcoal/5 overflow-hidden">
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
                      <th className="px-6 py-4">Actions</th>
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
                        <td className="px-6 py-4">
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

            {/* Recent Activity Sidebar */}
            <div className="bg-white rounded-3xl shadow-premium border border-charcoal/5 overflow-hidden">
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
