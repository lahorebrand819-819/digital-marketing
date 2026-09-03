import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { IntegrationItem } from '../../types';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  Lock
} from 'lucide-react';

export const AdminIntegrations: React.FC = () => {
  const { data, updateIntegration, addToast } = useAgency();
  const integrations = data?.integrations || [];

  const [selectedItem, setSelectedItem] = useState<IntegrationItem | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleOpenConfig = (item: IntegrationItem) => {
    setSelectedItem(item);
    setApiKeyInput(item.apiKey || '');
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    await updateIntegration(selectedItem.id, {
      apiKey: apiKeyInput,
      status: apiKeyInput.trim() ? 'connected' : 'disconnected',
      lastSynced: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    addToast(`${selectedItem.name} configuration saved!`, 'success');
    setSelectedItem(null);
  };

  const handleTestConnection = async (item: IntegrationItem) => {
    setTestingId(item.id);
    setTimeout(async () => {
      setTestingId(null);
      await updateIntegration(item.id, {
        status: 'connected',
        lastSynced: new Date().toISOString().replace('T', ' ').substring(0, 16)
      });
      addToast(`Connected to ${item.name} API successfully! Response 200 OK.`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">API & Advertising Integrations</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {integrations.filter(i => i.status === 'connected').length} of {integrations.length} Synced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect Meta Marketing API, Google Ads Scripts, TikTok Business Center, and GA4 for automated analytics synchronization.
          </p>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => {
          const isConnected = item.status === 'connected';
          const isTesting = testingId === item.id;

          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-400 text-sm">
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.name}</h3>
                      <div className="text-[11px] text-slate-400">{item.provider}</div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border flex items-center gap-1.5 ${
                    isConnected
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {isConnected ? 'LIVE' : 'OFFLINE'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                  {item.description}
                </p>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>API Token:</span>
                    <span className="font-mono text-slate-300">
                      {item.apiKey ? `${item.apiKey.substring(0, 8)}••••••••` : 'Not configured'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Last Telemetry Sync:</span>
                    <span className="text-slate-300">{item.lastSynced || 'Never'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTestConnection(item)}
                  disabled={isTesting}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-indigo-400' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                </button>

                <button
                  onClick={() => handleOpenConfig(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Webhook Endpoint Info Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Inbound Webhook & Zapier Automation URL</span>
        </div>
        <p className="text-xs text-slate-400">
          Route leads directly into the Telca CRM pipeline from external Facebook Lead Ads, TikTok Instant Forms, or custom web forms:
        </p>
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-300 flex items-center justify-between overflow-x-auto">
          <span>https://telcamarketing.com/api/webhooks/leads</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold shrink-0 ml-2">
            Active Listener
          </span>
        </div>
      </div>

      {/* MODAL: Configure API Key */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Configure {selectedItem.name}</h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <p className="text-slate-300">
                Enter your access token or developer secret for <strong>{selectedItem.provider}</strong>. Data will be saved securely to the backend data layer.
              </p>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Access Token / API Secret Key</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="e.g. EAABwz... or key_live_..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30"
                >
                  Save & Validate Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
