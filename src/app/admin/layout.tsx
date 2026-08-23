'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  Layers,
  Calendar,
  Image as ImageIcon,
  HelpCircle,
  Vote,
  Bell,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, logout, loginAsAdmin } = useAuth();

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Başvurular', href: '/admin/basvurular', icon: FileCheck2 },
    { label: 'Kullanıcılar & Roller', href: '/admin/kullanicilar', icon: Users },
    { label: 'Komisyonlar', href: '/admin/komisyonlar', icon: Layers },
    { label: 'Etkinlik Programı', href: '/admin/program', icon: Calendar },
    { label: 'Galeri Moderasyonu', href: '/admin/galeri', icon: ImageIcon },
    { label: 'Bilmeceler & Yanıtlar', href: '/admin/bilmeceler', icon: HelpCircle },
    { label: 'Oylama Sonuçları', href: '/admin/oylamalar', icon: Vote },
    { label: 'Bildirim Gönder', href: '/admin/bildirimler', icon: Bell },
    { label: 'Site Ayarları', href: '/admin/ayarlar', icon: Settings },
    { label: 'Güvenlik Logları', href: '/admin/loglar', icon: Shield },
  ];

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 glass-panel rounded-3xl border border-red-900/40 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Yönetici Yetkisi Gerekli</h2>
        <p className="text-xs text-zinc-400">
          Bu panele sadece yetkili admin ve yöneticiler erişebilir.
        </p>
        <button
          onClick={loginAsAdmin}
          className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/40"
        >
          Super Admin Olarak Oturum Aç
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between shrink-0">
        <div className="p-4 space-y-6">
          {/* Header */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-black p-1 border border-red-500/40">
              <Image
                src="/konparlamento-logo.png"
                alt="Admin Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wider block">
                ADMIN PANEL
              </span>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
                Konparlamento 2026
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition ${
                    isActive
                      ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/60'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="p-4 border-t border-zinc-900 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold text-xs">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">{user?.firstName}</span>
              <span className="text-[10px] text-red-400 block">{user?.role}</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <span>Ana Siteye Dön</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
