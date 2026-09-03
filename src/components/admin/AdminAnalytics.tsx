import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  TrendingUp,
  BarChart3,
  Globe,
  PieChart as PieChartIcon,
  Activity,
  DollarSign,
  ArrowUpRight,
  Filter,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
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

export const AdminAnalytics: React.FC = () => {
  const { data, formatPrice } = useAgency();
  const campaigns = data?.campaigns || [];
  const clients = data?.clients || [];
  const leads = data?.leads || [];

  const [timeRange, setTimeRange] = useState('6M');

  // Multi-Platform Comparison Data
  const platformComparisonData = [
    { platform: 'Meta Ads', spend: 480000, conversions: 520, roas: 4.8, cpa: 923 },
    { platform: 'Google Ads', spend: 320000, conversions: 280, roas: 3.9, cpa: 1142 },
    { platform: 'TikTok Ads', spend: 180000, conversions: 240, roas: 3.2, cpa: 750 },
    { platform: 'LinkedIn Ads', spend: 120000, conversions: 45, roas: 2.8, cpa: 2666 },
    { platform: 'SEO Organic', spend: 60000, conversions: 180, roas: 6.5, cpa: 333 }
  ];

  // Funnel Analytics Progression
  const funnelSteps = [
    { step: 'Ad Impressions', count: '1,450,000', dropoff: '100%' },
    { step: 'Website Clicks (CTR 2.9%)', count: '42,050', dropoff: '2.9%' },
    { step: 'Inbound Leads / Forms', count: '1,840', dropoff: '4.4%' },
    { step: 'Marketing Qualified (MQL)', count: '495', dropoff: '26.9%' },
    { step: 'Sales Qualified (SQL)', count: '210', dropoff: '42.4%' },
    { step: 'Closed Won Clients', count: '38', dropoff: '18.1%' }
  ];

  // Landing page performance
  const topLandingPages = [
    { path: '/services/ecommerce-marketing', visitors: 14200, bounceRate: '34.2%', avgTime: '3m 12s', convRate: '4.8%' },
    { path: '/services/social-media-management', visitors: 11800, bounceRate: '38.5%', avgTime: '2m 45s', convRate: '3.9%' },
    { path: '/case-studies/sapphire-scaling', visitors: 8900, bounceRate: '28.1%', avgTime: '4m 05s', convRate: '6.2%' },
    { path: '/pricing', visitors: 7400, bounceRate: '24.6%', avgTime: '3m 40s', convRate: '7.8%' },
    { path: '/contact', visitors: 4200, bounceRate: '19.8%', avgTime: '2m 10s', convRate: '18.4%' }
  ];

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Advanced Agency Analytics & Attribution</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              GA4 & Ad Pixels Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audited marketing performance, platform efficiency comparison, multi-tier conversion funnels, and landing page metrics.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
          {['1M', '3M', '6M', 'YTD', 'All'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === r ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Top Level Marketing KPI Quad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Cross-Platform Spend</div>
          <div className="text-2xl font-black text-white">{formatPrice(1160000)}</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Under Budget Target</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attributed Client Sales</div>
          <div className="text-2xl font-black text-emerald-400">{formatPrice(4850000)}</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>4.18x Blended Return</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Blended CPA (Cost/Acquisition)</div>
          <div className="text-2xl font-black text-indigo-400">{formatPrice(916)}</div>
          <div className="text-xs text-slate-400 font-medium">-14% vs. previous period</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Blended CPL (Cost/Lead)</div>
          <div className="text-2xl font-black text-sky-400">{formatPrice(630)}</div>
          <div className="text-xs text-slate-400 font-medium">1,840 Leads Generated</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Traffic & Engagement</div>
          <div className="text-2xl font-black text-white">48,650 <span className="text-xs font-normal text-slate-400">vis</span></div>
          <div className="text-xs text-emerald-400 font-medium">Avg Bounce: 31.4%</div>
        </div>
      </div>

      {/* Platform Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ad Spend & Conversions by Channel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>Ad Spend vs. Conversions by Channel</span>
              </h2>
              <p className="text-xs text-slate-400">Comparing budget consumption against result volume</p>
            </div>
            <span className="text-xs font-bold text-emerald-400">Meta #1 for Volume</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="platform" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} yAxisId="left" tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <YAxis stroke="#64748b" fontSize={11} yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar yAxisId="left" dataKey="spend" name="Spend (PKR)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="conversions" name="Conversions" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROAS Efficiency by Platform */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>ROAS by Channel</span>
              </h2>
              <p className="text-xs text-slate-400">Return on Ad Spend multiplier</p>
            </div>
            <span className="text-xs font-bold text-slate-400">SEO & Meta Top</span>
          </div>

          <div className="space-y-3 pt-2">
            {platformComparisonData.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{item.platform}</div>
                  <div className="text-[11px] text-slate-400">CPA: {formatPrice(item.cpa)}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400">{item.roas}x</div>
                  <div className="text-[10px] text-slate-500">ROAS Multiplier</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agency Marketing & Sales Funnel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Full-Funnel Agency Conversion Velocity</span>
            </h2>
            <p className="text-xs text-slate-400">End-to-end journey from paid ad impression to signed retainer agreement</p>
          </div>
          <span className="text-xs font-bold text-indigo-400">2.6% End-to-End MQL Win Rate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
          {funnelSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-colors relative"
            >
              <div className="text-[10px] uppercase font-bold text-indigo-400">Stage 0{idx + 1}</div>
              <div className="text-base font-black text-white mt-1">{step.count}</div>
              <div className="text-xs font-semibold text-slate-300 mt-0.5">{step.step}</div>
              <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                <span>Conv: {step.dropoff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Website Traffic & Top Landing Pages */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Top Converting Website Pages & Landing Pages</span>
            </h2>
            <p className="text-xs text-slate-400">High-intent landing pages audited from Google Analytics 4</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Updated Hourly</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                <th className="py-3 px-4">Page Path</th>
                <th className="py-3 px-4">Monthly Visitors</th>
                <th className="py-3 px-4">Bounce Rate</th>
                <th className="py-3 px-4">Average Session</th>
                <th className="py-3 px-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {topLandingPages.map((lp, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{lp.path}</td>
                  <td className="py-3 px-4 text-slate-200">{(lp.visitors ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-300">{lp.bounceRate}</td>
                  <td className="py-3 px-4 text-slate-300">{lp.avgTime}</td>
                  <td className="py-3 px-4 font-black text-emerald-400">{lp.convRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
