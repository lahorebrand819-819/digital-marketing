import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { CurrencySelector } from '../common/CurrencySelector';
import { PricingPackage } from '../../types';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Crown
} from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  onSelectPackage?: (packageName: string) => void;
  isStandalonePage?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  isStandalonePage = false
}) => {
  const { data, currentCurrency, formatPrice } = useAgency();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const packages = (data?.pricingPackages || [])
    .filter(p => p.enabled)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Helper to adjust price if quarterly (apply 15% discount)
  const getPackagePriceDisplay = (pkg: PricingPackage) => {
    if (pkg.billingPeriod === 'custom') {
      return 'Custom Pricing';
    }

    const discount = billingCycle === 'quarterly' ? 0.85 : 1.0;
    const pkr = Math.round(pkg.pricePKR * discount);
    const usd = Math.round(pkg.priceUSD * discount);
    const gbp = Math.round(pkg.priceGBP * discount);

    return formatPrice(pkr, usd, gbp);
  };

  return (
    <section id="pricing" className={`py-24 relative bg-slate-950 ${isStandalonePage ? 'pt-32' : ''}`}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Transparent Investment • Measurable ROI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Predictable Growth <span className="gradient-text">Packages</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            No hidden fees, no long-term vendor lock-in. Choose a tailored monthly growth retainer or request a custom enterprise deployment.
          </p>

          {/* Currency Switcher & Billing Toggle Controls */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Currency selector component */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-full border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 pl-3 pr-1 uppercase tracking-wider">
                Currency:
              </span>
              <CurrencySelector />
            </div>

            {/* Monthly / Quarterly Toggle */}
            <div className="flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-full">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Monthly Retainer
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingCycle === 'quarterly'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Quarterly</span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 lg:-translate-y-2'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>Most Popular Plan</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Tag */}
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-white">{pkg.name}</h3>
                    {pkg.tag && (
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">{pkg.tag}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-slate-800">
                    <div className="text-3xl font-extrabold text-white">
                      {getPackagePriceDisplay(pkg)}
                    </div>
                    {pkg.billingPeriod !== 'custom' && (
                      <span className="text-xs text-slate-400 font-medium">
                        per month {billingCycle === 'quarterly' ? '(billed quarterly)' : ''}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 font-normal leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Deliverables:
                    </div>
                    {pkg.features?.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div>
                  <button
                    onClick={() => {
                      if (onSelectPackage) {
                        onSelectPackage(pkg.name);
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                    }`}
                  >
                    <span>{pkg.ctaText || 'Select Plan'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Performance Commitment</h4>
              <p className="text-xs text-slate-400 font-normal">No locked-in contracts. Transparent live analytics reporting.</p>
            </div>
          </div>
          <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>Dedicated Account Manager with Every Plan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
