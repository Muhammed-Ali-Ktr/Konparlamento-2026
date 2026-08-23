'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, KeyRound, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsAdmin } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !pin) {
      setErrorMsg('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const res = await login(emailOrPhone, pin);
    if (res.success) {
      router.push('/profil');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/30">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Katılımcı Girişi</h1>
        <p className="text-xs text-zinc-400">
          E-posta adresiniz ve 6 haneli PIN şifrenizle giriş yapınız.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="block font-semibold text-zinc-300">E-Posta veya Telefon</label>
            <input
              type="text"
              required
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="muhammed@konparlamento.org"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-zinc-300">6 Haneli PIN Parolası</label>
            <input
              type="password"
              maxLength={6}
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="******"
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-mono text-center tracking-widest text-base outline-none focus:border-red-500"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-900/40 transition"
          >
            Giriş Yap
          </button>
        </form>

        <div className="pt-4 border-t border-zinc-800 text-center space-y-3">
          <span className="text-[11px] text-zinc-500 block">Hızlı Test & Admin İnceleme:</span>
          <button
            onClick={() => {
              loginAsAdmin();
              router.push('/admin');
            }}
            className="w-full p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span>Super Admin Olarak Giriş Yap & Admin Paneline Git</span>
          </button>
        </div>
      </div>
    </div>
  );
}
