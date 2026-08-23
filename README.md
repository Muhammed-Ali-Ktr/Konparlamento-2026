# Konparlamento 2026

Konparlamento 2026; katılımcı başvuruları, komisyon oturumları, program, galeri, bilmeceler ve canlı oylama akışlarını bir araya getiren gençlik parlamenter etkinlik platformudur.

## Teknolojiler

- Next.js 14 ve App Router
- React 18
- TypeScript
- Tailwind CSS
- Supabase (veritabanı ve kimlik doğrulama için opsiyonel)
- Lucide React ikonları
- Google Fonts: Calistoga

## Gereksinimler

- Node.js 18.17 veya üzeri
- npm
- Supabase hesabı (verileri kalıcı olarak kullanmak için)

## Yerel Kurulum

1. Projeyi bilgisayarınıza alın ve proje klasörüne girin.

```bash
npm install
```

2. Kök dizinde `.env.local` dosyası oluşturun. Supabase kullanacaksanız aşağıdaki değerleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=your-webhook-url
```

`NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL` başvuru verilerini Google Sheets'e aktarmak için kullanılır ve isteğe bağlıdır.

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Siteyi [http://localhost:3000](http://localhost:3000) adresinden açabilirsiniz.

## Kullanılabilir Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Üretim derlemesi ve tip kontrolü
npm run start    # Üretim derlemesini çalıştırır
npm run lint     # ESLint kontrolü
```

## Proje Yapısı

```text
src/
  app/                 Sayfalar ve App Router route'ları
    admin/             Yönetim paneli ve içerik yönetimi
    giris/             Katılımcı giriş sayfası
    katilimci-kayit/   Katılımcı kayıt formu
    iletisim/          İletişim bilgileri ve harita
    program/           Etkinlik programı
    komisyonlar/       Komisyon listesi ve detayları
    galeri/            Etkinlik galerisi
    oylama/            Oylama ekranı
  components/          Navbar, Footer, modal ve ortak UI bileşenleri
  context/             Kimlik doğrulama, bildirim ve yasal izin context'leri
  lib/                 Supabase, Google Sheets ve görsel yardımcıları
  app/globals.css      Global stiller ve Tailwind tabanı
supabase/
  schema.sql           Supabase PostgreSQL tablo şeması
public/                Statik görseller ve site varlıkları
```

## Supabase Kurulumu

1. Supabase üzerinde yeni bir proje oluşturun.
2. Supabase SQL Editor'ı açın.
3. `supabase/schema.sql` dosyasının içeriğini çalıştırın.
4. Project Settings > API bölümündeki URL ve anon key değerlerini `.env.local` dosyasına ekleyin.
5. Authentication ayarlarında kullanılacak giriş yöntemlerini etkinleştirin.
6. RLS politikalarını canlı veriye geçmeden önce kontrol edin ve yalnızca gerekli rollerin yönetim tablolarına erişebildiğinden emin olun.

Supabase değişkenleri tanımlanmadığında uygulama çevrimdışı önizleme için `src/lib/supabase.ts` içindeki `initialData` verisini kullanır. Kalıcı kullanıcı, başvuru ve içerik verileri için Supabase bağlantısı gereklidir.

## Yayına Alma

### Vercel ile önerilen yöntem

1. Projeyi GitHub repository'sine gönderin.
2. [Vercel](https://vercel.com) hesabınızda **Add New Project** seçeneğini açın.
3. GitHub repository'sini seçin.
4. Framework olarak Next.js otomatik algılanır. Build komutu `npm run build`, start komutu `npm run start` olarak bırakılabilir.
5. Vercel Project Settings > Environment Variables bölümüne şu değerleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=...
```

6. Deploy işlemini başlatın.
7. Yayındaki alan adını Supabase Authentication URL ayarlarına ve gerekiyorsa Google OAuth redirect adreslerine ekleyin.
8. Özel alan adı kullanıyorsanız Vercel Domains bölümünden domain'i bağlayın ve DNS kayıtlarını Vercel'in gösterdiği şekilde güncelleyin.

### Yayın öncesi kontrol listesi

- `npm run build` başarılı mı?
- Üretim ortamı değişkenleri Vercel'e eklendi mi?
- Supabase SQL şeması çalıştırıldı mı?
- Supabase RLS ve yönetici yetkileri kontrol edildi mi?
- Katılımcı kayıt ve giriş akışı test edildi mi?
- Başvuru onaylama ve Google Sheets aktarımı test edildi mi?
- İletişim sayfasındaki mekan adı ve harita kontrol edildi mi?
- Mobil görünüm ve temel sayfa bağlantıları kontrol edildi mi?
- KVKK, gizlilik, çerez ve kullanım koşulları sayfaları gözden geçirildi mi?

## Önemli Notlar

- `.env.local` dosyasını Git'e göndermeyin. Bu dosya `.gitignore` içinde tutulmalıdır.
- `NEXT_PUBLIC_` ile başlayan değişkenler tarayıcıya gönderilebilir; gizli anahtarları bu değişkenlerde saklamayın.
- Görseller uzak URL'lerden de yüklenebilir. `next.config.js` içindeki `remotePatterns` HTTPS kaynaklarına izin verecek şekilde yapılandırılmıştır.
- Etkinlik bilgileri ve çevrimdışı önizleme verileri `src/lib/supabase.ts` içindeki `initialData` nesnesinden yönetilir.
