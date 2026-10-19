# THE CARAT THEORY (thecarattheory.com)
> **The Architecture of Light · Fine Jewellery & Certified Diamonds**

[![License](https://img.shields.io/badge/Brand-The_Carat_Theory-D4AF37.svg)](https://thecarattheory.com)
[![Status](https://img.shields.io/badge/Storefront-Production_Ready-10B981.svg)](#)
[![Brand Identity](https://img.shields.io/badge/Logo_System-Vector_SVG_%2B_Physical_Mockup-blue.svg)](logo-guide.html)

---

## 💎 Brand Identity & Overview
**The Carat Theory** (`thecarattheory.com`) is an ultra-luxury fine jewellery e-commerce storefront specializing in certified lab-grown diamonds, bespoke engagement rings, tennis bracelets, earrings, and pendants.

Inspired by industry leaders like *Pure Promise Diamonds*, *Tiffany & Co.*, and *Cartier*, The Carat Theory takes the best commercial mechanics (lifetime buyback, certified stones, free armored shipping, custom ring studio) while establishing a **100% original, copyright-safe, legally trademarkable brand identity**.

---

## 🎨 Master Logo Suite & Brand Assets

All logo files are precision-crafted vector SVGs and high-resolution renders ready for web, packaging, and print:

| Asset | File Path | Description |
|---|---|---|
| **Primary Master Logo** | [`assets/logo/logo-primary.svg`](assets/logo/logo-primary.svg) | Horizontal master lockup with diamond facet mark & serif typography |
| **Gold & Dark Edition** | [`assets/logo/logo-gold-dark.svg`](assets/logo/logo-gold-dark.svg) | Radiant champagne gold gradient lockup for dark backgrounds |
| **Stacked Luxury Crest** | [`assets/logo/logo-stacked.svg`](assets/logo/logo-stacked.svg) | Centered architectural lockup for jewelry certificates and gift boxes |
| **Faceted Monogram** | [`assets/logo/logo-monogram.svg`](assets/logo/logo-monogram.svg) | Standalone 58-facet diamond emblem with mathematical convergence |
| **Browser Favicon** | [`assets/logo/favicon.svg`](assets/logo/favicon.svg) | Crisp 64×64 icon for browser tabs and mobile bookmarks |
| **Packaging Mockup** | [`assets/brand-identity-mockup.jpg`](assets/brand-identity-mockup.jpg) | High-end physical packaging: velvet box, 18k diamond ring, and certificate |
| **Hero Banner** | [`assets/hero-banner.jpg`](assets/hero-banner.jpg) | Editorial luxury photo with emerald-cut ring & tennis bracelet on black marble |
| **Interactive Brand Portal** | [`logo-guide.html`](logo-guide.html) | Interactive brand guide with downloads, color codes, and IP protection matrix |

---

## 🛡️ Intellectual Property & Copyright Protection

To ensure the client never faces copyright or trademark infringement claims:

1. **Brand Trademark**: "The Carat Theory" is uniquely conceived around the physics of diamond light refraction and gemological precision.
2. **Original Visual Assets**: All logo marks, monogram icons, and color palettes were constructed from scratch with bespoke geometry.
3. **Original Copywriting**: The 5 Carat Theory Promises (*Lifetime Buyback Assurance*, *Certified Provenance*, *Insured Worldwide Delivery*, *Master Craftsmanship*, *Conscious Ethics*) are entirely original while matching the customer trust of Pure Promise.
4. **Proprietary Code**: Zero theme lock-in or scraped templates; built on a clean, responsive, zero-dependency architecture.

---

## 🚀 Key Storefront Features

- **Interactive Shop by Diamond Cut**:
  Explore the 9 master shapes (*Round, Oval, Emerald, Cushion, Princess, Pear, Marquise, Radiant, Heart*) with live optical fire ratings and facet counts.
- **Dynamic Product Cards with Metal & Carat Switchers**:
  Seamlessly toggle between 18K Yellow Gold, 18K White Gold, 18K Rose Gold, and Platinum 950 with live image swapping and price recalculation.
- **Custom Bespoke Atelier ("Design With Us")**:
  3-step interactive ring builder (Setting, Diamond Cut/Carat, Precious Metal) with instant dynamic pricing quotes and VIP reservation.
- **Multi-Currency Engine**:
  Live currency switching across **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, and **AED (AED)**.
- **Interactive Slide-Out Cart Bag**:
  Real-time line item updates, quantity controls, and a dynamic **Free Armored Worldwide Shipping** progress bar.
- **Wishlist Drawer**:
  Save favorite jewels with `localStorage` persistence and 1-click "Move to Bag".
- **Quick View Modal**:
  Detailed specifications, optical grades (D-F Color, VVS1 Clarity), certificate preview, and sizing guides.
- **Gemological Education & 4Cs Visualizer**:
  Comprehensive breakdown of Cut, Color, Clarity, and Carat weight.
- **Private Concierge Consultation Booking**:
  Interactive reservation system for virtual Zoom HD macro sessions and showroom viewing.

---

## 💻 How to Run Locally

You can preview the website immediately with no build steps required:

### Option 1: Direct File Preview
Simply double-click [`index.html`](index.html) or [`logo-guide.html`](logo-guide.html) to open directly in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server (Node.js)
```bash
npx serve -l 3000 .
```
Then navigate to `http://localhost:3000`.

### Option 3: Python Server
```bash
python -m http.server 3000
```

---

## 📂 File Architecture
```
thecarattheory.com/
├── index.html                  # Main luxury storefront
├── logo-guide.html             # Brand identity & logo guidelines portal
├── package.json                # Project configuration
├── README.md                   # Documentation & overview
└── assets/
    ├── brand-identity-mockup.jpg # Velvet ring box & certificate mockup
    ├── hero-banner.jpg          # Editorial hero photograph
    ├── logo/
    │   ├── logo-primary.svg     # Primary horizontal lockup (Light)
    │   ├── logo-gold-dark.svg   # Champagne gold & white lockup (Dark)
    │   ├── logo-stacked.svg     # Vertical emblem crest
    │   ├── logo-monogram.svg    # 58-facet diamond icon mark
    │   └── favicon.svg          # Browser tab icon
    ├── css/
    │   └── style.css            # Master styling & luxury design tokens
    └── js/
        ├── products-data.js     # Master product catalog & shape specs
        └── main.js              # Storefront interaction & cart engine
```

---

© 2026 THE CARAT THEORY. All Rights Reserved.
