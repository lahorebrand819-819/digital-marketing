import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { MessageCircle, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WhatsAppButton: React.FC = () => {
  const { data } = useAgency();
  const [isOpen, setIsOpen] = useState(false);

  const phone = data?.settings?.whatsappNumber || '923001234567';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const customMessage = data?.settings?.whatsappMessage || "Hi Digital Growth Agency! I'd like to discuss scaling my business.";

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            className="mb-3 w-80 p-4 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-2xl backdrop-blur-xl text-slate-100"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    DG
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Digital Growth Agency</h4>
                  <p className="text-xs text-emerald-400 font-medium">Strategists Online • Instant Reply</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-3 text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 leading-relaxed">
              👋 Hey there! Looking to scale your brand with paid ads, SEO, or custom web solutions? Let’s chat directly on WhatsApp!
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Start WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-bold text-sm shadow-xl shadow-emerald-500/30 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-40"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline font-bold">Chat on WhatsApp</span>
      </motion.button>
    </div>
  );
};
