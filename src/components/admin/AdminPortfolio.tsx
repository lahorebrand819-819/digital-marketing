import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { PortfolioProject } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  Search,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPortfolio: React.FC = () => {
  const { data, updatePortfolio, createPortfolio, deletePortfolio } = useAgency();
  const projects = data?.portfolio || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [metricsInput, setMetricsInput] = useState('');

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProject({
      id: '',
      name: '',
      category: 'Advertising',
      clientIndustry: 'E-commerce',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      description: 'Scaled brand with high-converting Meta and Google ads.',
      results: '+380% ROAS & $1.2M Revenue',
      technologies: ['Meta Ads', 'Google Search', 'Klaviyo'],
      metrics: [
        { label: 'Return on Ad Spend', value: '4.8x' },
        { label: 'Monthly Revenue', value: '$240k' },
        { label: 'Conversion Lift', value: '+74%' }
      ],
      featured: true
    });
    setTechInput('Meta Ads, Google Search, Klaviyo');
    setMetricsInput('Return on Ad Spend: 4.8x\nMonthly Revenue: $240k\nConversion Lift: +74%');
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject({ ...p });
    setTechInput((p.technologies || []).join(', '));
    const formattedMetrics = (p.metrics || []).map(m => `${m.label}: ${m.value}`).join('\n');
    setMetricsInput(formattedMetrics);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.name) return;

    const techArray = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const parsedMetrics = metricsInput
      .split('\n')
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return null;
      })
      .filter(Boolean) as { label: string; value: string }[];

    const payload: Partial<PortfolioProject> = {
      ...editingProject,
      technologies: techArray,
      metrics: parsedMetrics
    };

    if (editingProject.id) {
      await updatePortfolio(editingProject.id, payload);
    } else {
      await createPortfolio(payload);
    }
    setEditingProject(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Portfolio Showcase CMS</h2>
          <p className="text-xs text-slate-400">
            Publish client case projects, upload cover screenshots directly from your device, and specify verified ROI metrics.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter portfolio by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl relative bg-slate-950">
                <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-indigo-300 border border-indigo-500/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-base font-bold text-white">{project.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {project.results && (
                <div className="mt-3 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="truncate">{project.results}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {project.clientIndustry || 'Client Project'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete project "${project.name}"?`)) {
                      deletePortfolio(project.id);
                    }
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                  title="Delete Project"
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
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingProject.id ? 'Edit Portfolio Project' : 'Create Portfolio Project'}
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                    <input
                      type="text"
                      required
                      value={editingProject.name || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Lumina Fashion Scaling"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingProject.category || 'Advertising'}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    >
                      <option value="Social Media">Social Media</option>
                      <option value="SEO">SEO</option>
                      <option value="Advertising">Advertising</option>
                      <option value="Branding">Branding</option>
                      <option value="Web Development">Web Development</option>
                      <option value="E-commerce">E-commerce</option>
                    </select>
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cover Screenshot (Upload from device or gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingProject.coverImage && (
                      <img
                        src={editingProject.coverImage}
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
                      <span>{editingProject.coverImage ? 'Change Image from Device' : 'Upload / Select Image'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Results Highlight String</label>
                  <input
                    type="text"
                    value={editingProject.results || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-bold"
                    placeholder="e.g. +420% ROAS & $1.8M Revenue in 90 Days"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Description</label>
                  <textarea
                    rows={3}
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Specific Metrics (Format: Label: Value — one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={metricsInput}
                    onChange={(e) => setMetricsInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    placeholder="Return on Ad Spend: 5.2x&#10;Monthly Revenue: $380k&#10;CAC Reduction: -44%"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tools / Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    placeholder="Meta Ads, TikTok Ads, Next.js, Shopify Plus"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="project-featured"
                    checked={editingProject.featured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-950"
                  />
                  <label htmlFor="project-featured" className="text-xs text-slate-300 cursor-pointer">
                    Feature on Homepage Showcase
                  </label>
                </div>

                {/* Footer Submit */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Project
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
          if (editingProject) {
            setEditingProject({ ...editingProject, coverImage: url });
          }
        }}
        title="Select Project Cover"
        acceptType="image"
        currentValue={editingProject?.coverImage || ''}
      />
    </div>
  );
};
