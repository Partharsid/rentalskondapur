import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = (process.env.NEXT_PUBLIC_SITE_URL || '')
  .split(',')
  .map((s) => s.replace(/\/$/, '').replace(/^https?:\/\//, ''))
  .filter(Boolean);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.toLowerCase().endsWith('.sql')) {
    return new NextResponse('Not Found', { status: 404 });
  }

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('admin_token')?.value;
    if (!token && pathname !== '/admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  const method = req.method;
  if (
    process.env.NODE_ENV === 'production' &&
    ['POST', 'PUT', 'DELETE'].includes(method) &&
    (pathname.startsWith('/api/admin/') || pathname.startsWith('/api/tenants/'))
  ) {
    const origin = req.headers.get('origin') || '';
    if (origin) {
      const originHost = origin.replace(/^https?:\/\//, '').replace(/:\d+$/, '');
      const reqHost = req.headers.get('host') || '';
      const allowed = ALLOWED_ORIGINS.length > 0
        ? ALLOWED_ORIGINS.some((ao) => originHost === ao || originHost === `www.${ao}` || `www.${originHost}` === ao)
        : originHost === reqHost || originHost === `www.${reqHost}` || `www.${originHost}` === reqHost;

      if (!allowed) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }
  }

  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  if (pathname.startsWith('/api/admin/') || pathname.startsWith('/api/tenants/')) {
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Pragma', 'no-cache');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};