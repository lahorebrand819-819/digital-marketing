import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Target,
  Users,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onViewWork }) => {
  const { data } = useAgency();
  const settings = data?.settings;

  return (
    <section id="home" className="relative min-h-[90vh] pt-32 pb-20 overflow-hidden flex items-center bg-slate-950">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 blur-[100px] pointer-events-none rounded-full" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Funnel Performance Marketing & AI Scale</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Grow Your Brand.{' '}
              <span className="gradient-text block mt-1">
                Reach More Customers.
              </span>
              <span className="text-indigo-400">Scale Smarter.</span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We engineer high-ROI paid ad funnels, dominate Google Search with authoritative SEO, create viral social media content, and deploy custom AI automation systems for ambitious brands.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Started — Free Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewWork}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-sm transition-all hover:border-slate-600 flex items-center justify-center gap-2"
              >
                <span>View Our Work & Results</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-2xl font-extrabold text-white">4.8x</div>
                <div className="text-xs text-slate-400 font-medium">Average ROAS</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">$48M+</div>
                <div className="text-xs text-slate-400 font-medium">Client Revenue</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">98.4%</div>
                <div className="text-xs text-slate-400 font-medium">Client Retention</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Digital Marketing Engine Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Central Glowing Card Dashboard */}
              <div className="rounded-3xl bg-slate-900/90 border border-slate-700/70 p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
                {/* Top header bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Omnichannel Growth Engine</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live Scaling • Active
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[10px] font-bold border border-indigo-500/20">
                    Real-time
                  </span>
                </div>

                {/* Performance Chart Simulator */}
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Total Monthly Revenue</span>
                      <div className="text-2xl font-extrabold text-white">$184,450.00</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                      +342% vs Last Mo
                    </span>
                  </div>

                  {/* Simulated Visual Graph Bars */}
                  <div className="h-28 flex items-end gap-2 pt-4 px-1">
                    {[35, 48, 42, 60, 55, 75, 68, 85, 92, 100].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: i * 0.08 }}
                          className={`w-full rounded-t-md transition-all ${
                            i === 9
                              ? 'bg-gradient-to-t from-indigo-600 to-purple-400 shadow-lg shadow-indigo-500/40'
                              : 'bg-slate-800 hover:bg-slate-700'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Channels mini-grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Meta Ads</div>
                    <div className="text-xs font-bold text-white mt-0.5">5.2x ROAS</div>
                    <div className="text-[9px] text-emerald-400">+48% CTR</div>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">Google Search</div>
                    <div className="text-xs font-bold text-white mt-0.5">4.6x ROAS</div>
                    <div className="text-[9px] text-emerald-400">12k Clicks</div>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    <div className="text-[10px] text-slate-400">TikTok UGC</div>
                    <div className="text-xs font-bold text-white mt-0.5">3.8M Views</div>
                    <div className="text-[9px] text-indigo-400">Viral Hook</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Instant Lead Notification */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-5 -left-4 sm:-left-6 p-3 bg-slate-900/95 border border-emerald-500/40 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Qualified Lead Converted</div>
                  <div className="text-[9px] text-slate-400">$8,500 Retainer Contract</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: AI Optimization */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 p-3 bg-slate-900/95 border border-indigo-500/40 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">AI Creative Optimizer</div>
                  <div className="text-[9px] text-indigo-300">Auto-allocated spend to Winner</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Client Logos / Trust Bar */}
        <div className="mt-20 pt-10 border-t border-slate-900">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Trusted by Ambitious Brands Across E-commerce, SaaS, Real Estate & FinTech
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
            <span className="font-extrabold text-lg sm:text-xl tracking-tighter text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> AURA LUXE
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-slate-300">
              ZENITH.PAY
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-300 flex items-center gap-1">
              LUMINA<span className="text-indigo-400">AI</span>
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-widest text-slate-300">
              APEX·ESTATES
            </span>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-300">
              GLOW BOTANIC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
