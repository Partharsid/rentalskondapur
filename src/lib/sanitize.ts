export function sanitizeInput(input: string): string {
  let sanitized = input;
  for (let i = 0; i < 3; i++) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }
  return sanitized.trim();
}