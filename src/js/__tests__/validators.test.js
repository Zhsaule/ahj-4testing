import { luhnAlgorithmCheck, cardSystem } from '../validators';

describe('luhnAlgorithmCheck', () => {
  test('should return true for a valid card number', () => {
    expect(luhnAlgorithmCheck('4532015112830366')).toBe(true);
  });

  test('should return false for an invalid card number', () => {
    expect(luhnAlgorithmCheck('4532015112830361')).toBe(false);
  });
});

describe('cardSystem', () => {
  test('should identify Visa', () => {
    expect(cardSystem('4532015112830366')).toBe('visa');
  });

  test('should identify MasterCard', () => {
    expect(cardSystem('5555555555554444')).toBe('master');
  });

  test('should identify American Express', () => {
    expect(cardSystem('341111111111111')).toBe('amex');
  });

  test('should identify Discover', () => {
    expect(cardSystem('6011111111111117')).toBe('discover');
  });

  test('should identify Diners Club', () => {
    expect(cardSystem('36111111111111')).toBe('diners_club');
  });

  test('should identify JCB', () => {
    expect(cardSystem('3530111333300000')).toBe('jcb');
  });

  test('should identify Mir', () => {
    expect(cardSystem('2200222222222222')).toBe('mir');
  });

  test('should return undefined for unknown card systems', () => {
    expect(cardSystem('1234567890123456')).toBeUndefined();
  });
});
