import { createHash, createHmac, timingSafeEqual, randomBytes } from 'crypto';

const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000;

function getHmacSecret(): string {
  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) {
    throw new Error('Missing ADMIN_TOKEN_SECRET environment variable');
  }
  return secret;
}

function getStoredHash(): string {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error('Missing ADMIN_PASSWORD_HASH environment variable');
  }
  return hash;
}

export function verifyPassword(input: string): boolean {
  const inputHash = createHash('sha256').update(input).digest('hex');
  const stored = Buffer.from(getStoredHash(), 'utf-8');
  const inputBuf = Buffer.from(inputHash, 'utf-8');
  if (stored.length !== inputBuf.length) return false;
  try {
    return timingSafeEqual(stored, inputBuf);
  } catch {
    return false;
  }
}

export function createAdminToken(): string {
  const timestamp = Date.now().toString();
  const random = randomBytes(32).toString('hex');
  const payload = `${timestamp}-${random}`;
  const hmac = createHmac('sha256', getHmacSecret())
    .update(payload)
    .digest('hex');
  return `${payload}.${hmac}`;
}

export function verifyAdminToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, hmac] = parts;
  try {
    const expectedHmac = createHmac('sha256', getHmacSecret())
      .update(payload)
      .digest('hex');
    const valid = timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac));
    if (!valid) return false;
  } catch {
    return false;
  }
  const timestamp = parseInt(payload.split('-')[0], 10);
  if (isNaN(timestamp)) return false;
  return Date.now() - timestamp < TOKEN_EXPIRY_MS;
}