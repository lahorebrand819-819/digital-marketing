import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { LeadItem } from '../../types';
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
  ChevronDown
} from 'lucide-react';

export const AdminLeads: React.FC = () => {
  const { data, updateLeadStatus, deleteLead } = useAgency();
  const leads = data?.leads || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [editingNotes, setEditingNotes] = useState<{ id: string; notes: string } | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.service && lead.service.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: LeadItem['status']) => {
    await updateLeadStatus(id, newStatus);
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    const lead = leads.find(l => l.id === id);
    if (lead) {
      await updateLeadStatus(id, lead.status, notes);
      setEditingNotes(null);
    }
  };

  const getStatusBadge = (status: LeadItem['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">NEW INQUIRY</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-500/20 text-sky-400 border border-sky-500/30">CONTACTED</span>;
      case 'in-progress':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">IN PROGRESS</span>;
      case 'converted':
      case 'closed':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30">CLOSED WON</span>;
      case 'archived':
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-800 text-slate-400 border border-slate-700">ARCHIVED</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Client Inquiries & CRM Leads</h2>
          <p className="text-xs text-slate-400">
            Manage incoming inquiries, track outreach status, and connect via WhatsApp in one click.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Total Leads: {leads.length}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {['all', 'new', 'contacted', 'in-progress', 'closed', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, company, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Leads Table / Card List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            No matching leads found.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {filteredLeads.map((lead) => {
              const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
              const directWhatsApp = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                `Hi ${lead.name}, this is the Digital Growth Agency team following up on your inquiry for ${lead.service}. When is a good time to connect?`
              )}`;

              return (
                <div key={lead.id} className="p-5 hover:bg-slate-950/40 transition-colors space-y-3">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Lead Bio */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base font-bold text-white">{lead.name}</span>
                        {lead.company && (
                          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                            {lead.company}
                          </span>
                        )}
                        {getStatusBadge(lead.status)}
                        <span className="text-[11px] text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="text-indigo-400 font-semibold">Service: {lead.service}</span>
                        <span>•</span>
                        <span>Budget: <strong className="text-slate-200">{lead.budget || 'Unspecified'}</strong></span>
                        <span>•</span>
                        <a href={`mailto:${lead.email}`} className="hover:text-white flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{lead.email}</span>
                        </a>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          <span>{lead.phone}</span>
                        </span>
                      </div>
                    </div>

                    {/* Status Select & Actions */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadItem['status'])}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-semibold"
                      >
                        <option value="new">Status: New</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="in-progress">Status: In Progress</option>
                        <option value="closed">Status: Closed Won</option>
                        <option value="archived">Status: Archived</option>
                      </select>

                      {/* WhatsApp Direct Action */}
                      <a
                        href={directWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Lead</span>
                      </a>

                      {/* Delete Lead */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete lead from ${lead.name}?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Message & Internal Notes */}
                  {lead.message && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-normal">
                      <strong className="text-slate-400 block mb-1">Message from Client:</strong>
                      {lead.message}
                    </div>
                  )}

                  {/* Internal Notes area */}
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    {editingNotes?.id === lead.id ? (
                      <div className="flex items-center gap-2 w-full max-w-xl">
                        <input
                          type="text"
                          value={editingNotes.notes}
                          onChange={(e) => setEditingNotes({ id: lead.id, notes: e.target.value })}
                          placeholder="Add internal notes (e.g. called on Monday, scheduled demo)..."
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                        />
                        <button
                          onClick={() => handleSaveNotes(lead.id, editingNotes.notes)}
                          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotes(null)}
                          className="px-2 py-1.5 text-slate-400 hover:text-white text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400">
                        <span>Notes: <strong className="text-slate-300">{lead.notes || 'None'}</strong></span>
                        <button
                          onClick={() => setEditingNotes({ id: lead.id, notes: lead.notes || '' })}
                          className="text-indigo-400 hover:text-indigo-300 text-[11px] underline"
                        >
                          {lead.notes ? 'Edit Note' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
