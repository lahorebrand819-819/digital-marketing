import React, { useState, useRef } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { LeadInquiry, LeadStatus } from '../../types';
import {
  Users,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  ArrowUpRight,
  ExternalLink,
  Plus,
  Download,
  Upload,
  Calendar,
  DollarSign,
  Briefcase,
  UserCheck,
  Columns,
  ListFilter,
  X,
  UserPlus
} from 'lucide-react';

const STAGES: { id: LeadStatus; label: string; color: string; bg: string; border: string }[] = [
  { id: 'new', label: 'New Inquiry', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'contacted', label: 'Contacted', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { id: 'qualified', label: 'Qualified', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  { id: 'interested', label: 'Interested', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'proposal-sent', label: 'Proposal Sent', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { id: 'won', label: 'Closed Won', color: 'text-emerald-300', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
  { id: 'lost', label: 'Closed Lost', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' }
];

export const AdminLeads: React.FC = () => {
  const { data, updateLead, updateLeadStatus, deleteLead, createLead, importLeads, createClient, addToast } = useAgency();
  const leads = data?.leads || [];

  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState<Partial<LeadInquiry>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Social Media Marketing',
    budget: 'Rs. 150,000 - 300,000 / mo',
    status: 'new',
    currency: 'PKR',
    source: 'Website Contact Form',
    message: '',
    notes: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesStage = stageFilter === 'all' || lead.status === stageFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.service && lead.service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email || !newLeadForm.phone) {
      addToast('Please fill in name, email and phone number', 'error');
      return;
    }
    const success = await createLead(newLeadForm);
    if (success) {
      setIsAddModalOpen(false);
      setNewLeadForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Social Media Marketing',
        budget: 'Rs. 150,000 - 300,000 / mo',
        status: 'new',
        currency: 'PKR',
        source: 'Website Contact Form',
        message: '',
        notes: ''
      });
    }
  };

  const handleConvertToClient = async (lead: LeadInquiry) => {
    if (!window.confirm(`Convert ${lead.name} (${lead.company || 'Client'}) into an Active Agency Client?`)) {
      return;
    }
    // Parse estimated monthly budget
    const retainerEstimate = 120000;
    const success = await createClient({
      companyName: lead.company || `${lead.name}'s Brand`,
      contactPerson: lead.name,
      email: lead.email,
      phone: lead.phone,
      activeServices: [lead.service || 'Performance Marketing'],
      monthlyRetainer: retainerEstimate,
      currency: lead.currency || 'PKR',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      accountManager: 'Hamza Tariq',
      totalRevenue: retainerEstimate,
      notes: `Converted from inbound lead on ${new Date().toLocaleDateString()}. Original inquiry: ${lead.message || 'N/A'}`
    });

    if (success) {
      await updateLeadStatus(lead.id, 'won', `Converted to client on ${new Date().toLocaleDateString()}`);
      addToast(`${lead.name} converted to Active Client!`, 'success');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      addToast('No leads to export', 'info');
      return;
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Source', 'Date Added', 'Notes'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.company || ''}"`,
      `"${l.service || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.status || ''}"`,
      `"${l.source || ''}"`,
      `"${l.createdAt || ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `telca_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Leads exported to CSV!', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim() !== '');
        if (lines.length <= 1) {
          addToast('CSV file is empty or missing data rows', 'error');
          return;
        }

        const importedItems: Partial<LeadInquiry>[] = [];
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
          if (cols.length >= 3) {
            importedItems.push({
              name: cols[1] || cols[0] || 'Inquiry Contact',
              email: cols[2] || cols[1] || 'contact@example.com',
              phone: cols[3] || '+92 300 0000000',
              company: cols[4] || '',
              service: cols[5] || 'Growth Marketing',
              budget: cols[6] || 'Unspecified',
              status: (cols[7] as LeadStatus) || 'new',
              source: cols[8] || 'CSV Import',
              notes: cols[10] || 'Imported from external CSV'
            });
          }
        }

        if (importedItems.length > 0) {
          await importLeads(importedItems);
          setIsImportModalOpen(false);
        } else {
          addToast('No valid records parsed from CSV', 'error');
        }
      } catch (err: any) {
        addToast('Error reading CSV file', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header & Primary Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">CRM & Lead Pipeline</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {leads.length} Total Leads
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Qualify incoming website inquiries, move deals through pipeline stages, connect instantly on WhatsApp, and convert leads to clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Toggle View Mode */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'pipeline' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Pipeline Stages</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Import CSV"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, company, email, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Stage:</span>
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
              stageFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All ({leads.length})
          </button>
          {STAGES.map((st) => {
            const count = leads.filter(l => l.status === st.id).length;
            return (
              <button
                key={st.id}
                onClick={() => setStageFilter(st.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  stageFilter === st.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: KANBAN PIPELINE */}
      {viewMode === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4 overflow-x-auto pb-6">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter(l => l.status === stage.id);
            return (
              <div key={stage.id} className="min-w-[260px] bg-slate-900/70 border border-slate-800 rounded-2xl p-3 space-y-3 flex flex-col">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stage.color.replace('text-', 'bg-')}`} />
                    <span className="text-xs font-bold text-white">{stage.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${stage.bg} ${stage.color} border ${stage.border}`}>
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[700px] pr-1">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-600 italic">
                      No leads in this stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
                      const directWhatsApp = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                        `Hi ${lead.name}, this is Telca Marketing regarding your interest in ${lead.service}. Let's discuss your project roadmap!`
                      )}`;

                      return (
                        <div
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all shadow-sm hover:shadow-md space-y-2 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                                {lead.name}
                              </div>
                              {lead.company && (
                                <div className="text-[11px] text-slate-400 font-medium">
                                  {lead.company}
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>

                          <div className="text-[11px] text-indigo-400 font-medium truncate">
                            {lead.service}
                          </div>

                          {lead.budget && (
                            <div className="text-[10px] text-slate-400">
                              Budget: <strong className="text-slate-300">{lead.budget}</strong>
                            </div>
                          )}

                          {lead.notes && (
                            <div className="text-[10px] text-slate-400 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800 line-clamp-2">
                              Note: {lead.notes}
                            </div>
                          )}

                          <div className="pt-1.5 flex items-center justify-between border-t border-slate-900" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 rounded px-1.5 py-1 focus:outline-none"
                            >
                              {STAGES.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={directWhatsApp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/30"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </a>
                              {lead.status !== 'won' && (
                                <button
                                  onClick={() => handleConvertToClient(lead)}
                                  className="p-1 rounded bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/30"
                                  title="Convert to Client"
                                >
                                  <UserPlus className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: TABLE LIST */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                  <th className="py-3 px-4">Contact & Company</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLeads.map((lead) => {
                  const stage = STAGES.find(s => s.id === lead.status) || STAGES[0];
                  const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
                  const directWhatsApp = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                    `Hi ${lead.name}, this is Telca Marketing following up on your ${lead.service} inquiry.`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white cursor-pointer hover:text-indigo-400" onClick={() => setSelectedLead(lead)}>
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lead.company ? `${lead.company} • ` : ''}{lead.email} • {lead.phone}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-indigo-400">{lead.service}</td>
                      <td className="py-3.5 px-4 text-slate-300">{lead.budget || 'Unspecified'}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border ${stage.bg} ${stage.color} ${stage.border} focus:outline-none`}
                        >
                          {STAGES.map(s => (
                            <option key={s.id} value={s.id} className="bg-slate-900 text-slate-200">{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{lead.source || 'Website'}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={directWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"
                            title="Direct WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                          {lead.status !== 'won' && (
                            <button
                              onClick={() => handleConvertToClient(lead)}
                              className="px-2 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 font-bold text-[10px] transition-colors"
                              title="Convert to Client"
                            >
                              Convert
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete inquiry from ${lead.name}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Add Lead Manually */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Add New Lead to Pipeline</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="e.g. Asad Ullah"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company / Brand</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder="e.g. Nexus Retail"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Service Required</label>
                  <select
                    value={newLeadForm.service}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Google Ads & PPC">Google Ads & PPC</option>
                    <option value="Meta Ads (Facebook & Instagram)">Meta Ads (Facebook & Instagram)</option>
                    <option value="TikTok Ads Management">TikTok Ads Management</option>
                    <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                    <option value="Search Engine Optimization (SEO)">SEO Dominance</option>
                    <option value="AI Marketing & Automations">AI Marketing & Automations</option>
                    <option value="Full Agency Growth Retainer">Full Agency Growth Retainer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Budget / Currency</label>
                  <input
                    type="text"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    placeholder="e.g. Rs. 200,000 / mo"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Initial Stage</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as LeadStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    {STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Source</label>
                  <input
                    type="text"
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    placeholder="e.g. LinkedIn, Referral, Ad"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Client Message / Project Scope</label>
                <textarea
                  rows={2}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Details provided by client..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Import CSV */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Import Leads from CSV</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Select a CSV file containing leads. Format columns: ID, Name, Email, Phone, Company, Service, Budget, Status, Source, Notes.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl text-center cursor-pointer transition-colors bg-slate-950/50"
            >
              <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-200">Click to choose CSV file from computer</div>
              <div className="text-[10px] text-slate-500 mt-1">Supports standard CSV exports from Google Sheets / Excel</div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Lead Details Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                  {selectedLead.company && (
                    <span className="text-xs text-indigo-400 font-bold">• {selectedLead.company}</span>
                  )}
                </div>
                <div className="text-xs text-slate-400">Inquiry ID: {selectedLead.id}</div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-slate-200 font-medium hover:text-indigo-400">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone</span>
                  <span className="text-slate-200 font-medium">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Requested Service</span>
                  <span className="text-indigo-400 font-bold">{selectedLead.service}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Budget</span>
                  <span className="text-slate-200 font-bold">{selectedLead.budget || 'Unspecified'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Date Received</span>
                  <span className="text-slate-300">{selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Current Stage</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as LeadStatus;
                      updateLeadStatus(selectedLead.id, newStatus);
                      setSelectedLead({ ...selectedLead, status: newStatus });
                    }}
                    className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs font-bold mt-0.5"
                  >
                    {STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedLead.message && (
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Client Message</span>
                  <p className="text-slate-300 leading-relaxed">{selectedLead.message}</p>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Internal Agency Notes</span>
                <textarea
                  rows={3}
                  value={selectedLead.notes || ''}
                  onChange={(e) => {
                    const notes = e.target.value;
                    setSelectedLead({ ...selectedLead, notes });
                    updateLead(selectedLead.id, { notes });
                  }}
                  placeholder="Record call summaries, demo dates, follow-up schedule..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (window.confirm('Delete this lead?')) {
                      deleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }
                  }}
                  className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Lead</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  {selectedLead.status !== 'won' && (
                    <button
                      onClick={() => {
                        handleConvertToClient(selectedLead);
                        setSelectedLead(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Convert to Client</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
