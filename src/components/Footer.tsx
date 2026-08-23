'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Mail, Phone, MapPin, Instagram, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/30 to-black p-1 border border-red-600/40">
                <Image
                  src="/konparlamento-logo.png"
                  alt="Konparlamento Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                KONPARLAMENTO <span className="text-red-500">2026</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Konparlamento 2026; gençlerin liderlik, temsil, tartışma ve karar alma becerilerini geliştirmeyi hedefleyen 4 günlük simülasyon etkinliğidir.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href="https://instagram.com/konparlamento"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-red-400 transition flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-red-500" />
                <span>Instagram</span>
              </a>
              <a
                href="https://2025.konparlamento.org"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-red-400 transition flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-red-500" />
                <span>Konparlamento 2025</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hakkimizda" className="hover:text-red-400 transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/komisyonlar" className="hover:text-red-400 transition">
                  Komisyonlar
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-red-400 transition">
                  Etkinlik Programı
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-red-400 transition">
                  Galeri ve Organizasyon Ekibi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Participant Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Katılımcı Özel
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/katilimci-kayit" className="hover:text-red-400 transition">
                  Başvuru Yap
                </Link>
              </li>
              <li>
                <Link href="/giris" className="hover:text-red-400 transition">
                  Katılımcı Girişi
                </Link>
              </li>
              <li>
                <Link href="/bilmece" className="hover:text-red-400 transition">
                  Günün Bilmecesi
                </Link>
              </li>
              <li>
                <Link href="/oylama" className="hover:text-red-400 transition">
                  Canlı Oylama
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-red-400 transition">
                  Profilim & Fotoğraflarım
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Hukuki & Legal */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Hukuki Metinler
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kvkk" className="hover:text-red-400 transition">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="hover:text-red-400 transition">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="hover:text-red-400 transition">
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link href="/kullanim-kosullari" className="hover:text-red-400 transition">
                  Kullanım Koşulları
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Konparlamento. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-1">
            <span>Tasarım & Geliştirme:</span>
            <span className="text-zinc-300 font-semibold">Konparlamento Yazılım Ekipleri</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
