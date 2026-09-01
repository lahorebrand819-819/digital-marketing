import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { PricingPackage } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Crown,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPricing: React.FC = () => {
  const { data, updatePricingPackage, createPricingPackage, deletePricingPackage } = useAgency();
  const packages = data?.pricingPackages || [];

  const [editingPackage, setEditingPackage] = useState<Partial<PricingPackage> | null>(null);
  const [featuresInput, setFeaturesInput] = useState('');

  const handleOpenAdd = () => {
    setEditingPackage({
      id: '',
      name: '',
      tag: 'Scale Fast',
      description: 'Ideal for scaling brands needing dedicated omnichannel growth execution.',
      pricePKR: 250000,
      priceUSD: 1800,
      priceGBP: 1400,
      billingPeriod: 'monthly',
      features: [
        'Dedicated Media Buyer & Strategist',
        'Up to $25k Monthly Ad Spend Managed',
        'Weekly Video Ads & Creative Iterations',
        'Real-Time KPI Dashboard'
      ],
      isPopular: false,
      ctaText: 'Choose Plan',
      enabled: true,
      displayOrder: packages.length + 1
    });
    setFeaturesInput(
      'Dedicated Media Buyer & Strategist\nUp to $25k Monthly Ad Spend Managed\nWeekly Video Ads & Creative Iterations\nReal-Time KPI Dashboard'
    );
  };

  const handleOpenEdit = (pkg: PricingPackage) => {
    setEditingPackage({ ...pkg });
    setFeaturesInput((pkg.features || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage || !editingPackage.name) return;

    const featuresArray = featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload: Partial<PricingPackage> = {
      ...editingPackage,
      features: featuresArray
    };

    if (editingPackage.id) {
      await updatePricingPackage(editingPackage.id, payload);
    } else {
      await createPricingPackage(payload);
    }
    setEditingPackage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Multi-Currency Pricing CMS</h2>
          <p className="text-xs text-slate-400">
            Configure rates in PKR, USD, and GBP for each package tier. No pricing is hardcoded.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Pricing Package</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
              pkg.isPopular
                ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-extrabold text-white">{pkg.name}</span>
                {pkg.isPopular && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Popular
                  </span>
                )}
              </div>

              {pkg.tag && <div className="text-xs text-indigo-400 font-semibold mb-2">{pkg.tag}</div>}

              {/* Multi-currency pricing preview */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1 mb-4">
                <div className="text-slate-400 font-medium">Configured Rates:</div>
                <div className="text-emerald-400 font-bold text-sm">
                  PKR: Rs. {pkg.pricePKR.toLocaleString()}
                </div>
                <div className="text-indigo-400 font-bold text-sm">
                  USD: ${pkg.priceUSD.toLocaleString()}
                </div>
                <div className="text-purple-400 font-bold text-sm">
                  GBP: £{pkg.priceGBP.toLocaleString()}
                </div>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed font-normal">
                {pkg.description}
              </p>

              {/* Features list */}
              <div className="space-y-1.5 mb-4">
                {pkg.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => updatePricingPackage(pkg.id, { enabled: !pkg.enabled })}
                className={`text-xs font-semibold ${
                  pkg.enabled ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                {pkg.enabled ? 'Visible' : 'Hidden'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                  title="Edit Package"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete package "${pkg.name}"?`)) {
                      deletePricingPackage(pkg.id);
                    }
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                  title="Delete Package"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {editingPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingPackage.id ? 'Edit Pricing Package' : 'Create Pricing Package'}
                </h3>
                <button
                  onClick={() => setEditingPackage(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Package Name</label>
                    <input
                      type="text"
                      required
                      value={editingPackage.name || ''}
                      onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Growth Acceleration"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Sub-Tag</label>
                    <input
                      type="text"
                      value={editingPackage.tag || ''}
                      onChange={(e) => setEditingPackage({ ...editingPackage, tag: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Best For E-com Brands"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingPackage.description || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                {/* 3 Currency Rates */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Package Rates by Currency
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">PKR (Rs.)</label>
                      <input
                        type="number"
                        required
                        value={editingPackage.pricePKR || 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, pricePKR: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">USD ($)</label>
                      <input
                        type="number"
                        required
                        value={editingPackage.priceUSD || 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, priceUSD: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">GBP (£)</label>
                      <input
                        type="number"
                        required
                        value={editingPackage.priceGBP || 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, priceGBP: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deliverables (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPackage.isPopular || false}
                      onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950"
                    />
                    <span>Highlight as "Most Popular" Plan</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPackage.enabled ?? true}
                      onChange={(e) => setEditingPackage({ ...editingPackage, enabled: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 bg-slate-950"
                    />
                    <span>Visible on Website</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPackage(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Package
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
