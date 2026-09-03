import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeads } from './AdminLeads';
import { AdminClients } from './AdminClients';
import { AdminServicesPackages } from './AdminServicesPackages';
import { AdminProjects } from './AdminProjects';
import { AdminCampaigns } from './AdminCampaigns';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminResearch } from './AdminResearch';
import { AdminReports } from './AdminReports';
import { AdminContent } from './AdminContent';
import { AdminTasks } from './AdminTasks';
import { AdminFinance } from './AdminFinance';
import { AdminTeam } from './AdminTeam';
import { AdminIntegrations } from './AdminIntegrations';
import { AdminNotifications } from './AdminNotifications';
import { AdminSettings } from './AdminSettings';
import { AdminAuditLogs } from './AdminAuditLogs';

import {
  LayoutDashboard,
  Users,
  Building2,
  Layers,
  Briefcase,
  Target,
  BarChart3,
  Compass,
  FileText,
  FolderOpen,
  CheckSquare,
  DollarSign,
  UserCheck,
  Zap,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  onExitAdmin: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitAdmin }) => {
  const { logout, data } = useAgency();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const leadsCount = data?.leads?.filter(l => l.status === 'new').length || 0;
  const unreadNotifsCount = data?.notifications?.filter(n => !n.read).length || 0;
  const pendingTasksCount = data?.tasks?.filter(t => t.status !== 'done').length || 0;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'CRM / Leads', icon: Users, badge: leadsCount > 0 ? `${leadsCount}` : undefined },
    { id: 'clients', label: 'Clients', icon: Building2 },
    { id: 'services', label: 'Services & Packages', icon: Layers },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'campaigns', label: 'Campaigns', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'research', label: 'Research', icon: Compass },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'content', label: 'Content', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : undefined },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'team', label: 'Team', icon: UserCheck },
    { id: 'integrations', label: 'Integrations', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : undefined },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security / Audit Logs', icon: ShieldCheck }
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
      case 'clients':
        return <AdminClients />;
      case 'services':
      case 'pricing':
        return <AdminServicesPackages />;
      case 'projects':
        return <AdminProjects />;
      case 'campaigns':
        return <AdminCampaigns />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'research':
        return <AdminResearch />;
      case 'reports':
        return <AdminReports />;
      case 'content':
      case 'blog':
      case 'casestudies':
      case 'portfolio':
      case 'media':
      case 'testimonials':
      case 'faqs':
        return <AdminContent />;
      case 'tasks':
        return <AdminTasks />;
      case 'finance':
        return <AdminFinance />;
      case 'team':
        return <AdminTeam />;
      case 'integrations':
        return <AdminIntegrations />;
      case 'notifications':
        return <AdminNotifications />;
      case 'settings':
        return <AdminSettings />;
      case 'security':
        return <AdminAuditLogs />;
      default:
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-4 justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-4 overflow-y-auto pr-1">
          {/* Agency Logo */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/30">
              TM
            </div>
            <div>
              <div className="font-black text-sm tracking-tight text-white">Telca Marketing</div>
              <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                Admin Control Panel
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                      item.id === 'leads'
                        ? 'bg-emerald-500 text-slate-950'
                        : item.id === 'notifications'
                        ? 'bg-purple-500 text-white'
                        : 'bg-amber-500 text-slate-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-slate-800 space-y-1.5 shrink-0">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-300 text-xs font-bold border border-red-500/20 transition-colors"
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
            TM
          </div>
          <span className="font-bold text-xs text-white">Telca Admin Panel</span>
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
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1 sticky top-[65px] z-30 shadow-2xl max-h-[80vh] overflow-y-auto">
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
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold ${
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
              Public Website
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
      <main className="flex-1 p-4 sm:p-7 lg:p-9 overflow-y-auto max-w-7xl w-full mx-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};
