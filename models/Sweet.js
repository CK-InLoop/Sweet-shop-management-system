class Sweet {
  constructor(id, name, category, price, quantity) {
    if (!id || !name || !category || price === undefined || quantity === undefined) {
      throw new Error('All fields are required');
    }
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }
}

module.exports = Sweet;
