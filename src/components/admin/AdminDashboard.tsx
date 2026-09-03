import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Users,
  TrendingUp,
  Layers,
  DollarSign,
  ArrowUpRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
  Globe,
  PieChart as PieChartIcon,
  Activity,
  AlertCircle,
  CheckSquare,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { data, formatPrice, updateLeadStatus, updateTask } = useAgency();

  const leads = data?.leads || [];
  const clients = data?.clients || [];
  const projects = data?.projects || [];
  const campaigns = data?.campaigns || [];
  const tasks = data?.tasks || [];
  const invoices = data?.invoices || [];

  // Core KPI Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const interestedLeads = leads.filter(l => l.status === 'interested').length;

  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const activeProjects = projects.filter(p => p.status === 'in-progress' || p.status === 'review').length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  // Financials
  const monthlyRevenue = clients
    .filter(c => c.status === 'active')
    .reduce((acc, curr) => acc + (curr.monthlyRetainer || 0), 0);

  const outstandingPayments = invoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalAdSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalLeadsGen = campaigns.reduce((acc, c) => acc + (c.conversions || 0), 0) + totalLeads;
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const blendedROAS = (campaigns.reduce((acc, c) => acc + c.roas, 0) / (campaigns.length || 1)).toFixed(2);
  const blendedCPA = totalConversions > 0 ? Math.round(totalAdSpend / totalConversions) : 0;
  const blendedCPL = totalLeadsGen > 0 ? Math.round(totalAdSpend / totalLeadsGen) : 0;
  const conversionRate = '14.8%';
  const websiteTraffic = '48,650';
  const clientRetentionRate = '94.2%';

  // Recharts Data Series
  const leadTimelineData = [
    { month: 'Apr', leads: 42, conversions: 8, qualified: 14 },
    { month: 'May', leads: 58, conversions: 12, qualified: 22 },
    { month: 'Jun', leads: 75, conversions: 18, qualified: 30 },
    { month: 'Jul', leads: 92, conversions: 24, qualified: 38 },
    { month: 'Aug', leads: 118, conversions: 31, qualified: 49 },
    { month: 'Sep', leads: 146, conversions: 42, qualified: 68 }
  ];

  const spendVsRevenueData = [
    { month: 'Apr', spend: 320000, revenue: 950000 },
    { month: 'May', spend: 450000, revenue: 1320000 },
    { month: 'Jun', spend: 580000, revenue: 1780000 },
    { month: 'Jul', spend: 690000, revenue: 2150000 },
    { month: 'Aug', spend: 810000, revenue: 2600000 },
    { month: 'Sep', spend: 940000, revenue: 3150000 }
  ];

  const revenueByServiceData = [
    { name: 'Meta Ads & Paid Social', value: 980000, color: '#6366f1' },
    { name: 'Google Ads PPC', value: 750000, color: '#3b82f6' },
    { name: 'E-commerce Dev', value: 520000, color: '#10b981' },
    { name: 'SEO & Search Growth', value: 480000, color: '#f59e0b' },
    { name: 'AI Marketing Automation', value: 420000, color: '#ec4899' }
  ];

  const acquisitionChannelData = [
    { channel: 'Google Organic / SEO', leads: 48, percentage: 33 },
    { channel: 'Meta Paid Ads', leads: 39, percentage: 27 },
    { channel: 'Referral / Word of Mouth', leads: 28, percentage: 19 },
    { channel: 'LinkedIn Outreach', leads: 19, percentage: 13 },
    { channel: 'Direct / Social Content', leads: 12, percentage: 8 }
  ];

  const upcomingTasks = tasks
    .filter(t => t.status !== 'done')
    .slice(0, 5);

  const topCampaigns = [...campaigns]
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Agency Intelligence & Executive Overview
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Telca Marketing Performance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Real-time synchronization across CRM pipeline, active client accounts, multi-platform ad spend, revenue attribution, and team operational deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('leads')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>CRM Pipeline ({newLeads} New)</span>
            </button>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Deep Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid: High-Impact Agency Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div
          onClick={() => onNavigateTab('leads')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Total Leads</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
          </div>
          <div className="text-2xl font-black text-white mt-1 group-hover:text-indigo-400 transition-colors">
            {totalLeads}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span>+{newLeads} New Pending</span>
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('leads')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Qualified / Inter.</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl font-black text-white mt-1 group-hover:text-emerald-400 transition-colors">
            {qualifiedLeads + interestedLeads}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {qualifiedLeads} Qual • {interestedLeads} Int
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('clients')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Active Clients</span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-2xl font-black text-white mt-1 group-hover:text-blue-400 transition-colors">
            {activeClients}
          </div>
          <div className="text-[11px] text-blue-400 font-medium mt-1">
            {totalClients} Total on Record
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('campaigns')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Active Campaigns</span>
            <span className="w-2 h-2 rounded-full bg-purple-500" />
          </div>
          <div className="text-2xl font-black text-white mt-1 group-hover:text-purple-400 transition-colors">
            {activeCampaigns}
          </div>
          <div className="text-[11px] text-purple-400 font-medium mt-1">
            {activeProjects} Projects Live
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('finance')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Monthly Retainers</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-xl font-black text-emerald-400 mt-1">
            {formatPrice(monthlyRevenue)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            {clients.filter(c => c.status === 'active').length} Monthly Clients
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('finance')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 cursor-pointer transition-all shadow-md group"
        >
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Outstanding Due</span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <div className="text-xl font-black text-rose-400 mt-1">
            {formatPrice(outstandingPayments)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Pending invoices
          </div>
        </div>
      </div>

      {/* Marketing Performance KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Ad Spend</div>
          <div className="text-base font-extrabold text-white mt-0.5">{formatPrice(totalAdSpend)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Conversions</div>
          <div className="text-base font-extrabold text-white mt-0.5">{totalConversions}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Blended ROAS</div>
          <div className="text-base font-extrabold text-emerald-400 mt-0.5">{blendedROAS}x</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Blended CPA</div>
          <div className="text-base font-extrabold text-indigo-400 mt-0.5">{formatPrice(blendedCPA)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Blended CPL</div>
          <div className="text-base font-extrabold text-indigo-400 mt-0.5">{formatPrice(blendedCPL)}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Website Traffic</div>
          <div className="text-base font-extrabold text-white mt-0.5">{websiteTraffic} / mo</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Client Retention</div>
          <div className="text-base font-extrabold text-emerald-400 mt-0.5">{clientRetentionRate}</div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Leads Over Time & Conversion Trends */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Leads & Conversion Trend (Last 6 Months)</span>
              </h2>
              <p className="text-xs text-slate-400">Trajectory of total inquiries vs. qualified pipeline and won conversions</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
              +48% MoM Growth
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadTimelineData}>
                <defs>
                  <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="leads" name="Total Inquiries" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#leadGrad)" />
                <Area type="monotone" dataKey="qualified" name="Qualified Leads" stroke="#38bdf8" strokeWidth={2} fill="none" />
                <Area type="monotone" dataKey="conversions" name="Deals Won" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#convGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Ad Spend vs. Attributed Revenue */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Ad Spend vs. Revenue</span>
              </h2>
              <p className="text-xs text-slate-400">Monthly agency ad budgets vs. attributed client sales</p>
            </div>
            <span className="text-xs font-bold text-indigo-400">3.35x Average ROAS</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendVsRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(value: any) => formatPrice(Number(value))}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="spend" name="Ad Spend" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Attributed Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2nd Chart Row: Revenue by Service + Client Acquisition Channel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue by Service Donut */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-indigo-400" />
                <span>Revenue Attribution by Service</span>
              </h2>
              <p className="text-xs text-slate-400">Distribution of retainers and one-time project fees</p>
            </div>
            <button
              onClick={() => onNavigateTab('pricing')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View Packages</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 pt-2">
            <div className="sm:col-span-6 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByServiceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {revenueByServiceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    formatter={(val: any) => formatPrice(Number(val))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="sm:col-span-6 space-y-2">
              {revenueByServiceData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium truncate max-w-[140px]">{item.name}</span>
                  </div>
                  <span className="text-white font-bold">{formatPrice(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Acquisition Channels */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Client Acquisition Channels</span>
              </h2>
              <p className="text-xs text-slate-400">Where top agency clients originate</p>
            </div>
            <span className="text-xs font-bold text-slate-400">Organic #1</span>
          </div>

          <div className="space-y-3 pt-2">
            {acquisitionChannelData.map((ch, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{ch.channel}</span>
                  <span className="text-indigo-400 font-bold">{ch.leads} leads ({ch.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    style={{ width: `${ch.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Top Performing Active Campaigns</span>
            </h2>
            <p className="text-xs text-slate-400">High-converting live ad sets across Meta, Google & TikTok</p>
          </div>
          <button
            onClick={() => onNavigateTab('campaigns')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Manage All Campaigns ({campaigns.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-2.5 px-3">Campaign</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3">Spend</th>
                <th className="py-2.5 px-3">Conversions</th>
                <th className="py-2.5 px-3">CPA</th>
                <th className="py-2.5 px-3">ROAS</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {topCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{camp.name}</td>
                  <td className="py-3 px-3 text-slate-300">{camp.client}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                      {camp.platform}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-200">{formatPrice(camp.spend)}</td>
                  <td className="py-3 px-3 font-semibold text-white">{camp.conversions}</td>
                  <td className="py-3 px-3 text-slate-300">{formatPrice(camp.cpa)}</td>
                  <td className="py-3 px-3 font-black text-emerald-400">{camp.roas}x</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      camp.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {camp.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column: Recent Leads Quick Action Table + Upcoming Deadlines / Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Leads Quick Actions */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Recent CRM Leads Quick Action</span>
              </h2>
              <p className="text-xs text-slate-400">Incoming inquiries from website forms with instant stage routing</p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Full Pipeline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => {
              const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
              const directWhatsApp = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                `Hi ${lead.name}, this is Telca Marketing regarding your interest in ${lead.service}. Let's discuss your project!`
              )}`;

              return (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{lead.name}</span>
                      {lead.company && <span className="text-xs text-slate-400">• {lead.company}</span>}
                      {lead.status === 'new' && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-indigo-400 font-medium">
                      {lead.service} {lead.budget ? `• ${lead.budget}` : ''}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {lead.email} • {lead.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="text-xs bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:border-indigo-500 outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="interested">Interested</option>
                      <option value="proposal-sent">Proposal Sent</option>
                      <option value="won">Won (Client)</option>
                      <option value="lost">Lost</option>
                    </select>

                    <a
                      href={directWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines / Tasks */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Upcoming Deadlines & Tasks</span>
              </h2>
              <p className="text-xs text-slate-400">High priority client deliverables</p>
            </div>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View Tasks</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {upcomingTasks.map((t) => {
              const isUrgent = t.priority === 'urgent' || t.priority === 'high';
              return (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{t.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{t.client}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        Due {t.dueDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold ${
                      isUrgent
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.priority.toUpperCase()}
                    </span>
                    <button
                      onClick={() => updateTask(t.id, { status: 'done' })}
                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                      title="Mark Done"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
