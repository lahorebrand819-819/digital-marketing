import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  Building2,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Share2
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { data, formatPrice } = useAgency();
  const clients = data?.clients || [];
  const campaigns = data?.campaigns || [];

  const [selectedClient, setSelectedClient] = useState(clients[0]?.companyName || 'Sapphire Retail');
  const [reportPeriod, setReportPeriod] = useState('Current Month (September 2026)');

  const clientObj = clients.find(c => c.companyName === selectedClient) || clients[0];
  const clientCampaigns = campaigns.filter(c => c.client === selectedClient);
  const clientSpend = clientCampaigns.reduce((acc, c) => acc + c.spend, 0);
  const clientConversions = clientCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const clientROAS = clientCampaigns.length > 0
    ? (clientCampaigns.reduce((acc, c) => acc + c.roas, 0) / clientCampaigns.length).toFixed(2)
    : '4.2';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Executive Client Reports Generator</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Print & PDF Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate polished executive performance summaries for C-level clients with key KPIs, victories, and strategy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-4 print:hidden">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 shrink-0">Client:</span>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
          >
            {clients.map(c => (
              <option key={c.id} value={c.companyName}>{c.companyName}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-400 shrink-0">Reporting Period:</span>
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-bold"
          >
            <option value="Current Month (September 2026)">September 2026 (Monthly)</option>
            <option value="Q3 2026 (Quarterly Performance)">Q3 2026 (Quarterly Review)</option>
            <option value="August 2026 (Past Month)">August 2026</option>
          </select>
        </div>
      </div>

      {/* PRINTABLE REPORT DOCUMENT */}
      <div className="bg-slate-900 print:bg-white border border-slate-800 print:border-none rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 print:text-black print:p-0">
        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-widest text-indigo-400 print:text-indigo-600">
              TELCA MARKETING • PERFORMANCE BRIEF
            </div>
            <h2 className="text-3xl font-black text-white print:text-slate-900">
              {selectedClient}
            </h2>
            <div className="text-sm text-slate-400 print:text-slate-600 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>{reportPeriod}</span>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-xs text-slate-400 print:text-slate-600">Prepared by:</div>
            <div className="text-sm font-bold text-white print:text-slate-900">Telca Performance Team</div>
            <div className="text-xs text-slate-500">Account Lead: {clientObj?.accountManager || 'Hamza Tariq'}</div>
          </div>
        </div>

        {/* Executive Summary Metrics Quad */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">Total Ad Spend</div>
            <div className="text-2xl font-black text-white print:text-slate-900 mt-1">
              {formatPrice(clientSpend > 0 ? clientSpend : 380000)}
            </div>
            <div className="text-[11px] text-emerald-400 print:text-emerald-600 font-semibold mt-0.5">100% On Target</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">Sales / Inquiries Generated</div>
            <div className="text-2xl font-black text-indigo-400 print:text-indigo-600 mt-1">
              {clientConversions > 0 ? clientConversions : 460}
            </div>
            <div className="text-[11px] text-slate-400 print:text-slate-600 font-medium mt-0.5">+24% vs. Prior Month</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">Average ROAS Multiplier</div>
            <div className="text-2xl font-black text-emerald-400 print:text-emerald-600 mt-1">
              {clientROAS}x
            </div>
            <div className="text-[11px] text-emerald-400 print:text-emerald-600 font-medium mt-0.5">High Efficiency</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">Blended CPA</div>
            <div className="text-2xl font-black text-purple-400 print:text-purple-600 mt-1">
              {formatPrice(720)}
            </div>
            <div className="text-[11px] text-slate-400 print:text-slate-600 font-medium mt-0.5">-12% acquisition cost</div>
          </div>
        </div>

        {/* Section 1: Wins This Month */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white print:text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Wins & Milestones Achieved This Month</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-1">
              <div className="text-xs font-bold text-emerald-400 print:text-emerald-700">Scaling High-Performing UGC Video Sets</div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Scaled 3 top video hooks on TikTok & Meta resulting in a 34% decrease in CPA while maintaining over 4.5x ROAS.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-1">
              <div className="text-xs font-bold text-emerald-400 print:text-emerald-700">Checkout Funnel Optimization</div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Implemented 1-click WhatsApp order confirmation and mobile speed boosts, lifting cart completion rate by 18%.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-1">
              <div className="text-xs font-bold text-emerald-400 print:text-emerald-700">Search Engine Domination</div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
                Achieved top 3 rankings on Google for 14 commercial search keywords, driving organic high-intent inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Areas of Optimization & Insights */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white print:text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Areas of Observation & Optimization</span>
          </h3>
          <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-2 text-xs text-slate-300 print:text-slate-700">
            <p>
              • <strong>Weekend Ad Fatigue:</strong> Saturday and Sunday frequency saturated faster on Meta feed placements. We are adjusting delivery dayparting to concentrate ad spend from Tuesday through Friday where conversions peak.
            </p>
            <p>
              • <strong>Creative Refresh Velocity:</strong> Dynamic catalog ads generated high volume but lower average order value than carousel collections. We are producing 10 new catalog hooks for next cycle.
            </p>
          </div>
        </div>

        {/* Section 3: Next Month Strategic Action Plan */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white print:text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Strategic Growth Roadmap for Next Month</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-white print:text-slate-900">1. Launch Lookalike Tier 1 Scaling</div>
              <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
                Expand seed audiences using top 5% Lifetime Value purchasers and repeat customers to unlock higher top-of-funnel reach.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-white print:text-slate-900">2. WhatsApp Automated Abandoned Cart Recovery</div>
              <p className="text-xs text-slate-400 print:text-slate-600 leading-relaxed">
                Deploy conversational recovery sequences within 15 minutes of checkout drop-off, projected to recapture 15-20% of lost revenue.
              </p>
            </div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
          <span>Telca Marketing Agency • Confidential Client Report</span>
          <span>support@telcamarketing.com • +92 300 0000000</span>
        </div>
      </div>
    </div>
  );
};
