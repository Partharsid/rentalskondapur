import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().regex(/^\+?[\d\s\-()]{7,20}$/),
  property_slug: z.string().optional().or(z.literal('')),
  message: z.string().max(1000).optional().or(z.literal('')),
});

export const propertySchema = z.object({
  name: z.string().min(2).max(200),
  location: z.string().min(2).max(100),
  area: z.string().max(100).optional().or(z.literal('')),
  bhk: z.string().min(1).max(20),
  sqft: z.number().positive().optional(),
  rent: z.number().positive(),
  deposit: z.number().positive().optional(),
  video_url: z.string().url().optional().or(z.literal('')),
  available_now: z.boolean().optional(),
  floor: z.string().max(50).optional().or(z.literal('')),
  amenities: z.array(z.string()).optional(),
  description: z.string().max(5000).optional().or(z.literal('')),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const propertyUpdateSchema = z.object({
  name: z.string().min(2).max(200).optional(),
  location: z.string().min(2).max(100).optional(),
  area: z.string().max(100).optional(),
  bhk: z.string().min(1).max(20).optional(),
  sqft: z.number().positive().optional(),
  rent: z.number().positive().optional(),
  deposit: z.number().positive().optional(),
  video_url: z.string().url().optional(),
  available_now: z.boolean().optional(),
  floor: z.string().max(50).optional(),
  amenities: z.array(z.string()).optional(),
  description: z.string().max(5000).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});