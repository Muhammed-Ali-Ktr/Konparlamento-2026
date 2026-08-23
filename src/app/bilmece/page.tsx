'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useLegalConsent } from '@/context/LegalConsentContext';
import { HelpCircle, CheckCircle, Send, AlertTriangle, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RiddlePage() {
  const { user, isLoggedIn } = useAuth();
  const { hasConsented, setShowModal: openKvkkModal } = useLegalConsent();

  const activeRiddle = initialData.riddles.find((r) => r.isActive) || initialData.riddles[0];

  const [answerText, setAnswerText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if current user already submitted answer
  const existingAnswer = initialData.riddleAnswers.find(
    (a) => a.riddleId === activeRiddle?.id && a.userId === user?.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      setErrorMsg('Bilmeceyi cevaplamak için giriş yapmanız zorunludur.');
      return;
    }

    if (!hasConsented) {
      openKvkkModal(true);
      return;
    }

    if (!answerText.trim()) {
      setErrorMsg('Lütfen yanıtınızı yazınız.');
      return;
    }

    const newAnswer = {
      id: 'ra-' + Date.now(),
      riddleId: activeRiddle.id,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`.trim(),
      answerText: answerText.trim(),
      status: 'BEKLIYOR' as const,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    initialData.riddleAnswers.unshift(newAnswer);
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-950/40 border border-red-900/40 rounded-full inline-block">
          GÜNÜN PARLAMENTO BİLMEDECESİ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Bilmece & Zeka Yarışması
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Parlamenter kültür bilginizi test edin. Yanıtlarınız yönetim ekibi tarafından incelenip puanlanacaktır.
        </p>
      </div>

      {!isLoggedIn ? (
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 text-center space-y-4">
          <Lock className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Giriş Yapılması Zorunludur</h3>
          <p className="text-xs text-zinc-400">
            Bilmeceyi yanıtlamak ve puan kazanmak için onaylı hesabınızla giriş yapınız.
          </p>
          <Link
            href="/giris"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/40"
          >
            Giriş Yap
          </Link>
        </div>
      ) : existingAnswer || submitted ? (
        <div className="glass-panel p-8 rounded-3xl border border-red-900/40 text-center space-y-4 animate-fade-in">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Yanıtınız Alındı!</h3>
          <p className="text-xs text-zinc-300">
            Gönderdiğiniz cevap: <span className="font-semibold text-white font-mono bg-zinc-950 px-3 py-1 rounded-lg">{existingAnswer?.answerText || answerText}</span>
          </p>
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 inline-block text-xs text-zinc-400">
            Değerlendirme Durumu: <span className="font-bold text-amber-400">Admin İnceliyor</span>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 space-y-6">
          {/* Riddle Card */}
          <div className="p-6 bg-zinc-950 border border-red-900/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Günün Sorusudur</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-white leading-relaxed">
              "{activeRiddle.question}"
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Cevabınız *</label>
              <textarea
                rows={3}
                required
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Cevabınızı buraya yazınız..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 resize-none text-sm"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>CEVAPLA</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
