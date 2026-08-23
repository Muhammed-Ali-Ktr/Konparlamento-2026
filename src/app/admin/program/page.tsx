'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { Calendar, Plus, Trash2, Edit, Clock } from 'lucide-react';

export default function ProgramAdminPage() {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [events, setEvents] = useState(initialData.programDays);

  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const currentDay = events.find((d) => d.dayNumber === selectedDayNumber) || events[0];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !title) return;

    const newEv = { time, title, description };
    const updated = events.map((d) =>
      d.dayNumber === selectedDayNumber ? { ...d, events: [...d.events, newEv] } : d
    );
    setEvents(updated);
    initialData.programDays = updated;

    setTime('');
    setTitle('');
    setDescription('');
  };

  const handleDeleteEvent = (index: number) => {
    const updated = events.map((d) =>
      d.dayNumber === selectedDayNumber
        ? { ...d, events: d.events.filter((_, idx) => idx !== index) }
        : d
    );
    setEvents(updated);
    initialData.programDays = updated;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest block">
            AKIS YÖNETİMİ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            4 Günlük Program Editörü
          </h1>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2">
        {events.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setSelectedDayNumber(day.dayNumber)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedDayNumber === day.dayNumber
                ? 'bg-red-600 text-white shadow-lg shadow-red-950/60'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            {day.dayNumber}. GÜN
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Events List */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white border-l-3 border-red-500 pl-2">
            {currentDay.title} Oturumları
          </h2>

          <div className="space-y-3">
            {currentDay.events.map((ev, idx) => (
              <div key={idx} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-red-950 text-red-400 font-mono font-bold rounded-lg border border-red-900">
                      {ev.time}
                    </span>
                    <h4 className="font-bold text-white">{ev.title}</h4>
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{ev.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(idx)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Event Form */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-red-500" /> Yeni Oturum Ekle
          </h2>

          <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Saat Aralığı *</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Örn: 11:30 - 13:00"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Oturum / Etkinlik Başlığı *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: 2. Komisyon Oturumu"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Açıklama</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Oturum içeriği..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-950/50"
            >
              Programa Ekle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
