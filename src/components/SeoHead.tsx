'use client';

import React from 'react';

interface SeoHeadProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
}

export default function SeoHead({
  title = "Konparlamento 2026 — Gençlik Parlamenter Platformu",
  description = "Konparlamento 2026; 4 günlük komisyon oturumları, katılımcı başvuruları, bilmece ve canlı oylama sistemleriyle modern full-stack gençlik platformu.",
  url = "https://konparlamento.org",
  ogImage = "https://konparlamento.org/konparlamento-logo.png",
}: SeoHeadProps) {
  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Konparlamento 2026",
    "startDate": "2026-04-15T09:00:00+03:00",
    "endDate": "2026-04-18T18:00:00+03:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Ahmet Keleşeoğlu Kültür Merkezi",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Selçuklu",
        "addressRegion": "Konya",
        "addressCountry": "TR"
      }
    },
    "image": [ogImage],
    "description": description,
    "organizer": {
      "@type": "Organization",
      "name": "Konparlamento Yönetim Kurulu",
      "url": "https://konparlamento.org"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
    />
  );
}
