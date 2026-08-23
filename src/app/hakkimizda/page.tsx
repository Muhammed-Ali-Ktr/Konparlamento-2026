'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Quote, Sparkles, Shield, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  // Photo Carousel State
  const carouselImages = [
    { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80", caption: "Gençlik Parlamenter Oturumu — Genel Kurul Hall" },
    { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80", caption: "Komisyon İçi Müzakereler & Tasarı Hazırlığı" },
    { url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80", caption: "Diplomatik Yazışma ve Karar Taslağı Oylaması" },
    { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", caption: "Kapanış ve Ödül Töreni Coşkusu" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Hakkımızda — Konparlamento 2026
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Türkiye'nin parlamenter demokrasi geleneklerini ve uluslararası müzakere kültürünü genç nesillere aktaran vizyoner simülasyon etkinliği.
        </p>
      </div>

      {/* Main Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-sm text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white border-l-4 border-red-600 pl-3">
            Konparlamento Kültürü ve Katılımcı Profili
          </h2>
          <p>
            Konparlamento, yalnızca teorik yasa tartışmalarının yapıldığı bir organizasyon değildir. Katılımcılar; farklı bakış açılarını dinleme, kriz anlarında soğukkanlı karar verme ve uzlaşı sağlama becerilerini pratik ederek geliştirir.
          </p>
          <p>
            Etkinliğimiz; lise ve üniversite çağındaki hevesli, analitik düşünebilen ve vizyoner gençleri tek bir çatı altında buluşturur.
          </p>

          <div className="space-y-2 pt-2">
            {[
              "Gerçek parlamenter iç tüzük ve usul kuralları",
              "Disiplinli komisyon yönetimi ve başkanlık divanı denetimi",
              "Resmi katılım belgesi ve derece ödülleri",
              "Sürdürülebilir ağ kurma (networking) imkanları",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-zinc-200">
                <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Box */}
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500" /> Etkinlik Süreci ve Kurallar
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Katılımcılardan oturum sürelerine tam zamanında riayet etmeleri, kılık-kıyafet yönetmeliğine uygun resmi giyim tercih etmeleri ve müzakere esnasında birbirlerine saygılı dil kullanmaları beklenmektedir.
          </p>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-xs font-bold text-red-400 block">Kılık Kıyafet Standardı</span>
            <p className="text-[11px] text-zinc-400">
              Erkek delegeler için takım elbise / kravat; kadın delegeler için resmi tayt/ceket kombinasyonları esastır.
            </p>
          </div>
        </div>
      </div>

      {/* FOTOĞRAF CAROUSEL (SONSUZ DÖNGÜ & MANUEL GEÇİŞ) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
            Etkinlikten Fotoğraflar
          </h2>
          <span className="text-xs text-zinc-500">
            {currentSlide + 1} / {carouselImages.length}
          </span>
        </div>

        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden glass-panel border border-zinc-800 shadow-2xl group">
          <img
            src={carouselImages[currentSlide].url}
            alt={carouselImages[currentSlide].caption}
            className="w-full h-full object-cover transition-transform duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
            <p className="text-sm sm:text-base font-semibold bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800 inline-block">
              {carouselImages[currentSlide].caption}
            </p>
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* VIDEO ALANI */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
          Konparlamento Tanıtım Filmi
        </h2>

        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-video max-w-4xl mx-auto shadow-2xl flex items-center justify-center group">
          {/* Simulated Responsive Video Container */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-red-950 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-12 h-12 text-red-500 mb-3 animate-pulse" />
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">
              Konparlamento 2026 Resmi Tanıtım Videosu
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              4 günlük etkinliğin atmosferini ve geçen seneki unutulmaz anları keşfedin.
            </p>

            {/* Custom Video Controls Bar */}
            <div className="mt-6 flex items-center gap-4 bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-zinc-800">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-red-600 hover:bg-red-500 rounded-xl text-white transition flex items-center gap-2 text-xs font-semibold"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-300 transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ETKİNLİK SÖZÜ */}
      <section className="pt-6">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-900/40 text-center space-y-4 relative overflow-hidden">
          <Quote className="w-12 h-12 text-red-600/30 mx-auto" />
          <blockquote className="text-lg sm:text-2xl font-serif italic text-zinc-200 max-w-3xl mx-auto leading-relaxed">
            "Geleceği tahmin etmenin en iyi yolu, onu bizzat inşa etmektir. Konparlamento'da gençler sadece konuşmaz; ortak akılla geleceği şekillendirir."
          </blockquote>
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest">
            — Konparlamento 2026 Teması
          </p>
        </div>
      </section>
    </div>
  );
}
