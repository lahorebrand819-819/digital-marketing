import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Shield,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const { data } = useAgency();

  const settings = data?.settings;
  const agencyName = settings?.name || 'Digital Growth Agency';
  const social = settings?.socialLinks || {};

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Agency Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {agencyName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {settings?.footerText ||
                'Accelerating ambitious brands through high-impact paid ads, organic SEO dominance, bespoke e-commerce engines, and cutting-edge AI marketing automation.'}
            </p>

            {/* Social Media Links (Only display if configured) */}
            <div className="flex items-center gap-2.5 pt-2">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-red-400 flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 flex items-center justify-center transition-all"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Growth Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                >
                  <span>Meta & Instagram Ads</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Google Search & Shopping PPC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  SEO & Technical Authority
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  TikTok Growth & UGC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  High-Converting Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  AI Automation & Chatbots
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Agency Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Packages & Pricing (Multi-Currency)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Portfolio & Client Results
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('case-studies')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Case Studies & Metrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Marketing Insights Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${settings?.contactEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {settings?.contactEmail || 'growth@digitalgrowthagency.com'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href={`tel:${settings?.phone}`} className="hover:text-white transition-colors">
                  {settings?.phone || '+92 300 1234567'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{settings?.address || 'Lahore & London Global Hubs'}</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-lg font-semibold text-xs transition-all"
                >
                  <span>Request Custom Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {settings?.copyrightText ||
              '© 2026 Digital Growth Agency. All rights reserved.'}
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-500">
              Crafted for high ROI
            </span>

            {/* Discreet Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className="group flex items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors text-[11px] font-medium"
              title="Agency CMS & CRM Portal"
            >
              <Shield className="w-3 h-3 group-hover:text-amber-400 transition-colors" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
