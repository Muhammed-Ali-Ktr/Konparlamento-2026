'use client';

import React, { useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import { Bell, Send, CheckCircle } from 'lucide-react';

export default function NotificationsAdminPage() {
  const { addNotification } = useNotifications();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sentMsg, setSentMsg] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    addNotification(title, message, 'DUYURU');
    setSentMsg(true);
    setTimeout(() => {
      setSentMsg(false);
      setTitle('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="border-b border-zinc-900 pb-6">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
          TOPLU DİL BİLDİRİMLERİ
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Bildirim & Duyuru Gönder
        </h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
        {sentMsg ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs rounded-2xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Duyuru tüm kullanıcılara başarıyla iletildi!</span>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Bildirim Başlığı *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: 2. Oturum Başlıyor!"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Bildirim Mesajı *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınızı yazınız..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Duyuruyu Yayınla</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
