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

  describe('searchByCategory', () => {
    test('should find sweets by category (case-insensitive)', () => {
      const results = service.searchByCategory('milk-based');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Gulab Jamun');
    });
    test('should return empty array if no match', () => {
      const results = service.searchByCategory('fruit-based');
      expect(results.length).toBe(0);
    });
  });

  describe('searchByPriceRange', () => {
    test('should find sweets within price range', () => {
      const results = service.searchByPriceRange(10, 30);
      expect(results.length).toBe(2);
      expect(results.some(s => s.name === 'Gajar Halwa')).toBe(true);
      expect(results.some(s => s.name === 'Gulab Jamun')).toBe(true);
    });
    test('should return empty array if no sweets in range', () => {
      const results = service.searchByPriceRange(100, 200);
      expect(results.length).toBe(0);
    });
  });

  describe('sortByPrice', () => {
    test('should sort sweets by price ascending', () => {
      const results = service.sortByPrice('asc');
      expect(results[0].price).toBeLessThanOrEqual(results[1].price);
      expect(results[1].price).toBeLessThanOrEqual(results[2].price);
    });
    test('should sort sweets by price descending', () => {
      const results = service.sortByPrice('desc');
      expect(results[0].price).toBeGreaterThanOrEqual(results[1].price);
      expect(results[1].price).toBeGreaterThanOrEqual(results[2].price);
    });
  });

  describe('sortByName', () => {
    test('should sort sweets alphabetically by name', () => {
      const results = service.sortByName();
      const names = results.map(s => s.name);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    });
  });

  describe('purchaseSweet', () => {
    test('should reduce quantity when enough stock', () => {
      service.purchaseSweet(1001, 5);
      const sweet = service.getAllSweets().find(s => s.id === 1001);
      expect(sweet.quantity).toBe(15);
    });
    test('should throw error if insufficient quantity', () => {
      expect(() => service.purchaseSweet(1002, 100)).toThrow('Insufficient quantity');
    });
    test('should throw error if sweet not found', () => {
      expect(() => service.purchaseSweet(9999, 1)).toThrow('Sweet not found');
    });
  });

  describe('restockSweet', () => {
    test('should increase quantity of sweet', () => {
      service.restockSweet(1003, 10);
      const sweet = service.getAllSweets().find(s => s.id === 1003);
      expect(sweet.quantity).toBe(60);
    });
    test('should throw error if sweet not found', () => {
      expect(() => service.restockSweet(9999, 5)).toThrow('Sweet not found');
    });
  });
});
