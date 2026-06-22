-- ═══════════════════════════════════════════════
-- Del'Avenir — Supabase Schema
-- Paste this into: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════

-- ── Achievements ──
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('academic', 'arts', 'sports', 'religious', 'community')),
  level TEXT NOT NULL CHECK (level IN ('international', 'national', 'regional', 'local')),
  year INTEGER NOT NULL,
  students TEXT[] DEFAULT '{}',
  ranking INTEGER DEFAULT 0,
  image_url TEXT,
  featured BOOLEAN DEFAULT false
);

-- ── Registrations (Muhadhoroh) ──
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Guest' CHECK (role IN ('Guest', 'Participant', 'Volunteer')),
  guests INTEGER DEFAULT 1 CHECK (guests >= 1 AND guests <= 10),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- ── Gallery Photos ──
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  event_name TEXT DEFAULT 'Muhadhoroh Kubro'
);

-- ── Sponsors ──
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('gold', 'silver', 'bronze')),
  logo_url TEXT,
  website_url TEXT,
  amount NUMERIC
);

-- ═══════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

-- ── Achievements: public read, authenticated write ──
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update achievements"
  ON achievements FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete achievements"
  ON achievements FOR DELETE
  USING (auth.role() = 'authenticated');

-- ── Registrations: anyone can insert, only authenticated can read/update ──
CREATE POLICY "Anyone can register"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations"
  ON registrations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update registrations"
  ON registrations FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ── Gallery Photos: public read, authenticated write ──
CREATE POLICY "Anyone can view gallery photos"
  ON gallery_photos FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery_photos FOR ALL
  USING (auth.role() = 'authenticated');

-- ── Sponsors: public read, authenticated write ──
CREATE POLICY "Anyone can view sponsors"
  ON sponsors FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage sponsors"
  ON sponsors FOR ALL
  USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════
-- Indexes
-- ═══════════════════════════════════════════════
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_year ON achievements(year);
CREATE INDEX idx_achievements_level ON achievements(level);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_gallery_sort ON gallery_photos(sort_order);
CREATE INDEX idx_sponsors_tier ON sponsors(tier);

-- ═══════════════════════════════════════════════
-- Seed Data (sample achievements from constants.ts)
-- ═══════════════════════════════════════════════
INSERT INTO achievements (title, description, category, level, year, students, ranking) VALUES
  ('Lomba Tahfidz Qur''an Nasional', 'Juara 1 Lomba Tahfidz Qur''an tingkat nasional dengan hafalan 30 Juz', 'religious', 'national', 2024, ARRAY['Ahmad Fauzi', 'Muhammad Rizki'], 1),
  ('Olimpiade Sains Nasional', 'Medali Emas pada Olimpiade Matematika tingkat nasional', 'academic', 'national', 2024, ARRAY['Siti Aminah'], 1),
  ('Festival Seni Kaligrafi', 'Juara 1 Festival Kaligrafi tingkat regional Jawa Tengah', 'arts', 'regional', 2024, ARRAY['Fatimah Azzahra'], 1),
  ('Turnamen Futsal Pelajar', 'Juara 2 Turnamen Futsal antar pesantren se-Jawa Tengah', 'sports', 'regional', 2024, ARRAY['Tim Futsal BQ Sragen'], 2),
  ('Bakti Sosial Peduli Banjir', 'Penghargaan atas partisipasi aktif dalam bakti sosial korban banjir', 'community', 'local', 2024, ARRAY['Tim Relawan BQ'], 0),
  ('Lomba Debat Bahasa Arab', 'Juara 1 Lomba Debat Bahasa Arab tingkat nasional', 'academic', 'national', 2023, ARRAY['Abdullah bin Mas''ud', 'Umar Faruq'], 1);

-- Seed gallery photos
INSERT INTO gallery_photos (src, alt, caption, sort_order, event_name) VALUES
  ('/images/muhadhoroh/1.webp', 'Pentas Seni Tradisional', 'Traditional Arts Performance', 1, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/2.webp', 'Muhadhoroh Kubro Stage', 'Muhadhoroh Kubro 2025 — Main Stage', 2, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/3.webp', 'Stage Performance', 'Kusyful Kubro — Grand Performance', 3, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/4.webp', 'Pyrotechnics Show', 'Spectacular Pyrotechnics Display', 4, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/5.webp', 'Perkusi Tradisional', 'Traditional Percussion Ensemble', 5, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/6.webp', 'Panggung Utama', 'Anvasera — Main Stage Design', 6, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/7.webp', 'Suasana Acara', 'Aerial View — Grand Event Setup', 7, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/8.webp', 'DJ Performance', 'Murmuration Dance — Live Performance', 8, 'Muhadhoroh Kubro'),
  ('/images/muhadhoroh/9.webp', 'Pertunjukan Budaya', 'Cultural Dance Performance', 9, 'Muhadhoroh Kubro');
