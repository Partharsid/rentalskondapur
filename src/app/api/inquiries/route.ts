import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitize';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'inquiry'), 3, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, phone, property_slug, message } = parsed.data;
    const supabase = getSupabaseServer();
    const { error } = await (supabase.from('inquiries') as any).insert({
      name: sanitizeInput(name),
      email: email ? sanitizeInput(email) : null,
      phone: sanitizeInput(phone),
      property_slug: property_slug || null,
      message: message ? sanitizeInput(message) : null,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}