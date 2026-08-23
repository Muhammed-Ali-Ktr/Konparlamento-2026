'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLegalConsent } from '@/context/LegalConsentContext';
import { useNotifications } from '@/context/NotificationContext';
import { initialData } from '@/lib/supabase';
import { Sparkles, User, Mail, Phone, Lock, KeyRound, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('invite') || '';

  const { hasConsented, setShowModal: openKvkkModal } = useLegalConsent();
  const { addNotification } = useNotifications();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    grade: '',
    gender: 'Erkek',
    requestedRole: 'Dışişleri ve Uluslararası İlişkiler Komisyonu',
    motivation: '',
    pin: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasConsented) {
      openKvkkModal(true);
      setErrorMsg('Başvuru göndermek için önce KVKK Aydınlatma Metnini onaylamalısınız.');
      return;
    }

    if (formData.pin.length !== 6 || !/^\d+$/.test(formData.pin)) {
      setErrorMsg('Lütfen tam 6 haneli rakamlardan oluşan şifre/PIN belirleyiniz.');
      return;
    }

    setErrorMsg('');

    // Add to local applications array
    const newApp = {
      id: 'app-' + Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age) || 18,
      grade: formData.grade,
      gender: formData.gender,
      motivation: formData.motivation,
      pin: formData.pin,
      requestedRole: formData.requestedRole,
      status: 'BEKLEMEDE' as const,
      createdAt: new Date().toISOString(),
    };

    initialData.applications.unshift(newApp);

    addNotification(
      'Başvurunuz Alındı!',
      'Başvurunuz inceleme sırasına alınmıştır. Admin onayının ardından bilgilendirileceksiniz.',
      'BASVURU_ONAY'
    );

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-950/40 border border-red-900/40 rounded-full inline-block">
          ÖZEL KATILIMCI BAŞVURUSU
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Katılımcı Kayıt Formu
        </h1>
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Konparlamento 2026'ya katılmak için kişisel bilgilerinizi doldurunuz. Başvurunuz onaylandığında profiliniz aktif hale gelecektir.
        </p>
        {inviteToken && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> Davet Kodu Doğrulandı: <span className="font-mono font-bold">{inviteToken}</span>
          </div>
        )}
      </div>

      {submitted ? (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-900/40 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/40">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">Başvurunuz Başarıyla Gönderildi!</h2>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Başvurunuz <span className="font-bold text-red-400">BEKLEMEDE</span> durumundadır. Yönetim ekibi inceledikten sonra sonucunuz profil sayfanıza ve bildirim kutunuza iletilecektir.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => router.push('/profil')}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/40 transition"
            >
              Profil Sayfama Git
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Name Surname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Adınız *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Ahmet"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Soyadınız *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Yılmaz"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ahmet@gmail.com"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Telefon Numarası *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 555 123 4567"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Age, Grade, Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Yaş *</label>
                <input
                  type="number"
                  required
                  min={14}
                  max={30}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="19"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Sınıf / Eğitim *</label>
                <input
                  type="text"
                  required
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="Lise 4 / Üniv 2"
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-semibold text-zinc-300">Cinsiyet *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
                >
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
                </select>
              </div>
            </div>

            {/* Target Committee */}
            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Tercih Edilen Komisyon *</label>
              <select
                value={formData.requestedRole}
                onChange={(e) => setFormData({ ...formData, requestedRole: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500"
              >
                {initialData.committees.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Motivation */}
            <div className="space-y-1">
              <label className="block font-semibold text-zinc-300">Etkinliğe Neden Katılmak İstiyorsunuz? *</label>
              <textarea
                rows={3}
                required
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Katılım amacınızı ve beklentilerinizi yazınız..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-red-500 resize-none"
              />
            </div>

            {/* 6-Digit PIN */}
            <div className="space-y-1 p-4 bg-red-950/20 border border-red-900/30 rounded-2xl">
              <label className="block font-semibold text-white">6 Haneli Hesap Parolası / PIN *</label>
              <input
                type="password"
                maxLength={6}
                required
                value={formData.pin}
                onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                placeholder="******"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-mono text-center tracking-widest text-lg outline-none focus:border-red-500"
              />
              <span className="text-[10px] text-zinc-400 block mt-1">
                Giriş yaparken bu 6 haneli PIN kodunu kullanacaksınız. Lütfen unutmayınız!
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/80 border border-red-500 text-red-200 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-red-950/60 transition"
            >
              Başvuruyu Tamamla ve Gönder
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-zinc-400 text-xs">Yükleniyor...</div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
