import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Sparkles,
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const { data } = useAgency();
  const testimonials = data?.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials.length) return null;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 relative bg-slate-950">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Verified Client Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Loved by Founders & <span className="gradient-text">Marketing Chiefs</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Real feedback from enterprise leaders and direct-to-consumer innovators scaling with Digital Growth Agency.
          </p>
        </div>

        {/* 3-Column Grid for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-xl relative"
            >
              <Quote className="w-8 h-8 text-indigo-500/20 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                  {t.resultMetric && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t.resultMetric}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-5 mt-5 border-t border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{t.clientName}</h4>
                  <p className="text-xs text-indigo-400 font-medium">{t.role} • {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
