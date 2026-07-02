// ── Sound generation ──
var AudioCtx = window.AudioContext || window.webkitAudioContext;
var audioCtx;

function playNotificationSound() {
  if (!document.getElementById('soundToggle').checked) return;
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    [880, 1108.73].forEach(function(freq, i) {
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.15 + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.15);
      osc.stop(audioCtx.currentTime + i * 0.15 + 0.6);
    });
  } catch (e) { /* silent fallback */ }
}

// ── State ──
var orders = [];
var currentFilter = 'all';
var currentDate = '';

// ── Date display ──
document.getElementById('currentDate').textContent =
  new Date().toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// ── SSE for real-time updates ──
function connectSSE() {
  var evtSource = new EventSource('/api/events');

  evtSource.onmessage = function(event) {
    var data = JSON.parse(event.data);
    if (data.type === 'new_order') {
      playNotificationSound();
      showNotification(data.order);
      loadOrders();
      loadStats();
    }
    if (data.type === 'status_update') {
      loadOrders();
      loadStats();
    }
  };

  evtSource.onerror = function() {
    var el = document.getElementById('connectionStatus');
    el.innerHTML = '<span style="width:8px;height:8px;background:var(--red);border-radius:50%;display:inline-block;"></span> Reconnecting...';
    el.style.background = 'var(--red-light)';
    el.style.color = 'var(--red)';
    setTimeout(function() {
      el.innerHTML = '<span class="status-dot-live"></span> Live';
      el.style.background = 'var(--green-light)';
      el.style.color = 'var(--green)';
    }, 3000);
  };
}

// ── Show notification popup ──
function showNotification(order) {
  var popup = document.createElement('div');
  popup.className = 'notification-popup';
  popup.innerHTML = '<h4>&#128276; New Order #' + order.id + '</h4>' +
    '<p>' + order.customer_name + ' &bull; ' + order.items.length + ' item(s) &bull; R' + order.total.toFixed(2) + '</p>' +
    '<p>Pickup: ' + order.pickup_time + '</p>';
  document.body.appendChild(popup);
  setTimeout(function() {
    popup.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(function() { popup.remove(); }, 300);
  }, 5000);
}

// ── Load orders ──
function loadOrders() {
  var url = '/api/orders?';
  if (currentFilter !== 'all') url += 'status=' + currentFilter + '&';
  if (currentDate) url += 'date=' + currentDate + '&';

  fetch(url)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      orders = data;
      renderOrders();
    })
    .catch(function(e) { console.error('Failed to load orders:', e); });
}

// ── Load stats ──
function loadStats() {
  fetch('/api/stats')
    .then(function(res) { return res.json(); })
    .then(function(stats) {
      document.getElementById('statTodayOrders').textContent = stats.todayOrders;
      document.getElementById('statRevenue').textContent = 'R' + stats.todayRevenue.toFixed(0);
      document.getElementById('statPending').textContent = stats.pendingOrders;
      document.getElementById('statReady').textContent = stats.readyOrders;
      document.getElementById('pendingBadge').textContent = stats.pendingOrders;
    })
    .catch(function(e) { console.error('Failed to load stats:', e); });
}

// ── Render orders ──
function renderOrders() {
  var list = document.getElementById('ordersList');

  if (orders.length === 0) {
    list.innerHTML = '<div class="empty-state">' +
      '<p style="font-size:3rem;">&#128230;</p>' +
      '<h3>No orders found</h3>' +
      '<p>Orders matching your filter will appear here.</p>' +
      '</div>';
    return;
  }

  var html = '';
  orders.forEach(function(order) {
    var itemsPreview = order.items.slice(0, 3).map(function(i) { return i.name + ' x' + i.qty; }).join(', ');
    var moreItems = order.items.length > 3 ? ' +' + (order.items.length - 3) + ' more' : '';
    var createdAt = new Date(order.created_at);
    var timeStr = createdAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });

    var parts = order.pickup_time.split(':');
    var hour = parseInt(parts[0]);
    var min = parts[1];
    var pickupTimeStr = (hour > 12 ? hour - 12 : hour) + ':' + min + ' ' + (hour >= 12 ? 'PM' : 'AM');

    var actionsHtml = '';
    if (order.order_status === 'new') {
      actionsHtml = '<button class="action-btn primary" onclick="event.stopPropagation(); updateStatus(\'' + order.id + '\', \'confirmed\')">&#9989; Confirm</button>' +
        '<button class="action-btn outline" onclick="event.stopPropagation(); updateStatus(\'' + order.id + '\', \'cancelled\')">&#10060; Cancel</button>';
    } else if (order.order_status === 'confirmed') {
      actionsHtml = '<button class="action-btn warning" onclick="event.stopPropagation(); updateStatus(\'' + order.id + '\', \'preparing\')">&#127859; Start Preparing</button>';
    } else if (order.order_status === 'preparing') {
      actionsHtml = '<button class="action-btn success" onclick="event.stopPropagation(); updateStatus(\'' + order.id + '\', \'ready\')">&#128077; Mark Ready</button>';
    } else if (order.order_status === 'ready') {
      actionsHtml = '<button class="action-btn outline" onclick="event.stopPropagation(); updateStatus(\'' + order.id + '\', \'collected\')">&#128230; Collected</button>';
    }

    html += '<div class="order-card ' + order.order_status + '" onclick="showOrderDetail(\'' + order.id + '\')">' +
      '<div class="order-top"><div>' +
        '<div class="order-id">#' + order.id + '</div>' +
        '<div class="order-time">' + timeStr + '</div>' +
      '</div>' +
      '<span class="status-badge ' + order.order_status + '">' + order.order_status + '</span></div>' +
      '<div class="order-mid"><div>' +
        '<div class="order-customer">' + order.customer_name + '</div>' +
        '<div class="order-phone">' + order.customer_phone + '</div>' +
      '</div></div>' +
      '<div class="order-items-preview">' + itemsPreview + moreItems + '</div>' +
      '<div class="order-bottom">' +
        '<div class="order-total">R' + order.total.toFixed(2) + '</div>' +
        '<div class="order-pickup">&#128197; Pickup: ' + order.pickup_date + ' at ' + pickupTimeStr + '</div>' +
        '<div class="order-actions">' + actionsHtml + '</div>' +
      '</div></div>';
  });

  list.innerHTML = html;
}

