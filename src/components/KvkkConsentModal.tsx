'use client';

import React, { useState } from 'react';
import { useLegalConsent } from '@/context/LegalConsentContext';
import Link from 'next/link';
import { ShieldCheck, FileText, Lock, Cookie, CheckCircle, AlertTriangle } from 'lucide-react';

export default function KvkkConsentModal() {
  const { showModal, setShowModal, acceptConsents } = useLegalConsent();
  const [mandatory, setMandatory] = useState<boolean>(true);
  const [marketing, setMarketing] = useState<boolean>(false);
  const [photo, setPhoto] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!showModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mandatory) {
      setErrorMsg('Devam edebilmek için zorunlu KVKK Aydınlatma Metnini ve Kullanım Koşullarını onaylamalısınız.');
      return;
    }
    setErrorMsg('');
    acceptConsents(mandatory, marketing, photo);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-zinc-900 border border-red-900/40 rounded-2xl shadow-2xl overflow-hidden text-zinc-100">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950/80 via-zinc-900 to-zinc-900 border-b border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Aydınlatma Metni & Kişisel Veri İzinleri
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Konparlamento 2026 platformunu kullanmadan önce rıza tercihinizi belirtiniz.
            </p>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Platformumuzda güvenli bir deneyim yaşamanız için kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmektedir. Hukuki metinlerimizi dilediğiniz zaman inceleyebilirsiniz.
          </p>

          {/* Document Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            <Link
              href="/kvkk"
              target="_blank"
              className="p-2.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-2 text-zinc-300 hover:text-red-400 transition"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>KVKK Metni</span>
            </Link>
            <Link
              href="/gizlilik-politikasi"
              target="_blank"
              className="p-2.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-2 text-zinc-300 hover:text-red-400 transition"
            >
              <Lock className="w-4 h-4 text-red-500" />
              <span>Gizlilik</span>
            </Link>
            <Link
              href="/cerez-politikasi"
              target="_blank"
              className="p-2.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-2 text-zinc-300 hover:text-red-400 transition"
            >
              <Cookie className="w-4 h-4 text-red-500" />
              <span>Çerezler</span>
            </Link>
            <Link
              href="/kullanim-kosullari"
              target="_blank"
              className="p-2.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-2 text-zinc-300 hover:text-red-400 transition"
            >
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span>Koşullar</span>
            </Link>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-2">
            {/* Mandatory Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-red-950/20 border border-red-900/30 rounded-xl cursor-pointer hover:bg-red-950/30 transition">
              <input
                type="checkbox"
                checked={mandatory}
                onChange={(e) => setMandatory(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 rounded bg-zinc-900 border-zinc-700 focus:ring-red-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-white">
                  Zorunlu KVKK Aydınlatma Metni ve Kullanım Koşulları (Zorunlu)
                </span>
                <p className="text-zinc-400 mt-0.5">
                  Platform hizmetlerinin yürütülmesi, başvuru yönetimi ve güvenliği için gereklidir.
                </p>
              </div>
            </label>

            {/* Photo Consent Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-zinc-800/40 border border-zinc-700/40 rounded-xl cursor-pointer hover:bg-zinc-800/60 transition">
              <input
                type="checkbox"
                checked={photo}
                onChange={(e) => setPhoto(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 rounded bg-zinc-900 border-zinc-700 focus:ring-red-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-white">
                  Etkinlik Görseli Paylaşım ve Yükleme İzni (İsteğe Bağlı)
                </span>
                <p className="text-zinc-400 mt-0.5">
                  Etkinlik esnasında çekeceğiniz fotoğrafların onaylandıktan sonra katılımcı galerisinde yayınlanmasını kabul edersiniz.
                </p>
              </div>
            </label>

            {/* Marketing Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-zinc-800/40 border border-zinc-700/40 rounded-xl cursor-pointer hover:bg-zinc-800/60 transition">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-600 rounded bg-zinc-900 border-zinc-700 focus:ring-red-500"
              />
              <div className="text-xs">
                <span className="font-semibold text-white">
                  Bilgilendirme ve Etkinlik Duyurusu İletişim İzni (İsteğe Bağlı)
                </span>
                <p className="text-zinc-400 mt-0.5">
                  Gelecek Konparlamento etkinlikleri ve duyuruları için SMS/E-posta bilgilendirmesi yapılmasına izin verirsiniz.
                </p>
              </div>
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-xs rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-500">
              * Onay vermeden başvuru, oylama ve görsel yükleme yapılamaz.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium text-sm rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Seçimleri Kaydet ve Devam Et</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
