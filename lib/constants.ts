// ── Site Information ──
export const SITE_CONFIG = {
  name: "Del'Avenir",
  title: "Del'Avenir",
  description: "Generasi 11 Baitul Qur'an — Mewujudkan mimpi, merajut masa depan.",
  url: "https://delavenir.com",
  logo: "/logo.png",
};

// ── Navigation Links ──
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Achievement", href: "/achievement" },
  { label: "Muhadhoroh", href: "/muhadhoroh" },
  { label: "Support Us", href: "/support" },
];

// ── Generation 11 Vision ──
export const GENERATION_VISION =
  "Achieving the dream of achieving success. Carving the era, painting the future.";

// ── Generation 11 Missions ──
export const GENERATION_MISSIONS = [
  "Leaving a golden footprint on the horizon of Baitul Qur'an with unforgettable achievements and works that will be remembered for generations.",
  "Coloring the generation with the hue of glory based on Islamic values, ensuring every achievement reflects the principles of the faith.",
  "Notching 100 achievements for the alma mater of Baitul Qur'an Islamic Boarding School.",
  "Carving a legacy of the three years spent at Baitul Qur'an, creating works that will inspire future generations.",
];

// ── Core Values ──
export const CORE_VALUES = [
  { name: "Excellence", arabic: "Ihsan", description: "Striving for the highest quality in all endeavors" },
  { name: "Integrity", arabic: "Amanah", description: "Maintaining honesty and trustworthiness" },
  { name: "Knowledge", arabic: "Ilmu", description: "Continuous pursuit of learning" },
  { name: "Service", arabic: "Khidmah", description: "Contributing to community welfare" },
  { name: "Unity", arabic: "Ukhuwah", description: "Building strong bonds of brotherhood" },
];

// ── Generation 11 Highlights ──
export const GEN11_HIGHLIGHTS = [
  { number: 100, suffix: "+", label: "Achievement Goals", description: "Target achievements for Baitul Qur'an" },
  { number: 999, suffix: "+", label: "Artistic Works", description: "Creating masterpieces that inspire" },
  { number: 1, prefix: "#", label: "Academic Excellence", description: "Leading in academic performance" },
  { number: 3, suffix: "", label: "Years of Legacy", description: "Building lasting impact" },
];

// ── Statistics ──
export const COMMUNITY_STATS = [
  { number: 1000, suffix: "+", label: "Students" },
  { number: 500, suffix: "+", label: "Alumni" },
  { number: 50, suffix: "+", label: "Events" },
  { number: 100, suffix: "+", label: "Awards" },
];

// ── Achievement Categories ──
export const ACHIEVEMENT_CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "academic", label: "Academic", icon: "book-open" },
  { id: "arts", label: "Arts", icon: "palette" },
  { id: "sports", label: "Sports", icon: "trophy" },
  { id: "religious", label: "Religious", icon: "star" },
  { id: "community", label: "Community", icon: "heart" },
];

// ── Achievement Levels ──
export const ACHIEVEMENT_LEVELS = {
  international: { label: "International", color: "gold" },
  national: { label: "National", color: "silver" },
  regional: { label: "Regional", color: "bronze" },
  local: { label: "Local", color: "gray" },
};

// ── Sample Achievements ──
export const SAMPLE_ACHIEVEMENTS = [
  {
    id: "1",
    title: "Lomba Tahfidz Qur'an Nasional",
    description: "Juara 1 Lomba Tahfidz Qur'an tingkat nasional dengan hafalan 30 Juz",
    category: "religious",
    level: "national",
    year: 2024,
    students: ["Ahmad Fauzi", "Muhammad Rizki"],
    ranking: 1,
  },
  {
    id: "2",
    title: "Olimpiade Sains Nasional",
    description: "Medali Emas pada Olimpiade Matematika tingkat nasional",
    category: "academic",
    level: "national",
    year: 2024,
    students: ["Siti Aminah"],
    ranking: 1,
  },
  {
    id: "3",
    title: "Festival Seni Kaligrafi",
    description: "Juara 1 Festival Kaligrafi tingkat regional Jawa Tengah",
    category: "arts",
    level: "regional",
    year: 2024,
    students: ["Fatimah Azzahra"],
    ranking: 1,
  },
  {
    id: "4",
    title: "Turnamen Futsal Pelajar",
    description: "Juara 2 Turnamen Futsal antar pesantren se-Jawa Tengah",
    category: "sports",
    level: "regional",
    year: 2024,
    students: ["Tim Futsal BQ Sragen"],
    ranking: 2,
  },
  {
    id: "5",
    title: "Bakti Sosial Peduli Banjir",
    description: "Penghargaan atas partisipasi aktif dalam bakti sosial korban banjir",
    category: "community",
    level: "local",
    year: 2024,
    students: ["Tim Relawan BQ"],
    ranking: 0,
  },
  {
    id: "6",
    title: "Lomba Debat Bahasa Arab",
    description: "Juara 1 Lomba Debat Bahasa Arab tingkat nasional",
    category: "academic",
    level: "national",
    year: 2023,
    students: ["Abdullah bin Mas'ud", "Umar Faruq"],
    ranking: 1,
  },
];

