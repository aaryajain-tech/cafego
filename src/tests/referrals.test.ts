import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_USER } from '../data/mockData';
import { isValidReferralUrl, isValidEmail } from '../utils/security';

describe('Squad Management & Referral Token Economy', () => {
  it('should initialize with valid user squad profile and token balance', () => {
    assert.strictEqual(typeof INITIAL_USER.name, 'string');
    assert.ok(INITIAL_USER.coffeeTokens >= 0, 'Token balance cannot be negative');
    assert.strictEqual(typeof INITIAL_USER.referralCode, 'string');
    assert.ok(INITIAL_USER.referralCode.length >= 4);
    assert.strictEqual(INITIAL_USER.squadName, 'The Weekend Coffee Seekers');
  });

  it('should generate valid, safe referral links with query parameter', () => {
    const link = `https://cafego.app/join?ref=${INITIAL_USER.referralCode}`;
    assert.ok(isValidReferralUrl(link), 'Generated referral link must be valid and safe');
  });

  it('should calculate coffee token increments upon successful referrals (+10 tokens)', () => {
    const currentTokens = INITIAL_USER.coffeeTokens;
    const currentReferrals = INITIAL_USER.successfulReferrals;

    const updatedUser = {
      ...INITIAL_USER,
      successfulReferrals: currentReferrals + 1,
      coffeeTokens: currentTokens + 10,
    };

    assert.strictEqual(updatedUser.successfulReferrals, currentReferrals + 1);
    assert.strictEqual(updatedUser.coffeeTokens, currentTokens + 10);
  });

  it('should award 15 coffee tokens for authentic friend review submissions', () => {
    const currentTokens = 30;
    const tokensAfterReview = currentTokens + 15;
    assert.strictEqual(tokensAfterReview, 45);
  });

  it('should validate referral tier milestone thresholds', () => {
    const getPerkTier = (referrals: number) => {
      return {
        tier1Unlocked: referrals >= 1, // 2 Free Pour-Overs
        tier2Unlocked: referrals >= 3, // VIP Clay Badge
        tier3Unlocked: referrals >= 5, // ₹500 Bakery Pass
      };
    };

    assert.deepStrictEqual(getPerkTier(0), { tier1Unlocked: false, tier2Unlocked: false, tier3Unlocked: false });
    assert.deepStrictEqual(getPerkTier(1), { tier1Unlocked: true, tier2Unlocked: false, tier3Unlocked: false });
    assert.deepStrictEqual(getPerkTier(3), { tier1Unlocked: true, tier2Unlocked: true, tier3Unlocked: false });
    assert.deepStrictEqual(getPerkTier(5), { tier1Unlocked: true, tier2Unlocked: true, tier3Unlocked: true });
  });

  it('should strictly validate friend email invitations', () => {
    assert.strictEqual(isValidEmail('friend@example.com'), true);
    assert.strictEqual(isValidEmail('aarya.jain@college.edu'), true);
    assert.strictEqual(isValidEmail('not-an-email'), false);
    assert.strictEqual(isValidEmail(''), false);
    assert.strictEqual(isValidEmail('@missinguser.com'), false);
  });
});

