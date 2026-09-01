import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { BlogPost } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  X,
  Search,
  BookOpen,
  Calendar,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminBlog: React.FC = () => {
  const { data, updateBlogPost, createBlogPost, deleteBlogPost } = useAgency();
  const posts = data?.blog || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingPost({
      id: '',
      title: '',
      slug: '',
      category: 'Paid Media',
      excerpt: 'Strategic breakdown of performance marketing tactics.',
      content: '## Executive Summary\n\nScale starts with high-velocity creative testing and attribution alignment.\n\n### 1. Creative Diversification\nEnsure you have at least 15 active ad angles...',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      author: {
        name: 'Alex Vance',
        role: 'Chief Strategy Officer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      },
      tags: ['PaidAds', 'ROAS', 'Growth'],
      published: true
    });
    setTagsInput('PaidAds, ROAS, Growth');
  };

  const handleOpenEdit = (p: BlogPost) => {
    setEditingPost({ ...p });
    setTagsInput((p.tags || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title) return;

    const tagsArray = tagsInput.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    const payload: Partial<BlogPost> = {
      ...editingPost,
      slug: editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tags: tagsArray
    };

    if (editingPost.id) {
      await updateBlogPost(editingPost.id, payload);
    } else {
      await createBlogPost(payload);
    }
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Articles & Insights CMS</h2>
          <p className="text-xs text-slate-400">
            Publish educational articles, marketing teardowns, and upload featured images from your device.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="h-40 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl bg-slate-950 relative">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-indigo-300 border border-indigo-500/30">
                  {post.category}
                </span>
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    post.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                <span>{post.publishedDate}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{post.title}</h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">By {post.author.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete article "${post.title}"?`)) {
                      deleteBlogPost(post.id);
                    }
                  }}
                  className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Write Modal */}
      <AnimatePresence>
        {editingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingPost.id ? 'Edit Article' : 'Write New Article'}
                </h3>
                <button onClick={() => setEditingPost(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title</label>
                    <input
                      type="text"
                      required
                      value={editingPost.title || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. The 2026 Omnichannel ROAS Playbook"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingPost.category || 'Paid Media'}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                    >
                      <option value="Paid Media">Paid Media</option>
                      <option value="SEO & AI">SEO & AI</option>
                      <option value="Creative & TikTok">Creative & TikTok</option>
                      <option value="Strategy">Strategy</option>
                    </select>
                  </div>
                </div>

                {/* Media Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cover Banner (Upload from device gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingPost.coverImage && (
                      <img
                        src={editingPost.coverImage}
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
                      <span>{editingPost.coverImage ? 'Change Image from Device' : 'Upload Image'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Article Content</label>
                  <textarea
                    rows={8}
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    placeholder="Write in Markdown..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="PaidAds, TikTok, Scale"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Reading Time</label>
                    <input
                      type="text"
                      value={editingPost.readTime || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                      placeholder="e.g. 6 min read"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="blog-published"
                    checked={editingPost.published ?? true}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-950"
                  />
                  <label htmlFor="blog-published" className="text-xs text-slate-300 cursor-pointer font-semibold">
                    Publish immediately on public website
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Article
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
          if (editingPost) {
            setEditingPost({ ...editingPost, coverImage: url });
          }
        }}
        title="Select Article Cover"
        acceptType="image"
        currentValue={editingPost?.coverImage || ''}
      />
    </div>
  );
};
