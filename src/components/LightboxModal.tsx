'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, User } from 'lucide-react';

export interface LightboxImage {
  id: string;
  url: string;
  title?: string;
  uploaderName?: string;
  uploaderRole?: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  const handlePrev = () => {
    const nextIdx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIdx);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col justify-between p-4 animate-fade-in backdrop-blur-lg">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between z-10 p-2">
        <div className="text-white text-xs font-semibold bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition border border-zinc-700/60"
          aria-label="Kapat"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Display Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700/60 shadow-xl"
              aria-label="Önceki Görsel"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-red-600 text-white transition border border-zinc-700/60 shadow-xl"
              aria-label="Sonraki Görsel"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Current Image */}
        <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <img
            src={currentImg.url}
            alt={currentImg.title || 'Fotoğraf'}
            className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-zinc-800"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="z-10 p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl max-w-xl mx-auto w-full text-center">
        {currentImg.title && (
          <h3 className="text-sm font-semibold text-white mb-1">{currentImg.title}</h3>
        )}
        {currentImg.uploaderName && (
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <User className="w-3.5 h-3.5 text-red-500" />
            <span className="font-medium text-zinc-200">{currentImg.uploaderName}</span>
            {currentImg.uploaderRole && (
              <span className="text-zinc-500">({currentImg.uploaderRole})</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