// ── Muhadhoroh Event Data ──
export const MUHADHOROH_EVENT = {
  title: "Muhadhoroh Kubro",
  subtitle: "Spectacular Annual Performances",
  description:
    "Dengan tema \"Discovering the Beauty of Islam Across Cultures\", kami berfokus pada bagaimana agama Islam memiliki pengaruh dan sejarah yang sangat besar dalam dinamika kehidupan yang terbentuk dan tersebar luas di seluruh penjuru dunia.",
  descriptionEn:
    "With the theme \"Discovering the Beauty of Islam Across Cultures\", we focus on how Islam has a very large influence and history in the dynamics of life that has been formed and spread across the world.",
  date: new Date("2026-08-23T19:15:00+07:00"),
  endDate: new Date("2026-08-23T22:30:00+07:00"),
  expectedAttendees: 800,
  schedule: [
    {
      day: 1,
      label: "Muhadhoroh Kubro",
      date: "Minggu, 23 Agustus 2026",
      events: [
        { time: "19:15 - 20:00", title: "Opening Ceremony", description: "Upacara pembukaan Muhadhoroh Kubro" },
        { time: "20:00 - 21:00", title: "Quran Recitation & Speech", description: "Tilawah, Tahfidz, dan Pidato Multibahasa" },
        { time: "21:00 - 22:00", title: "Theater, Drama & Arts", description: "Pentas seni, kaligrafi, dan drama multibahasa" },
        { time: "22:00 - 22:30", title: "Nasheed, Musical & Awards", description: "Penampilan musik, nasheed, dan pemberian penghargaan" },
      ],
    },
  ],
  performanceTypes: [
    { type: "theater", label: "Theater & Drama", icon: "theater", description: "Dramatic performances and plays in multiple languages" },
    { type: "arts", label: "Arts Showcase", icon: "palette", description: "Visual art, calligraphy, and creative exhibitions" },
    { type: "speech", label: "Speech Contests", icon: "mic", description: "Multilingual speech competitions (Arabic & English)" },
    { type: "recitation", label: "Quran Recitation", icon: "book-open", description: "Quran recitation and tilawah competitions" },
    { type: "music", label: "Nasheed & Music", icon: "music", description: "Islamic musical performances and nasheed" },
    { type: "multilingual", label: "Multilingual", icon: "globe", description: "Performances in Arabic, English, and Indonesian" },
  ],
  venue: {
    name: "Lapangan SMA Science Plus Beqi Sragen",
    address: "Pesantren Baitul Qur'an Jl. Jambeyan, Garut 1 Dukuh Garut RT 04, Desa Dawung, Kecamatan Sambirejo, Kabupaten Sragen, Jawa Tengah 57293",
    facilities: ["Parking Area", "Mosque", "Auditorium", "Canteen", "Medical Room"],
  },
};

