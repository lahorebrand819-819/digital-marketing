import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Sparkles,
  Users,
  Target,
  Eye,
  Award,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  isStandalonePage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isStandalonePage = false }) => {
  const { data } = useAgency();
  const team = data?.team || [];

  const values = [
    {
      title: 'Obsessed with Unit Economics',
      desc: 'We do not celebrate vanity clicks or impressions. We measure success strictly by blended ROAS, customer acquisition cost (CAC), and customer lifetime value (LTV).'
    },
    {
      title: 'Full Creative & Technical Velocity',
      desc: 'Winning digital marketing demands rapid iteration. We ship dozens of high-converting hooks, new landing page tests, and copy variations every single week.'
    },
    {
      title: '100% Asset Ownership & Transparency',
      desc: 'No black-box secrecy. You own every pixel, every ad account, every line of custom code, and get 24/7 access to live financial dashboards.'
    },
    {
      title: 'AI-Enhanced Scale',
      desc: 'We build custom automated systems, semantic content workflows, and intelligent lead qualifiers so our clients execute 5x faster than market competitors.'
    }
  ];

  return (
    <section id="about" className={`py-24 relative bg-slate-950 ${isStandalonePage ? 'pt-32' : ''}`}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Our Heritage & Vision</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built by Growth Practitioners, <span className="gradient-text">Not Account Execs</span>
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Digital Growth Agency was founded on a single conviction: modern businesses deserve an agile growth partner that combines ruthless analytical rigor with world-class creative execution.
          </p>
        </div>

        {/* Agency Story & Mission / Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                To transform ambitious brands into category dominators by deploying unfair growth advantages: high-converting paid ad engines, impenetrable search authority, cinematic creative velocity, and bespoke AI marketing automation.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-extrabold text-white">$48M+</div>
                <div className="text-xs text-slate-400 font-medium">Cumulative Client Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-indigo-400">180+</div>
                <div className="text-xs text-slate-400 font-medium">Global Campaigns Scaled</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                To pioneer the next era of digital agency operations where automated machine intelligence handles execution latency and human creativity crafts unforgettable brand loyalty and market leadership.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-extrabold text-white">12M+</div>
                <div className="text-xs text-slate-400 font-medium">Qualified Leads Generated</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-purple-400">98.4%</div>
                <div className="text-xs text-slate-400 font-medium">Retainer Retention Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values 4-Card Grid */}
        <div className="mb-20">
          <h3 className="text-center text-2xl font-extrabold text-white mb-10">
            The Principles That Drive Our Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white">{v.title}</h4>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Meet Our Growth Leadership</h3>
            <p className="text-sm text-slate-400 font-normal">
              Senior practitioners with verified track records across Google, Meta, high-growth startups, and venture-backed scale-ups.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 rounded-2xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-xs text-indigo-400 font-semibold mb-2">{member.position}</div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-800/80">
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-sky-400 hover:bg-slate-700 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socialLinks?.twitter && (
                    <a
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 flex items-center justify-center transition-colors"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.socialLinks?.instagram && (
                    <a
                      href={member.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 hover:text-pink-400 hover:bg-slate-700 flex items-center justify-center transition-colors"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
