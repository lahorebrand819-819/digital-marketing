import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { TestimonialItem } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Image as ImageIcon,
  X,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminTestimonials: React.FC = () => {
  const { data, updateTestimonial, createTestimonial, deleteTestimonial } = useAgency();
  const testimonials = data?.testimonials || [];

  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingItem({
      id: '',
      clientName: '',
      company: '',
      role: 'Founder & CEO',
      review: 'Digital Growth Agency completely transformed our customer acquisition economics.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      resultMetric: '+320% Revenue'
    });
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingItem({ ...t });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.clientName) return;

    if (editingItem.id) {
      await updateTestimonial(editingItem.id, editingItem);
    } else {
      await createTestimonial(editingItem);
    }
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Client Reviews & Testimonials CMS</h2>
          <p className="text-xs text-slate-400">
            Publish social proof, verified 5-star ratings, client avatars, and verified ROI badges.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                {t.resultMetric && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400">
                    {t.resultMetric}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 italic font-normal line-clamp-3 leading-relaxed">
                "{t.review}"
              </p>

              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.clientName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                  <div className="text-[10px] text-slate-400">{t.role} • {t.company}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(t)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete review from ${t.clientName}?`)) {
                    deleteTestimonial(t.id);
                  }
                }}
                className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingItem.id ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setEditingItem(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={editingItem.clientName || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={editingItem.company || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                    <input
                      type="text"
                      value={editingItem.role || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Result Metric Badge</label>
                    <input
                      type="text"
                      value={editingItem.resultMetric || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, resultMetric: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-bold"
                      placeholder="e.g. +380% ROAS"
                    />
                  </div>
                </div>

                {/* Avatar upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Client Avatar (Upload from device gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingItem.avatar && (
                      <img
                        src={editingItem.avatar}
                        alt="Preview"
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4 text-indigo-400" />
                      <span>{editingItem.avatar ? 'Change Avatar' : 'Upload Avatar'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Review Text</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.review || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, review: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Review
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
          if (editingItem) {
            setEditingItem({ ...editingItem, avatar: url });
          }
        }}
        title="Select Client Avatar"
        acceptType="image"
        currentValue={editingItem?.avatar || ''}
      />
    </div>
  );
};