// ── Sponsorship Tiers ──
export const SPONSORSHIP_TIERS = [
  {
    tier: "Glamour",
    price: "Rp 10.000.000",
    priceNum: 10000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Umbul-umbul & X-Banner",
      "Attendance slot VVIP & Merchandise exclusive",
      "Penyebutan oleh MC on stage",
      "Pembuatan dan penayangan video promosi",
      "Plakat penghargaan & Publikasi sosmed resmi",
      "Dapat mengajukan benefit tambahan",
    ],
    color: "glamour",
    featured: true,
  },
  {
    tier: "Diamond",
    price: "Rp 8.000.000",
    priceNum: 8000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Umbul-umbul & X-Banner",
      "Attendance slot VVIP & Merchandise exclusive",
      "Penyebutan oleh MC on stage",
      "Pembuatan dan penayangan video promosi",
      "Plakat penghargaan & Publikasi sosmed resmi",
    ],
    color: "diamond",
    featured: true,
  },
  {
    tier: "Platinum",
    price: "Rp 5.000.000",
    priceNum: 5000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Umbul-umbul & X-Banner",
      "Attendance slot VVIP & Merchandise exclusive",
      "Penyebutan oleh MC on stage",
    ],
    color: "platinum",
    featured: false,
  },
  {
    tier: "Gold",
    price: "Rp 3.000.000",
    priceNum: 3000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Umbul-umbul & X-Banner",
      "Attendance slot",
      "Penyebutan oleh MC on stage",
    ],
    color: "gold",
    featured: false,
  },
  {
    tier: "Silver",
    price: "Rp 2.000.000",
    priceNum: 2000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Umbul-umbul & Attendance slot",
      "Penyebutan oleh MC on stage",
    ],
    color: "silver",
    featured: false,
  },
  {
    tier: "Bronze",
    price: "Rp 1.000.000",
    priceNum: 1000000,
    benefits: [
      "Backdrop utama",
      "Penempatan identitas perusahaan pada layar videotron",
      "Attendance slot",
      "Penyebutan oleh MC on stage",
    ],
    color: "bronze",
    featured: false,
  },
];

// ── Contact Information ──
export const CONTACT_INFO = {
  admins: [
    {
      name: "Fahimsyah Azzam",
      role: "Admin 1",
      phone: "0895-1008-4866",
      phoneClean: "6289510084866",
    },
    {
      name: "M. Azzam Rasyidan",
      role: "Admin 2",
      phone: "0819-9806-2567",
      phoneClean: "6281998062567",
    },
  ],
  donation: {
    bank: "BSI (Bank Syariah Indonesia)",
    accountNumber: "7149806207",
    accountName: "Fista Titianingrum",
    whatsapp: "0895-4012-09855",
    whatsappClean: "62895401209855",
  },
};

// ── FAQ ──
export const FAQ_ITEMS = [
  {
    question: "Bagaimana cara berdonasi?",
    answer:
      "Anda dapat berdonasi dengan mentransfer ke rekening BSI (Bank Syariah Indonesia) nomor 7149806207 atas nama Fista Titianingrum. Setelah transfer, kirimkan bukti transfer ke WhatsApp 0895-4012-09855.",
  },
  {
    question: "Bisakah saya donasi atas nama perusahaan?",
    answer:
      "Tentu! Kami sangat terbuka untuk donasi dari perusahaan atau organisasi. Silakan hubungi admin kami untuk diskusi lebih lanjut mengenai donasi korporat dan benefit yang tersedia.",
  },
  {
    question: "Bagaimana donasi saya akan digunakan?",
    answer:
      "Donasi akan digunakan untuk mendukung kegiatan pendidikan santri, penyelenggaraan Muhadhoroh Kubro, pengembangan fasilitas pesantren, dan program-program kegiatan lainnya.",
  },
  {
    question: "Bagaimana cara menjadi sponsor?",
    answer:
      "Silakan pilih paket sponsorship yang tersedia (Glamour, Diamond, Platinum, Gold, Silver, atau Bronze) atau hubungi admin kami untuk paket custom. Tim kami akan menghubungi Anda untuk proses selanjutnya.",
  },
  {
    question: "Apakah saya bisa mendapatkan bukti donasi?",
    answer:
      "Ya, setelah donasi dikonfirmasi, kami akan mengirimkan tanda terima donasi melalui WhatsApp. Untuk donasi perusahaan, kami dapat menyediakan surat keterangan donasi resmi.",
  },
];

// ── Social Media ──
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/delavenir.ofc",
  youtube: "https://www.youtube.com/@BEQITV",
  tiktok: "#",
  whatsapp: "https://wa.me/6289510084866",
};
