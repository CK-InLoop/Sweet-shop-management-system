const Sweet = require('../models/Sweet');

class SweetService {
  constructor(initialSweets = []) {
    this.sweets = initialSweets.map(s => new Sweet(s.id, s.name, s.category, s.price, s.quantity));
  }

  addSweet(sweetData) {
    if (this.sweets.some(s => s.id === sweetData.id)) {
      throw new Error('ID must be unique');
    }
    const sweet = new Sweet(sweetData.id, sweetData.name, sweetData.category, sweetData.price, sweetData.quantity);
    this.sweets.push(sweet);
  }

  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Sweet not found');
    }
    this.sweets.splice(index, 1);
  }

  searchByName(name) {
    const lower = name.toLowerCase();
    return this.sweets.filter(s => s.name.toLowerCase().includes(lower));
  }

  searchByCategory(category) {
    const lower = category.toLowerCase();
    return this.sweets.filter(s => s.category.toLowerCase() === lower);
  }

  searchByPriceRange(min, max) {
    return this.sweets.filter(s => s.price >= min && s.price <= max);
  }

  sortByPrice(order = 'asc') {
    const sorted = [...this.sweets].sort((a, b) => a.price - b.price);
    return order === 'desc' ? sorted.reverse() : sorted;
  }

  sortByName() {
    return [...this.sweets].sort((a, b) => a.name.localeCompare(b.name));
  }

  purchaseSweet(id, amount) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < amount) throw new Error('Insufficient quantity');
    sweet.quantity -= amount;
  }

  restockSweet(id, amount) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet not found');
    sweet.quantity += amount;
  }

  getAllSweets() {
    return this.sweets;
  }
}

module.exports = SweetService;
