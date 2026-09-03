import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { CampaignItem } from '../../types';
import {
  Target,
  Search,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit2,
  X,
  Filter,
  DollarSign,
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const PLATFORMS = ['All', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'SEO'];

export const AdminCampaigns: React.FC = () => {
  const { data, formatPrice, createCampaign, updateCampaign, deleteCampaign, addToast } = useAgency();
  const campaigns = data?.campaigns || [];
  const clients = data?.clients || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CampaignItem | null>(null);

  const [formData, setFormData] = useState<Partial<CampaignItem>>({
    name: '',
    client: clients[0]?.companyName || 'Sapphire Retail',
    platform: 'Meta Ads',
    status: 'active',
    budget: 250000,
    spend: 180000,
    impressions: 450000,
    clicks: 12500,
    ctr: 2.78,
    conversions: 320,
    cpa: 562,
    roas: 4.85,
    startDate: new Date().toISOString().split('T')[0]
  });

  const filteredCampaigns = campaigns.filter(c => {
    const matchesPlatform = platformFilter === 'All' || c.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const totalSpend = filteredCampaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalConversions = filteredCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const avgRoas = filteredCampaigns.length > 0
    ? (filteredCampaigns.reduce((acc, c) => acc + c.roas, 0) / filteredCampaigns.length).toFixed(2)
    : '0';

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    setFormData({
      name: '',
      client: clients[0]?.companyName || 'Sapphire Retail',
      platform: 'Meta Ads',
      status: 'active',
      budget: 250000,
      spend: 180000,
      impressions: 450000,
      clicks: 12500,
      ctr: 2.78,
      conversions: 320,
      cpa: 562,
      roas: 4.85,
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (camp: CampaignItem) => {
    setEditingCampaign(camp);
    setFormData({ ...camp });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.client) {
      addToast('Please enter Campaign Name and Client', 'error');
      return;
    }

    if (editingCampaign) {
      const success = await updateCampaign(editingCampaign.id, formData);
      if (success) setIsModalOpen(false);
    } else {
      const success = await createCampaign(formData);
      if (success) setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete campaign "${name}"?`)) {
      await deleteCampaign(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Campaign Performance Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {campaigns.length} Ad Sets
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-platform ad spend, ROAS, conversions, CTR, and CPA monitoring across Meta, Google & TikTok.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Filtered Spend</div>
          <div className="text-xl font-black text-white mt-1">{formatPrice(totalSpend)}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Conversions / Leads</div>
          <div className="text-xl font-black text-indigo-400 mt-1">{totalConversions}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">Average Attributed ROAS</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{avgRoas}x</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">Active Live Ad Sets</div>
          <div className="text-xl font-black text-purple-400 mt-1">
            {campaigns.filter(c => c.status === 'active').length}
          </div>
        </div>
      </div>

      {/* Search & Platform Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaign name or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PLATFORMS.map((plat) => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                platformFilter === plat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                <th className="py-3.5 px-4">Campaign Name & Client</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Budget / Spend</th>
                <th className="py-3.5 px-4">Impressions / Clicks</th>
                <th className="py-3.5 px-4">CTR</th>
                <th className="py-3.5 px-4">Conversions</th>
                <th className="py-3.5 px-4">CPA</th>
                <th className="py-3.5 px-4">ROAS</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCampaigns.map((camp) => {
                return (
                  <tr key={camp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{camp.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{camp.client}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                        {camp.platform}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{formatPrice(camp.spend)}</div>
                      <div className="text-[10px] text-slate-500">of {formatPrice(camp.budget)}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{camp.impressions ? (camp.impressions / 1000).toFixed(1) : '0'}k imp</div>
                      <div className="text-[10px] text-indigo-400">{(camp.clicks ?? 0).toLocaleString()} clicks</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">{camp.ctr}%</td>
                    <td className="py-3.5 px-4 font-black text-white">{camp.conversions}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-300">{formatPrice(camp.cpa)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {camp.roas}x
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        camp.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : camp.status === 'paused'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {camp.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            const newStatus = camp.status === 'active' ? 'paused' : 'active';
                            updateCampaign(camp.id, { status: newStatus as any });
                          }}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                          title={camp.status === 'active' ? 'Pause' : 'Activate'}
                        >
                          {camp.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(camp)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(camp.id, camp.name)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create / Edit Campaign */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingCampaign ? 'Edit Campaign Set' : 'Launch New Campaign'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sapphire - Eid Festive Collection Meta Scale"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Client *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Sapphire Apparel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Meta Ads">Meta Ads (FB/IG)</option>
                    <option value="Google Ads">Google Ads PPC</option>
                    <option value="TikTok Ads">TikTok Ads</option>
                    <option value="LinkedIn Ads">LinkedIn B2B</option>
                    <option value="SEO">SEO Organic Campaign</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Monthly Budget</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Current Spend</label>
                  <input
                    type="number"
                    value={formData.spend}
                    onChange={(e) => setFormData({ ...formData, spend: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Conversions</label>
                  <input
                    type="number"
                    value={formData.conversions}
                    onChange={(e) => setFormData({ ...formData, conversions: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">ROAS (e.g. 4.5)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.roas}
                    onChange={(e) => setFormData({ ...formData, roas: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">CPA</label>
                  <input
                    type="number"
                    value={formData.cpa}
                    onChange={(e) => setFormData({ ...formData, cpa: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

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
                  {editingCampaign ? 'Save Changes' : 'Save Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
