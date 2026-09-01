import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Quote,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface CaseStudiesSectionProps {
  isStandalonePage?: boolean;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ isStandalonePage = false }) => {
  const { data } = useAgency();
  const caseStudies = data?.caseStudies || [];

  return (
    <section id="case-studies" className={`py-24 relative bg-slate-950/90 border-t border-slate-900 ${isStandalonePage ? 'pt-32' : ''}`}>
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deep-Dive Growth Breakdowns</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Scaled <span className="gradient-text">Market Leaders</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Step-by-step breakdowns of the challenges, strategic pivots, and multi-channel execution that drove 7-figure revenue inflection points.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="space-y-16">
          {caseStudies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left col: Meta, Title, Image & Testimonial */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                        {item.industry}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">• {item.duration}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white leading-tight mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Client: <strong className="text-slate-200">{item.client}</strong></p>
                  </div>

                  <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {item.testimonial && (
                    <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 relative">
                      <Quote className="w-6 h-6 text-indigo-400/40 absolute top-3 right-3" />
                      <p className="text-xs text-slate-300 italic font-normal leading-relaxed mb-2">
                        "{item.testimonial.quote}"
                      </p>
                      <div className="text-xs font-bold text-white">{item.testimonial.author}</div>
                      <div className="text-[10px] text-indigo-400">{item.testimonial.role}</div>
                    </div>
                  )}
                </div>

                {/* Right col: Challenge -> Strategy -> Solution -> Results */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Before vs After Metric Cards */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.metrics.map((m, i) => (
                        <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                          <span className="text-[11px] text-slate-400 font-medium block">{m.label}</span>
                          <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">{m.value}</div>
                          {m.before && m.after && (
                            <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                              <span>Before: <del className="text-slate-400">{m.before}</del></span>
                              <span className="text-emerald-400 font-bold">Now: {m.after}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3 Step Breakdown */}
                  <div className="space-y-4">
                    {/* 1. Challenge */}
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Target className="w-3.5 h-3.5" />
                        <span>The Challenge</span>
                      </h4>
                      <p className="text-xs text-slate-300 font-normal leading-relaxed">{item.challenge}</p>
                    </div>

                    {/* 2. Strategy */}
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Our Growth Strategy</span>
                      </h4>
                      <p className="text-xs text-slate-300 font-normal leading-relaxed">{item.strategy}</p>
                    </div>

                    {/* 3. Solution & Outcome */}
                    <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Execution & Measurable Results</span>
                      </h4>
                      <p className="text-xs text-slate-300 font-normal leading-relaxed">{item.solution}</p>
                      <p className="text-xs text-emerald-300 font-bold mt-2 pt-2 border-t border-slate-800/80">
                        Outcome: {item.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
