import { createServerSupabaseClient } from './supabase-server';

export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const supabase = createServerSupabaseClient();
    const now = Date.now();
    const windowStart = new Date(now - windowMs).toISOString();

    const { data: rateRows } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('key', key)
      .gte('created_at', windowStart);

    const currentCount = rateRows ? rateRows.length : 0;

    if (currentCount >= maxAttempts) {
      return { allowed: false, remaining: 0 };
    }

    await supabase.from('rate_limits').insert({ key, created_at: new Date().toISOString() });

    return { allowed: true, remaining: maxAttempts - currentCount - 1 };
  } catch {
    return { allowed: true, remaining: maxAttempts };
  }
}

export function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}