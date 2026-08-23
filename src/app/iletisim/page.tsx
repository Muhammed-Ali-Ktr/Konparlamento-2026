'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { Mail, Phone, MapPin, Instagram, ExternalLink, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          İletişim & Ulaşım
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Konparlamento 2026 sorularınız, sponsorluk görüşmeleriniz ve bilgi talepleriniz için ekibimizle iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-6">
            <h2 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
              İletişim Bilgilerimiz
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <Mail className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">E-Posta Adresi</span>
                  <span className="text-zinc-400">{initialData.siteSettings.contactEmail}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Telefon Numarası</span>
                  <span className="text-zinc-400">{initialData.siteSettings.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Etkinlik Konumu</span>
                  <span className="text-zinc-400">{initialData.siteSettings.location}</span>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="pt-2 space-y-3">
              <a
                href={initialData.siteSettings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-2xl text-xs font-semibold text-zinc-200 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-red-500" />
                  <span>Resmi Instagram Hesabımız</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>

              <a
                href={initialData.siteSettings.previousEventUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 bg-gradient-to-r from-red-950/60 to-zinc-900 hover:from-red-900/60 border border-red-900/40 rounded-2xl text-xs font-semibold text-red-300 flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-red-500" />
                  <span>Konparlamento 2025 Arşiv Sitesi</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form & Google Maps Embed */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
              Bize Mesaj Gönderin
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-500 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Mesajınız Alındı!</h3>
                <p className="text-xs text-zinc-300">
                  En kısa sürede e-posta adresiniz üzerinden geri dönüş sağlanacaktır.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-semibold text-zinc-300">Adınız Soyadınız</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-red-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-semibold text-zinc-300">E-Posta Adresiniz</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ahmet@gmail.com"
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-zinc-300">Konu</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Başvuru / Sponsorluk Hk."
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-red-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-zinc-300">Mesajınız</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mesajınızı detaylıca yazınız..."
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-red-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Mesajı Gönder</span>
                </button>
              </form>
            )}
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-3xl overflow-hidden border border-zinc-800 h-64 shadow-2xl">
            <iframe
              src={initialData.siteSettings.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
