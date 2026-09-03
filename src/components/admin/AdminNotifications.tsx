import React from 'react';
import { useAgency } from '../../context/AgencyContext';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Users,
  Target,
  DollarSign,
  CheckSquare,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const AdminNotifications: React.FC = () => {
  const { data, markNotificationRead, deleteNotification, addToast } = useAgency();
  const notifications = data?.notifications || [];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
    addToast('All notifications marked as read', 'success');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <Users className="w-4 h-4 text-indigo-400" />;
      case 'campaign':
        return <Target className="w-4 h-4 text-purple-400" />;
      case 'invoice':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'task':
      default:
        return <CheckSquare className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">System Alerts & Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time triggers for incoming leads, ad spend pacing alerts, overdue client invoices, and task deadlines.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl divide-y divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-xs">
            No agency notifications at this time.
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                n.read ? 'bg-slate-900/50 opacity-70' : 'bg-slate-950/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(n.type)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{n.title}</span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">{n.message}</p>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.timestamp ? new Date(n.timestamp).toLocaleString() : 'Recent'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!n.read && (
                  <button
                    onClick={() => markNotificationRead(n.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold"
                    title="Mark read"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
