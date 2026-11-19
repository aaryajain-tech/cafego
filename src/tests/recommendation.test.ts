import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_CAFES } from '../data/mockData';

describe('Recommendation & Matching Engine', () => {
  it('should have authentic initial cafe recommendations in Chennai, India', () => {
    assert.strictEqual(INITIAL_CAFES.length, 5);
    const validNeighborhoods = ['Alwarpet', 'Mylapore', 'ECR (East Coast Road)', 'Nungambakkam', 'Besant Nagar'];
    for (const cafe of INITIAL_CAFES) {
      assert.ok(validNeighborhoods.includes(cafe.neighborhood), `Unexpected neighborhood: ${cafe.neighborhood}`);
      assert.ok(cafe.friendMatchScore >= 90 && cafe.friendMatchScore <= 100, 'Score should be between 90 and 100');
      assert.ok(cafe.priceTier.startsWith('₹'), 'Pricing must use Indian Rupee (₹)');
    }
  });

  it('should correctly filter cafes by venue type', () => {
    const cafesOnly = INITIAL_CAFES.filter((c) => c.type === 'cafe');
    const restaurantsOnly = INITIAL_CAFES.filter((c) => c.type === 'restaurant');

    assert.ok(cafesOnly.length > 0, 'Should have cafes');
    assert.ok(restaurantsOnly.length > 0, 'Should have restaurants');
    assert.strictEqual(cafesOnly.length + restaurantsOnly.length, INITIAL_CAFES.length);
  });

  it('should correctly filter cafes by facilities (veg-friendly, pet-friendly, coworking)', () => {
    const vegFriendly = INITIAL_CAFES.filter((c) => c.facilities.vegFriendly);
    const petFriendly = INITIAL_CAFES.filter((c) => c.facilities.petFriendly);
    const coworking = INITIAL_CAFES.filter((c) => c.facilities.coworkingSpaces);

    assert.ok(vegFriendly.length >= 4, 'Most spots should have veg-friendly options');
    assert.ok(petFriendly.length >= 2, 'Should detect pet friendly locations');
    assert.ok(coworking.length >= 2, 'Should detect coworking spots');
  });

  it('should sort correctly by highest friend match %', () => {
    const sorted = [...INITIAL_CAFES].sort((a, b) => b.friendMatchScore - a.friendMatchScore);
    for (let i = 0; i < sorted.length - 1; i++) {
      assert.ok(sorted[i].friendMatchScore >= sorted[i + 1].friendMatchScore, 'Must be sorted in descending order');
    }
    assert.strictEqual(sorted[0].name, 'Trishi’s Artisanal Kaapi & Bakes');
  });

  it('should sort correctly by squad ranking position #1 to #5', () => {
    const sorted = [...INITIAL_CAFES].sort((a, b) => a.rankingPosition - b.rankingPosition);
    assert.strictEqual(sorted[0].rankingPosition, 1);
    assert.strictEqual(sorted[sorted.length - 1].rankingPosition, 5);
  });

  it('should accurately match search query across name, neighborhood, and signature fusion dish', () => {
    const query = 'dosa';
    const matches = INITIAL_CAFES.filter((cafe) => {
      const q = query.toLowerCase();
      return (
        cafe.name.toLowerCase().includes(q) ||
        cafe.neighborhood.toLowerCase().includes(q) ||
        cafe.oneLinerTag.toLowerCase().includes(q) ||
        cafe.fusionItems.some((f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q))
      );
    });

    assert.ok(matches.length >= 1, 'Should find Dueling Dosa');
    assert.ok(matches.some((c) => c.name.includes('Dosa')));
  });

  it('should ensure each cafe features unique fusion dishes with honest friend quotes', () => {
    for (const cafe of INITIAL_CAFES) {
      assert.ok(cafe.fusionItems.length > 0, `Cafe ${cafe.name} must have at least one fusion dish`);
      const dish = cafe.fusionItems[0];
      assert.ok(dish.name.length > 3);
      assert.ok(dish.price.startsWith('₹'), 'Dish price must use ₹ currency');
      assert.ok(dish.friendReaction.length > 10, 'Must have candid friend reaction');
    }
  });
});

