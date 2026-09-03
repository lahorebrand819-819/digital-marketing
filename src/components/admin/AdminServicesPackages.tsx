import React, { useState } from 'react';
import { AdminServices } from './AdminServices';
import { AdminPricing } from './AdminPricing';
import { Layers, DollarSign } from 'lucide-react';

export const AdminServicesPackages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'pricing'>('services');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'services' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Services Offerings CMS</span>
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pricing' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Pricing Packages & Tiers</span>
        </button>
      </div>

      <div>
        {activeTab === 'services' ? <AdminServices /> : <AdminPricing />}
      </div>
    </div>
  );
};
