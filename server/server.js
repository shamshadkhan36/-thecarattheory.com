import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS, DIAMOND_SHAPES } from './data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for appointments & newsletter
const appointments = [];
const newsletterSubscribers = [];

// API Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'The Carat Theory',
    domain: 'thecarattheory.com',
    timestamp: new Date().toISOString()
  });
});

// GET /api/products (filter by category, shape, search query)
app.get('/api/products', (req, res) => {
  const { category, shape, q } = req.query;
  let results = [...PRODUCTS];

  if (category && category !== 'all') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (shape) {
    results = results.filter(p => p.shape.toLowerCase() === shape.toLowerCase());
  }

  if (q) {
    const query = q.toLowerCase().trim();
    results = results.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.shape.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// GET /api/shapes
app.get('/api/shapes', (req, res) => {
  res.json({
    success: true,
    count: DIAMOND_SHAPES.length,
    data: DIAMOND_SHAPES
  });
});

// POST /api/atelier/quote (Custom Bespoke Ring Calculation)
app.post('/api/atelier/quote', (req, res) => {
  const { setting, shape, carat, metal } = req.body;

  const settingPrices = {
    'Classic Four-Prong Solitaire': 750,
    'Cathedral Hidden Halo': 1050,
    'Three-Stone Tribute Baguettes': 1350,
    'Vintage Bezel Frame': 950
  };

  const caratBaseRates = {
    1.0: 950,
    1.5: 1350,
    2.0: 1800,
    3.0: 3200,
    4.0: 5100
  };

  const metalPremiums = {
    '18K Yellow Gold': 0,
    '18K White Gold': 0,
    '18K Rose Gold': 50,
    'Platinum 950': 250
  };

  const settingCost = settingPrices[setting] || 750;
  const diamondCost = caratBaseRates[carat] || (carat * 900);
  const metalPremium = metalPremiums[metal] || 0;
  const total = settingCost + diamondCost + metalPremium;

  res.json({
    success: true,
    breakdown: {
      setting,
      settingCost,
      shape: shape || 'round',
      carat: carat || 2.0,
      diamondCost,
      metal: metal || '18K Yellow Gold',
      metalPremium,
      totalEstimatedUSD: total,
      productionTime: '10 - 14 Business Days',
      certification: 'IGI Laser Inscribed Dossier Type IIa'
    }
  });
});

// POST /api/appointments (Book VIP Concierge Session)
app.post('/api/appointments', (req, res) => {
  const { name, email, consultationType, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const booking = {
    id: 'TCT-VIP-' + Math.floor(100000 + Math.random() * 900000),
    name,
    email,
    consultationType: consultationType || 'Virtual Video Consultation',
    notes: notes || '',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  appointments.push(booking);

  res.json({
    success: true,
    message: 'VIP Gemologist Consultation reserved successfully.',
    booking
  });
});

// POST /api/newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required.' });
  }

  if (!newsletterSubscribers.includes(email)) {
    newsletterSubscribers.push(email);
  }

  res.json({
    success: true,
    message: 'Welcome to The Carat Theory VIP Circle.',
    privilegeCode: 'TCT-PRIVILEGE-10'
  });
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('The Carat Theory API Server is Running. Run `npm run dev` to launch the React frontend.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`💎 The Carat Theory API Server running on port ${PORT}`);
});
