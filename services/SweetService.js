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

  getAllSweets() {
    return this.sweets;
  }
}

module.exports = SweetService;
