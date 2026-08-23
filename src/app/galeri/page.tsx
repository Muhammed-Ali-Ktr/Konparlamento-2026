'use client';

import React, { useState } from 'react';
import { initialData } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useLegalConsent } from '@/context/LegalConsentContext';
import { compressImage } from '@/lib/imageCompressor';
import LightboxModal, { LightboxImage } from '@/components/LightboxModal';
import {
  Camera,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  Clock,
  ShieldCheck,
  User,
  X,
  FileCheck,
} from 'lucide-react';

export default function GalleryPage() {
  const { user, isLoggedIn } = useAuth();
  const { hasConsented, setShowModal: openKvkkModal } = useLegalConsent();

  const [activeTab, setActiveTab] = useState<'official' | 'participants'>('official');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  // Local state for participant photos queue
  const [participantPhotos, setParticipantPhotos] = useState(initialData.participantUploads);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImagesList, setLightboxImagesList] = useState<LightboxImage[]>([]);

  // Upload Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadConsent, setUploadConsent] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');

  // Daily Upload Limit check (max 5/day)
  const todayStr = new Date().toISOString().split('T')[0];
  const userTodayUploadsCount = participantPhotos.filter(
    (p) => p.userId === user?.id && p.uploadedAt.startsWith(todayStr)
  ).length;

  const openLightbox = (imgs: LightboxImage[], index: number) => {
    setLightboxImagesList(imgs);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setUploadErrorMsg('Fotoğraf boyutu çok yüksek. Lütfen 15 MB altındaki bir görsel seçiniz.');
      return;
    }

    setUploadErrorMsg('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      setUploadErrorMsg('Fotoğraf yüklemek için onaylanmış hesabınızla giriş yapmalısınız.');
      return;
    }

    if (!hasConsented) {
      openKvkkModal(true);
      return;
    }

    if (!uploadConsent) {
      setUploadErrorMsg('Lütfen görsel paylaşım izin kutusunu onaylayınız.');
      return;
    }

    if (!selectedFile) {
      setUploadErrorMsg('Lütfen bir fotoğraf seçiniz.');
      return;
    }

    if (userTodayUploadsCount >= 5) {
      setUploadErrorMsg('Günlük maksimum 5 fotoğraf yükleme limitine ulaştınız.');
      return;
    }

    try {
      setIsCompressing(true);
      // Client-side Canvas Image Compression
      const compressedBlob = await compressImage(selectedFile, 5 * 1024 * 1024);
      const compressedUrl = URL.createObjectURL(compressedBlob);

      const newUpload = {
        id: 'pu-' + Date.now(),
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`.trim(),
        userRole: user.duty || 'Katılımcı',
        url: compressedUrl,
        status: 'BEKLEMEDE' as const,
        uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };

      setParticipantPhotos([newUpload, ...participantPhotos]);
      setIsCompressing(false);
      setUploadSuccessMsg('Fotoğrafınız başarıyla gönderildi! Admin onayının ardından galeride yayınlanacaktır.');
      setTimeout(() => {
        setUploadModalOpen(false);
        setUploadSuccessMsg('');
        setSelectedFile(null);
        setPreviewUrl(null);
      }, 2500);
    } catch (err) {
      console.error(err);
      setIsCompressing(false);
      setUploadErrorMsg('Fotoğraf işlenirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    }
  };

  const officialLightboxList: LightboxImage[] = initialData.officialGallery.map((og) => ({
    id: og.id,
    url: og.url,
    title: og.title,
  }));

  const approvedParticipantPhotos = participantPhotos.filter((p) => p.status === 'ONAYLANDI');
  const participantLightboxList: LightboxImage[] = approvedParticipantPhotos.map((p) => ({
    id: p.id,
    url: p.url,
    uploaderName: p.userName,
    uploaderRole: p.userRole,
  }));
  const teamCategories = ['Tümü', 'Yönetim', 'Organizasyon', 'Teknik Ekip', 'Medya', 'Komisyon Yönetimi'];
  const filteredTeam = selectedCategory === 'Tümü'
    ? initialData.team
    : initialData.team.filter((member) => member.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Etkinlik & Katılımcı Galerisi
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          Konparlamento 2026 resmi fotoğrafları ve katılımcılarımızın objektifinden yansıyan kareler.
        </p>
      </div>

      {/* Main Tabs Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('official')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeTab === 'official'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>ETKİNLİK GALERİSİ</span>
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 ${
              activeTab === 'participants'
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/40'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>KATILIMCI GÖRSELLERİ</span>
          </button>
        </div>

        {/* Upload Button */}
        {activeTab === 'participants' && (
          <button
            onClick={() => {
              if (!isLoggedIn) {
                alert('Fotoğraf yüklemek için giriş yapmış onaylı katılımcı olmalısınız.');
                return;
              }
              if (!hasConsented) {
                openKvkkModal(true);
                return;
              }
              setUploadModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Fotoğraf Yükle</span>
          </button>
        )}
      </div>

      {/* TAB 1: ETKİNLİK GALERİSİ */}
      {activeTab === 'official' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {initialData.officialGallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(officialLightboxList, idx)}
              className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-pointer shadow-lg"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                <span className="text-xs font-semibold text-white">{img.title}</span>
                <span className="text-[10px] text-red-400 font-medium">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: KATILIMCI GÖRSELLERİ */}
      {activeTab === 'participants' && (
        <div className="space-y-6">
          {approvedParticipantPhotos.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-3xl border border-zinc-800 space-y-3">
              <Camera className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Henüz Onaylanmış Fotoğraf Bulunmuyor</h3>
              <p className="text-xs text-zinc-400">
                İlk fotoğrafı yükleyen katılımcı siz olun!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {approvedParticipantPhotos.map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => openLightbox(participantLightboxList, idx)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group cursor-pointer shadow-lg"
                >
                  <img
                    src={img.url}
                    alt={img.userName}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
                    <span className="text-xs font-semibold text-white truncate">{img.userName}</span>
                    <span className="text-[10px] text-zinc-400 truncate">{img.userRole}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORGANIZATION TEAM */}
      <section className="space-y-8 border-t border-zinc-800 pt-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-950/40 border border-red-900/40 rounded-full inline-block">
            ORGANİZASYON AİLESİ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Organizasyon Ekiplerimiz</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Konparlamento 2026'nın mutfağında çalışan organizasyon ekibimiz.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {teamCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="glass-panel p-6 rounded-3xl border border-zinc-800 text-center space-y-4 hover:border-red-600/40 transition group"
            >
              <div className="relative w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-red-900/40 group-hover:border-red-500 transition shadow-xl">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-red-400 transition">{member.name}</h3>
                <p className="text-xs font-medium text-red-500 mt-0.5">{member.role}</p>
                <span className="text-[10px] text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800 inline-block mt-2">
                  {member.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-red-500" /> Etkinlik Fotoğrafı Yükle
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* Limit Alert */}
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between text-zinc-400">
                <span>Günlük Kalan Hak:</span>
                <span className="font-bold text-red-400">{5 - userTodayUploadsCount} / 5 Fotoğraf</span>
              </div>

              {/* File Input */}
              <div className="space-y-2">
                <label className="block font-semibold text-zinc-300">Fotoğraf Seçiniz (Maks 5 MB)</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-500 cursor-pointer"
                />
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
                  <img src={previewUrl} alt="Önizleme" className="w-full h-full object-contain" />
                </div>
              )}

              {/* Legal Consent Checkbox */}
              <label className="flex items-start gap-2.5 p-3 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={uploadConsent}
                  onChange={(e) => setUploadConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-red-600 rounded bg-zinc-900 border-zinc-700 focus:ring-red-500"
                />
                <span className="text-[11px] text-zinc-400 leading-tight">
                  Yüklediğim görselin telif haklarına sahip olduğumu ve Konparlamento etkinlik galerisinde yayınlanmasına izin verdiğimi beyan ederim.
                </span>
              </label>

              {uploadErrorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-500 text-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadErrorMsg}</span>
                </div>
              )}

              {uploadSuccessMsg && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isCompressing}
                className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isCompressing ? (
                  <span>Fotoğraf Sıkıştırılıyor...</span>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Onaya Gönder</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        images={lightboxImagesList}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
