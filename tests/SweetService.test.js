// TDD: Write tests for SweetService operations
const SweetService = require('../services/SweetService');
const sampleSweets = require('../data/sampleSweets');

describe('SweetService', () => {
  let service;
  beforeEach(() => {
    service = new SweetService([...sampleSweets]);
  });

  describe('addSweet', () => {
    test('should add a new sweet with unique id', () => {
      const newSweet = { id: 1004, name: 'Rasgulla', category: 'Milk-Based', price: 20, quantity: 10 };
      service.addSweet(newSweet);
      expect(service.getAllSweets().length).toBe(4);
      expect(service.getAllSweets()[3]).toMatchObject(newSweet);
    });
    test('should not add sweet with duplicate id', () => {
      const newSweet = { id: 1001, name: 'Duplicate', category: 'Test', price: 10, quantity: 1 };
      expect(() => service.addSweet(newSweet)).toThrow('ID must be unique');
    });
  });

  describe('deleteSweet', () => {
    test('should delete a sweet by id', () => {
      service.deleteSweet(1001);
      expect(service.getAllSweets().length).toBe(2);
      expect(service.getAllSweets().some(s => s.id === 1001)).toBe(false);
    });
    test('should throw error if sweet does not exist', () => {
      expect(() => service.deleteSweet(9999)).toThrow('Sweet not found');
    });
  });

  describe('searchByName', () => {
    test('should find sweets by name (case-insensitive)', () => {
      const results = service.searchByName('gajar');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Gajar Halwa');
    });
    test('should return empty array if no match', () => {
      const results = service.searchByName('nonexistent');
      expect(results.length).toBe(0);
    });
  });
});
