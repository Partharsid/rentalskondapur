import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  return NextResponse.json({ properties: data || [] });
}