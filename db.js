const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'orders.json');

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    return [];
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(orders) {
  fs.writeFileSync(DB_PATH, JSON.stringify(orders, null, 2));
}

module.exports = {
  getAllOrders(filters = {}) {
    let orders = readDB();
    if (filters.status && filters.status !== 'all') {
      orders = orders.filter(o => o.order_status === filters.status);
    }
    if (filters.date) {
      orders = orders.filter(o => o.pickup_date === filters.date);
    }
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return orders;
  },

  getOrder(id) {
    const orders = readDB();
    return orders.find(o => o.id === id) || null;
  },

  createOrder(order) {
    const orders = readDB();
    order.created_at = new Date().toISOString();
    order.updated_at = new Date().toISOString();
    orders.push(order);
    writeDB(orders);
    return order;
  },

  updateOrderStatus(id, status) {
    const orders = readDB();
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.order_status = status;
    order.updated_at = new Date().toISOString();
    writeDB(orders);
    return order;
  },

  getStats() {
    const orders = readDB();
    const today = new Date().toISOString().split('T')[0];

    const todayOrders = orders.filter(o => o.created_at.startsWith(today));
    const todayRevenue = todayOrders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter(o => ['new', 'confirmed', 'preparing'].includes(o.order_status));
    const readyOrders = orders.filter(o => o.order_status === 'ready');

    return {
      todayOrders: todayOrders.length,
      todayRevenue,
      pendingOrders: pendingOrders.length,
      readyOrders: readyOrders.length
    };
  }
};
