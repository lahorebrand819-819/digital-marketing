import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { AgencySettings } from '../../types';
import {
  Settings,
  Save,
  Lock,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  DollarSign,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { data, updateSettings, changePassword, showToast } = useAgency();
  const currentSettings = data?.settings;

  const [formData, setFormData] = useState<AgencySettings>(() => {
    return (
      currentSettings || {
        agencyName: 'Digital Growth Agency',
        tagline: 'Scaling High-Growth Brands Through Performance Marketing & Creative Execution',
        description: '',
        email: 'hello@digitalgrowthagency.com',
        phone: '+92 300 1234567',
        address: 'Executive Tower, Main Boulevard, Innovation District',
        whatsappNumber: '+923001234567',
        whatsappMessage: 'Hi Digital Growth Agency, I want to scale my brand. Let’s talk strategy!',
        currencies: {
          PKR: { enabled: true, symbol: 'Rs.', name: 'Pakistani Rupee' },
          USD: { enabled: true, symbol: '$', name: 'US Dollar' },
          GBP: { enabled: true, symbol: '£', name: 'British Pound' }
        },
        defaultCurrency: 'USD',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com',
          facebook: 'https://facebook.com',
          youtube: 'https://youtube.com'
        },
        footerText: '© 2026 Digital Growth Agency. All rights reserved.'
      }
    );
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    setIsChangingPass(true);
    const result = await changePassword(oldPassword, newPassword);
    setIsChangingPass(false);

    if (result.success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Agency & Global Settings</h2>
        <p className="text-xs text-slate-400">
          Configure contact info, default WhatsApp numbers, multi-currency activation, and administrator credentials.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* Brand & Contact Section */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Settings className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">General Agency Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Agency Name</label>
              <input
                type="text"
                required
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Public Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Office Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Agency Hero Headline / Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* WhatsApp Real-Time Direct Contact Configuration */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">WhatsApp Integration & Floating CTA</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Phone Number (with country code, no + or spaces)
              </label>
              <input
                type="text"
                required
                placeholder="923001234567"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Default Prefilled Greeting Message
              </label>
              <input
                type="text"
                value={formData.whatsappMessage}
                onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Multi-Currency Control Matrix */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <DollarSign className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Multi-Currency Global Switcher</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">PKR (Pakistani Rupee)</span>
                <input
                  type="checkbox"
                  checked={formData.currencies.PKR.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currencies: {
                        ...formData.currencies,
                        PKR: { ...formData.currencies.PKR, enabled: e.target.checked }
                      }
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-400">Prefix: Rs. (Formatted with commas)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">USD (US Dollar)</span>
                <input
                  type="checkbox"
                  checked={formData.currencies.USD.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currencies: {
                        ...formData.currencies,
                        USD: { ...formData.currencies.USD, enabled: e.target.checked }
                      }
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-400">Prefix: $ (International clients)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">GBP (British Pound)</span>
                <input
                  type="checkbox"
                  checked={formData.currencies.GBP.enabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currencies: {
                        ...formData.currencies,
                        GBP: { ...formData.currencies.GBP, enabled: e.target.checked }
                      }
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-400">Prefix: £ (UK clients)</p>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Social & Agency Links</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Twitter / X</label>
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram</label>
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Facebook</label>
              <input
                type="text"
                value={formData.socialLinks.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Global Settings */}
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </form>

      {/* Admin Password Change Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Lock className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Change Master Admin Password</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isChangingPass ? 'Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>

    </div>
  );
};
