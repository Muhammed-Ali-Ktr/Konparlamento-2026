'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useNotifications } from '@/context/NotificationContext';
import { HelpCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function RiddlesAdminPage() {
  const { addNotification } = useNotifications();
  const [answers, setAnswers] = useState(initialData.riddleAnswers);

  const handleMarkCorrect = (id: string) => {
    const targetAns = answers.find((a) => a.id === id);
    if (!targetAns) return;

    const updated = answers.map((a) => (a.id === id ? { ...a, status: 'DOGRU' as const } : a));
    setAnswers(updated);
    initialData.riddleAnswers = updated;

    addNotification(
      'Bilmece Tebriği!',
      `Tebrikler ${targetAns.userName}! Gönderdiğiniz bilmece cevabı DOĞRU kabul edilmiştir.`,
      'BILMECE_SONUC'
    );
  };

  const handleMarkIncorrect = (id: string) => {
    const targetAns = answers.find((a) => a.id === id);
    if (!targetAns) return;

    const updated = answers.map((a) => (a.id === id ? { ...a, status: 'YANLIS' as const } : a));
    setAnswers(updated);
    initialData.riddleAnswers = updated;

    addNotification(
      'Bilmece Değerlendirmesi',
      `Sayın ${targetAns.userName}, verdiğiniz yanıt maalesef doğru kabul edilmemiştir.`,
      'BILMECE_SONUC'
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            ETKİLEŞİM YÖNETİMİ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bilmeceler ve Yanıt Değerlendirme
          </h1>
        </div>
      </div>

      {/* Active Riddle Info */}
      <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-2">
        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Aktif Bilmece</span>
        <h3 className="text-base font-bold text-white">"{initialData.riddles[0].question}"</h3>
      </div>

      {/* Answers Table */}
      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Katılımcı</th>
                <th className="p-4">Verilen Cevap</th>
                <th className="p-4">Tarih</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">Değerlendirme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {answers.map((ans) => (
                <tr key={ans.id} className="hover:bg-zinc-900/60 transition">
                  <td className="p-4 font-bold text-white">{ans.userName}</td>
                  <td className="p-4 font-mono font-medium text-red-400">{ans.answerText}</td>
                  <td className="p-4 text-zinc-500">{ans.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      ans.status === 'DOGRU'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                        : ans.status === 'YANLIS'
                        ? 'bg-red-950 text-red-300 border border-red-500'
                        : 'bg-amber-950 text-amber-300 border border-amber-500'
                    }`}>
                      {ans.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleMarkCorrect(ans.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition"
                      >
                        DOĞRU
                      </button>
                      <button
                        onClick={() => handleMarkIncorrect(ans.id)}
                        className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold rounded-xl transition"
                      >
                        YANLIŞ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
