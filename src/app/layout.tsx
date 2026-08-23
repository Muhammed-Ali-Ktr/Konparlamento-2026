import type { Metadata } from 'next';
import { Calistoga } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LegalConsentProvider } from '@/context/LegalConsentContext';
import { NotificationProvider } from '@/context/NotificationContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KvkkConsentModal from '@/components/KvkkConsentModal';
import SeoHead from '@/components/SeoHead';

const calistoga = Calistoga({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Konparlamento 2026 — Full-Stack Gençlik Parlamenter Platformu',
    template: '%s | Konparlamento 2026',
  },
  description: 'Konparlamento 2026; 4 günlük simülasyon etkinliği, komisyon oturumları, katılımcı başvuruları, bilmece ve canlı oylama platformu.',
  keywords: ['Konparlamento', 'Konparlamento 2026', 'MUN', 'Parlamento', 'Konya', 'Gençlik Meclisi', 'Komisyon', 'Simülasyon'],
  authors: [{ name: 'Konparlamento Yönetim Ekibi' }],
  metadataBase: new URL('https://konparlamento.org'),
  openGraph: {
    title: 'Konparlamento 2026 — Gençlik Parlamenter Platformu',
    description: 'Konparlamento 2026 4 günlük etkinlik platformu. Sen de bu deneyimin parçası ol!',
    url: 'https://konparlamento.org',
    siteName: 'Konparlamento 2026',
    images: [
      {
        url: '/konparlamento-logo.png',
        width: 800,
        height: 800,
        alt: 'Konparlamento 2026 Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  icons: {
    icon: '/konparlamento-logo.png',
    apple: '/konparlamento-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${calistoga.variable} dark overflow-x-hidden`}>
      <head>
        <SeoHead />
      </head>
      <body className="min-h-screen flex flex-col justify-between custom-scrollbar overflow-x-hidden">
        <AuthProvider>
          <LegalConsentProvider>
            <NotificationProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <KvkkConsentModal />
            </NotificationProvider>
          </LegalConsentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
