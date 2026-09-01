import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { PortfolioProject } from '../../types';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  X,
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioSectionProps {
  isStandalonePage?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ isStandalonePage = false }) => {
  const { data } = useAgency();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const projects = data?.portfolio || [];

  const categories = [
    'All',
    'Social Media',
    'SEO',
    'Advertising',
    'Branding',
    'Web Development',
    'E-commerce'
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  return (
    <section id="portfolio" className={`py-24 relative bg-slate-950 ${isStandalonePage ? 'pt-32' : ''}`}>
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Proven Case Work & Client Wins</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Work That <span className="gradient-text">Commands Attention</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Real brands, verified data, and transformational business growth across global consumer and B2B markets.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 overflow-hidden shadow-xl cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Image with gradient overlay */}
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                {/* Hover Reveal Button */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Results Pill overlay */}
                {project.results && (
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 border border-emerald-500/30 text-emerald-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{project.results}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {project.clientType || project.clientIndustry}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mt-0.5">
                    {project.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 font-normal line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Pills */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Layers className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white">No projects found in this category</h3>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 text-slate-100"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors z-10"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      • {selectedProject.clientIndustry || selectedProject.clientType}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedProject.name}</h3>
                </div>

                {/* Hero Image */}
                <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={selectedProject.coverImage}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Metrics Breakdown Grid */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.metrics.map((metric, i) => (
                      <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                        <div className="text-xl font-extrabold text-indigo-400">{metric.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Strategic Execution & Overview
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{selectedProject.description}</p>
                </div>

                {/* Technologies */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Growth Stack & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project External Link if present */}
                {selectedProject.link && (
                  <div className="pt-2">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      <span>Visit Live Experience</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
