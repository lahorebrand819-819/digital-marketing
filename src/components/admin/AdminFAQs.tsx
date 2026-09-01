import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { FAQItem } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  HelpCircle,
  X,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminFAQs: React.FC = () => {
  const { data, updateFAQ, createFAQ, deleteFAQ } = useAgency();
  const faqs = data?.faqs || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQItem> | null>(null);

  const filteredFAQs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingFAQ({
      id: '',
      question: '',
      answer: '',
      category: 'General'
    });
  };

  const handleOpenEdit = (f: FAQItem) => {
    setEditingFAQ({ ...f });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFAQ || !editingFAQ.question) return;

    if (editingFAQ.id) {
      await updateFAQ(editingFAQ.id, editingFAQ);
    } else {
      await createFAQ(editingFAQ);
    }
    setEditingFAQ(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Frequently Asked Questions CMS</h2>
          <p className="text-xs text-slate-400">
            Manage objection-handling FAQs, contract terms, billing questions, and onboarding details.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Question</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400">[{faq.category || 'General'}]</span>
                <h4 className="text-sm font-bold text-white">{faq.question}</h4>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete question?`)) {
                    deleteFAQ(faq.id);
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
        {editingFAQ && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingFAQ.id ? 'Edit Question' : 'Add FAQ Question'}
                </h3>
                <button onClick={() => setEditingFAQ(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingFAQ.category || 'General'}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    placeholder="e.g. General, Pricing, Contracts"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Question</label>
                  <input
                    type="text"
                    required
                    value={editingFAQ.question || ''}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Answer</label>
                  <textarea
                    rows={4}
                    required
                    value={editingFAQ.answer || ''}
                    onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingFAQ(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save FAQ
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
