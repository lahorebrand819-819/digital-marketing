import React, { useState, useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Search,
  Image as ImageIcon,
  Film,
  FileText,
  Loader2,
  FolderOpen,
  Filter
} from 'lucide-react';

export const AdminMediaLibrary: React.FC = () => {
  const { data, uploadMediaFile, deleteMediaItem, showToast } = useAgency();
  const mediaList = data?.media || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = mediaList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await uploadMediaFile(file);
      if (!result.success) {
        showToast('Upload error: ' + (result.error || 'Failed'), 'error');
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    showToast('Direct media URL copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Media Library & Device Uploader</h2>
          <p className="text-xs text-slate-400">
            Upload files directly from your computer, phone gallery, or storage. No manual URL pasting required.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            multiple
            accept="image/*,video/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading From Device...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Select & Upload from Device</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Drag & Drop Hero Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        className="p-8 rounded-3xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/50 hover:bg-slate-900 cursor-pointer transition-all text-center space-y-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">
            Click to browse your device or drag and drop files here
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Supports PNG, JPG, WEBP, SVG, GIF, MP4, WEBM (Max 50MB per file)
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {(['all', 'image', 'video'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                filterType === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Files */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl text-slate-500 text-xs">
          No media files found. Upload your first image or video from your device above.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedia.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="group p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-950 mb-2 relative">
                    {item.type === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                    )}
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-950/80 text-indigo-300">
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-white truncate" title={item.name}>
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{item.size || 'Optimized'}</div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyLink(item.url, item.id)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Copy direct link"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${item.name}" from library?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
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
  );
};
