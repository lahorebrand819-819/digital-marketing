import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { InvoiceItem } from '../../types';
import {
  DollarSign,
  Search,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  X,
  CreditCard,
  FileText,
  AlertTriangle,
  TrendingUp,
  Percent,
  PieChart as PieChartIcon
} from 'lucide-react';

export const AdminFinance: React.FC = () => {
  const { data, formatPrice, createInvoice, updateInvoice, deleteInvoice, addToast } = useAgency();
  const invoices = data?.invoices || [];
  const clients = data?.clients || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceItem | null>(null);

  const [formData, setFormData] = useState<Partial<InvoiceItem>>({
    invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
    client: clients[0]?.companyName || 'Sapphire Retail',
    amount: 150000,
    currency: 'PKR',
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    status: 'pending',
    services: ['Meta Ads Management']
  });

  const totalMonthlyRetainers = clients
    .filter(c => c.status === 'active')
    .reduce((acc, c) => acc + (c.monthlyRetainer || 0), 0);

  const totalPaidInvoices = invoices
    .filter(i => i.status === 'paid')
    .reduce((acc, i) => acc + i.amount, 0);

  const outstandingAmount = invoices
    .filter(i => i.status === 'pending' || i.status === 'overdue')
    .reduce((acc, i) => acc + i.amount, 0);

  const estimatedAgencyCost = totalMonthlyRetainers * 0.42; // Team salaries, tools, servers, office
  const estimatedGrossProfit = totalMonthlyRetainers - estimatedAgencyCost;
  const grossProfitMargin = ((estimatedGrossProfit / (totalMonthlyRetainers || 1)) * 100).toFixed(1);

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenCreate = () => {
    setEditingInvoice(null);
    setFormData({
      invoiceNumber: `INV-2026-${(invoices.length + 1).toString().padStart(3, '0')}`,
      client: clients[0]?.companyName || 'Sapphire Retail',
      amount: 150000,
      currency: 'PKR',
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'pending',
      services: ['Social Media Marketing Retainer']
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inv: InvoiceItem) => {
    setEditingInvoice(inv);
    setFormData({ ...inv });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.invoiceNumber || !formData.client || !formData.amount) {
      addToast('Please provide Invoice Number, Client, and Amount', 'error');
      return;
    }

    if (editingInvoice) {
      const success = await updateInvoice(editingInvoice.id, formData);
      if (success) setIsModalOpen(false);
    } else {
      const success = await createInvoice(formData);
      if (success) setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, num: string) => {
    if (window.confirm(`Delete invoice ${num}?`)) {
      await deleteInvoice(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Agency Financials & Billing</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Retainer Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track monthly recurring retainers, invoice collections, client accounts receivable, and agency margin profitability.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Monthly Recurring Revenue (MRR)</div>
          <div className="text-2xl font-black text-emerald-400">{formatPrice(totalMonthlyRetainers)}</div>
          <div className="text-xs text-slate-400 font-medium">From {clients.filter(c => c.status === 'active').length} active retainers</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Outstanding Invoices (Due)</div>
          <div className="text-2xl font-black text-rose-400">{formatPrice(outstandingAmount)}</div>
          <div className="text-xs text-slate-400 font-medium">
            {invoices.filter(i => i.status === 'pending' || i.status === 'overdue').length} Pending Payment
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Agency Overhead</div>
          <div className="text-2xl font-black text-slate-200">{formatPrice(estimatedAgencyCost)}</div>
          <div className="text-xs text-slate-400 font-medium">Salaries, tools, ad tech & servers</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Gross Margin Profitability</div>
          <div className="text-2xl font-black text-indigo-400">{grossProfitMargin}%</div>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Strong agency margin</span>
          </div>
        </div>
      </div>

      {/* Invoices Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number, client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'paid', 'pending', 'overdue'].map((st) => (
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

      {/* Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/40">
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Client Name</th>
                <th className="py-3.5 px-4">Services Billed</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{inv.invoiceNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{inv.client}</td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {inv.services.join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                    {formatPrice(inv.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {inv.dueDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={inv.status}
                      onChange={(e) => updateInvoice(inv.id, { status: e.target.value as any })}
                      className={`text-[10px] font-extrabold rounded-full px-2.5 py-1 border bg-slate-950 focus:outline-none ${
                        inv.status === 'paid'
                          ? 'text-emerald-400 border-emerald-500/30'
                          : inv.status === 'overdue'
                          ? 'text-rose-400 border-rose-500/30'
                          : 'text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <option value="paid">PAID</option>
                      <option value="pending">PENDING</option>
                      <option value="overdue">OVERDUE</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(inv)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id, inv.invoiceNumber)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create / Edit Invoice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingInvoice ? 'Edit Invoice' : 'Generate New Invoice'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Invoice Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Client *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Payment Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Billed Services (comma-separated)</label>
                <input
                  type="text"
                  value={formData.services?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="Meta Ads Retainer, Creative Studio"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
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
                  {editingInvoice ? 'Save Changes' : 'Generate Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
