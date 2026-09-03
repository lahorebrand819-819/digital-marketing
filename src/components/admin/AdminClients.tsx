import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { ClientProfile } from '../../types';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Briefcase,
  UserCheck,
  Building2,
  Trash2,
  Edit2,
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  FileText
} from 'lucide-react';

export const AdminClients: React.FC = () => {
  const { data, formatPrice, createClient, updateClient, deleteClient, addToast } = useAgency();

  const clients = data?.clients || [];
  const projects = data?.projects || [];
  const campaigns = data?.campaigns || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ClientProfile>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    activeServices: ['Meta Ads (Facebook & Instagram)'],
    monthlyRetainer: 150000,
    currency: 'PKR',
    status: 'active',
    startDate: new Date().toISOString().split('T')[0],
    accountManager: 'Hamza Tariq',
    totalRevenue: 150000,
    notes: ''
  });

  const filteredClients = clients.filter(c => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.accountManager.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingClient(null);
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      activeServices: ['Meta Ads (Facebook & Instagram)'],
      monthlyRetainer: 150000,
      currency: 'PKR',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      accountManager: 'Hamza Tariq',
      totalRevenue: 150000,
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: ClientProfile) => {
    setEditingClient(client);
    setFormData({ ...client });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      addToast('Please fill in Company Name, Contact Person, and Email', 'error');
      return;
    }

    if (editingClient) {
      const success = await updateClient(editingClient.id, formData);
      if (success) {
        setIsModalOpen(false);
        if (selectedClient?.id === editingClient.id) {
          setSelectedClient({ ...editingClient, ...formData } as ClientProfile);
        }
      }
    } else {
      const success = await createClient(formData);
      if (success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from clients?`)) {
      await deleteClient(id);
      if (selectedClient?.id === id) {
        setSelectedClient(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Agency Clients</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {clients.length} Accounts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active retainers, account managers, linked campaigns, and revenue per client.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, contact person, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'active', 'onboarding', 'paused', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                <th className="py-3.5 px-4">Company & Contact</th>
                <th className="py-3.5 px-4">Active Services</th>
                <th className="py-3.5 px-4">Monthly Retainer</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Account Manager</th>
                <th className="py-3.5 px-4">Since</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.map((client) => {
                return (
                  <tr key={client.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div
                        onClick={() => setSelectedClient(client)}
                        className="font-bold text-white cursor-pointer hover:text-indigo-400 flex items-center gap-2"
                      >
                        <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{client.companyName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {client.contactPerson} • {client.email} • {client.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {client.activeServices.slice(0, 2).map((srv, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300">
                            {srv}
                          </span>
                        ))}
                        {client.activeServices.length > 2 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{client.activeServices.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      {formatPrice(client.monthlyRetainer)}
                      <span className="text-[10px] text-slate-500 font-normal block">/ month</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        client.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : client.status === 'onboarding'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : client.status === 'paused'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {client.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {client.accountManager}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {client.startDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 text-[11px] font-bold"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => handleOpenEdit(client)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id, client.companyName)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
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

      {/* MODAL: Client Profile Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">{selectedClient.companyName}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    selectedClient.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {selectedClient.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Contact: {selectedClient.contactPerson} • {selectedClient.email} • {selectedClient.phone}
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-500">Monthly Retainer</div>
                <div className="text-base font-black text-emerald-400 mt-0.5">{formatPrice(selectedClient.monthlyRetainer)}</div>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Lifetime Value</div>
                <div className="text-base font-black text-white mt-0.5">{formatPrice(selectedClient.totalRevenue)}</div>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-500">Account Lead</div>
                <div className="text-base font-black text-indigo-400 mt-0.5">{selectedClient.accountManager}</div>
              </div>
            </div>

            {/* Active Services */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Retained Services:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedClient.activeServices.map((srv, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Linked Projects */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Active Agency Projects for this Client:</span>
              <div className="space-y-2">
                {projects.filter(p => p.client === selectedClient.companyName).length === 0 ? (
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-500">No active standalone projects assigned</div>
                ) : (
                  projects.filter(p => p.client === selectedClient.companyName).map(p => (
                    <div key={p.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.serviceCategory} • Due {p.dueDate}</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">{p.progress}% Complete</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Client Linked Campaigns */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Active Live Campaigns:</span>
              <div className="space-y-2">
                {campaigns.filter(c => c.client === selectedClient.companyName).length === 0 ? (
                  <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-500">No active ad sets tracked</div>
                ) : (
                  campaigns.filter(c => c.client === selectedClient.companyName).map(c => (
                    <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{c.name} ({c.platform})</div>
                        <div className="text-[11px] text-slate-400">Spend: {formatPrice(c.spend)} • Conversions: {c.conversions}</div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400">{c.roas}x ROAS</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Communication Notes */}
            {selectedClient.notes && (
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Account Notes & Strategy:</span>
                <p className="text-slate-300 leading-relaxed">{selectedClient.notes}</p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleOpenEdit(selectedClient);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Edit Account Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Create / Edit Client */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingClient ? 'Edit Client Account' : 'Add New Client'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Sapphire Apparel"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Bilal Ahmed"
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 300 0000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Monthly Retainer Amount</label>
                  <input
                    type="number"
                    value={formData.monthlyRetainer}
                    onChange={(e) => setFormData({ ...formData, monthlyRetainer: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Account Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="active">Active</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Account Manager</label>
                  <input
                    type="text"
                    value={formData.accountManager}
                    onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
                    placeholder="e.g. Hamza Tariq"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Active Services (comma-separated)</label>
                <input
                  type="text"
                  value={formData.activeServices?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, activeServices: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="Meta Ads, Google Ads PPC, E-Commerce Dev"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Account Notes & Contract Specs</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Important client agreements, communication notes..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
                >
                  {editingClient ? 'Save Changes' : 'Create Client Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
