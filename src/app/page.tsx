'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '@/components/CountdownTimer';
import {
  Sparkles,
  Calendar,
  MapPin,
  ArrowRight,
  Target,
  Compass,
  Award,
  Users,
  MessageSquare,
  Scale,
  Brain,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const abilities = [
    { title: 'Temsil Yeteneği', desc: 'Gençlerin karar alma süreçlerinde fikirlerini savunma gücü.', icon: Users },
    { title: 'Liderlik', desc: 'Komisyonlarda inisiyatif alma ve grupları yönlendirme becerisi.', icon: Award },
    { title: 'Etkili İletişim', desc: 'Müzakere dili ve topluluk önünde nitelikli hitabet.', icon: MessageSquare },
    { title: 'Derin Araştırma', desc: 'Ulusal ve uluslararası sorunları kökenleriyle analiz etme.', icon: Brain },
    { title: 'Parlamenter Tartışma', desc: 'İç tüzük çerçevesinde saygılı ve düzeyli muhalefet.', icon: Scale },
    { title: 'Karar Alma', desc: 'Yasa tasarıları ve uzlaşı metinleri üzerinde oy kullanma.', icon: Target },
  ];

  const highlights = [
    {
      title: 'Dinamik Komisyonlar',
      desc: 'Dışişleri, İnsan Hakları, Ekonomi ve Çevre alanlarında 4 ana komisyon.',
      link: '/komisyonlar',
      badge: '4 Komisyon',
    },
    {
      title: '4 Günlük Etkinlik Programı',
      desc: 'Saat saat planlanmış oturumlar, kriz senaryoları ve sosyal program.',
      link: '/program',
      badge: '4 Gün',
    },
    {
      title: 'Canlı Bilmece ve Oylama',
      desc: 'Katılımcıların anlık etkileşime girebildiği dijital oylama sistemleri.',
      link: '/oylama',
      badge: 'İnteraktif',
    },
    {
      title: 'Katılımcı Görsel Galerisi',
      desc: 'Anılarınızı sıkıştırarak ücretsiz ve hızlı şekilde yükleyin.',
      link: '/galeri',
      badge: 'Medya',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-8 relative z-10">
          {/* Logo & Main Headline */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative animate-float">
              <Image
                src="/konparlamento-logo.png"
                alt="Konparlamento 2026 Logo"
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl">
              KONPARLAMENTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-rose-400">2026</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
              Fikirlerin yasalaştığı, gençlerin geleceği şekillendirdiği 4 günlük parlamenter demokrasi deneyimi.
            </p>
          </div>

          {/* Event Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-zinc-300 font-medium pt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl">
              <Calendar className="w-4 h-4 text-red-500" />
              <span>15 — 18 Nisan 2026</span>
            </div>
            <div className="flex min-w-0 max-w-full items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-center">Ahmet Keleşeoğlu Kültür Merkezi / Konya</span>
            </div>
          </div>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/katilimci-kayit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-red-950/60 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
            >
              <span>Başvuru Yap</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/program"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-semibold text-base rounded-2xl flex items-center justify-center gap-2 transition"
            >
              Etkinlik Programı
            </Link>
          </div>
        </div>

        {/* Countdown Timer Block */}
        <div className="mt-14">
          <CountdownTimer />
        </div>
      </section>

      {/* 2. KONPARLAMENTO NEDİR? */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-zinc-800">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
                ETKİNLİK HAKKINDA
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Konparlamento Nedir?
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                Konparlamento 2026; lise ve üniversite öğrencilerinin Türkiye ve dünya gündemindeki kritik meseleleri parlamenter iç tüzük kurallarına uygun olarak müzakere ettiği, yasa tasarıları kaleme aldığı ve karar aldığı simülasyon platformudur.
              </p>
              <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
                4 gün boyunca süren oturumlarda katılımcılar sadece teorik bilgi elde etmekle kalmaz; diplomasi dili, grup dinamiği ve kriz yönetimi konularında pratik deneyim kazanır.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 bg-zinc-900/90 border border-red-900/40 rounded-2xl text-center space-y-3 w-full">
                <ShieldCheck className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="font-bold text-white text-lg">Resmi Sertifikalı</h3>
                <p className="text-xs text-zinc-400">
                  Tüm oturumları başarıyla tamamlayan delegelere Konparlamento Katılım Belgesi verilecektir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VİZYON VE MİSYON */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Vizyonumuz</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Gençlerin demokrasi bilincini en üst düzeye çıkararak ulusal ve uluslararası platformlarda söz sahibi, analitik düşünebilen ve etik değerlere bağlı geleceğin liderlerini yetiştirmek.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Misyonumuz</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Tarafsız, kapsayıcı ve nitelikli bir parlamenter müzakere ortamı sunarak gençlerin toplumsal sorunlara akılcı çözümler üretmesini ve karar alma süreçlerine etkin katılımını desteklemektir.
            </p>
          </div>
        </div>
      </section>

      {/* 4. KATILIMCI KAZANIMLARI (ABILITIES GRID) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            HEDEFLENEN YETKİNLİKLER
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Konparlamento Katılımcılarına Ne Kazandırır?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {abilities.map((ab, idx) => {
            const Icon = ab.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600/40 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-red-500 flex items-center justify-center border border-zinc-800 mb-4 group-hover:bg-red-600 group-hover:text-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">{ab.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{ab.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ÖNE ÇIKAN ALANLAR (HIGHLIGHT CARDS) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            KEŞFET
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Platformun Öne Çıkan Özellikleri
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((hl, idx) => (
            <Link
              key={idx}
              href={hl.link}
              className="glass-panel p-6 rounded-2xl border border-zinc-800 hover:border-red-500/50 flex flex-col justify-between group transition transform hover:-translate-y-1"
            >
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-red-950/60 border border-red-800/40 text-red-400 rounded-full inline-block mb-3">
                  {hl.badge}
                </span>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-red-400 transition">
                  {hl.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{hl.desc}</p>
              </div>
              <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-red-400 group-hover:text-red-300">
                <span>İncele</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. MAIN CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-red-950 via-zinc-900 to-black p-8 sm:p-14 border border-red-800/50 shadow-2xl text-center space-y-6 overflow-hidden">
          <div className="absolute inset-0 bg-red-600/10 pointer-events-none blur-3xl" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight relative z-10">
            Sen de Konparlamento'nun Bir Parçası Ol
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto relative z-10">
            Kontenjanlar sınırlıdır. Komisyon tercihinizi yapmak ve delegasyon üyesi olarak yerinizi ayırtmak için başvurunuzu hemen gönderin.
          </p>
          <div className="pt-2 relative z-10 flex justify-center">
            <Link
              href="/katilimci-kayit"
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-red-900/60 transition flex items-center gap-2"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Başvuru Formuna Git</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
