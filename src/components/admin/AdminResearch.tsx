import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { CompetitorAnalysis, MarketTrend, KeywordResearch } from '../../types';
import {
  Compass,
  Search,
  Plus,
  TrendingUp,
  ShieldAlert,
  Key,
  Globe,
  Trash2,
  X,
  ExternalLink,
  DollarSign,
  BarChart2,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const AdminResearch: React.FC = () => {
  const { data, createResearchItem, deleteResearchItem, addToast } = useAgency();

  const competitors: CompetitorAnalysis[] = data?.research?.competitors || [];
  const trends: MarketTrend[] = data?.research?.trends || [];
  const keywords: KeywordResearch[] = data?.research?.keywords || [];

  const [activeSubTab, setActiveSubTab] = useState<'competitors' | 'trends' | 'keywords'>('competitors');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Competitor Form
  const [compForm, setCompForm] = useState<Partial<CompetitorAnalysis>>({
    name: '',
    website: '',
    strengths: ['Strong brand recall', 'High video output'],
    weaknesses: ['Slow website speed', 'Low TikTok ad presence'],
    estimatedSpend: 'Rs. 400,000 - 800,000 / mo',
    traffic: '65,000 monthly',
    socialChannels: ['Instagram', 'Facebook', 'LinkedIn']
  });

  // New Trend Form
  const [trendForm, setTrendForm] = useState<Partial<MarketTrend>>({
    trendName: '',
    industry: 'E-Commerce & Retail',
    impact: 'high',
    recommendation: ''
  });

  // New Keyword Form
  const [keywordForm, setKeywordForm] = useState<Partial<KeywordResearch>>({
    keyword: '',
    searchVolume: '4,500 / mo',
    difficulty: 'Medium (38/100)',
    intent: 'Transactional',
    action: ''
  });

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubTab === 'competitors') {
      if (!compForm.name) return addToast('Competitor name required', 'error');
      await createResearchItem('competitors', compForm);
    } else if (activeSubTab === 'trends') {
      if (!trendForm.trendName) return addToast('Trend name required', 'error');
      await createResearchItem('trends', trendForm);
    } else {
      if (!keywordForm.keyword) return addToast('Keyword required', 'error');
      await createResearchItem('keywords', keywordForm);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Market Intelligence & Research Hub</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Agency Intelligence
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real competitive intelligence, consumer trend radars, and high-ROI transactional search keywords for clients.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>
            {activeSubTab === 'competitors' ? 'Add Competitor' : activeSubTab === 'trends' ? 'Add Trend' : 'Add Target Keyword'}
          </span>
        </button>
      </div>

      {/* Sub Tabs Selector */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveSubTab('competitors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'competitors' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Competitor Intelligence ({competitors.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('trends')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'trends' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Market Trends Radar ({trends.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('keywords')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'keywords' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Transactional Keywords ({keywords.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: COMPETITORS */}
      {activeSubTab === 'competitors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {competitors.map((comp) => (
            <div key={comp.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-black text-white">{comp.name}</h3>
                    <a
                      href={`https://${comp.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{comp.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${comp.name}?`)) deleteResearchItem('competitors', comp.id);
                    }}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Est. Ad Spend</span>
                    <div className="font-bold text-emerald-400 mt-0.5">{comp.estimatedSpend}</div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Est. Traffic</span>
                    <div className="font-bold text-white mt-0.5">{comp.traffic}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Strengths:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {comp.strengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-rose-400">Weaknesses / Gaps:</span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                    {comp.weaknesses.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                {comp.socialChannels.map((sc, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-slate-300">
                    {sc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: MARKET TRENDS */}
      {activeSubTab === 'trends' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trends.map((tr) => (
            <div key={tr.id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    {tr.industry}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{tr.trendName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                    tr.impact === 'critical'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {tr.impact.toUpperCase()} IMPACT
                  </span>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this trend?')) deleteResearchItem('trends', tr.id);
                    }}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Agency Actionable Strategy:</span>
                <p className="leading-relaxed">{tr.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: KEYWORD RESEARCH */}
      {activeSubTab === 'keywords' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                  <th className="py-3.5 px-4">Target Search Keyword</th>
                  <th className="py-3.5 px-4">Search Volume</th>
                  <th className="py-3.5 px-4">Ranking Difficulty</th>
                  <th className="py-3.5 px-4">Search Intent</th>
                  <th className="py-3.5 px-4">Recommended Campaign Action</th>
                  <th className="py-3.5 px-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {keywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white text-sm">{kw.keyword}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">{kw.searchVolume}</td>
                    <td className="py-3.5 px-4 text-slate-300">{kw.difficulty}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {kw.intent}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-sm">{kw.action}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${kw.keyword}?`)) deleteResearchItem('keywords', kw.id);
                        }}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Create Research Record */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white capitalize">
                Add {activeSubTab === 'competitors' ? 'Competitor Profile' : activeSubTab === 'trends' ? 'Market Trend' : 'Keyword'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-3.5 text-xs">
              {activeSubTab === 'competitors' && (
                <>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Competitor Name *</label>
                    <input
                      type="text"
                      required
                      value={compForm.name}
                      onChange={(e) => setCompForm({ ...compForm, name: e.target.value })}
                      placeholder="e.g. Rival Digital Agency"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Website URL</label>
                    <input
                      type="text"
                      value={compForm.website}
                      onChange={(e) => setCompForm({ ...compForm, website: e.target.value })}
                      placeholder="rivalagency.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Estimated Monthly Ad Spend</label>
                    <input
                      type="text"
                      value={compForm.estimatedSpend}
                      onChange={(e) => setCompForm({ ...compForm, estimatedSpend: e.target.value })}
                      placeholder="Rs. 500,000 / mo"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Monthly Traffic</label>
                    <input
                      type="text"
                      value={compForm.traffic}
                      onChange={(e) => setCompForm({ ...compForm, traffic: e.target.value })}
                      placeholder="40,000 visits"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                </>
              )}

              {activeSubTab === 'trends' && (
                <>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Trend Name *</label>
                    <input
                      type="text"
                      required
                      value={trendForm.trendName}
                      onChange={(e) => setTrendForm({ ...trendForm, trendName: e.target.value })}
                      placeholder="e.g. TikTok Live Commerce Shopping"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Industry</label>
                    <input
                      type="text"
                      value={trendForm.industry}
                      onChange={(e) => setTrendForm({ ...trendForm, industry: e.target.value })}
                      placeholder="e.g. Fashion & Retail"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Impact Level</label>
                    <select
                      value={trendForm.impact}
                      onChange={(e) => setTrendForm({ ...trendForm, impact: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Actionable Recommendation</label>
                    <textarea
                      rows={3}
                      value={trendForm.recommendation}
                      onChange={(e) => setTrendForm({ ...trendForm, recommendation: e.target.value })}
                      placeholder="Strategy for agency clients..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                    />
                  </div>
                </>
              )}

              {activeSubTab === 'keywords' && (
                <>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Target Keyword *</label>
                    <input
                      type="text"
                      required
                      value={keywordForm.keyword}
                      onChange={(e) => setKeywordForm({ ...keywordForm, keyword: e.target.value })}
                      placeholder="e.g. buy lawn dresses online"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Search Volume</label>
                    <input
                      type="text"
                      value={keywordForm.searchVolume}
                      onChange={(e) => setKeywordForm({ ...keywordForm, searchVolume: e.target.value })}
                      placeholder="12,000 / mo"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Intent</label>
                    <select
                      value={keywordForm.intent}
                      onChange={(e) => setKeywordForm({ ...keywordForm, intent: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                    >
                      <option value="Transactional">Transactional (Ready to Buy)</option>
                      <option value="Commercial">Commercial (Investigating)</option>
                      <option value="Informational">Informational (Browsing)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Recommended Action</label>
                    <textarea
                      rows={2}
                      value={keywordForm.action}
                      onChange={(e) => setKeywordForm({ ...keywordForm, action: e.target.value })}
                      placeholder="Target in Google Search PPC..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
