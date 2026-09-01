import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { CaseStudyItem } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  X,
  Target,
  Zap,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminCaseStudies: React.FC = () => {
  const { data, updateCaseStudy, createCaseStudy, deleteCaseStudy } = useAgency();
  const caseStudies = data?.caseStudies || [];

  const [editingCase, setEditingCase] = useState<Partial<CaseStudyItem> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [metricsInput, setMetricsInput] = useState('');

  const handleOpenAdd = () => {
    setEditingCase({
      id: '',
      title: '',
      client: '',
      industry: 'E-commerce & Apparel',
      duration: '4 Months',
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
      challenge: 'High customer acquisition cost and stagnant Facebook ad ROAS.',
      strategy: 'Restructured catalog into high-intent dynamic funnels and deployed UGC video hooks.',
      solution: 'Re-allocated budget to TikTok Spark Ads and automated WhatsApp retention workflows.',
      results: '+380% ROAS and $1.4M in incremental revenue.',
      metrics: [
        { label: 'Monthly Revenue', value: '$340,000', before: '$65,000', after: '$340,000' },
        { label: 'Blended ROAS', value: '4.9x', before: '1.4x', after: '4.9x' },
        { label: 'Customer Acquisition Cost', value: '$18.50', before: '$46.00', after: '$18.50' }
      ],
      testimonial: {
        quote: 'Working with Digital Growth Agency was the best decision for our balance sheet.',
        author: 'Sarah Jenkins',
        role: 'Chief Marketing Officer'
      }
    });
    setMetricsInput('Monthly Revenue: $340,000 | Before: $65,000 | After: $340,000\nBlended ROAS: 4.9x | Before: 1.4x | After: 4.9x\nCAC: $18.50 | Before: $46.00 | After: $18.50');
  };

  const handleOpenEdit = (item: CaseStudyItem) => {
    setEditingCase({ ...item });
    const formatted = (item.metrics || [])
      .map(m => `${m.label}: ${m.value} | Before: ${m.before || ''} | After: ${m.after || ''}`)
      .join('\n');
    setMetricsInput(formatted);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase || !editingCase.title) return;

    const parsedMetrics = metricsInput
      .split('\n')
      .map(line => {
        const parts = line.split('|');
        const mainPart = parts[0]?.split(':');
        if (mainPart && mainPart.length >= 2) {
          const label = mainPart[0].trim();
          const value = mainPart[1].trim();
          const beforePart = parts[1]?.split(':')?.[1]?.trim() || '';
          const afterPart = parts[2]?.split(':')?.[1]?.trim() || '';
          return { label, value, before: beforePart, after: afterPart };
        }
        return null;
      })
      .filter(Boolean) as CaseStudyItem['metrics'];

    const payload: Partial<CaseStudyItem> = {
      ...editingCase,
      metrics: parsedMetrics
    };

    if (editingCase.id) {
      await updateCaseStudy(editingCase.id, payload);
    } else {
      await createCaseStudy(payload);
    }
    setEditingCase(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">In-Depth Case Studies CMS</h2>
          <p className="text-xs text-slate-400">
            Publish comprehensive growth breakdowns with Challenge, Strategy, Execution, and Before/After metrics.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Case Study</span>
        </button>
      </div>

      {/* Grid of Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl relative bg-slate-950">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-indigo-300 border border-indigo-500/30">
                  {item.industry}
                </span>
              </div>

              <div className="text-xs text-slate-400">Client: <strong className="text-white">{item.client}</strong> • {item.duration}</div>
              <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
              <p className="text-xs text-emerald-400 font-semibold mt-2">{item.results}</p>

              <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="text-red-400 font-medium">Challenge: <span className="text-slate-300 font-normal line-clamp-1">{item.challenge}</span></div>
                <div className="text-amber-400 font-medium">Strategy: <span className="text-slate-300 font-normal line-clamp-1">{item.strategy}</span></div>
                <div className="text-emerald-400 font-medium">Solution: <span className="text-slate-300 font-normal line-clamp-1">{item.solution}</span></div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete case study "${item.title}"?`)) {
                    deleteCaseStudy(item.id);
                  }
                }}
                className="p-2 bg-slate-800 hover:bg-red-950 text-red-400 rounded-xl"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingCase.id ? 'Edit Case Study' : 'Create Case Study'}
                </h3>
                <button onClick={() => setEditingCase(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Case Study Headline</label>
                    <input
                      type="text"
                      required
                      value={editingCase.title || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Scaling Aura Luxe from $30k to $380k/mo"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={editingCase.client || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, client: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                    <input
                      type="text"
                      value={editingCase.industry || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Duration / Timeframe</label>
                    <input
                      type="text"
                      value={editingCase.duration || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, duration: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Media Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cover Screenshot (Upload from device gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingCase.coverImage && (
                      <img
                        src={editingCase.coverImage}
                        alt="Preview"
                        className="w-20 h-14 object-cover rounded-xl border border-slate-700"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4 text-indigo-400" />
                      <span>{editingCase.coverImage ? 'Change Image from Device' : 'Upload from Device'}</span>
                    </button>
                  </div>
                </div>

                {/* 3 Step Breakdown */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-red-400 mb-1">The Challenge</label>
                    <textarea
                      rows={2}
                      value={editingCase.challenge || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, challenge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-1">Growth Strategy</label>
                    <textarea
                      rows={2}
                      value={editingCase.strategy || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, strategy: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">Solution & Execution</label>
                    <textarea
                      rows={2}
                      value={editingCase.solution || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, solution: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Before vs After Metrics (Format: Label: Value | Before: $X | After: $Y)
                  </label>
                  <textarea
                    rows={3}
                    value={metricsInput}
                    onChange={(e) => setMetricsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingCase(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Case Study
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          if (editingCase) {
            setEditingCase({ ...editingCase, coverImage: url });
          }
        }}
        title="Select Case Study Image"
        acceptType="image"
        currentValue={editingCase?.coverImage || ''}
      />
    </div>
  );
};
