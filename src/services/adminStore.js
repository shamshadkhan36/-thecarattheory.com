import defaultProducts from '../data/allProducts.json';

const PRODUCTS_STORAGE_KEY = 'tct_catalog_products';
const ORDERS_STORAGE_KEY = 'tct_admin_orders';
const APPOINTMENTS_STORAGE_KEY = 'tct_admin_appointments';
const SETTINGS_STORAGE_KEY = 'tct_admin_settings';

// Default initial orders with odd size enforcement demonstration
const INITIAL_ORDERS = [
  {
    id: 'TCT-ORD-1094',
    customerName: 'Eleanor Vance',
    customerEmail: 'e.vance@beverlyhills.com',
    date: '2026-10-19',
    items: [
      {
        name: 'Elina Halo Diamond Ring',
        purity: '18K',
        color: 'Yellow Gold',
        size: 'US 6.5 (Standard Size)',
        isOddSize: true,
        price: 1535,
        qty: 1
      }
    ],
    totalAmountUSD: 1535,
    status: 'In Atelier Crafting',
    paymentStatus: 'Paid (Stripe / Amex)',
    shippingAddress: '90210 Wilshire Blvd, Beverly Hills, CA 90212',
    isNonCancellable: true,
    policyNotice: 'Odd ring size 6.5 & bespoke craft. No cancellations permitted.'
  },
  {
    id: 'TCT-ORD-1093',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.sterling@manhattan.nyc',
    date: '2026-10-18',
    items: [
      {
        name: 'Lennon Three Stone Ring',
        purity: '14K',
        color: 'White Gold',
        size: 'US 7.0',
        isOddSize: false,
        price: 770,
        qty: 1
      },
      {
        name: 'Evie Tennis Bracelet',
        purity: '18K',
        color: 'Yellow Gold',
        size: '7.0 inch',
        isOddSize: false,
        price: 670,
        qty: 1
      }
    ],
    totalAmountUSD: 1440,
    status: 'Insured Armored Transit',
    paymentStatus: 'Paid (Apple Pay)',
    shippingAddress: '432 Park Avenue, New York, NY 10022',
    isNonCancellable: false,
    policyNotice: 'Complimentary insured courier with Lifetime Care & Service Guarantee.'
  },
  {
    id: 'TCT-ORD-1092',
    customerName: 'Sophia Montgomery',
    customerEmail: 's.montgomery@chicago.il',
    date: '2026-10-17',
    items: [
      {
        name: 'Custom Bespoke Oval Solitaire Ring',
        purity: '18K',
        color: 'Rose Gold',
        size: 'US 6.25 (Custom Odd Size)',
        isOddSize: true,
        price: 2450,
        qty: 1
      }
    ],
    totalAmountUSD: 2450,
    status: 'In Atelier Crafting',
    paymentStatus: 'Paid (Wire Transfer)',
    shippingAddress: '1100 Lake Shore Dr, Chicago, IL 60611',
    isNonCancellable: true,
    policyNotice: 'Custom bespoke odd size order. Strictly non-cancellable under T&C.'
  },
  {
    id: 'TCT-ORD-1091',
    customerName: 'David K. Laurent',
    customerEmail: 'd.laurent@dallas.tx',
    date: '2026-10-16',
    items: [
      {
        name: 'Midnight Noir Diamond Hoops',
        purity: '18K',
        color: 'Yellow Gold',
        size: 'One Size',
        isOddSize: false,
        price: 890,
        qty: 1
      }
    ],
    totalAmountUSD: 890,
    status: 'Delivered',
    paymentStatus: 'Paid (Visa)',
    shippingAddress: '3819 Turtle Creek Blvd, Dallas, TX 75219',
    isNonCancellable: false,
    policyNotice: 'Delivered via armored courier with Certificate of Authenticity.'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-201',
    name: 'Victoria Hawthorne',
    email: 'v.hawthorne@greenwich.ct',
    phone: '+1 (203) 555-0192',
    date: '2026-10-22',
    time: '2:00 PM EST',
    subject: 'Bespoke 3.0 ct Oval Solitaire Ring Commission',
    status: 'Confirmed',
    notes: 'Client requests 18K Yellow Gold with hidden diamond halo.'
  },
  {
    id: 'APT-202',
    name: 'Julian Sterling',
    email: 'j.sterling@london.uk',
    phone: '+44 20 7946 0912',
    date: '2026-10-23',
    time: '11:00 AM EST',
    subject: 'Ring Sizing & Odd Ring Size Verification (US 6.5)',
    status: 'Pending',
    notes: 'Wants confirmation on non-cancellation terms for size 6.5 engagement ring.'
  },
  {
    id: 'APT-203',
    name: 'Charlotte Dubois',
    email: 'c.dubois@boston.ma',
    phone: '+1 (617) 555-8371',
    date: '2026-10-24',
    time: '4:30 PM EST',
    subject: 'Lifetime Care & Diamond Inspection Consultation',
    status: 'Confirmed',
    notes: 'Virtual jewelry inspection of prong settings and certificate authentication.'
  }
];

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

/* --- Orders Storage Methods --- */
export const getStoredOrders = () => {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return INITIAL_ORDERS;
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_ORDERS;
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

/* --- Appointments Storage Methods --- */
export const getStoredAppointments = () => {
  if (typeof window === 'undefined') return INITIAL_APPOINTMENTS;
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) return INITIAL_APPOINTMENTS;
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_APPOINTMENTS;
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
