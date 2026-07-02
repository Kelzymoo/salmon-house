const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Yoco API keys (replace with your real keys) ──
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY || 'sk_test_960bfde0VBrLlpK098e4ffeb53e1';
const YOCO_PUBLIC_KEY = process.env.YOCO_PUBLIC_KEY || 'pk_test_ed29c4e0PziQVtx793e9';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── SSE clients for real-time dashboard notifications ──
let sseClients = [];

function notifyDashboard(data) {
  sseClients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

// SSE endpoint for dashboard
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const client = { id: clientId, res };
  sseClients.push(client);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// ── Get Yoco public key ──
app.get('/api/config', (req, res) => {
  res.json({ yocoPublicKey: YOCO_PUBLIC_KEY });
});

// ── Create order ──
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName, customerPhone, customerEmail,
      items, subtotal, total,
      pickupDate, pickupTime,
      specialInstructions, paymentToken
    } = req.body;

    if (!customerName || !customerPhone || !items || !items.length || !pickupDate || !pickupTime) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Charge via Yoco
    let paymentStatus = 'pending';
    if (paymentToken) {
      try {
        const chargeResponse = await fetch('https://online.yoco.com/v1/charges/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${YOCO_SECRET_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: paymentToken,
            amountInCents: Math.round(total * 100),
            currency: 'ZAR'
          })
        });
        const chargeResult = await chargeResponse.json();
        if (chargeResult.status === 'successful') {
          paymentStatus = 'paid';
        } else {
          return res.status(400).json({ error: 'Payment failed', details: chargeResult });
        }
      } catch (err) {
        return res.status(500).json({ error: 'Payment processing error' });
      }
    }

    const orderId = 'SH-' + uuidv4().slice(0, 8).toUpperCase();

    const order = db.createOrder({
      id: orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      items,
      subtotal,
      total,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      special_instructions: specialInstructions || null,
      payment_status: paymentStatus,
      payment_token: paymentToken || null,
      order_status: 'new'
    });

    notifyDashboard({ type: 'new_order', order });

    res.status(201).json({
      success: true,
      orderId,
      paymentStatus,
      message: 'Order placed successfully!'
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ── Get all orders (dashboard) ──
app.get('/api/orders', (req, res) => {
  const { status, date } = req.query;
  const orders = db.getAllOrders({ status, date });
  res.json(orders);
});

// ── Get single order (tracking) ──
app.get('/api/orders/:id', (req, res) => {
  const order = db.getOrder(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// ── Update order status (dashboard) ──
app.patch('/api/orders/:id', (req, res) => {
  const { orderStatus } = req.body;
  const validStatuses = ['new', 'confirmed', 'preparing', 'ready', 'collected', 'cancelled'];
  if (!validStatuses.includes(orderStatus)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = db.updateOrderStatus(req.params.id, orderStatus);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  notifyDashboard({ type: 'status_update', order });

  res.json({ success: true, order });
});

// ── Dashboard stats ──
app.get('/api/stats', (req, res) => {
  res.json(db.getStats());
});

// ── Serve pages ──
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'));
});

app.get('/track/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order-status.html'));
});

app.listen(PORT, () => {
  console.log(`\n  Salmon House server running at http://localhost:${PORT}`);
  console.log(`  Dashboard: http://localhost:${PORT}/dashboard\n`);
});
