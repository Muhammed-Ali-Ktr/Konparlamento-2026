'use client';

import React from 'react';
import { initialData } from '@/lib/supabase';
import { Cookie } from 'lucide-react';

export default function CookiePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-red-600 pl-3">
        <Cookie className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Çerez Politikası</h1>
          <p className="text-xs text-zinc-400">Teknik ve Zorunlu Oturum Çerezleri Bilgilendirmesi</p>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 text-zinc-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
        {initialData.legalDocs.cerez}
      </div>
    </div>
  );
}
