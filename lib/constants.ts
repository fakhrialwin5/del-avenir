// ── Site Information ──
export const SITE_CONFIG = {
  name: "Del'Avenir",
  title: "Del'Avenir - Pesantren Baitul Qur'an Sragen",
  description:
    "Generasi 11 Baitul Qur'an - Achieving the dream of achieving success. Carving the era, painting the future.",
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
    "Muhadhoroh Kubro merupakan acara tahunan santri yang menampilkan berbagai pertunjukan spektakuler, yang meliputi beberapa penampilan seni, yang dibungkus dengan multibahasa (Arab & Inggris) dan kreativitas santri.",
  descriptionEn:
    "Muhadhoroh Kubro is an annual student event featuring spectacular performances, including various art performances wrapped in multilingual presentations (Arabic & English) and student creativity.",
  date: new Date("2026-08-15T08:00:00"),
  endDate: new Date("2026-08-16T17:00:00"),
  expectedAttendees: 1000,
  schedule: [
    {
      day: 1,
      label: "Day 1 - Competition Day",
      date: "Jumat, 15 Agustus 2026",
      events: [
        { time: "08:00 - 09:00", title: "Opening Ceremony", description: "Upacara pembukaan Muhadhoroh Kubro" },
        { time: "09:00 - 12:00", title: "Quran Recitation Competition", description: "Lomba Tilawah dan Tahfidz Qur'an" },
        { time: "12:00 - 13:00", title: "Break & Dzuhur Prayer", description: "Istirahat dan Sholat Dzuhur" },
        { time: "13:00 - 16:00", title: "Multilingual Speech Competition", description: "LombaPidato Multibahasa (Arab & Inggris)" },
        { time: "16:00 - 16:30", title: "Day 1 Closing", description: "Penutupan hari pertama" },
      ],
    },
    {
      day: 2,
      label: "Day 2 - Performance Day",
      date: "Sabtu, 16 Agustus 2026",
      events: [
        { time: "08:00 - 10:00", title: "Art Performances", description: "Penampilan seni dan kaligrafi" },
        { time: "10:00 - 12:00", title: "Theater & Drama", description: "Pentas teater dan drama multibahasa" },
        { time: "12:00 - 13:00", title: "Break & Dzuhur Prayer", description: "Istirahat dan Sholat Dzuhur" },
        { time: "13:00 - 15:00", title: "Musical Performances", description: "Penampilan musik dan nasheed" },
        { time: "15:00 - 17:00", title: "Grand Finale & Awards", description: "Puncak acara dan pemberian penghargaan" },
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
    name: "Pesantren Baitul Qur'an Sragen",
    address: "Sragen, Jawa Tengah, Indonesia",
    facilities: ["Parking Area", "Mosque", "Auditorium", "Canteen", "Medical Room"],
  },
};

// ── Sponsorship Tiers ──
export const SPONSORSHIP_TIERS = [
  {
    tier: "Gold",
    price: "Rp 5.000.000",
    priceNum: 5000000,
    benefits: [
      "Logo on main banner",
      "VIP seats at event",
      "MC mention during event",
      "Exclusive gift box",
      "Logo on website",
    ],
    color: "gold",
  },
  {
    tier: "Silver",
    price: "Rp 2.500.000",
    priceNum: 2500000,
    benefits: ["Logo on banner", "Reserved seats", "MC mention during event", "Logo on website"],
    color: "gray",
  },
  {
    tier: "Bronze",
    price: "Rp 1.000.000",
    priceNum: 1000000,
    benefits: ["Logo on website", "Thank you card"],
    color: "amber",
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
      "Silakan pilih paket sponsorship yang tersedia (Gold, Silver, atau Bronze) atau hubungi admin kami untuk paket custom. Tim kami akan menghubungi Anda untuk proses selanjutnya.",
  },
  {
    question: "Apakah saya bisa mendapatkan bukti donasi?",
    answer:
      "Ya, setelah donasi dikonfirmasi, kami akan mengirimkan tanda terima donasi melalui WhatsApp. Untuk donasi perusahaan, kami dapat menyediakan surat keterangan donasi resmi.",
  },
];

// ── Social Media ──
export const SOCIAL_LINKS = {
  instagram: "#",
  youtube: "#",
  tiktok: "#",
  whatsapp: "https://wa.me/6289510084866",
};
