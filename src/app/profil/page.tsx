'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { initialData } from '@/lib/supabase';
import Link from 'next/link';
import { User, ShieldCheck, Bell, Camera, Clock, CheckCircle, XCircle, AlertCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoggedIn, logout } = useAuth();
  const { notifications } = useNotifications();

  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'notifs'>('info');

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Giriş Yapılmadı</h2>
        <p className="text-xs text-zinc-400">Profilinize erişmek için giriş yapmalısınız.</p>
        <Link
          href="/giris"
          className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/40"
        >
          Giriş Sayfasına Git
        </Link>
      </div>
    );
  }

  // Filter user's uploaded photos
  const myPhotos = initialData.participantUploads.filter((p) => p.userId === user.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header User Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={user.firstName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-red-600/40 shadow-xl"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h1>
              {user.status === 'ONAYLANDI' && (
                <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Onaylı Katılımcı
                </span>
              )}
              {user.status === 'BEKLEMEDE' && (
                <span className="px-2.5 py-0.5 bg-amber-950 border border-amber-500 text-amber-300 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Başvuru Bekliyor
                </span>
              )}
            </div>
            <p className="text-xs text-red-400 font-semibold mt-0.5">{user.committee || 'Komisyon Ataması Bekleniyor'}</p>
            <span className="text-xs text-zinc-400 block">{user.duty || 'Delegasyon Üyesi'}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" /> Çıkış Yap
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'info'
              ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          <User className="w-4 h-4" /> Bilgilerim & Komisyonum
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'photos'
              ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          <Camera className="w-4 h-4" /> Fotoğraflarım ({myPhotos.length})
        </button>

        <button
          onClick={() => setActiveTab('notifs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'notifs'
              ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
          }`}
        >
          <Bell className="w-4 h-4" /> Bildirimlerim
        </button>
      </div>

      {/* TAB 1: BİLGİLERİM */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm border-l-3 border-red-500 pl-2">
              Kişisel Bilgiler
            </h3>
            <div className="space-y-3 divide-y divide-zinc-800/80">
              <div className="pt-2 flex justify-between">
                <span className="text-zinc-400">E-Posta:</span>
                <span className="font-semibold text-white">{user.email}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-zinc-400">Telefon:</span>
                <span className="font-semibold text-white">{user.phone || '+90 555 *** ** **'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-zinc-400">Yaş & Eğitim:</span>
                <span className="font-semibold text-white">{user.age} Yaş / {user.grade || 'Üniversite'}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-zinc-400">Rol:</span>
                <span className="font-bold text-red-400">{user.role}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm border-l-3 border-red-500 pl-2">
              Etkinlik Hakları & Yetkiler
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                <span>Bilmece Yanıtlama:</span>
                <span className="font-bold text-emerald-400">Aktif</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                <span>Canlı Oylama Katılımı:</span>
                <span className="font-bold text-emerald-400">Aktif</span>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between">
                <span>Fotoğraf Yükleme Limiti:</span>
                <span className="font-bold text-zinc-200">Günlük Max 5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FOTOĞRAFLARIM STATUS TRACKER */}
      {activeTab === 'photos' && (
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-sm">Yüklediğim Görseller ve Durumları</h3>

          {myPhotos.length === 0 ? (
            <p className="text-xs text-zinc-400 py-6 text-center">Henüz fotoğraf yüklemediniz.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myPhotos.map((photo) => (
                <div key={photo.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
                  <img
                    src={photo.url}
                    alt="Fotoğrafım"
                    className="w-full h-36 object-cover rounded-xl border border-zinc-800"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{photo.uploadedAt}</span>
                    {photo.status === 'ONAYLANDI' && (
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500 font-bold text-[10px] rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Onaylandı
                      </span>
                    )}
                    {photo.status === 'BEKLEMEDE' && (
                      <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-500 font-bold text-[10px] rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Bekliyor
                      </span>
                    )}
                    {photo.status === 'REDDEDILDI' && (
                      <span className="px-2 py-0.5 bg-red-950 text-red-300 border border-red-500 font-bold text-[10px] rounded-full flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Reddedildi
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BİLDİRİMLERİM */}
      {activeTab === 'notifs' && (
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h3 className="font-bold text-white text-sm">Gelen Bildirimlerim</h3>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{n.title}</h4>
                  <span className="text-[10px] text-zinc-500">
                    {new Date(n.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <p className="text-zinc-400">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
