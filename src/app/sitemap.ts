import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://konparlamento.org';
  const lastModified = new Date();

  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/hakkimizda`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/komisyonlar`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/program`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/galeri`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/iletisim`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/katilimci-kayit`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/giris`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/bilmece`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/oylama`, lastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/kvkk`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/gizlilik-politikasi`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/cerez-politikasi`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/kullanim-kosullari`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
