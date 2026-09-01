import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { ServiceItem } from '../../types';
import { IconResolver } from '../common/IconResolver';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  ChevronRight,
  X,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
  isStandalonePage?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
  isStandalonePage = false
}) => {
  const { data, formatPrice, currentCurrency } = useAgency();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services = (data?.services || []).filter(s => s.enabled);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'social', label: 'Social & TikTok' },
    { id: 'ads', label: 'Paid Ads & PPC' },
    { id: 'seo', label: 'SEO & Search' },
    { id: 'creative', label: 'Creative & Video' },
    { id: 'dev', label: 'Web & E-com' },
    { id: 'ai', label: 'AI & Automation' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features?.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className={`py-24 relative bg-slate-950 ${isStandalonePage ? 'pt-32' : ''}`}>
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Full-Suite Growth Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Services Engineered for <span className="gradient-text">Aggressive Scale</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Every service is executed by senior specialists obsessed with unit economics, conversion architecture, and high return on investment.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. SEO, TikTok)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden"
            >
              {/* Subtle top image or gradient header */}
              {service.image && (
                <div className="h-40 -mx-6 -mt-6 mb-5 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  
                  {service.highlightBadge && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                      {service.highlightBadge}
                    </span>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
                    <IconResolver name={service.icon} className="w-6 h-6" />
                  </div>
                  
                  {!service.image && service.highlightBadge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {service.highlightBadge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Key Features List */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
                  <span className="text-base font-extrabold text-white">
                    {formatPrice(service.startingPricePKR, service.startingPriceUSD, service.startingPriceGBP)}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1 group/btn"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Layers className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white">No matching services found</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting the category filter or searching for another term.</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 text-slate-100"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <IconResolver name={selectedService.icon} className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {selectedService.category} Deliverable
                    </span>
                    {selectedService.highlightBadge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        {selectedService.highlightBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-0.5">{selectedService.title}</h3>
                </div>
              </div>

              {/* Modal Cover Image */}
              {selectedService.image && (
                <div className="h-56 rounded-2xl overflow-hidden mb-6 border border-slate-800">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{selectedService.description}</p>

                {/* Deliverables Checklist */}
                <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Scope of Work & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.features?.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Timeline: <strong className="text-slate-200">{selectedService.deliverableTime}</strong></span>
                  </div>
                </div>
              </div>

              {/* Modal Footer / Action */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Starting Investment</span>
                  <div className="text-2xl font-extrabold text-white">
                    {formatPrice(
                      selectedService.startingPricePKR,
                      selectedService.startingPriceUSD,
                      selectedService.startingPriceGBP
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onSelectServiceForInquiry) {
                      onSelectServiceForInquiry(selectedService.title);
                    }
                    setSelectedService(null);
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <span>Book This Service / Get Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
