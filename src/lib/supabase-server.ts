import { createClient } from '@supabase/supabase-js';

function getUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !url.startsWith('http')) {
    throw new Error('Database configuration is invalid');
  }
  return url;
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error('Database configuration is invalid');
  }
  return key;
}

export function createServerSupabaseClient() {
  return createClient(getUrl(), getAnonKey(), {
    auth: { persistSession: false },
  });
}

let serviceClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServer() {
  if (serviceClient) return serviceClient;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error('Database configuration is invalid');
  }
  serviceClient = createClient(getUrl(), key, {
    auth: { persistSession: false },
  });
  return serviceClient;
}