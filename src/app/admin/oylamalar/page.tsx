'use client';

import React from 'react';
import { initialData } from '@/lib/supabase';
import { Vote, BarChart3, Users, CheckCircle2 } from 'lucide-react';

export default function PollsAdminPage() {
  const poll = initialData.polls[0];
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 1;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            GİZLİ OYLAMA ANALİTİĞİ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Oylama İstatistikleri Paneli
          </h1>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Canlı Oylama Başlığı</span>
            <h2 className="text-lg font-bold text-white">{poll.title}</h2>
          </div>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-right">
            <span className="text-xs text-zinc-400 block">Toplam Kullanılan Oy</span>
            <span className="text-2xl font-extrabold text-white">{totalVotes}</span>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="space-y-4">
          {poll.options.map((opt) => {
            const percentage = Math.round((opt.votes / totalVotes) * 100);
            return (
              <div key={opt.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-white">{opt.text}</span>
                  <span className="text-red-400 font-mono font-bold">{opt.votes} Oy (%{percentage})</span>
                </div>
                <div className="h-3 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
