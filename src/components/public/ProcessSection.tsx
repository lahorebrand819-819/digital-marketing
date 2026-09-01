import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Code2,
  Rocket,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Full Growth Audit & Strategic Roadmap',
      icon: Compass,
      summary: 'Deep-dive analysis of your current funnel, audience semantics, historical ad spend, and competitor leak points.',
      deliverables: [
        'Complete Funnel & Unit Economics Audit',
        'Competitor Keyword & Ad Creative Teardown',
        'Custom 90-Day Revenue Scaling Blueprint',
        'Tracking & Attribution Infrastructure Setup'
      ],
      tag: 'Phase 1: Week 1'
    },
    {
      number: '02',
      title: 'High-Converting Creative & Landing Systems',
      icon: Code2,
      summary: 'We build high-velocity UGC frameworks, cinematic video ads, and bespoke lightning-fast landers engineered to convert cold traffic.',
      deliverables: [
        'Direct-Response Ad Creatives (15+ variations/mo)',
        'Speed-Optimized Next-Gen Landing Pages',
        'Engaging Offer Architecture & Risk Reversals',
        'Multi-Tier Email & SMS Retargeting Flows'
      ],
      tag: 'Phase 2: Week 2'
    },
    {
      number: '03',
      title: 'Omnichannel Launch & Algorithmic Bidding',
      icon: Rocket,
      summary: 'Deployment across Meta, Google Search/Shopping, TikTok, and SEO. We manage real-time bid strategies to maintain target ROAS.',
      deliverables: [
        'Targeted Meta Advantage+ & Custom Audiences',
        'Google High-Intent Search & Performance Max',
        'TikTok Viral Spark Ads & Creator Partnerships',
        'Authoritative SEO Content Clusters'
      ],
      tag: 'Phase 3: Weeks 3–4'
    },
    {
      number: '04',
      title: 'AI Automation & Relentless Scaling',
      icon: Cpu,
      summary: 'We integrate autonomous AI lead qualifiers, budget re-allocation rules, and retention engines to double down on winning profit channels.',
      deliverables: [
        'Automated Machine Bidding & Budget Scaling',
        'AI WhatsApp & CRM Lead Response Bots',
        'Live Executive KPI Dashboard (24/7 Access)',
        'Weekly Strategic Growth Reviews'
      ],
      tag: 'Phase 4: Month 2 & Beyond'
    }
  ];

  return (
    <section id="process" className="py-24 relative bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Our Battle-Tested Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Take You from <span className="gradient-text">Stagnant to Scaling</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            A proven, four-stage acceleration framework that eliminates marketing guesswork and maximizes profit velocity.
          </p>
        </div>

        {/* Step Navigation Tabs on Mobile/Tablet */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isActive
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-xl shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                    STEP {step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-xs font-bold text-slate-200 line-clamp-1">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {steps[activeStep].tag}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Phase {steps[activeStep].number} of 04</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                {steps[activeStep].summary}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Milestone Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {steps[activeStep].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Growth Guarantee
                </div>
                <h4 className="text-lg font-bold text-white leading-snug">
                  "We deploy transparent sprints with clear accountability and weekly KPI sprints."
                </h4>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  You’ll receive a private Slack channel with our dedicated media buyers, creative designers, and growth lead.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Ready to start?</span>
                <button
                  onClick={() => {
                    const next = (activeStep + 1) % steps.length;
                    setActiveStep(next);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Next Step: 0{((activeStep + 1) % 4) + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
