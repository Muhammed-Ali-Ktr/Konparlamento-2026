'use client';

import React from 'react';
import { initialData } from '@/lib/supabase';
import Link from 'next/link';
import {
  FileCheck2,
  Users,
  Layers,
  ImageIcon,
  Clock,
  HelpCircle,
  Vote,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const pendingPhotosCount = initialData.participantUploads.filter((p) => p.status === 'BEKLEMEDE').length;
  const pendingAppsCount = initialData.applications.filter((a) => a.status === 'BEKLEMEDE').length;

  const stats = [
    { label: 'Başvurular', val: 24, badge: `${pendingAppsCount} Bekleyen`, href: '/admin/basvurular', icon: FileCheck2 },
    { label: 'Onaylı Kullanıcı', val: 86, badge: 'Aktif', href: '/admin/kullanicilar', icon: Users },
    { label: 'Komisyonlar', val: 4, badge: '4 Komisyon', href: '/admin/komisyonlar', icon: Layers },
    { label: 'Galeri Fotoğrafı', val: 124, badge: 'Yayında', href: '/admin/galeri', icon: ImageIcon },
    { label: 'Bekleyen Fotoğraf', val: pendingPhotosCount || 12, badge: 'Onay Bekliyor', href: '/admin/galeri', icon: Clock },
    { label: 'Bilmece Yanıtı', val: initialData.riddleAnswers.length, badge: 'Yanıtlandı', href: '/admin/bilmeceler', icon: HelpCircle },
    { label: 'Aktif Oylama', val: 1, badge: 'Canlı Oylama', href: '/admin/oylamalar', icon: Vote },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            GENEL BAKIŞ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Konparlamento Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl">
          <ShieldCheck className="w-4 h-4" /> Sistem Durumu: %100 Çalışıyor
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Link
              key={idx}
              href={st.href}
              className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-red-600/40 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-red-950/60 border border-red-800/40 text-red-400 rounded-full">
                  {st.badge}
                </span>
                <div className="p-2 rounded-xl bg-zinc-900 text-red-500 border border-zinc-800 group-hover:bg-red-600 group-hover:text-white transition">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-white tracking-tight">{st.val}</span>
                <h3 className="text-xs font-semibold text-zinc-400 mt-1">{st.label}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Applications & Pending Moderation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-red-500" /> Son Başvurular
            </h2>
            <Link href="/admin/basvurular" className="text-xs text-red-400 font-semibold hover:text-red-300">
              Tümünü Gör →
            </Link>
          </div>

          <div className="space-y-3">
            {initialData.applications.map((app) => (
              <div
                key={app.id}
                className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{app.firstName} {app.lastName}</h4>
                  <span className="text-zinc-400 block">{app.requestedRole}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  app.status === 'ONAYLANDI'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    : 'bg-amber-950 text-amber-300 border border-amber-500'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Photos Moderation Queue */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-500" /> Moderasyon Bekleyen Görseller
            </h2>
            <Link href="/admin/galeri" className="text-xs text-red-400 font-semibold hover:text-red-300">
              Moderasyon Paneli →
            </Link>
          </div>

          <div className="space-y-3">
            {initialData.participantUploads.map((photo) => (
              <div
                key={photo.id}
                className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={photo.url}
                    alt={photo.userName}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-800"
                  />
                  <div>
                    <h4 className="font-bold text-white">{photo.userName}</h4>
                    <span className="text-[10px] text-zinc-400 block">{photo.uploadedAt}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  photo.status === 'ONAYLANDI'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                    : 'bg-amber-950 text-amber-300 border border-amber-500'
                }`}>
                  {photo.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
