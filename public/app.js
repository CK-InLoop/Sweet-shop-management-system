// In-browser Sweet Shop logic (minimal, based on service)
const sampleSweets = [
  { id: 1001, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 20 },
  { id: 1002, name: "Gajar Halwa", category: "Vegetable-Based", price: 30, quantity: 15 },
  { id: 1003, name: "Gulab Jamun", category: "Milk-Based", price: 10, quantity: 50 }
];

let sweets = [...sampleSweets];
let filteredSweets = [...sweets];

function renderTable(data) {
  const tbody = document.querySelector('#sweetTable tbody');
  tbody.innerHTML = '';
  data.forEach(sweet => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sweet.id}</td>
      <td>${sweet.name}</td>
      <td>${sweet.category}</td>
      <td>${sweet.price}</td>
      <td>${sweet.quantity}</td>
      <td>
        <button class="action-btn delete-btn" onclick="deleteSweet(${sweet.id})">Delete</button>
        <button class="action-btn purchase-btn" onclick="purchaseSweet(${sweet.id})">Purchase</button>
        <button class="action-btn restock-btn" onclick="restockSweet(${sweet.id})">Restock</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function resetFilters() {
  document.getElementById('searchName').value = '';
  document.getElementById('searchCategory').value = '';
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('sortSelect').value = '';
  filteredSweets = [...sweets];
  renderTable(filteredSweets);
}

function applyFilters() {
  let data = [...sweets];
  const name = document.getElementById('searchName').value.trim().toLowerCase();
  const category = document.getElementById('searchCategory').value.trim().toLowerCase();
  const minPrice = Number(document.getElementById('minPrice').value);
  const maxPrice = Number(document.getElementById('maxPrice').value);
  if (name) data = data.filter(s => s.name.toLowerCase().includes(name));
  if (category) data = data.filter(s => s.category.toLowerCase() === category);
  if (!isNaN(minPrice)) data = data.filter(s => s.price >= minPrice);
  if (!isNaN(maxPrice) && maxPrice > 0) data = data.filter(s => s.price <= maxPrice);
  const sortValue = document.getElementById('sortSelect').value;
  if (sortValue === 'price-asc') data.sort((a, b) => a.price - b.price);
  if (sortValue === 'price-desc') data.sort((a, b) => b.price - a.price);
  if (sortValue === 'name') data.sort((a, b) => a.name.localeCompare(b.name));
  filteredSweets = data;
  renderTable(filteredSweets);
}

// Add Sweet
const addForm = document.getElementById('addForm');
addForm.onsubmit = function(e) {
  e.preventDefault();
  const id = Number(document.getElementById('id').value);
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value.trim();
  const price = Number(document.getElementById('price').value);
  const quantity = Number(document.getElementById('quantity').value);
  if (sweets.some(s => s.id === id)) {
    alert('ID must be unique');
    return;
  }
  if (!id || !name || !category || isNaN(price) || isNaN(quantity)) {
    alert('All fields are required');
    return;
  }
  const sweet = { id, name, category, price, quantity };
  sweets.push(sweet);
  resetFilters();
  addForm.reset();
};

// Search & Sort
const searchBtn = document.getElementById('searchBtn');
searchBtn.onclick = function(e) {
  e.preventDefault();
  applyFilters();
};
const resetBtn = document.getElementById('resetBtn');
resetBtn.onclick = function(e) {
  e.preventDefault();
  resetFilters();
};
document.getElementById('sortSelect').onchange = applyFilters;

// Table Actions
window.deleteSweet = function(id) {
  if (confirm('Delete this sweet?')) {
    sweets = sweets.filter(s => s.id !== id);
    resetFilters();
  }
};
window.purchaseSweet = function(id) {
  const sweet = sweets.find(s => s.id === id);
  if (!sweet) return;
  const qty = prompt('Enter quantity to purchase:', '1');
  const num = Number(qty);
  if (isNaN(num) || num <= 0) return alert('Invalid quantity');
  if (sweet.quantity < num) return alert('Insufficient quantity');
  sweet.quantity -= num;
  resetFilters();
};
window.restockSweet = function(id) {
  const sweet = sweets.find(s => s.id === id);
  if (!sweet) return;
  const qty = prompt('Enter quantity to restock:', '1');
  const num = Number(qty);
  if (isNaN(num) || num <= 0) return alert('Invalid quantity');
  sweet.quantity += num;
  resetFilters();
};

// Initial render
renderTable(sweets);
