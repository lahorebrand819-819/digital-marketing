import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Users,
  TrendingUp,
  Layers,
  FileText,
  DollarSign,
  Mail,
  ArrowUpRight,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { data, currentCurrency, formatPrice } = useAgency();

  const leads = data?.leads || [];
  const services = data?.services || [];
  const projects = data?.portfolio || [];
  const blogPosts = data?.blog || [];
  const mediaCount = data?.media?.length || 0;

  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const inProgressLeadsCount = leads.filter(l => l.status === 'in-progress' || l.status === 'contacted').length;

  const stats = [
    {
      title: 'Total Inbound Leads',
      value: leads.length,
      badge: `${newLeadsCount} New`,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: Users,
      actionTab: 'leads'
    },
    {
      title: 'Active Growth Services',
      value: services.filter(s => s.enabled).length,
      badge: `${services.length} Total`,
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      icon: Layers,
      actionTab: 'services'
    },
    {
      title: 'Portfolio Case Assets',
      value: projects.length,
      badge: 'Live',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: TrendingUp,
      actionTab: 'portfolio'
    },
    {
      title: 'Uploaded Media Assets',
      value: mediaCount,
      badge: 'Files',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: FolderOpen,
      actionTab: 'media'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Control Room Active
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, Agency Administrator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              You have full administrative privileges to edit multi-currency pricing, upload media directly from your device, manage leads, and customize website content.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('leads')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              <span>Review CRM Leads</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(item.actionTab)}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl cursor-pointer transition-all duration-200 shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-white">{item.value}</div>
              <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
                <span>{item.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column: Recent Inquiries + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Recent Inbound Client Inquiries</h3>
              <p className="text-xs text-slate-400">Captured in real-time from the website contact forms</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({leads.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No inquiries yet. Submissions from the website will appear here instantly.
            </div>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 5).map((lead) => {
                const isNew = lead.status === 'new';
                const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
                const directWhatsApp = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                  `Hi ${lead.name}, thank you for reaching out to Digital Growth Agency regarding ${lead.service}. Let's discuss your scaling roadmap!`
                )}`;

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.name}</span>
                        {lead.company && (
                          <span className="text-xs text-slate-400">• {lead.company}</span>
                        )}
                        {isNew && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-indigo-400 font-medium">
                        Service: {lead.service} {lead.budget ? `• Budget: ${lead.budget}` : ''}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lead.email} | {lead.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={directWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Lead</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Quick CMS Shortcuts</h3>
          <p className="text-xs text-slate-400">Instant shortcuts to update key marketing components</p>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigateTab('pricing')}
              className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                  Update Multi-Currency Pricing
                </div>
                <div className="text-[10px] text-slate-400">Change PKR, USD, and GBP rates</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => onNavigateTab('services')}
              className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                  Add / Edit Growth Services
                </div>
                <div className="text-[10px] text-slate-400">Manage 14+ services and deliverables</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => onNavigateTab('portfolio')}
              className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                  Upload Case Study or Project
                </div>
                <div className="text-[10px] text-slate-400">Add client metrics and visual proof</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => onNavigateTab('media')}
              className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                  Upload From Device Gallery
                </div>
                <div className="text-[10px] text-slate-400">Upload images/videos without pasting URLs</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full text-left p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-950 transition-all flex items-center justify-between group"
            >
              <div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">
                  Agency Settings & WhatsApp
                </div>
                <div className="text-[10px] text-slate-400">Phone, email, social links, currencies</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
