import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeInput, clampRating, isValidReferralUrl, isValidEmail } from '../utils/security';

describe('Application Security & Input Sanitization', () => {
  it('should escape dangerous HTML script tags to prevent Stored XSS', () => {
    const maliciousPayload = '<script>alert("XSS")</script>';
    const sanitized = sanitizeInput(maliciousPayload);
    assert.strictEqual(sanitized.includes('<script>'), false);
    assert.strictEqual(sanitized, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
  });

  it('should escape HTML event handlers and image onerror injection', () => {
    const maliciousPayload = '<img src="x" onerror="alert(1)">';
    const sanitized = sanitizeInput(maliciousPayload);
    assert.strictEqual(sanitized.includes('<img'), false);
    assert.strictEqual(sanitized.includes('onerror'), true);
    assert.strictEqual(sanitized, '&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;');
  });

  it('should truncate strings exceeding maximum allowed length', () => {
    const longString = 'a'.repeat(600);
    const sanitized = sanitizeInput(longString, 50);
    assert.strictEqual(sanitized.length, 50);
  });

  it('should clamp review ratings within strict numeric bounds [1, 5]', () => {
    assert.strictEqual(clampRating(5), 5);
    assert.strictEqual(clampRating(1), 1);
    assert.strictEqual(clampRating(999), 5, 'Should clamp upper bound');
    assert.strictEqual(clampRating(-10), 1, 'Should clamp lower bound');
    assert.strictEqual(clampRating(NaN as any), 1, 'Should safely handle NaN');
  });

  it('should reject untrusted or javascript: pseudo-protocol referral URLs', () => {
    assert.strictEqual(isValidReferralUrl('javascript:alert(1)'), false);
    assert.strictEqual(isValidReferralUrl('data:text/html,<script>alert(1)</script>'), false);
    assert.strictEqual(isValidReferralUrl('https://evil-phishing.com/join?ref=HACK'), false);
    assert.strictEqual(isValidReferralUrl('https://cafego.app/join?ref=CHAI30'), true);
  });

  it('should defend against email header injection and malformed input', () => {
    assert.strictEqual(isValidEmail('victim@example.com\nBcc:spammer@evil.com'), false);
    assert.strictEqual(isValidEmail('a'.repeat(300) + '@example.com'), false);
    assert.strictEqual(isValidEmail('normal.user+tag@domain.co.in'), true);
  });
});

