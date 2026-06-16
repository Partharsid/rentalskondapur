import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';
import { getSupabaseServer } from '@/lib/supabase-server';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { propertySchema, propertyUpdateSchema } from '@/lib/validations';
import { sanitizeInput } from '@/lib/sanitize';

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  return !!token && verifyAdminToken(token);
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

function uuidRegex(): RegExp {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
}

async function generateUniqueSlug(supabase: any, baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let attempt = 0;
  while (attempt < 10) {
    const { data } = await supabase.from('properties').select('id').eq('slug', slug).maybeSingle();
    if (!data) return slug;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }
  return `${baseSlug}-${Date.now()}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServer();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  return NextResponse.json({ properties: data || [] });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-create-property'), 30, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = propertySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const supabase = getSupabaseServer();
    const baseSlug = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${data.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const slug = await generateUniqueSlug(supabase, baseSlug);

    const { data: result, error } = await (supabase.from('properties') as any)
      .insert({
        name: sanitizeInput(data.name),
        location: sanitizeInput(data.location),
        area: data.area ? sanitizeInput(data.area) : null,
        bhk: sanitizeInput(data.bhk),
        sqft: data.sqft || null,
        rent: data.rent,
        deposit: data.deposit || null,
        video_url: data.video_url || null,
        available_now: data.available_now ?? true,
        floor: data.floor ? sanitizeInput(data.floor) : null,
        amenities: data.amenities || [],
        description: data.description ? sanitizeInput(data.description) : null,
        lat: data.lat || null,
        lng: data.lng || null,
        slug,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-update-property'), 60, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !uuidRegex().test(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsed = propertyUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const supabase = getSupabaseServer();
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = sanitizeInput(data.name);
    if (data.location !== undefined) updateData.location = sanitizeInput(data.location);
    if (data.area !== undefined) updateData.area = sanitizeInput(data.area);
    if (data.bhk !== undefined) updateData.bhk = sanitizeInput(data.bhk);
    if (data.sqft !== undefined) updateData.sqft = data.sqft;
    if (data.rent !== undefined) updateData.rent = data.rent;
    if (data.deposit !== undefined) updateData.deposit = data.deposit;
    if (data.video_url !== undefined) updateData.video_url = data.video_url;
    if (data.available_now !== undefined) updateData.available_now = data.available_now;
    if (data.floor !== undefined) updateData.floor = sanitizeInput(data.floor);
    if (data.amenities !== undefined) updateData.amenities = data.amenities;
    if (data.description !== undefined) updateData.description = sanitizeInput(data.description);
    if (data.lat !== undefined) updateData.lat = data.lat;
    if (data.lng !== undefined) updateData.lng = data.lng;

    const { data: result, error } = await (supabase.from('properties') as any)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-delete-property'), 20, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !uuidRegex().test(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase.from('properties').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}