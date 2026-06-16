export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  area: string | null;
  bhk: string;
  sqft: number | null;
  rent: number;
  deposit: number | null;
  video_url: string | null;
  available_now: boolean;
  floor: string | null;
  amenities: string[];
  description: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  property_slug: string | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface PropertyFormData {
  name: string;
  location: string;
  area: string;
  bhk: string;
  sqft: number;
  rent: number;
  deposit: number;
  video_url: string;
  available_now: boolean;
  floor: string;
  amenities: string[];
  description: string;
  lat: number;
  lng: number;
}