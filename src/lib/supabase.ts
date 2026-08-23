import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Initial Mock Seed Data for seamless offline preview & immediate usage
export const initialData = {
  countdownDate: "2026-04-15T09:00:00",
  siteSettings: {
    contactEmail: "info@konparlamento.org",
    contactPhone: "+90 555 123 4567",
    instagramUrl: "https://instagram.com/konparlamento",
    location: "Ahmet Keleşeoğlu Kültür Merkezi",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.9634914041285!2d32.4833!3d37.9167!2m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU1JzAwLjEiTiAzMsKwMjknMDAuMCJF!5e0!3m2!1str!2str!4v1600000000000!5m2!1str!2str",
    previousEventUrl: "https://2025.konparlamento.org"
  },
  committees: [
    {
      id: "comm-1",
      title: "Dışişleri ve Uluslararası İlişkiler Komisyonu",
      slug: "disisleri-komisyonu",
      shortDescription: "Küresel krizler, uluslararası anlaşmalar ve diplomatik stratejilerin ele alındığı prestijli komisyon.",
      detailedDescription: "Dışişleri Komisyonu, katılımcıların küresel diplomasi ilkelerini deneyimlemelerini sağlayan dinamik bir platformdur. Uluslararası kriz yönetimi, ikili ilişkiler ve küresel barış tasarıları detaylıca işlenir.",
      purpose: "Katılımcılara yüksek seviyede müzakere, kriz yönetimi ve diplomatik yazışma yetkinliği kazandırmak.",
      workflow: "Haftalık tasarı oturumları, kriz bildirimleri ve oy birliği arayışı ile ilerleyen parlamenter yapı.",
      duties: "Uluslararası tasarı hazırlamak, yabancı delegasyon temsilcileri ile ikili görüşmeler yapmak ve karar taslağı sunmak.",
      rules: "Parlamento iç tüzüğü geçerlidir. Söz almadan konuşmak ve kişisel itirazlarda bulunmak yasaktır.",
      chairPerson: "Ahmet Faruk Yılmaz",
      viceChairPerson: "Zeynep Sude Demir",
      images: [
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80"
      ],
      members: [
        { id: "cm-1", name: "Ahmet Faruk Yılmaz", role: "Komisyon Başkanı", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
        { id: "cm-2", name: "Zeynep Sude Demir", role: "Başkan Yardımcısı", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
        { id: "cm-3", name: "Mehmet Akif Kaya", role: "Rapotör", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" }
      ]
    },
    {
      id: "comm-2",
      title: "İnsan Hakları ve Hukuk Komisyonu",
      slug: "insan-haklari-komisyonu",
      shortDescription: "Temel hak ve hürriyetlerin korunması, adalet mekanizmaları ve anayasal ilkelerin tartışıldığı alan.",
      detailedDescription: "İnsan Hakları ve Hukuk Komisyonu, toplumsal adalet ve bireysel özgürlüklerin parlamenter çerçevede masaya yatırıldığı ana komisyonlardan biridir.",
      purpose: "Hukuk bilincini artırmak ve evrensel insan hakları standartlarını mevzuata yansıtma becerisi kazandırmak.",
      workflow: "Taslak madde incelemeleri, muhalefet ve iktidar şerhleri ile ilerleyen madde bazlı oylamalar.",
      duties: "Hak ihlali raporları hazırlamak, yasa tasarılarının anayasaya uygunluğunu denetlemek.",
      rules: "Saygılı dil kullanımı zorunludur. Hukuki terimlerin doğru kullanımı esastır.",
      chairPerson: "Elif Nur Öztürk",
      viceChairPerson: "Burak Can Arslan",
      images: [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80"
      ],
      members: [
        { id: "cm-4", name: "Elif Nur Öztürk", role: "Komisyon Başkanı", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
        { id: "cm-5", name: "Burak Can Arslan", role: "Başkan Yardımcısı", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" }
      ]
    },
    {
      id: "comm-3",
      title: "Ekonomi, Sanayi ve Kalkınma Komisyonu",
      slug: "ekonomi-komisyonu",
      shortDescription: "Sürdürülebilir büyüme, dijital finans, girişimcilik ve makroekonomik politikaların üretildiği merkez.",
      detailedDescription: "Küresel ekonomik dalgalanmalar, yeşil dönüşüm ve teknolojik sanayi hamleleri bu komisyonda değerlendirilir.",
      purpose: "Katılımcılara bütçe yönetimi, stratejik yatırım ve kaynak tahsisi analiz yeteneği kazandırmak.",
      workflow: "Bütçe müzakereleri ve ekonomi paketlerinin parlamentoya sunulması.",
      duties: "Ekonomik eylem planı tasarlamak ve teşvik paketlerini oylamak.",
      rules: "Veri odaklı argüman sunumu zorunludur.",
      chairPerson: "Mustafa Kemal Şahin",
      viceChairPerson: "Seda Aksoy",
      images: [
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80"
      ],
      members: [
        { id: "cm-6", name: "Mustafa Kemal Şahin", role: "Komisyon Başkanı", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
        { id: "cm-7", name: "Seda Aksoy", role: "Başkan Yardımcısı", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" }
      ]
    },
    {
      id: "comm-4",
      title: "Çevre, İklim ve Yenilenebilir Enerji Komisyonu",
      slug: "cevre-komisyonu",
      shortDescription: "Sıfır atık, karbonsuzlaşma ve temiz enerji dönüşümü konularında gelecek vizyonu oluşturan komisyon.",
      detailedDescription: "Dünyamızın en kritik meselesi olan iklim değişikliği ve ekolojik denge Politikaları tartışılır.",
      purpose: "Sürdürülebilirlik bilincini yasama süreçlerine dahil etmek.",
      workflow: "Çevresel etki değerlendirme raporları ve yeşil yasa tasarıları.",
      duties: "İklim eylem kanunu hazırlamak.",
      rules: "Bilimsel verilere dayalı müzakere yürütülmesi esastır.",
      chairPerson: "Ceren Yılmaz",
      viceChairPerson: "Kaan Tekin",
      images: [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80"
      ],
      members: [
        { id: "cm-8", name: "Ceren Yılmaz", role: "Komisyon Başkanı", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
        { id: "cm-9", name: "Kaan Tekin", role: "Başkan Yardımcısı", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" }
      ]
    }
  ],
  team: [
    { id: "t-1", name: "Muhammed Ali Kıtır", role: "Gençlik Koordinatörü & Lead Developer", category: "Yönetim", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
    { id: "t-2", name: "Ayşe Betül Yılmaz", role: "Organizasyon Komitesi Başkanı", category: "Organizasyon", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: "t-3", name: "Emre Can Sever", role: "Medya ve Basın Sorumlusu", category: "Medya", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150" },
    { id: "t-4", name: "Merve Çelik", role: "Lojistik ve Katılımcı İlişkileri", category: "Teknik Ekip", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" },
    { id: "t-5", name: "Oğuzhan Demirel", role: "Komisyonlar Genel Direktörü", category: "Komisyon Yönetimi", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150" }
  ],
  sponsors: [
    { id: "s-1", name: "Hostinger Turkey", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300", type: "Ana Sponsor", website: "https://hostinger.web.tr", rank: 1, isSupporter: false },
    { id: "s-2", name: "Supabase", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300", type: "Platin Sponsor", website: "https://supabase.com", rank: 2, isSupporter: false },
    { id: "s-3", name: "Konya Büyükşehir Belediyesi", logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300", type: "Kurumsal Destekçi", website: "https://konya.bel.tr", rank: 3, isSupporter: true },
    { id: "s-4", name: "Ahmet Keleşeoğlu Kültür Merkezi", logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300", type: "Gençlik Partneri", website: "https://selcuklugenc.com", rank: 4, isSupporter: true }
  ],
  programDays: [
    {
      dayNumber: 1,
      title: "1. GÜN — Açılış ve Komisyon Kayıtları",
      events: [
        { time: "09:00 - 10:00", title: "Katılımcı Kayıt ve Karşılama", description: "Ahmet Keleşeoğlu Kültür Merkezi ana salonda yaka kartı ve kit dağıtımı." },
        { time: "10:00 - 11:30", title: "Resmi Açılış Seremonisi", description: "Protokol konuşmaları, Konparlamento 2026 tanıtım filmi ve açılış duyuruları." },
        { time: "11:30 - 13:00", title: "1. Komisyon Oturumu", description: "Komisyon içi tanışma, iç tüzük bilgilendirmesi ve gündem maddelerinin seçimi." },
        { time: "13:00 - 14:00", title: "Öğle Arası ve Ağ Kurma (Networking)", description: "Ana yemek salonunda katılımcı ikramları." },
        { time: "14:00 - 17:30", title: "2. Komisyon Oturumu", description: "Yasa tasarılarının ilk maddelerinin tartışılması." }
      ]
    },
    {
      dayNumber: 2,
      title: "2. GÜN — Tasarı Oturumları ve Müzakereler",
      events: [
        { time: "09:30 - 12:30", title: "3. Komisyon Oturumu", description: "Komisyon değişiklik önergelerinin (amendments) verilmesi." },
        { time: "12:30 - 13:30", title: "Öğle Arası", description: "Serbest zaman ve sergi alanı gezisi." },
        { time: "13:30 - 17:00", title: "4. Komisyon Oturumu & Kriz Senaryosu", description: "Beklenmedik küresel kriz senaryosunun komisyonlara tebliğ edilmesi." }
      ]
    },
    {
      dayNumber: 3,
      title: "3. GÜN — Oylamalar ve Karar Taslakları",
      events: [
        { time: "09:30 - 12:30", title: "5. Komisyon Oturumu", description: "Nihai karar metinlerinin kaleme alınması." },
        { time: "12:30 - 13:30", title: "Öğle Arası", description: "İkram servisi ve sosyal aktivite." },
        { time: "13:30 - 17:00", title: "Genel Kurul Oturumu", description: "Tüm komisyon kararlarının Genel Kurul'a sunulması ve oylanması." }
      ]
    },
    {
      dayNumber: 4,
      title: "4. GÜN — Kapanış ve Ödül Töreni",
      events: [
        { time: "10:00 - 12:30", title: "Genel Kurul Kapanış Oylamaları", description: "Son bildirge metninin kabulü." },
        { time: "12:30 - 14:00", title: "Kapanış Resepsiyonu", description: "Katılımcı ve ekip yemeği." },
        { time: "14:00 - 16:30", title: "Ödül Töreni ve Sertifika Dağıtımı", description: "En iyi delege, mansiyon ve teşekkür belgelerinin takdimi." }
      ]
    }
  ],
  officialGallery: [
    { id: "og-1", title: "Açılış Seremonisi", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", category: "Genel Kurul" },
    { id: "og-2", title: "Komisyon Oturumu", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80", category: "Komisyonlar" },
    { id: "og-3", title: "Müzakere Anı", url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80", category: "Komisyonlar" },
    { id: "og-4", title: "Grup Fotoğrafı", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", category: "Ekip" }
  ],
  participantUploads: [
    { id: "pu-1", userId: "u-101", userName: "Ali Yılmaz", userRole: "Delegasyon Üyesi", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", status: "ONAYLANDI", uploadedAt: "2026-04-15 14:20" },
    { id: "pu-2", userId: "u-102", userName: "Ayşe Kaya", userRole: "Delegasyon Üyesi", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", status: "ONAYLANDI", uploadedAt: "2026-04-15 15:45" },
    { id: "pu-3", userId: "u-103", userName: "Mehmet Demir", userRole: "Delegasyon Üyesi", url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80", status: "BEKLEMEDE", uploadedAt: "2026-04-15 17:10" }
  ],
  riddles: [
    {
      id: "rid-1",
      question: "Bir parlamenter oturumda oylamaya sunulmadan önce komisyondan oy birliği ile geçen, ancak kanunlaşması için Genel Kurul onayına sunulan taslak metne ne ad verilir?",
      isActive: true,
      startAt: "2026-04-15 00:00",
      endAt: "2026-04-18 23:59"
    }
  ],
  riddleAnswers: [
    { id: "ra-1", riddleId: "rid-1", userId: "u-101", userName: "Ali Yılmaz", answerText: "Karar Tasarısı (Resolution Draft)", status: "DOGRU", date: "2026-04-15 18:30" },
    { id: "ra-2", riddleId: "rid-1", userId: "u-102", userName: "Ayşe Kaya", answerText: "Yasa Önerisi", status: "BEKLIYOR", date: "2026-04-15 19:15" }
  ],
  polls: [
    {
      id: "poll-1",
      title: "Konparlamento 2026'nın en aktif komisyonu sizce hangisi?",
      isActive: true,
      options: [
        { id: "opt-1", text: "Dışişleri ve Uluslararası İlişkiler Komisyonu", votes: 45 },
        { id: "opt-2", text: "İnsan Hakları ve Hukuk Komisyonu", votes: 38 },
        { id: "opt-3", text: "Ekonomi, Sanayi ve Kalkınma Komisyonu", votes: 29 },
        { id: "opt-4", text: "Çevre ve İklim Komisyonu", votes: 32 }
      ]
    }
  ],
  pollVotes: [
    { pollId: "poll-1", userId: "u-101", optionId: "opt-1" }
  ],
  applications: [
    {
      id: "app-1",
      firstName: "Ahmet",
      lastName: "Kaya",
      email: "ahmet@gmail.com",
      phone: "+90 532 111 2233",
      age: 20,
      grade: "Üniversite 2. Sınıf",
      gender: "Erkek",
      motivation: "Parlamenter süreçleri yerinde deneyimlemek ve liderlik yeteneğimi geliştirmek istiyorum.",
      pin: "123456",
      requestedRole: "Dışişleri Komisyonu Üyesi",
      status: "ONAYLANDI",
      createdAt: "2026-04-10 12:00"
    },
    {
      id: "app-2",
      firstName: "Zeynep",
      lastName: "Demir",
      email: "zeynep@gmail.com",
      phone: "+90 533 222 3344",
      age: 19,
      grade: "Üniversite 1. Sınıf",
      gender: "Kadın",
      motivation: "İnsan hakları alanında hukuki önergeler hazırlamak arzusundayım.",
      pin: "654321",
      requestedRole: "İnsan Hakları Komisyonu Üyesi",
      status: "BEKLEMEDE",
      createdAt: "2026-04-12 14:30"
    }
  ],
  legalDocs: {
    kvkk: `## KVKK AYDINLATMA METNİ

Konparlamento 2026 Etkinliği kapsamında 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla işlenmektedir.

### 1. İşlenen Kişisel Veriler
* Ad, Soyad, T.C. Kimlik / Öğrenci No, Doğum Tarihi, Cinsiyet
* E-posta adresi, Telefon numarası, Okul/Sınıf bilgisi
* Etkinlik esnasında çekilen profil ve galeri fotoğrafları

### 2. Veri İşleme Amaçları
Kişisel verileriniz başvuru değerlendirme, etkinlik akışının sağlanması, katılım belgesi düzenlenmesi ve güvenlik amaçlarıyla işlenmektedir.

### 3. Haklarınız
KVKK 11. maddesi uyarınca verilerinize erişme, düzeltme, silme ve itiraz etme haklarına sahipsiniz.`,

    gizlilik: `## GİZLİLİK POLİTİKASI

Konparlamento 2026 platformu olarak kullanıcılarımızın gizliliğine büyük önem vermekteyiz.

* Platform üzerinde paylaşılan telefon numaraları ve e-posta adresleri kesinlikle 3. şahıslara satılmaz ve açıkça sergilenmez.
* Katılımcı fotoğrafları yalnızca kullanıcının açık rızası ve admin onayı alındıktan sonra etkinlik galerisinde gösterilir.
* Hesabınızı dilediğiniz zaman kapatma hakkınız saklıdır.`,

    cerez: `## ÇEREZ POLİTİKASI

Sitemizde oturum güvenliğini ve kullanıcı deneyimini artırmak amacıyla zorunlu teknik çerezler kullanılmaktadır.

* **Zorunlu Çerezler**: Giriş durumunuzu ve KVKK onay tercihlerinizi hatırlar.
* Reklam ve takip çerezleri kesinlikle kullanılmamaktadır.`,

    kullanimKosullari: `## KULLANIM KOŞULLARI

Konparlamento 2026 platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız:

1. Etkinlik kurallarına ve genel ahlak ilkelerine uygun davranmak zorunludur.
2. Galeriye yüklenen görsellerin telif haklarının yükleyen kişide olması şarttır.
3. Yönetim paneli yetkisiz erişim girişimleri IP bazlı kaydedilerek hukuki işlem başlatılabilir.`
  }
};
