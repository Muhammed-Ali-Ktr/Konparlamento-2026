'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import {
  Menu,
  X,
  Bell,
  User,
  ShieldAlert,
  LogOut,
  HelpCircle,
  Vote,
  Sparkles,
  Check,
  ChevronRight,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflowY = mobileMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflowY = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Komisyonlar', href: '/komisyonlar' },
    { label: 'Program', href: '/program' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  const participantLinks = [
    { label: 'Bilmece', href: '/bilmece', icon: HelpCircle },
    { label: 'Oylama', href: '/oylama', icon: Vote },
  ];

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/95 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-red-600/30 to-black p-1 border border-red-600/40 group-hover:border-red-500 transition">
            <Image
              src="/konparlamento-logo.png"
              alt="Konparlamento 2026 Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
            />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
              KONPARLAMENTO <span className="text-red-500">2026</span>
            </span>
            <span className="text-[10px] text-zinc-400 block -mt-1 font-medium tracking-widest uppercase">
              Gençlik Parlamenter Platformu
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'text-white bg-red-600/20 border border-red-500/40 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & User Dropdown */}
        <div className="flex items-center gap-3">
          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white transition"
              title="Bildirimler"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Box */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-500" /> Bildirimler
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-red-400 hover:text-red-300 font-medium"
                    >
                      Tümünü Okundu İşaretle
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-800/60 custom-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-xs text-zinc-400 text-center">Bildirim bulunmuyor.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3.5 hover:bg-zinc-800/50 cursor-pointer transition ${
                          !n.isRead ? 'bg-red-950/20 border-l-2 border-red-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white">{n.title}</h4>
                          {!n.isRead && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1" />}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                        <span className="text-[10px] text-zinc-500 mt-2 block">
                          {new Date(n.createdAt).toLocaleDateString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logged In User Profile / Admin Link */}
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/profil"
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl text-xs font-medium text-white transition"
              >
                <div className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center font-bold">
                  {user?.firstName?.[0] || 'K'}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user?.firstName}</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium text-xs rounded-xl shadow-md shadow-red-900/40 flex items-center gap-1.5 transition"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/giris"
                className="px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl transition"
              >
                Giriş Yap
              </Link>
              <Link
                href="/katilimci-kayit"
                className="px-3.5 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg shadow-red-900/30 transition flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> Başvuru Yap
              </Link>
            </div>
          )}

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-zinc-900 border border-zinc-700/60 text-zinc-300 hover:text-white"
            aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed left-0 right-0 top-20 bottom-0 z-40 bg-zinc-950 lg:hidden flex flex-col justify-between p-6 animate-in slide-in-from-right overflow-y-auto">
          <div className="space-y-6">
            {/* Nav links */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block px-3">
                Navigasyon
              </span>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl font-medium text-base transition ${
                    pathname === link.href
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              ))}
            </div>

            {/* Interactive participant links */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block px-3">
                Katılımcı Özel
              </span>
              {participantLinks.map((pl) => {
                const IconComp = pl.icon;
                return (
                  <Link
                    key={pl.href}
                    href={pl.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl font-medium text-sm text-zinc-200 hover:bg-zinc-900 bg-zinc-950/60 border border-zinc-800"
                  >
                    <IconComp className="w-4 h-4 text-red-500" />
                    <span>{pl.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom user actions in drawer */}
          <div className="pt-6 border-t border-zinc-800 space-y-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full p-3 bg-zinc-900 border border-zinc-700/60 rounded-xl flex items-center gap-3 text-sm font-medium text-white"
                >
                  <User className="w-5 h-5 text-red-500" />
                  <span>Profilim ({user?.firstName})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full p-3 bg-red-950/30 text-red-400 border border-red-900/40 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/giris"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center bg-zinc-900 border border-zinc-700 text-sm font-medium text-white rounded-xl"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/katilimci-kayit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 text-center bg-red-600 text-sm font-semibold text-white rounded-xl shadow-lg shadow-red-900/40"
                >
                  Başvuru Yap
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
