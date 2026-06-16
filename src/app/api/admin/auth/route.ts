import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createAdminToken, verifyAdminToken } from '@/lib/admin-auth';
import { checkRateLimit, getRateLimitKey } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const { allowed } = await checkRateLimit(getRateLimitKey(ip, 'admin-auth'), 5, 15 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  try {
    const { password } = await req.json();
    if (!password || typeof password !== 'string' || password.length < 1) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    const token = createAdminToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      path: '/',
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}