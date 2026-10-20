import defaultProducts from '../data/allProducts.json' with { type: 'json' };

const PRODUCTS_STORAGE_KEY = 'tct_catalog_products';
const ORDERS_STORAGE_KEY = 'tct_admin_orders';
const APPOINTMENTS_STORAGE_KEY = 'tct_admin_appointments';
const SETTINGS_STORAGE_KEY = 'tct_admin_settings';

// Clean initial empty state: Zero dummy orders
const INITIAL_ORDERS = [];

// Clean initial empty state: Zero dummy appointments
const INITIAL_APPOINTMENTS = [];

const INITIAL_SETTINGS = {
  currency: 'USD ($)',
  oddSizePolicyEnforced: true,
  oddSizeNotice: 'Odd ring sizes (e.g. 6.5 standard) and custom bespoke commissions are crafted strictly to order and cannot be cancelled.',
  lifetimeCarePolicyEnforced: true,
  lifetimeCareTitle: 'Lifetime Care & Service Guarantee',
  armoredCourierRate: 0, // Complimentary
  armoredCourierName: 'Insured Armored Express Courier',
  goldPriceMultiplier: 1.0,
  headquartersAddress: '2000 Town Center, Southfield MI 48075',
  atelierAddresses: '580 Fifth Ave, New York & Antwerp Diamond Bourse',
  conciergeEmail: 'concierge@thecarattheory.com',
  conciergePhone: '+1 (800) 582-0190'
};

/* --- Products Storage Methods --- */
export const getStoredProducts = () => {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch (err) {
    console.error('Error loading stored products:', err);
    return defaultProducts;
  }
};

export const saveProductsCatalog = (products) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('tct:catalog-updated', { detail: { count: products.length } }));
  } catch (err) {
    console.error('Error saving products catalog:', err);
  }
};

export const resetProductsCatalog = () => {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('tct:catalog-updated', { detail: { count: defaultProducts.length } }));
    return defaultProducts;
  } catch (err) {
    console.error('Error resetting products:', err);
    return defaultProducts;
  }
};

/* --- Orders Storage Methods (No Dummy Orders) --- */
export const getStoredOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Filter out any legacy dummy seeded orders
    const cleaned = Array.isArray(parsed)
      ? parsed.filter((o) => o && !o.id?.startsWith('TCT-ORD-109'))
      : [];
    return cleaned;
  } catch (err) {
    return [];
  }
};

export const saveOrders = (orders) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('tct:orders-updated'));
  } catch (err) {
    console.error('Error saving orders:', err);
  }
};

export const createNewOrder = (orderData) => {
  const currentOrders = getStoredOrders();
  const orderId = `TCT-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toISOString().split('T')[0];

  // Check if any item has odd ring size (e.g. 6.5) or custom bespoke
  const hasOddSizeOrCustom = orderData.items?.some((item) => {
    const s = (item.size || '').toLowerCase();
    return s.includes('6.5') || s.includes('odd') || s.includes('custom') || s.includes('bespoke');
  });

  const newOrder = {
    id: orderId,
    customerName: orderData.customerName || 'Private Client',
    customerEmail: orderData.customerEmail || 'client@thecarattheory.com',
    customerPhone: orderData.customerPhone || '',
    date: dateStr,
    items: orderData.items || [],
    totalAmountUSD: orderData.totalAmountUSD || 0,
    status: 'In Atelier Crafting',
    paymentStatus: orderData.paymentStatus || 'Paid (Encrypted 256-bit)',
    shippingAddress: orderData.shippingAddress || '2000 Town Center, Southfield MI 48075',
    isNonCancellable: hasOddSizeOrCustom,
    policyNotice: hasOddSizeOrCustom
      ? 'Odd ring size (e.g. 6.5) or bespoke commission. Strictly non-cancellable under T&C.'
      : 'Complimentary insured armored delivery with Lifetime Care & Service Guarantee.'
  };

  const updatedOrders = [newOrder, ...currentOrders];
  saveOrders(updatedOrders);
  return newOrder;
};

export const clearAllOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    window.dispatchEvent(new Event('tct:orders-updated'));
    return [];
  } catch (err) {
    return [];
  }
};

/* --- Appointments Storage Methods --- */
export const getStoredAppointments = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const cleaned = Array.isArray(parsed)
      ? parsed.filter((a) => a && !a.id?.startsWith('APT-20'))
      : [];
    return cleaned;
  } catch (err) {
    return [];
  }
};

export const saveAppointments = (appointments) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
    window.dispatchEvent(new Event('tct:appointments-updated'));
  } catch (err) {
    console.error('Error saving appointments:', err);
  }
};

export const createNewAppointment = (aptData) => {
  const currentApts = getStoredAppointments();
  const aptId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = aptData.date || new Date().toISOString().split('T')[0];

  const newApt = {
    id: aptId,
    name: aptData.name || 'Private Client',
    email: aptData.email || 'client@thecarattheory.com',
    phone: aptData.phone || '+1 Direct Line',
    date: dateStr,
    time: aptData.time || '2:00 PM EST',
    subject: aptData.subject || 'Diamond Consultation',
    status: 'Pending',
    notes: aptData.notes || 'Booked via storefront concierge.'
  };

  const updated = [newApt, ...currentApts];
  saveAppointments(updated);
  return newApt;
};

export const clearAllAppointments = () => {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.removeItem(APPOINTMENTS_STORAGE_KEY);
    window.dispatchEvent(new Event('tct:appointments-updated'));
    return [];
  } catch (err) {
    return [];
  }
};

/* --- Settings Storage Methods --- */
export const getStoredSettings = () => {
  if (typeof window === 'undefined') return INITIAL_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return INITIAL_SETTINGS;
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    return INITIAL_SETTINGS;
  }
};

export const saveSettings = (settings) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event('tct:settings-updated'));
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};
