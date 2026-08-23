'use client';

import React from 'react';
import { initialData } from '@/lib/supabase';
import { Layers, Plus, Trash2, Edit } from 'lucide-react';

export default function CommitteesAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            İÇERİK VE İÇ TÜZÜK
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Komisyon & Üye Yönetimi
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.committees.map((c) => (
          <div key={c.id} className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{c.title}</h3>
                <span className="text-xs text-red-400">Başkan: {c.chairPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">{c.shortDescription}</p>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>{c.members.length} Üye Listelendi</span>
              <span>3 Slayt Görseli Yüklü</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
