'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { Settings, Save, CheckCircle } from 'lucide-react';

export default function SettingsAdminPage() {
  const [countdownDate, setCountdownDate] = useState(initialData.countdownDate);
  const [contactEmail, setContactEmail] = useState(initialData.siteSettings.contactEmail);
  const [contactPhone, setContactPhone] = useState(initialData.siteSettings.contactPhone);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    initialData.countdownDate = countdownDate;
    initialData.siteSettings.contactEmail = contactEmail;
    initialData.siteSettings.contactPhone = contactPhone;

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="border-b border-zinc-900 pb-6">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
          SİSTEM AYARLARI
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Genel Site & Sayaç Ayarları
        </h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5">
        {saved && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Ayarlar başarıyla kaydedildi!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-semibold text-zinc-300">Etkinlik Başlangıç Tarihi & Saati (Geri Sayaç)</label>
            <input
              type="datetime-local"
              required
              value={countdownDate.substring(0, 16)}
              onChange={(e) => setCountdownDate(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-zinc-300">İletişim E-Posta Adresi</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-zinc-300">İletişim Telefon Numarası</label>
            <input
              type="text"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>AYARLARI KAYDET</span>
          </button>
        </form>
      </div>
    </div>
  );
}
