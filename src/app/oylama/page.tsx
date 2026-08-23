'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useLegalConsent } from '@/context/LegalConsentContext';
import { Vote, CheckCircle, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function VotingPage() {
  const { user, isLoggedIn } = useAuth();
  const { hasConsented, setShowModal: openKvkkModal } = useLegalConsent();

  const activePoll = initialData.polls.find((p) => p.isActive) || initialData.polls[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(() => {
    return initialData.pollVotes.some((v) => v.pollId === activePoll?.id && v.userId === user?.id);
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
      setErrorMsg('Oylamaya katılmak için giriş yapmanız zorunludur.');
      return;
    }

    if (!hasConsented) {
      openKvkkModal(true);
      return;
    }

    if (!selectedOptionId) {
      setErrorMsg('Lütfen bir seçenek işaretleyiniz.');
      return;
    }

    // Register vote locally
    initialData.pollVotes.push({
      pollId: activePoll.id,
      userId: user.id,
      optionId: selectedOptionId,
    });

    // Increment vote count in options
    const targetOpt = activePoll.options.find((o) => o.id === selectedOptionId);
    if (targetOpt) {
      targetOpt.votes += 1;
    }

    setHasVoted(true);
    setSuccessMsg('Oy vermeniz başarıyla kaydedildi.');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-950/40 border border-red-900/40 rounded-full inline-block">
          ETKİNLİK İÇİ OYLAMA
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Canlı Katılımcı Oylaması
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Oturumlar esnasında görüş belirtmek ve değerlendirmelerde bulunmak için oyunuzu kullanınız.
        </p>
      </div>

      {!isLoggedIn ? (
        <div className="glass-panel p-8 rounded-3xl border border-zinc-800 text-center space-y-4">
          <Lock className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">Giriş Yapılması Zorunludur</h3>
          <p className="text-xs text-zinc-400">
            Oy hakkınızı kullanabilmek için onaylı katılımcı hesabınızla giriş yapmalısınız.
          </p>
          <Link
            href="/giris"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/40"
          >
            Giriş Yap
          </Link>
        </div>
      ) : hasVoted ? (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-900/40 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">Oy Vermeniz Başarıyla Kaydedildi</h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Katılımınız için teşekkür ederiz. Oylama sonuçları tarafsızlık ilkesi gereği yalnızca yönetim panelinden takip edilecektir.
          </p>
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-500 inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Tekil Katılımcı Oy Kaydı Tamamlandı
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 space-y-6">
          <div className="p-6 bg-zinc-950 border border-red-900/30 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
              AKTİF OYLAMA SORUSU
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {activePoll.title}
            </h2>
          </div>

          <form onSubmit={handleVoteSubmit} className="space-y-4">
            <div className="space-y-3">
              {activePoll.options.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                    selectedOptionId === opt.id
                      ? 'bg-red-950/40 border-red-500 text-white shadow-md shadow-red-900/20'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="poll-option"
                    value={opt.id}
                    checked={selectedOptionId === opt.id}
                    onChange={() => setSelectedOptionId(opt.id)}
                    className="w-4 h-4 text-red-600 rounded-full border-zinc-700 focus:ring-red-500"
                  />
                  <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
                </label>
              ))}
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-red-900/50 flex items-center justify-center gap-2 transition"
            >
              <Vote className="w-4 h-4" />
              <span>OYUMU KAYDET</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
