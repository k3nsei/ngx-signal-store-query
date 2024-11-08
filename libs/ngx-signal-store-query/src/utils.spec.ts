import { lowerFirst } from './utils';

describe('GIVEN lowerFirst', () => {
  describe('WHEN passed invalid value', () => {
    it('THEN should return provided value', () => {
      const values = [{}, NaN, null, undefined];

      values.forEach((value) => expect(lowerFirst(value as unknown as string)).toBe(value));
    });
  });

  describe('WHEN passed valid value', () => {
    it('THEN should return transformed value', () => {
      expect(lowerFirst('RedDragon')).toBe('redDragon');
      expect(lowerFirst(' OnionRing ')).toBe('onionRing');
      expect(lowerFirst('_BagOfChips')).toBe('_BagOfChips');
      expect(lowerFirst('cloud')).toBe('cloud');
    });
  });
});
