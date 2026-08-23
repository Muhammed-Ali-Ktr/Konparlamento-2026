'use client';

import React, { useState, useEffect } from 'react';
import { initialData } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, X, User, ShieldCheck, FileText, CheckCircle2, ArrowRight, Award, HeartHandshake } from 'lucide-react';

export default function CommitteesPage() {
  const [selectedCommittee, setSelectedCommittee] = useState<typeof initialData.committees[0] | null>(null);

  // Active slide index for each committee card's 3-photo slideshow
  const [slideIndices, setSlideIndices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndices((prev) => {
        const updated = { ...prev };
        initialData.committees.forEach((c) => {
          const current = updated[c.id] || 0;
          updated[c.id] = (current + 1) % c.images.length;
        });
        return updated;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = (commId: string, max: number) => {
    setSlideIndices((prev) => {
      const current = prev[commId] || 0;
      return { ...prev, [commId]: current === 0 ? max - 1 : current - 1 };
    });
  };

  const handleNextSlide = (commId: string, max: number) => {
    setSlideIndices((prev) => {
      const current = prev[commId] || 0;
      return { ...prev, [commId]: (current + 1) % max };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Komisyonlarımız — Konparlamento 2026
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Etkinlik süresince 4 farklı alanda küresel ve ulusal meseleleri ele alacak bağımsız parlamenter komisyonlarımız.
        </p>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initialData.committees.map((comm) => {
          const activeIndex = slideIndices[comm.id] || 0;
          return (
            <div
              key={comm.id}
              className="glass-panel rounded-3xl overflow-hidden border border-zinc-800 flex flex-col justify-between hover:border-red-900/50 transition group"
            >
              {/* Top 3-Photo Slideshow */}
              <div className="relative h-64 w-full bg-zinc-900 overflow-hidden">
                <img
                  src={comm.images[activeIndex]}
                  alt={comm.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />

                {/* Slideshow Arrows */}
                <button
                  onClick={() => handlePrevSlide(comm.id, comm.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700"
                  aria-label="Önceki Görsel"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNextSlide(comm.id, comm.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700"
                  aria-label="Sonraki Görsel"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                  {comm.images.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeIndex ? 'bg-red-500 w-5' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition">
                    {comm.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {comm.shortDescription}
                  </p>
                </div>

                {/* Chair Info Badge */}
                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80">
                  <span className="font-medium text-zinc-300">Başkan: {comm.chairPerson}</span>
                  <button
                    onClick={() => setSelectedCommittee(comm)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 rounded-xl font-semibold text-xs transition flex items-center gap-1.5"
                  >
                    <span>Daha Fazla Göster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SPONSORS AND SUPPORTERS */}
      <div className="space-y-12 pt-4">
        <section className="space-y-7">
          <div className="flex items-center gap-3 border-l-4 border-red-600 pl-3">
            <Award className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Sponsorlarımız</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {initialData.sponsors.filter((s) => !s.isSupporter).map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-3 text-center"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-24 w-full object-contain grayscale group-hover:grayscale-0 transition duration-300"
                />
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition">
                  {sponsor.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-7">
          <div className="flex items-center gap-3 border-l-4 border-red-600 pl-3">
            <HeartHandshake className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Destekçi Kurumlar</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
            {initialData.sponsors.filter((s) => s.isSupporter).map((supporter) => (
              <a
                key={supporter.id}
                href={supporter.website}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-3 text-center"
              >
                <img
                  src={supporter.logo}
                  alt={supporter.name}
                  className="h-24 w-full object-contain grayscale group-hover:grayscale-0 transition duration-300"
                />
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition">
                  {supporter.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* DETAILED COMMITTEE MODAL */}
      {selectedCommittee && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
                  DETAYLI KOMİSYON İÇERİĞİ
                </span>
                <h2 className="text-xl font-bold text-white">{selectedCommittee.title}</h2>
              </div>
              <button
                onClick={() => setSelectedCommittee(null)}
                className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm text-zinc-300">
              {/* Detailed Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500" /> Ayrıntılı Açıklama
                </h3>
                <p className="text-xs leading-relaxed text-zinc-300 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                  {selectedCommittee.detailedDescription}
                </p>
              </div>

              {/* Purpose & Workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl space-y-1">
                  <span className="font-bold text-red-400 block">Komisyonun Amacı</span>
                  <p className="text-zinc-400 leading-relaxed">{selectedCommittee.purpose}</p>
                </div>
                <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl space-y-1">
                  <span className="font-bold text-red-400 block">Çalışma Şekli</span>
                  <p className="text-zinc-400 leading-relaxed">{selectedCommittee.workflow}</p>
                </div>
              </div>

              {/* Duties & Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl space-y-1">
                  <span className="font-bold text-red-400 block">Komisyon Görevleri</span>
                  <p className="text-zinc-400 leading-relaxed">{selectedCommittee.duties}</p>
                </div>
                <div className="p-4 bg-zinc-950/60 border border-zinc-800 rounded-2xl space-y-1">
                  <span className="font-bold text-red-400 block">Komisyon Kuralları</span>
                  <p className="text-zinc-400 leading-relaxed">{selectedCommittee.rules}</p>
                </div>
              </div>

              {/* Chair & Vice Chair */}
              <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-4 text-xs">
                <div className="text-center">
                  <span className="text-zinc-400 block">Komisyon Başkanı</span>
                  <span className="font-bold text-white text-sm">{selectedCommittee.chairPerson}</span>
                </div>
                <div className="text-center">
                  <span className="text-zinc-400 block">Başkan Yardımcısı</span>
                  <span className="font-bold text-white text-sm">{selectedCommittee.viceChairPerson}</span>
                </div>
              </div>

              {/* Members Slider */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500" /> Komisyon Üyeleri
                </h3>
                <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {selectedCommittee.members.map((m) => (
                    <div
                      key={m.id}
                      className="min-w-[160px] p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-center space-y-2 shrink-0"
                    >
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-14 h-14 rounded-full mx-auto object-cover border border-red-500/40"
                      />
                      <div>
                        <h4 className="font-semibold text-white text-xs">{m.name}</h4>
                        <span className="text-[10px] text-zinc-500 block">{m.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
