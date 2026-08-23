'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useNotifications } from '@/context/NotificationContext';
import { syncApplicationToGoogleSheets } from '@/lib/googleSheets';
import { FileCheck2, CheckCircle, XCircle, Clock, Search, ExternalLink, X } from 'lucide-react';

export default function ApplicationsAdminPage() {
  const { addNotification } = useNotifications();
  const [applications, setApplications] = useState(initialData.applications);
  const [filterStatus, setFilterStatus] = useState<string>('TÜMÜ');
  const [searchTerm, setSearchTerm] = useState('');

  // Rejection reason modal
  const [rejectingAppId, setRejectingAppId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = async (id: string) => {
    const targetApp = applications.find((a) => a.id === id);
    if (!targetApp) return;

    const updated = applications.map((a) => (a.id === id ? { ...a, status: 'ONAYLANDI' as const } : a));
    setApplications(updated);
    initialData.applications = updated;

    addNotification(
      'Başvurunuz Onaylandı!',
      `Tebrikler Sayın ${targetApp.firstName} ${targetApp.lastName}! Konparlamento 2026 başvurunuz onaylanmıştır.`,
      'BASVURU_ONAY'
    );

    // Auto-sync to Google Sheets
    await syncApplicationToGoogleSheets({
      id: targetApp.id,
      first_name: targetApp.firstName,
      last_name: targetApp.lastName,
      email: targetApp.email,
      phone: targetApp.phone,
      age: targetApp.age,
      grade: targetApp.grade,
      gender: targetApp.gender,
      requested_role: targetApp.requestedRole,
      created_at: targetApp.createdAt,
    });
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingAppId) return;

    const targetApp = applications.find((a) => a.id === rejectingAppId);
    if (!targetApp) return;

    const updated = applications.map((a) =>
      a.id === rejectingAppId ? { ...a, status: 'REDDEDILDI' as const, rejectionReason } : a
    );

    setApplications(updated);
    initialData.applications = updated;

    addNotification(
      'Başvuru Durumu Güncellendi',
      `Sayın ${targetApp.firstName} ${targetApp.lastName}, başvurunuz maalesef onaylanmamıştır. Neden: ${rejectionReason || 'Kontenjan doluluğu.'}`,
      'BASVURU_RED'
    );

    setRejectingAppId(null);
    setRejectionReason('');
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = filterStatus === 'TÜMÜ' || app.status === filterStatus;
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countApproved = applications.filter((a) => a.status === 'ONAYLANDI').length;
  const countPending = applications.filter((a) => a.status === 'BEKLEMEDE').length;
  const countRejected = applications.filter((a) => a.status === 'REDDEDILDI').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            BAŞVURU YÖNETİMİ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Katılımcı Başvuruları ({applications.length})
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-zinc-400 font-medium">Yeni / Bekleyen</span>
            <span className="text-2xl font-bold text-amber-400 block">{countPending}</span>
          </div>
          <Clock className="w-6 h-6 text-amber-400" />
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-zinc-400 font-medium">Onaylananlar</span>
            <span className="text-2xl font-bold text-emerald-400 block">{countApproved}</span>
          </div>
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-zinc-400 font-medium">Reddedilenler</span>
            <span className="text-2xl font-bold text-red-400 block">{countRejected}</span>
          </div>
          <XCircle className="w-6 h-6 text-red-400" />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {['TÜMÜ', 'BEKLEMEDE', 'ONAYLANDI', 'REDDEDILDI'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                filterStatus === st
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="İsim veya e-posta ara..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Katılımcı</th>
                <th className="p-4">İletişim</th>
                <th className="p-4">İstenen Görev / Komisyon</th>
                <th className="p-4">Motivasyon Notu</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-zinc-900/60 transition">
                  <td className="p-4">
                    <span className="font-bold text-white block">{app.firstName} {app.lastName}</span>
                    <span className="text-[10px] text-zinc-500">{app.age} Yaş / {app.grade}</span>
                  </td>
                  <td className="p-4">
                    <span className="block text-zinc-300">{app.email}</span>
                    <span className="text-zinc-500">{app.phone}</span>
                  </td>
                  <td className="p-4 font-medium text-red-400">{app.requestedRole}</td>
                  <td className="p-4 max-w-xs text-zinc-400 truncate">{app.motivation}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      app.status === 'ONAYLANDI'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                        : app.status === 'REDDEDILDI'
                        ? 'bg-red-950 text-red-300 border border-red-500'
                        : 'bg-amber-950 text-amber-300 border border-amber-500'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {app.status !== 'ONAYLANDI' && (
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition"
                        >
                          ONAYLA
                        </button>
                      )}
                      {app.status !== 'REDDEDILDI' && (
                        <button
                          onClick={() => setRejectingAppId(app.id)}
                          className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold rounded-xl transition"
                        >
                          REDDET
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectingAppId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white text-base">Başvuru Reddetme Sebebi</h3>
              <button onClick={() => setRejectingAppId(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Neden / Açıklama</label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Örn: Yaş sınırı uyumsuzluğu veya kontenjan doluluğu."
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-900/40"
              >
                Reddi Onayla ve Bildirim Gönder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
