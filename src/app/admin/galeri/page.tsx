'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useNotifications } from '@/context/NotificationContext';
import { Camera, CheckCircle, XCircle, Trash2, Clock, ShieldCheck } from 'lucide-react';

export default function GalleryAdminPage() {
  const { addNotification } = useNotifications();
  const [uploads, setUploads] = useState(initialData.participantUploads);
  const [filterTab, setFilterTab] = useState<'BEKLEMEDE' | 'ONAYLANDI' | 'REDDEDILDI'>('BEKLEMEDE');

  const handleApprove = (id: string) => {
    const updated = uploads.map((u) => (u.id === id ? { ...u, status: 'ONAYLANDI' as const } : u));
    setUploads(updated);
    initialData.participantUploads = updated;

    addNotification('Fotoğrafınız Onaylandı!', 'Yüklediğiniz etkinlik fotoğrafı galeride yayınlanmıştır.', 'FOTOGRAF_ONAY');
  };

  const handleReject = (id: string) => {
    const updated = uploads.map((u) => (u.id === id ? { ...u, status: 'REDDEDILDI' as const } : u));
    setUploads(updated);
    initialData.participantUploads = updated;

    addNotification('Fotoğraf Durumu', 'Yüklediğiniz fotoğraf yayın kurallarına uymadığı için reddedilmiştir.', 'FOTOGRAF_RED');
  };

  const handleDelete = (id: string) => {
    const updated = uploads.filter((u) => u.id !== id);
    setUploads(updated);
    initialData.participantUploads = updated;
  };

  const filteredUploads = uploads.filter((u) => u.status === filterTab);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            GALERİ MODERASYONU
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Katılımcı Görsel Denetimi
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        {(['BEKLEMEDE', 'ONAYLANDI', 'REDDEDILDI'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterTab === tab
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {tab === 'BEKLEMEDE' && `Bekleyenler (${uploads.filter((u) => u.status === 'BEKLEMEDE').length})`}
            {tab === 'ONAYLANDI' && `Yayındakiler (${uploads.filter((u) => u.status === 'ONAYLANDI').length})`}
            {tab === 'REDDEDILDI' && `Reddedilenler (${uploads.filter((u) => u.status === 'REDDEDILDI').length})`}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUploads.length === 0 ? (
          <p className="text-xs text-zinc-500 col-span-full py-8 text-center">Bu kategoride görsel bulunmuyor.</p>
        ) : (
          filteredUploads.map((item) => (
            <div key={item.id} className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden space-y-3 p-4">
              <div className="relative h-48 rounded-2xl overflow-hidden bg-black border border-zinc-800">
                <img src={item.url} alt={item.userName} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{item.userName}</h4>
                  <span className="text-[10px] text-zinc-400 block">{item.uploadedAt}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  item.status === 'ONAYLANDI'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    : item.status === 'REDDEDILDI'
                    ? 'bg-red-950 text-red-300 border border-red-500'
                    : 'bg-amber-950 text-amber-300 border border-amber-500'
                }`}>
                  {item.status}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-800/80">
                {item.status !== 'ONAYLANDI' && (
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> ONAYLA
                  </button>
                )}
                {item.status !== 'REDDEDILDI' && (
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-3 py-1.5 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs rounded-xl flex items-center gap-1 transition"
                  >
                    <XCircle className="w-3.5 h-3.5" /> REDDET
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 rounded-xl transition"
                  title="Sil"
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
}