// ── Update order status ──
function updateStatus(orderId, status) {
  fetch('/api/orders/' + orderId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderStatus: status })
  })
  .then(function() {
    loadOrders();
    loadStats();
  })
  .catch(function() { alert('Failed to update order status'); });
}

// ── Show order detail modal ──
function showOrderDetail(orderId) {
  var order = null;
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id === orderId) { order = orders[i]; break; }
  }
  if (!order) return;

  var parts = order.pickup_time.split(':');
  var hour = parseInt(parts[0]);
  var pickupTimeStr = (hour > 12 ? hour - 12 : hour) + ':' + parts[1] + ' ' + (hour >= 12 ? 'PM' : 'AM');

  var statuses = [
    { value: 'confirmed', label: '&#9989; Confirm', cls: 'primary' },
    { value: 'preparing', label: '&#127859; Preparing', cls: 'warning' },
    { value: 'ready', label: '&#128077; Ready', cls: 'success' },
    { value: 'collected', label: '&#128230; Collected', cls: 'outline' },
    { value: 'cancelled', label: '&#10060; Cancel', cls: 'outline' }
  ];

  var statusActions = '';
  statuses.forEach(function(s) {
    if (s.value !== order.order_status) {
      statusActions += '<button class="action-btn ' + s.cls + '" onclick="updateStatus(\'' + order.id + '\', \'' + s.value + '\'); closeModal();">' + s.label + '</button>';
    }
  });

  var itemsHtml = '';
  order.items.forEach(function(item) {
    itemsHtml += '<div class="modal-item">' +
      '<span>' + item.name + ' <span style="color:var(--gray-400);">x' + item.qty + '</span></span>' +
      '<span style="font-weight:600;">R' + (item.price * item.qty).toFixed(2) + '</span></div>';
  });

  var payColor = order.payment_status === 'paid' ? 'var(--green)' : 'var(--yellow)';
  var payText = order.payment_status === 'paid' ? '&#10003; Paid' : 'Pending';

  document.getElementById('modalTitle').textContent = 'Order #' + order.id;
  document.getElementById('modalBody').innerHTML =
    '<div class="modal-detail-row"><span class="dlabel">Status</span><span class="status-badge ' + order.order_status + '">' + order.order_status + '</span></div>' +
    '<div class="modal-detail-row"><span class="dlabel">Customer</span><span>' + order.customer_name + '</span></div>' +
    '<div class="modal-detail-row"><span class="dlabel">Phone</span><span><a href="tel:' + order.customer_phone + '" style="color:var(--blue);">' + order.customer_phone + '</a></span></div>' +
    (order.customer_email ? '<div class="modal-detail-row"><span class="dlabel">Email</span><span>' + order.customer_email + '</span></div>' : '') +
    '<div class="modal-detail-row"><span class="dlabel">Pickup</span><span>' + order.pickup_date + ' at ' + pickupTimeStr + '</span></div>' +
    '<div class="modal-detail-row"><span class="dlabel">Payment</span><span style="color:' + payColor + '; font-weight:600;">' + payText + '</span></div>' +
    (order.special_instructions ? '<div class="modal-detail-row"><span class="dlabel">Instructions</span><span>' + order.special_instructions + '</span></div>' : '') +
    '<div class="modal-items"><h4 style="font-size:0.9rem; margin-bottom:8px;">Items</h4>' + itemsHtml + '</div>' +
    '<div class="modal-detail-row" style="border-top:2px solid var(--black); font-weight:700; font-size:1.1rem;"><span>Total</span><span style="color:var(--red);">R' + order.total.toFixed(2) + '</span></div>' +
    '<div class="modal-status-actions">' + statusActions + '</div>';

  document.getElementById('orderModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('orderModal')) closeModal();
});

// ── Filters ──
document.querySelectorAll('.chip').forEach(function(chip) {
  chip.addEventListener('click', function() {
    currentFilter = chip.getAttribute('data-status');
    document.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
    chip.classList.add('active');
    loadOrders();
  });
});

document.getElementById('dateFilter').addEventListener('change', function(e) {
  currentDate = e.target.value;
  loadOrders();
});

// ── Sidebar nav ──
document.querySelectorAll('.nav-item[data-view]').forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });
    item.classList.add('active');
    document.getElementById('pageTitle').textContent =
      item.getAttribute('data-view') === 'orders' ? 'Orders' : 'Statistics';
  });
});

// ── Init ──
loadOrders();
loadStats();
connectSSE();
setInterval(loadStats, 30000);
