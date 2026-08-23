'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ProgramPage() {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  const currentDayData = initialData.programDays.find((d) => d.dayNumber === selectedDayNumber) || initialData.programDays[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Etkinlik Programı — Konparlamento 2026
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          15 — 18 Nisan 2026 tarihleri arasında gerçekleşecek saat saat detaylandırılmış oturum takvimi.
        </p>
      </div>

      {/* 4 Days Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {initialData.programDays.map((day) => {
          const isActive = day.dayNumber === selectedDayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayNumber(day.dayNumber)}
              className={`p-4 rounded-2xl border text-center font-bold transition flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-900/40'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <span className="text-xs uppercase tracking-widest opacity-80">{day.dayNumber}. GÜN</span>
              <span className="text-sm sm:text-base font-extrabold">
                {day.dayNumber === 1 && '15 Nisan'}
                {day.dayNumber === 2 && '16 Nisan'}
                {day.dayNumber === 3 && '17 Nisan'}
                {day.dayNumber === 4 && '18 Nisan'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Timeline */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            <span>{currentDayData.title}</span>
          </h2>
          <span className="text-xs text-zinc-400 font-medium">lu Kongre Merkezi</span>
        </div>

        {/* Hourly Events List */}
        <div className="space-y-4 relative before:absolute before:left-4 sm:before:left-24 before:top-4 before:bottom-4 before:w-0.5 before:bg-red-950/60">
          {currentDayData.events.map((ev, idx) => (
            <div
              key={idx}
              className="relative pl-10 sm:pl-36 group transition"
            >
              {/* Time Badge Left */}
              <div className="absolute left-0 sm:left-0 top-1.5 flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-xl shadow-sm z-10">
                <Clock className="w-3.5 h-3.5" />
                <span>{ev.time}</span>
              </div>

              {/* Event Card */}
              <div className="glass-panel p-5 rounded-2xl border border-zinc-800 hover:border-red-600/40 transition">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition">
                  {ev.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {ev.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
