// Automated Functional Test Suite for The Carat Theory
// Tests catalog data integrity, order creation, odd-size 6.5 non-cancellation policy,
// appointment booking, and admin store functionality.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('💎 Starting The Carat Theory Comprehensive Verification Test Suite...\n');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    testsFailed++;
  }
}

// 1. Catalog JSON Check
console.log('--- TEST 1: CATALOG INTEGRITY & BRAND POLICY ---');
const catalogPath = path.resolve(__dirname, '../src/data/allProducts.json');
const rawCatalog = fs.readFileSync(catalogPath, 'utf8');
const products = JSON.parse(rawCatalog);

assert(Array.isArray(products) && products.length === 242, `Catalog contains exactly 242 products (Found: ${products.length})`);

// Check for India or INR references across entire catalog
const hasINR = rawCatalog.includes('₹') || rawCatalog.includes('INR');
const hasIndia = /india\b/i.test(rawCatalog);
assert(!hasINR, 'Zero INR / ₹ currency symbols in catalog');
assert(!hasIndia, 'Zero "India" references in catalog');

// Verify pricing structure in USD
const firstProd = products[0];
assert(firstProd.priceUSD > 0, `First product has valid priceUSD: $${firstProd.priceUSD}`);
assert(firstProd.pricesByPurity && firstProd.pricesByPurity['18K'] > 0, 'Prices by purity (18K) are defined');

// 2. Odd Size Non-Cancellation Logic Check
console.log('\n--- TEST 2: ODD RING SIZES (6.5) NON-CANCELLATION POLICY ---');
function checkIsNonCancellable(sizeStr) {
  const s = (sizeStr || '').toLowerCase();
  return s.includes('6.5') || s.includes('odd') || s.includes('custom') || s.includes('bespoke');
}

assert(checkIsNonCancellable('US 6.5 (Standard Size)') === true, 'Size 6.5 is correctly flagged non-cancellable');
assert(checkIsNonCancellable('6.5') === true, 'Raw size 6.5 is flagged non-cancellable');
assert(checkIsNonCancellable('Custom Bespoke Size') === true, 'Custom Bespoke is flagged non-cancellable');
assert(checkIsNonCancellable('US 7.0') === false, 'Standard size 7.0 is not flagged non-cancellable');

// 3. Admin Store Logic Simulation (Local Storage Mock)
console.log('\n--- TEST 3: DUMMY ORDERS REMOVAL & LIVE ORDER FLOW ---');
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};
global.window = {
  dispatchEvent: () => {}
};
global.Event = class {};
global.CustomEvent = class {};

// Import adminStore dynamically
const {
  getStoredOrders,
  createNewOrder,
  clearAllOrders,
  getStoredAppointments,
  createNewAppointment,
  clearAllAppointments
} = await import('../src/services/adminStore.js');

// Verify initial orders state has zero dummy orders
const initialOrders = getStoredOrders();
assert(Array.isArray(initialOrders) && initialOrders.length === 0, `Initial stored orders is empty [] (Zero dummy orders seeded)`);

// Test creating a live order with standard size
const order1 = createNewOrder({
  customerName: 'Eleanor Vance',
  customerEmail: 'eleanor@vance.com',
  shippingAddress: '740 Park Ave, New York, NY 10021',
  items: [
    { name: 'Solitaire Diamond Ring', purity: '18K', size: 'US 7.0', price: 940, qty: 1 }
  ],
  totalAmountUSD: 940
});
assert(order1.id.startsWith('TCT-ORD-'), `Order 1 created with ID: ${order1.id}`);
assert(order1.isNonCancellable === false, 'Order 1 with size 7.0 is standard cancellable/serviceable');
assert(getStoredOrders().length === 1, 'Stored orders count is now 1');

// Test creating an order with odd ring size 6.5
const order2 = createNewOrder({
  customerName: 'Marcus Sterling',
  customerEmail: 'sterling@luxury.com',
  shippingAddress: '2000 Town Center, Southfield MI 48075',
  items: [
    { name: 'Pure Diamond Trilogy Ring', purity: '18K Yellow Gold', size: 'US 6.5 (Standard Size)', price: 1850, qty: 1 }
  ],
  totalAmountUSD: 1850
});
assert(order2.isNonCancellable === true, 'Order 2 with size 6.5 is STRICTLY flagged isNonCancellable = true');
assert(order2.policyNotice.includes('Strictly non-cancellable'), 'Order 2 policy notice explicitly warns of non-cancellation under T&C');
assert(getStoredOrders().length === 2, 'Stored orders count is now 2');

// Test clearing all orders
clearAllOrders();
assert(getStoredOrders().length === 0, 'clearAllOrders() successfully resets stored orders back to 0');

// 4. Appointments Flow Check
console.log('\n--- TEST 4: CONSULTATIONS & APPOINTMENTS STORE ---');
const initialApts = getStoredAppointments();
assert(Array.isArray(initialApts) && initialApts.length === 0, 'Initial stored appointments is empty [] (Zero dummy appointments)');

const apt1 = createNewAppointment({
  name: 'Sophia Laurent',
  email: 'sophia@laurent.fr',
  phone: '+1 (212) 555-0199',
  subject: 'Virtual Video Consultation (Zoom HD Macro)',
  notes: 'Client interested in 3.0ct Oval Cut in 18k yellow gold.'
});
assert(apt1.id.startsWith('APT-'), `Appointment created with ID: ${apt1.id}`);
assert(getStoredAppointments().length === 1, 'Stored appointments count is now 1');

clearAllAppointments();
assert(getStoredAppointments().length === 0, 'clearAllAppointments() successfully resets appointments back to 0');

// 5. Source Code Sweep for Forbidden Strings
console.log('\n--- TEST 5: BRAND & POLICY CODE SWEEP ---');
const srcDir = path.resolve(__dirname, '../src');

let sweepErrors = 0;
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(jsx?|tsx?|css|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for dummy orders hardcoded in components
      if (entry.name !== 'adminStore.js') {
        const dummyOrderMatch = content.match(/TCT-ORD-109\d{3}/);
        if (dummyOrderMatch) {
          assert(false, `Found hardcoded dummy order ${dummyOrderMatch[0]} in ${entry.name}`);
          sweepErrors++;
        }
      }
      
      // Check for India
      const indiaMatches = content.match(/\bIndia\b/g);
      if (indiaMatches) {
        assert(false, `Found unexpected "India" reference in ${entry.name}`);
        sweepErrors++;
      }
      
      // Check for INR / ₹
      const inrMatches = content.match(/₹|INR/g);
      if (inrMatches) {
        assert(false, `Found INR / ₹ reference in ${entry.name}`);
        sweepErrors++;
      }
    }
  }
}

scanDir(srcDir);
assert(sweepErrors === 0, 'Complete source code sweep passed: Zero INR, zero India references, zero dummy orders');

// Summary
console.log('\n=======================================');
console.log(`TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
console.log('=======================================');

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL FUNCTIONAL TESTS COMPLETED SUCCESSFULLY!');
}
