import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';
import { getSupabaseServer } from '@/lib/supabase-server';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { sanitizeInput } from '@/lib/sanitize';

function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  return !!token && verifyAdminToken(token);
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

const VALID_SORT_COLUMNS = ['created_at', 'status', 'name'];
const VALID_STATUSES = ['new', 'contacted', 'closed'];

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const rawSearch = searchParams.get('search') || '';
  const search = sanitizeInput(rawSearch).slice(0, 100);
  const status = searchParams.get('status') || '';
  const sortBy = VALID_SORT_COLUMNS.includes(searchParams.get('sortBy') || '') ? searchParams.get('sortBy')! : 'created_at';
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10) || 50));

  const supabase = getSupabaseServer();
  let query = supabase.from('inquiries').select('*', { count: 'exact' });

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq('status', status);
  }
  if (search) {
    const sanitized = search.replace(/[%_]/g, '\\$&');
    query = query.or(`name.ilike.%${sanitized}%,email.ilike.%${sanitized}%,phone.ilike.%${sanitized}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data || [], total: count || 0, page, limit });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-update-inquiry'), 30, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data, error } = await (supabase.from('inquiries') as any)
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-delete-inquiry'), 20, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { error } = await supabase.from('inquiries').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}