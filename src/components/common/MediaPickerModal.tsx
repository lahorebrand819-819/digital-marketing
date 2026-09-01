import React, { useState, useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { MediaItem } from '../../types';
import { Upload, Image as ImageIcon, Video, Check, Search, X, Trash2, Loader2, Sparkles, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
  acceptType?: 'image' | 'video' | 'all';
  currentValue?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = 'Select Media',
  acceptType = 'all',
  currentValue = ''
}) => {
  const { data, uploadMediaFile, deleteMedia } = useAgency();
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'presets'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string>(currentValue);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset stock images high quality
  const presetImages = [
    { name: 'Modern Analytics Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80', category: 'Analytics' },
    { name: 'Luxury Fashion & Apparel', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80', category: 'E-commerce' },
    { name: 'Social Media & Influencer', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80', category: 'Social' },
    { name: 'SEO & Growth Strategy', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', category: 'SEO' },
    { name: 'AI & Machine Learning Hub', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000&auto=format&fit=crop&q=80', category: 'AI' },
    { name: 'Creative Studio & Camera', url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80', category: 'Video' },
    { name: 'Executive Strategy Team', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80', category: 'Team' },
    { name: 'High-Converting Web UI', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80', category: 'Web' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadAndSelect = async () => {
    if (!previewFile) return;
    setIsUploading(true);
    const result = await uploadMediaFile(previewFile);
    setIsUploading(false);
    if (result.success && result.media) {
      onSelect(result.media.url);
      onClose();
    }
  };

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };

  const mediaLibrary = data?.media || [];
  const filteredLibrary = mediaLibrary.filter(m => {
    const matchesSearch = m.originalname.toLowerCase().includes(searchQuery.toLowerCase());
    if (acceptType === 'image') return matchesSearch && m.type === 'image';
    if (acceptType === 'video') return matchesSearch && m.type === 'video';
    return matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">{title}</h3>
              <p className="text-xs text-slate-400">Upload directly from device gallery or choose from library</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/40">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'upload'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload From Device</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'library'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media Library ({mediaLibrary.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'presets'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Studio Stock Assets</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="flex flex-col items-center justify-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptType === 'video' ? 'video/mp4,video/webm' : acceptType === 'image' ? 'image/jpeg,image/png,image/webp,image/avif,image/svg+xml' : 'image/*,video/*'}
                onChange={handleFileChange}
                className="hidden"
                id="media-device-file-input"
              />

              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-700 hover:border-indigo-500/80 bg-slate-950/50 hover:bg-slate-950/80 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-200 mb-1">Click to open Gallery or File Picker</h4>
                  <p className="text-xs text-slate-400 text-center max-w-sm mb-3">
                    Supports JPG, PNG, WebP, AVIF, SVG or MP4 / WebM videos up to 30MB.
                  </p>
                  <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30">
                    Browse Device Storage
                  </span>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center gap-4">
                  <div className="relative w-full max-h-64 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                    {previewFile?.type.startsWith('video/') ? (
                      <video src={previewUrl} controls className="max-h-64 rounded-xl w-auto" />
                    ) : (
                      <img src={previewUrl} alt="Preview" className="max-h-64 object-contain rounded-xl" />
                    )}
                    <button
                      onClick={() => {
                        setPreviewFile(null);
                        setPreviewUrl('');
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-slate-900/80 text-red-400 hover:text-red-300 rounded-lg backdrop-blur-md border border-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-full flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <div className="truncate max-w-xs font-medium">{previewFile?.name}</div>
                    <div className="text-slate-500">{((previewFile?.size || 0) / 1024 / 1024).toFixed(2)} MB</div>
                  </div>

                  <div className="flex items-center gap-3 w-full">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Choose Different File
                    </button>
                    <button
                      onClick={handleUploadAndSelect}
                      disabled={isUploading}
                      className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading & Applying...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Upload & Select</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MEDIA LIBRARY */}
          {activeTab === 'library' && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search uploaded media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {filteredLibrary.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-medium">No media items found</p>
                  <p className="text-xs text-slate-500 mt-1">Upload a new photo or video from the Upload tab.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredLibrary.map((item) => {
                    const isSelected = selectedUrl === item.url;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedUrl(item.url)}
                        className={`relative group rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-video bg-slate-950 ${
                          isSelected
                            ? 'border-indigo-500 shadow-md shadow-indigo-500/20'
                            : 'border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-slate-900">
                            <Video className="w-8 h-8 text-indigo-400" />
                          </div>
                        ) : (
                          <img src={item.url} alt={item.originalname} className="w-full h-full object-cover" />
                        )}

                        {isSelected && (
                          <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                              <Check className="w-4 h-4" />
                            </div>
                          </div>
                        )}

                        <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                          <span className="text-[10px] text-white truncate max-w-[120px]">{item.originalname}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMedia(item.id);
                            }}
                            className="p-1 text-red-400 hover:text-red-300 rounded"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STUDIO PRESETS */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presetImages.map((preset, idx) => {
                const isSelected = selectedUrl === preset.url;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedUrl(preset.url)}
                    className={`relative group rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-video bg-slate-950 ${
                      isSelected
                        ? 'border-indigo-500 shadow-md shadow-indigo-500/20'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                      <span className="text-[11px] font-semibold text-white block leading-tight">{preset.name}</span>
                      <span className="text-[9px] text-indigo-400 font-medium">{preset.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400 truncate max-w-sm">
            {selectedUrl ? (
              <span className="text-indigo-400 font-medium">Selected: {selectedUrl.substring(0, 45)}...</span>
            ) : (
              <span>Select an image or video to continue</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedUrl}
              className="py-2 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Apply Selection
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
