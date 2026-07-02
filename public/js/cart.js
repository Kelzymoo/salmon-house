const Cart = {
  KEY: 'salmon_house_cart',

  getItems() {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateUI();
  },

  addItem(item) {
    const items = this.getItems();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...item, qty: 1 });
    }
    this.save(items);
    this.showToast(`${item.name} added to cart`);
  },

  removeItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.save(items);
  },

  updateQty(id, qty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(0, qty);
      if (item.qty === 0) {
        this.save(items.filter(i => i.id !== id));
      } else {
        this.save(items);
      }
    }
  },

  getTotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    localStorage.removeItem(this.KEY);
    this.updateUI();
  },

  updateUI() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
    });
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.classList.toggle('hidden', count === 0);
      el.textContent = count;
    });
    document.querySelectorAll('.cart-total-display').forEach(el => {
      el.textContent = `R${this.getTotal().toFixed(2)}`;
    });

    const floatingCart = document.querySelector('.floating-cart');
    if (floatingCart) {
      floatingCart.classList.toggle('show', count > 0);
      const floatingCount = floatingCart.querySelector('.floating-count');
      const floatingTotal = floatingCart.querySelector('.floating-total');
      if (floatingCount) floatingCount.textContent = count;
      if (floatingTotal) floatingTotal.textContent = `R${this.getTotal().toFixed(2)}`;
    }

    if (typeof onCartUpdate === 'function') onCartUpdate();
  },

  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>&#10003;</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  init() {
    this.updateUI();
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.init());
