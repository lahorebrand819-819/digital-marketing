import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeads } from './AdminLeads';
import { AdminServices } from './AdminServices';
import { AdminPricing } from './AdminPricing';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminCaseStudies } from './AdminCaseStudies';
import { AdminTeam } from './AdminTeam';
import { AdminBlog } from './AdminBlog';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminFAQs } from './AdminFAQs';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminSettings } from './AdminSettings';
import {
  LayoutDashboard,
  Users,
  Layers,
  DollarSign,
  Briefcase,
  FileText,
  UserCheck,
  BookOpen,
  MessageSquareQuote,
  HelpCircle,
  FolderOpen,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  const { logout, data } = useAgency();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const leadsCount = data?.leads?.filter(l => l.status === 'new').length || 0;

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'CRM & Leads', icon: Users, badge: leadsCount > 0 ? `${leadsCount} New` : undefined },
    { id: 'services', label: 'Services CMS', icon: Layers },
    { id: 'pricing', label: 'Pricing & Currency', icon: DollarSign },
    { id: 'portfolio', label: 'Portfolio Showcase', icon: Briefcase },
    { id: 'casestudies', label: 'Case Studies', icon: TrendingUp },
    { id: 'team', label: 'Team Leadership', icon: UserCheck },
    { id: 'blog', label: 'Blog & Articles', icon: BookOpen },
    { id: 'testimonials', label: 'Client Reviews', icon: MessageSquareQuote },
    { id: 'faqs', label: 'FAQ Manager', icon: HelpCircle },
    { id: 'media', label: 'Device Media Library', icon: FolderOpen },
    { id: 'settings', label: 'Agency Settings', icon: Settings }
  ];

  const handleLogout = () => {
    logout();
    onExitAdmin();
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'leads':
        return <AdminLeads />;
      case 'services':
        return <AdminServices />;
      case 'pricing':
        return <AdminPricing />;
      case 'portfolio':
        return <AdminPortfolio />;
      case 'casestudies':
        return <AdminCaseStudies />;
      case 'team':
        return <AdminTeam />;
      case 'blog':
        return <AdminBlog />;
      case 'testimonials':
        return <AdminTestimonials />;
      case 'faqs':
        return <AdminFAQs />;
      case 'media':
        return <AdminMediaLibrary />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-5 justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Agency Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/30">
              DG
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white">Digital Growth</div>
              <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                Admin Control Room
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-300 text-xs font-bold border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-xs">
            DG
          </div>
          <span className="font-bold text-xs text-white">Admin Control Room</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-slate-800 text-slate-200 rounded-xl"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 sticky top-[65px] z-30 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onExitAdmin();
              }}
              className="flex-1 py-2 text-center bg-slate-800 text-slate-200 text-xs font-bold rounded-xl"
            >
              Live Website
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 text-center bg-red-950 text-red-300 text-xs font-bold rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};
