'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string; // ISO string e.g. "2026-04-15T09:00:00"
}

export default function CountdownTimer({ targetDate = "2026-04-15T09:00:00" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isStarted: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isStarted: false,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isStarted) {
    return (
      <div className="p-4 bg-gradient-to-r from-red-950/60 to-zinc-900 border border-red-500/40 rounded-2xl text-center shadow-lg animate-fade-in">
        <span className="text-red-400 font-extrabold text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-red-500 animate-pulse" /> ETKİNLİK BAŞLADI! CANLI OTURUMLAR DEVAM EDİYOR
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-2">
        <span className="text-xs font-semibold text-red-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Clock className="w-4 h-4" /> ETKİNLİK GERİ SAYIMI
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {/* Days */}
        <div className="bg-zinc-900/90 border border-red-900/40 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
          <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1 block">
            GÜN
          </span>
        </div>

        {/* Hours */}
        <div className="bg-zinc-900/90 border border-red-900/40 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
          <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1 block">
            SAAT
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-zinc-900/90 border border-red-900/40 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
          <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1 block">
            DAKİKA
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-zinc-900/90 border border-red-900/40 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
          <span className="block text-2xl sm:text-4xl font-extrabold text-red-500 font-mono tracking-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-400 font-medium uppercase tracking-wider mt-1 block">
            SANİYE
          </span>
        </div>
      </div>
    </div>
  );
}
