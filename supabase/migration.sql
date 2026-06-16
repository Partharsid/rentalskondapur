-- ============================================
-- RENTALS KONDAPUR — Full Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Kondapur',
  area TEXT,
  bhk TEXT NOT NULL,
  sqft INTEGER,
  rent INTEGER NOT NULL,
  deposit INTEGER DEFAULT 0,
  video_url TEXT,
  available_now BOOLEAN DEFAULT true,
  floor TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  property_slug TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AUTO-UPDATE UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_updated_at ON properties;
CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. ROW LEVEL SECURITY
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Properties: public can view, only service_role can modify
DROP POLICY IF EXISTS "Public can view properties" ON properties;
CREATE POLICY "Public can view properties"
  ON properties FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can insert properties" ON properties;
CREATE POLICY "Service role can insert properties"
  ON properties FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update properties" ON properties;
CREATE POLICY "Service role can update properties"
  ON properties FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Service role can delete properties" ON properties;
CREATE POLICY "Service role can delete properties"
  ON properties FOR DELETE
  USING (true);

-- Inquiries: public can insert (contact form), only service_role can manage
DROP POLICY IF EXISTS "Public can create inquiries" ON inquiries;
CREATE POLICY "Public can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can view inquiries" ON inquiries;
CREATE POLICY "Service role can view inquiries"
  ON inquiries FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Service role can update inquiries" ON inquiries;
CREATE POLICY "Service role can update inquiries"
  ON inquiries FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Service role can delete inquiries" ON inquiries;
CREATE POLICY "Service role can delete inquiries"
  ON inquiries FOR DELETE
  USING (true);

-- 5. STORAGE BUCKET FOR VIDEOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-videos', 'property-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public can view videos" ON storage.objects;
CREATE POLICY "Public can view videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-videos');

DROP POLICY IF EXISTS "Service role can upload videos" ON storage.objects;
CREATE POLICY "Service role can upload videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-videos');

DROP POLICY IF EXISTS "Service role can delete videos" ON storage.objects;
CREATE POLICY "Service role can delete videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'property-videos');

-- 6. SEED DATA — Sample properties
INSERT INTO properties (slug, name, location, area, bhk, sqft, rent, deposit, available_now, floor, amenities, description) VALUES
('nimbus-heights', 'Nimbus Heights', 'Kondapur', 'Kothaguda', '1 BHK', 450, 15000, 30000, true, '2nd Floor', '["Gym","Parking","Power Backup"]', 'Cozy 1 BHK in the heart of Kondapur. Close to IT hubs and shopping centers. Walking distance to metro.'),
('skyline-heights', 'Skyline Heights', 'Kondapur', 'HITEC City', '3 BHK', 1450, 58000, 120000, true, '5th Floor', '["Gym","Pool","Parking","Security","Power Backup","Club House"]', 'Premium 3 BHK with panoramic city views. Prime location near HITEC City.'),
('meridian-park', 'Meridian Park', 'Gachibowli', 'Gachibowli', '2 BHK', 950, 32000, 65000, true, '3rd Floor', '["Gym","Parking","Security","Power Backup"]', 'Well-maintained 2 BHK in Gachibowli. Walking distance to major offices.'),
('the-crest', 'The Crest', 'Madhapur', 'Madhapur', '3 BHK', 1250, 65000, 130000, true, '8th Floor', '["Gym","Pool","Parking","Security","Power Backup","Garden"]', 'Luxurious 3 BHK in Madhapur. Premium amenities and excellent location near tech parks.'),
('azure-residences', 'Azure Residences', 'HITEC City', 'HITEC City', '2 BHK', 850, 35000, 70000, true, '4th Floor', '["Gym","Pool","Parking","Security"]', 'Modern 2 BHK in HITEC City. Brand new interiors and great lake views.'),
('nimbus-heights-premium', 'Nimbus Heights Premium', 'Kondapur', 'Kothaguda', '2 BHK', 750, 28000, 56000, true, '6th Floor', '["Gym","Parking","Power Backup","Garden"]', 'Spacious 2 BHK in premium Kondapur tower. Great for families.'),
('prism-suites', 'Prism Suites', 'Madhapur', 'Madhapur', '3 BHK', 1350, 62000, 125000, false, '12th Floor', '["Gym","Pool","Parking","Security","Power Backup","Club House","Garden"]', 'Ultra-premium 3 BHK suite. Recently vacated and being refurbished. Coming soon.'),
('horizon-flats', 'Horizon Flats', 'Gachibowli', 'Gachibowli', '2 BHK', 800, 30000, 60000, true, '1st Floor', '["Parking","Security","Power Backup"]', 'Affordable 2 BHK in Gachibowli. Great for bachelors and small families.'),
('ivory-nest', 'Ivory Nest', 'Banjara Hills', 'Banjara Hills', '2 BHK', 1050, 52000, 105000, true, '7th Floor', '["Gym","Pool","Parking","Security","Power Backup","Garden"]', 'Premium 2 BHK in upscale Banjara Hills. Quiet and secure neighborhood.'),
('zenith-tower', 'Zenith Tower', 'Nanakramguda', 'Nanakramguda', '3 BHK', 1550, 72000, 145000, false, '15th Floor', '["Gym","Pool","Parking","Security","Power Backup","Club House","Garden","Cafeteria"]', 'Executive 3 BHK in Nanakramguda financial district. Currently rented — available next month.')
ON CONFLICT (slug) DO NOTHING;

-- 7. RATE LIMITING TABLE (used by Supabase-backed rate limiter)
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_key_created ON rate_limits (key, created_at);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert rate limits" ON rate_limits;
CREATE POLICY "Public can insert rate limits"
  ON rate_limits FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can select rate limits" ON rate_limits;
CREATE POLICY "Public can select rate limits"
  ON rate_limits FOR SELECT
  USING (true);