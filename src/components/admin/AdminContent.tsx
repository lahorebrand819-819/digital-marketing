import React, { useState } from 'react';
import { AdminBlog } from './AdminBlog';
import { AdminCaseStudies } from './AdminCaseStudies';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminMediaLibrary } from './AdminMediaLibrary';
import { AdminFAQs } from './AdminFAQs';
import { AdminTestimonials } from './AdminTestimonials';
import {
  FileText,
  Briefcase,
  Image as ImageIcon,
  HelpCircle,
  MessageSquareQuote,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'case-studies' | 'portfolio' | 'media' | 'testimonials' | 'faqs'>('blog');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Content & Creative CMS Hub</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Agency Publishing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage thought leadership blog articles, client case studies, portfolio creative deliverables, client testimonials, and public FAQs.
          </p>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'blog' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Blog & Insights</span>
        </button>

        <button
          onClick={() => setActiveTab('case-studies')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'case-studies' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Case Studies</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'portfolio' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Portfolio Work</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'media' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Media Library</span>
        </button>

        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'testimonials' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Testimonials</span>
        </button>

        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'faqs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQs</span>
        </button>
      </div>

      {/* Render Selected Content Module */}
      <div className="pt-2">
        {activeTab === 'blog' && <AdminBlog />}
        {activeTab === 'case-studies' && <AdminCaseStudies />}
        {activeTab === 'portfolio' && <AdminPortfolio />}
        {activeTab === 'media' && <AdminMediaLibrary />}
        {activeTab === 'testimonials' && <AdminTestimonials />}
        {activeTab === 'faqs' && <AdminFAQs />}
      </div>
    </div>
  );
};
