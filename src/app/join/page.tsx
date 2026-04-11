import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function JoinPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setFormData({
          name: data.user.user_metadata?.full_name || '',
          email: data.user.email || '',
        });
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base Stripe link
    const stripeLink = 'https://buy.stripe.com/8x26oA6zC4eJeh60vu5EY02';
    
    // Build parameters for automatic fulfillment
    const params = new URLSearchParams();
    if (user) {
      params.append('client_reference_id', user.id);
      params.append('prefilled_email', user.email || '');
    } else {
      params.append('prefilled_email', formData.email);
    }

    window.location.href = `${stripeLink}?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-off-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold font-sans font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Step 1: Get Your Access
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue mb-4">
              Join the <span className="text-gold">FA-OS</span> Ecosystem
            </h1>
            <p className="text-charcoal/70 max-w-2xl mx-auto font-sans">
              Get 30 days of full access to the Learning Management System, AI Coach, 
              and our exclusive community of high-impact facilitators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Value Prop */}
            <div className="bg-white p-8 rounded-2xl shadow-premium border border-gold/10">
              <h3 className="text-xl font-serif font-bold text-royal-blue mb-6">What's Included:</h3>
              <ul className="space-y-4">
                {[
                  'Full Access to All Course Modules',
                  '24/7 AI "Wise Brother" Coach',
                  'Exclusive LINE Messaging Support',
                  'Premium Learning Progress Tracking',
                  'Certification of Completion',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-charcoal/80 font-sans text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-charcoal/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-charcoal/60 font-sans">Subscription (30 Days)</span>
                  <span className="text-2xl font-serif font-bold text-royal-blue">฿590.00</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-charcoal/40 uppercase tracking-widest font-sans">
                  <ShieldCheck className="w-3 h-3" /> Secure Payment via Stripe
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-royal-blue p-8 rounded-2xl shadow-2xl text-white">
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <Zap className="text-gold w-5 h-5" /> Start Your Journey
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="ปรีชา นามสมมติ"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-colors font-sans"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold transition-colors font-sans"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-royal-blue font-sans font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                  >
                    Proceed to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-[10px] text-white/40 mt-4 font-sans uppercase tracking-widest">
                    You will be redirected to Stripe to complete your purchase
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
