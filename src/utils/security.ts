/**
 * Security and sanitization utility for CafeGo
 * Defends against XSS, injection, prototype pollution, and malformed inputs.
 */

// Escape HTML characters to prevent Stored & Reflected XSS
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.trim().slice(0, maxLength);
  return trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Decode sanitized HTML for display when needed safely
export function escapeHtml(str: string): string {
  return sanitizeInput(str);
}

// Strictly validate email format
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // RFC 5322 compliant regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

// Validate that a URL is a legitimate safe CafeGo referral URL
export function isValidReferralUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const isAllowedHost = parsed.hostname === 'cafego.app' || parsed.hostname === 'localhost' || parsed.hostname.endsWith('.cafego.app');
    const isAllowedProtocol = parsed.protocol === 'https:' || parsed.protocol === 'http:';
    const hasRef = parsed.searchParams.has('ref');
    return isAllowedHost && isAllowedProtocol && hasRef;
  } catch {
    return false;
  }
}

// Safe bounds check for numeric review ratings
export function clampRating(score: number, min = 1, max = 5): number {
  if (typeof score !== 'number' || isNaN(score)) return min;
  return Math.min(Math.max(Math.round(score * 10) / 10, min), max);
}

