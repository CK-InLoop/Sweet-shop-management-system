// TDD: Write tests for Sweet model first
const Sweet = require('../models/Sweet');

describe('Sweet Model', () => {
  test('should create a Sweet object with all fields', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(sweet.id).toBe(1001);
    expect(sweet.name).toBe('Kaju Katli');
    expect(sweet.category).toBe('Nut-Based');
    expect(sweet.price).toBe(50);
    expect(sweet.quantity).toBe(20);
  });

  test('should throw error if required fields are missing', () => {
    expect(() => new Sweet()).toThrow();
    expect(() => new Sweet(1004)).toThrow();
  });
});
