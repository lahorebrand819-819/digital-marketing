import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { ServiceItem } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import { IconResolver } from '../common/IconResolver';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  Search,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminServices: React.FC = () => {
  const { data, updateService, createService, deleteService, formatPrice } = useAgency();
  const services = data?.services || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingService({
      id: '',
      title: '',
      slug: '',
      category: 'ads',
      description: '',
      icon: 'Target',
      startingPricePKR: 150000,
      startingPriceUSD: 1000,
      startingPriceGBP: 800,
      features: ['Dedicated Media Buyer', 'Weekly Growth Calls', 'Conversion Tracking'],
      enabled: true,
      displayOrder: services.length + 1,
      image: '',
      highlightBadge: 'Popular',
      deliverableTime: '7-14 Days'
    });
    setFeaturesInput('Dedicated Media Buyer\nWeekly Growth Calls\nConversion Tracking');
  };

  const handleOpenEdit = (s: ServiceItem) => {
    setEditingService({ ...s });
    setFeaturesInput((s.features || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    const featuresArray = featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const payload: Partial<ServiceItem> = {
      ...editingService,
      slug: editingService.slug || editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      features: featuresArray
    };

    if (editingService.id) {
      await updateService(editingService.id, payload);
    } else {
      await createService(payload);
    }
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Services & Capabilities CMS</h2>
          <p className="text-xs text-slate-400">
            Control service offerings, adjust multi-currency rates (PKR/USD/GBP), and upload visual covers directly from your device.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter services by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              service.enabled
                ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                : 'bg-slate-950/60 border-slate-900 opacity-60'
            }`}
          >
            <div>
              {/* Image Preview if present */}
              {service.image && (
                <div className="h-32 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <IconResolver name={service.icon} className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold uppercase">
                    {service.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      service.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {service.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white">{service.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {service.description}
              </p>

              {/* Multi-currency pricing preview */}
              <div className="mt-4 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-0.5">
                <div className="text-slate-400 font-medium">Starting Pricing Matrix:</div>
                <div className="flex items-center justify-between text-slate-200 font-bold">
                  <span>PKR: Rs. {service.startingPricePKR.toLocaleString()}</span>
                  <span>USD: ${service.startingPriceUSD.toLocaleString()}</span>
                  <span>GBP: £{service.startingPriceGBP.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => updateService(service.id, { enabled: !service.enabled })}
                className={`text-xs font-semibold ${
                  service.enabled ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                {service.enabled ? 'Disable' : 'Enable'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${service.title}"?`)) {
                      deleteService(service.id);
                    }
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Service Modal */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingService.id ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                    <input
                      type="text"
                      required
                      value={editingService.title || ''}
                      onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. Meta & Instagram Ads"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingService.category || 'ads'}
                      onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ads">Paid Ads & PPC</option>
                      <option value="social">Social Media & TikTok</option>
                      <option value="seo">SEO & Authority</option>
                      <option value="creative">Creative & Video</option>
                      <option value="dev">Web & E-commerce</option>
                      <option value="ai">AI & Automation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Description</label>
                  <textarea
                    rows={2}
                    required
                    value={editingService.description || ''}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                    placeholder="Short description for service card..."
                  />
                </div>

                {/* Multi-Currency Starting Rates */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Multi-Currency Starting Price Controls
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">PKR (Rs.)</label>
                      <input
                        type="number"
                        value={editingService.startingPricePKR || 0}
                        onChange={(e) => setEditingService({ ...editingService, startingPricePKR: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">USD ($)</label>
                      <input
                        type="number"
                        value={editingService.startingPriceUSD || 0}
                        onChange={(e) => setEditingService({ ...editingService, startingPriceUSD: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">GBP (£)</label>
                      <input
                        type="number"
                        value={editingService.startingPriceGBP || 0}
                        onChange={(e) => setEditingService({ ...editingService, startingPriceGBP: Number(e.target.value) })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Image Upload / Gallery Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cover Image (Upload from device gallery or select from library)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingService.image && (
                      <img
                        src={editingService.image}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded-xl border border-slate-700"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2 transition-colors"
                    >
                      <ImageIcon className="w-4 h-4 text-indigo-400" />
                      <span>{editingService.image ? 'Change Device Image' : 'Choose / Upload from Device'}</span>
                    </button>
                    {editingService.image && (
                      <button
                        type="button"
                        onClick={() => setEditingService({ ...editingService, image: '' })}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Features (One per line) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deliverables & Features (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="Ad Copywriting & Creatives&#10;A/B Split Testing&#10;Dedicated Strategist"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Highlight Badge</label>
                    <input
                      type="text"
                      value={editingService.highlightBadge || ''}
                      onChange={(e) => setEditingService({ ...editingService, highlightBadge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. Most Requested, High ROI"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Delivery Timeframe</label>
                    <input
                      type="text"
                      value={editingService.deliverableTime || ''}
                      onChange={(e) => setEditingService({ ...editingService, deliverableTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. 5-7 Days or Ongoing Monthly"
                    />
                  </div>
                </div>

                {/* Enabled Toggle */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="service-enabled"
                    checked={editingService.enabled ?? true}
                    onChange={(e) => setEditingService({ ...editingService, enabled: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800"
                  />
                  <label htmlFor="service-enabled" className="text-xs text-slate-300 font-semibold cursor-pointer">
                    Enable service visible on public website
                  </label>
                </div>

                {/* Footer Save */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          if (editingService) {
            setEditingService({ ...editingService, image: url });
          }
        }}
        title="Select Service Cover"
        acceptType="image"
        currentValue={editingService?.image || ''}
      />
    </div>
  );
};
