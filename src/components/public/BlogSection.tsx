import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { BlogPost } from '../../types';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  Bookmark,
  Search,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogSectionProps {
  isStandalonePage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isStandalonePage = false }) => {
  const { data } = useAgency();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts = (data?.blog || []).filter(p => p.published);

  const categories = ['All', 'Paid Media', 'SEO & AI', 'Creative & TikTok', 'Strategy'];

  const filteredPosts = posts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className={`py-24 relative bg-slate-950/90 border-t border-slate-900 ${isStandalonePage ? 'pt-32' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Digital Growth Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Latest Insights & <span className="gradient-text">Playbooks</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Actionable marketing masterclasses, algorithm teardowns, and AI scaling experiments from our internal growth laboratory.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPost(post)}
              className="group bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-52 overflow-hidden relative bg-slate-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {post.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-normal line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-500/30"
                  />
                  <div className="text-xs font-semibold text-slate-300">{post.author.name}</div>
                </div>

                <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 text-slate-100"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close article reader"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedPost.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {selectedPost.publishedDate} • {selectedPost.readTime}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Author Info Card */}
                <div className="flex items-center gap-3 py-3 border-y border-slate-800">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{selectedPost.author.name}</div>
                    <div className="text-xs text-indigo-400 font-medium">{selectedPost.author.role}</div>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-slate-800">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content Body */}
              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                <p className="text-base text-slate-200 font-medium leading-relaxed">
                  {selectedPost.excerpt}
                </p>

                <div className="whitespace-pre-line text-slate-300 leading-loose">
                  {selectedPost.content}
                </div>
              </div>

              {/* Tags */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
