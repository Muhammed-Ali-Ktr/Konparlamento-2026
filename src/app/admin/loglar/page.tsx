'use client';

import React from 'react';
import { Shield, Lock, Terminal } from 'lucide-react';

export default function LogsAdminPage() {
  const auditLogs = [
    { id: 'l-1', adminName: 'Muhammed Ali Kıtır', action: 'BAŞVURU_ONAYLANDI', target: 'Ahmet Kaya', date: '2026-08-18 18:45' },
    { id: 'l-2', adminName: 'Muhammed Ali Kıtır', action: 'SİSTEM_AYARI_GÜNCELLENDİ', target: 'Geri Sayaç Tarihi', date: '2026-08-18 17:30' },
    { id: 'l-3', adminName: 'Ahmet Faruk Yılmaz', action: 'GÖRSEL_ONAYLANDI', target: 'Ali Yılmaz (Katılımcı Fotoğrafı)', date: '2026-08-18 16:15' },
    { id: 'l-4', adminName: 'System Defender', action: 'IP_RATE_LIMIT_CHECK', target: '31.223.**.**', date: '2026-08-18 15:00' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-900 pb-6">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
          GÜVENLİK & SİSTEM DENETİMİ
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Admin İşlem ve Güvenlik Logları
        </h1>
      </div>

      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-bold border-b border-zinc-800 font-sans">
              <tr>
                <th className="p-4">Zaman</th>
                <th className="p-4">Yönetici</th>
                <th className="p-4">Eylem</th>
                <th className="p-4">Hedef</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-900/60 transition">
                  <td className="p-4 text-zinc-500">{log.date}</td>
                  <td className="p-4 font-bold text-white">{log.adminName}</td>
                  <td className="p-4 text-red-400 font-bold">{log.action}</td>
                  <td className="p-4 text-zinc-300">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
