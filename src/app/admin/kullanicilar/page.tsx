'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { Users, Shield, UserCheck, Search, CheckCircle } from 'lucide-react';

export default function UsersAdminPage() {
  const [roleFilter, setRoleFilter] = useState('TÜMÜ');

  const mockUsers = [
    { id: 'u-1', name: 'Muhammed Ali Kıtır', email: 'muhammed@konparlamento.org', role: 'SUPER_ADMIN', committee: 'Dışişleri Komisyonu' },
    { id: 'u-2', name: 'Ahmet Faruk Yılmaz', email: 'ahmet@konparlamento.org', role: 'YÖNETİCİ', committee: 'Dışişleri Komisyonu' },
    { id: 'u-3', name: 'Elif Nur Öztürk', email: 'elif@konparlamento.org', role: 'KOMİSYON_SORUMLUSU', committee: 'İnsan Hakları Komisyonu' },
    { id: 'u-4', name: 'Emre Can Sever', email: 'emre@konparlamento.org', role: 'İÇERİK_EDİTÖRÜ', committee: 'Medya Ekibi' },
    { id: 'u-5', name: 'Zeynep Demir', email: 'zeynep@gmail.com', role: 'KATILIMCI', committee: 'İnsan Hakları Komisyonu' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            YETKİLENDİRME & ROLLER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Kullanıcı ve Rol Yönetimi
          </h1>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-bold border-b border-zinc-800">
              <tr>
                <th className="p-4">Kullanıcı</th>
                <th className="p-4">E-Posta</th>
                <th className="p-4">Atanan Komisyon</th>
                <th className="p-4">Rol</th>
                <th className="p-4 text-right">Rol Değiştir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-900/60 transition">
                  <td className="p-4 font-bold text-white">{u.name}</td>
                  <td className="p-4 text-zinc-400">{u.email}</td>
                  <td className="p-4 font-medium text-red-400">{u.committee}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-red-950 text-red-300 border border-red-800">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      defaultValue={u.role}
                      className="p-1.5 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white outline-none focus:border-red-500"
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="YÖNETİCİ">YÖNETİCİ</option>
                      <option value="İÇERİK_EDİTÖRÜ">İÇERİK_EDİTÖRÜ</option>
                      <option value="KOMİSYON_SORUMLUSU">KOMİSYON_SORUMLUSU</option>
                      <option value="KATILIMCI">KATILIMCI</option>
                    </select>
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
