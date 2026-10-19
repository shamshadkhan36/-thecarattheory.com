# THE CARAT THEORY (thecarattheory.com)
> **Fine Jewellery & Certified Diamonds — Full-Stack React + Node.js E-Commerce Platform**

[![Stack](https://img.shields.io/badge/Stack-React_18_%2B_Node.js_%2B_Express-61DAFB.svg)](#)
[![Theme](https://img.shields.io/badge/Theme-Burgundy_%2355142A_%7C_Peach_%23FFF3E3-55142A.svg)](#)
[![Brand Identity](https://img.shields.io/badge/Logo_Suite-Vector_SVG_%2B_Packaging_Mockup-D4AF37.svg)](public/assets/logo/logo-primary.svg)
[![Repo](https://img.shields.io/badge/GitHub-shamshadkhan36%2F--thecarattheory.com-black.svg)](https://github.com/shamshadkhan36/-thecarattheory.com.git)

---

## 💎 Overview
**The Carat Theory** (`thecarattheory.com`) is a full-stack **React 18 + Node.js (Express)** e-commerce application designed to match the **exact section sequence, layout structure, typography, and color palette** of the reference website [Pure Promise Diamonds](https://purepromisediamonds.com/), while establishing **100% original branding, copyright safety, and bespoke diamond gemology**.

---

## 🎨 Color Palette & Typography (Matching Reference Site)

| Color Token | Hex Code | RGB | Role / Usage |
|---|---|---|---|
| **Wine / Royal Burgundy** | `#55142A` | `rgb(85, 20, 42)` | Primary CTA buttons, section headings, price tags, footer |
| **Warm Peach Cream** | `#FFF3E3` | `rgb(255, 243, 227)` | Announcement bar background, shape detail cards, button text |
| **Warm Ivory** | `#FAF9F1` | `rgb(250, 249, 241)` | Secondary section background |
| **Clean White** | `#FFFFFF` | `rgb(255, 255, 255)` | Main storefront canvas & product cards |
| **Dark Noir** | `#1A1A1A` | `rgb(26, 26, 26)` | High-contrast body typography |
| **Gold Sparkle** | `#FDC656` | `rgb(253, 198, 86)` | Diamond spark accents & badge highlights |

### Reference Typographic Scale
* **Heading Family:** `"Roboto Condensed", sans-serif` — Tall, bold uppercase titles (`SHOP BY CATEGORY`, `BESTSELLERS`, `SHOP BY SHAPE`).
* **Accent Editorial Family:** `"Instrument Serif", serif` — Italic luxury editorial accents (*"Loved. Worn. Remembered."*, *"A Policy, made for you."*).
* **Body Family:** `"Jost", sans-serif` — Modern geometric, high-legibility body copy.

---

## 📐 Storefront Structure (Exact Reference Section Order)

1. **Announcement Bar** (Color Scheme 5: `#FFF3E3` Peach with `#55142A` Wine text):
   * *"Free shipping On All diamond jewellery • Lifetime Buyback Guarantee • Shop Now"*
2. **Main Header**:
   * Brand Logo, Categories (`Rings`, `Earrings`, `Bracelets`, `Pendants`, `Necklaces`, `CUSTOMISE`, `CONTACT`), Multi-Currency Selector, Search, Wishlist, Cart Drawer.
3. **Hero Slideshow** (`slideshow_GUbP3k`):
   * *"Lifetime Promises — Including Our 'Lifetime Buyback' Promise"* with **Know More** & **Shop Now** buttons.
4. **SHOP BY CATEGORY** (`collection_list_VmD4xN`):
   * Portrait cards: `RINGS`, `EARRINGS`, `BRACELETS`, `PENDANTS`, `NOSEPINS`, `NECKLACE`.
5. **BESTSELLERS** (`product_list_EDUBdR`):
   * Subtitle: *"Our Most Coveted Designs, Loved. Worn. Remembered."*
   * Interactive tabs (`All`, `Three Stone`, `Solitaire`, `Halo`, `Tennis Bracelets`, `Earrings`).
   * Dynamic price calculations, precious metal swatches, and carat selectors.
6. **SHOP BY SHAPE** (`collection_list_ehxcPm`):
   * Interactive cut selector: `PRINCESS`, `CUSHION`, `EMERALD`, `ROUND`, `OVAL`, `PEAR`, `MARQUISE`, `HEART` with facet counts and fire ratings.
7. **FEATURED COLLECTIONS** (`collection_list_UNbHPj`):
   * `SOLITAIRE`, `DESIGNER`, `EVERYDAY`.
8. **DESIGN WITH US** (`media_with_content_LfPdEJ`):
   * Split media and interactive Bespoke Ring Studio with live quotes and **Start Now** button.
9. **BOOK AN APPOINTMENT** (`media_with_content_TxjMU4`):
   * Split media booking banner with **Book Now** action.
10. **OUR STORY** (`section_apYzwg`):
    * Split media brand heritage with **Know More** button.
11. **OUR PROMISE (5 Pillars)** (`section_4Arnjh`):
    * *Lifetime Buyback*, *Certified Jewelry*, *Free Shipping*, *Exchange & Upgrade*, *Sustainable & Eco-friendly*.
12. **Frequently Asked Questions** (`section_aWDLqq`):
    * Clean accordion with core diamond questions.
13. **Footer**:
    * Luxury Wine Red `#55142A` background, VIP newsletter subscription, navigation columns, care guides, policy links, and payment method badges.

---

## ⚡ Full-Stack Node.js REST API

The Node.js Express server (`server/server.js`) exposes the following endpoints:

* `GET /api/health` — Server status & domain info
* `GET /api/products` — Product catalog with query parameters (`?category=...`, `?shape=...`, `?q=...`)
* `GET /api/products/:id` — Single product details
* `GET /api/shapes` — 8 master diamond cuts with optical parameters
* `POST /api/atelier/quote` — Real-time custom ring configuration quote calculator
* `POST /api/appointments` — VIP concierge session reservations
* `POST /api/newsletter` — VIP member signups with welcome privilege codes

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both React Frontend & Node.js API Concurrently
```bash
npm run dev:all
```
* React Frontend will run on: `http://localhost:3000`
* Node.js Express API will run on: `http://localhost:5000`

### 3. Or Run Individually
* **Frontend Only (Vite):** `npm run dev`
* **Backend API Only:** `npm run server`
* **Production Build:** `npm run build`

---

## 📂 Project Architecture

```
thecarattheory.com/
├── server/
│   ├── server.js               # Node.js + Express API server
│   └── data/
│       └── products.js         # Backend product catalog & shape specs
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # Master application component
│   ├── index.css               # Exact reference styling & color tokens
│   ├── context/
│   │   ├── CartContext.jsx     # Cart bag state & shipping threshold
│   │   ├── WishlistContext.jsx # Saved items & persistence
│   │   └── CurrencyContext.jsx # USD, EUR, GBP, INR, AED converter
│   ├── components/
│   │   ├── AnnouncementBar.jsx # Peach & Wine announcement bar
│   │   ├── Header.jsx          # Header with logo, nav & search
│   │   ├── HeroSlider.jsx      # "Lifetime Promises" banner
│   │   ├── ShopByCategory.jsx  # Category cards
│   │   ├── Bestsellers.jsx     # Bestselling products with tabs
│   │   ├── ProductCard.jsx     # Metal switchers & price calculation
│   │   ├── ShopByShape.jsx     # Interactive cut selector
│   │   ├── FeaturedCollections.jsx # Solitaire, Designer, Everyday
│   │   ├── DesignWithUs.jsx    # Custom ring builder
│   │   ├── BookAppointment.jsx # Private consultation section
│   │   ├── OurStory.jsx        # Story & heritage
│   │   ├── OurPromise.jsx      # 5 Pillars
│   │   ├── FAQSection.jsx      # Accordion
│   │   ├── Footer.jsx          # Wine red multi-column footer
│   │   ├── CartDrawer.jsx      # Slide-out bag with free shipping bar
│   │   ├── WishlistDrawer.jsx  # Slide-out wishlist
│   │   ├── QuickViewModal.jsx  # Product detail modal
│   │   ├── AppointmentModal.jsx# VIP booking modal
│   │   ├── SizingModal.jsx     # Ring sizing guide
│   │   ├── SearchModal.jsx     # Live search modal
│   │   └── LogoGuideModal.jsx  # Logo & brand identity guide
│   └── data/
│       └── products.js         # Client-side fallback catalog
├── public/
│   └── assets/                 # SVGs, mockups, and photography
├── vite.config.js              # Vite config with backend proxy
├── package.json                # Dependencies and scripts
└── README.md
```

---

© 2026 THE CARAT THEORY. All Rights Reserved.
