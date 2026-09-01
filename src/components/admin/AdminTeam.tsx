import React, { useState } from 'react';
import { useAgency } from '../../context/AgencyContext';
import { TeamMember } from '../../types';
import { MediaPickerModal } from '../common/MediaPickerModal';
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  X,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminTeam: React.FC = () => {
  const { data, updateTeamMember, createTeamMember, deleteTeamMember } = useAgency();
  const team = data?.team || [];

  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingMember({
      id: '',
      name: '',
      position: 'Senior Growth Strategist',
      bio: 'Ex-Meta media buyer scaling consumer brands.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: ''
      },
      displayOrder: team.length + 1
    });
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember({ ...m, socialLinks: { ...m.socialLinks } });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name) return;

    if (editingMember.id) {
      await updateTeamMember(editingMember.id, editingMember);
    } else {
      await createTeamMember(editingMember);
    }
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Team & Leadership CMS</h2>
          <p className="text-xs text-slate-400">
            Manage your agency leadership roster, bio descriptions, and upload portraits directly from device gallery.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="h-48 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl bg-slate-950">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-base font-bold text-white">{member.name}</h3>
              <div className="text-xs text-indigo-400 font-semibold mb-2">{member.position}</div>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{member.bio}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(member)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                title="Edit Member"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${member.name}?`)) {
                    deleteTeamMember(member.id);
                  }
                }}
                className="p-1.5 bg-slate-800 hover:bg-red-900/60 text-red-400 rounded-lg transition-colors"
                title="Delete Member"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <h3 className="text-xl font-extrabold text-white">
                  {editingMember.id ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <button onClick={() => setEditingMember(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Position</label>
                  <input
                    type="text"
                    required
                    value={editingMember.position || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                {/* Portrait Photo Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Portrait Photo (Upload from device gallery)
                  </label>
                  <div className="flex items-center gap-3">
                    {editingMember.photo && (
                      <img
                        src={editingMember.photo}
                        alt="Preview"
                        className="w-12 h-12 rounded-full object-cover border border-slate-700"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setIsMediaModalOpen(true)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4 text-indigo-400" />
                      <span>{editingMember.photo ? 'Change Photo' : 'Upload from Device'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={editingMember.bio || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Social Links</label>
                  <input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    value={editingMember.socialLinks?.linkedin || ''}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socialLinks: { ...editingMember.socialLinks, linkedin: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Twitter / X Profile URL"
                    value={editingMember.socialLinks?.twitter || ''}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        socialLinks: { ...editingMember.socialLinks, twitter: e.target.value }
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={(url) => {
          if (editingMember) {
            setEditingMember({ ...editingMember, photo: url });
          }
        }}
        title="Select Team Member Photo"
        acceptType="image"
        currentValue={editingMember?.photo || ''}
      />
    </div>
  );
};
