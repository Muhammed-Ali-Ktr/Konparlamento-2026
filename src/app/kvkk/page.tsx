'use client';

import React from 'react';
import { initialData } from '@/lib/supabase';
import { ShieldCheck, FileText } from 'lucide-react';

export default function KvkkPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-red-600 pl-3">
        <ShieldCheck className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">KVKK Aydınlatma Metni</h1>
          <p className="text-xs text-zinc-400">6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme</p>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 text-zinc-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
        {initialData.legalDocs.kvkk}
      </div>
    </div>
  );
}
