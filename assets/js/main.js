/**
 * THE CARAT THEORY - Fine Jewellery & Certified Diamonds
 * Master Storefront Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  const state = {
    currency: 'USD',
    currencyRates: {
      USD: { symbol: '$', rate: 1.0 },
      EUR: { symbol: '€', rate: 0.92 },
      GBP: { symbol: '£', rate: 0.79 },
      INR: { symbol: '₹', rate: 84.5 },
      AED: { symbol: 'AED ', rate: 3.67 }
    },
    activeCategory: 'all',
    activeShape: 'round',
    cart: JSON.parse(localStorage.getItem('tct_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('tct_wishlist')) || [],
    atelier: {
      setting: 'Classic Four-Prong Solitaire',
      settingPrice: 750,
      shape: 'round',
      carat: 2.0,
      caratPrice: 1800,
      metal: '18K Yellow Gold',
      metalPrice: 0
    }
  };

  // DOM Elements
  const productsGrid = document.getElementById('products-grid');
  const catalogTabs = document.querySelectorAll('.tab-btn');
  const shapeTabs = document.querySelectorAll('.shape-tab');
  const shapeDetailCard = document.getElementById('shape-detail-card');
  const currencySelector = document.getElementById('currency-selector');
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const shippingFillEl = document.getElementById('shipping-fill');
  const shippingMsgEl = document.getElementById('shipping-msg');
  const wishlistToggleBtn = document.getElementById('wishlist-toggle-btn');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistCloseBtn = document.getElementById('wishlist-close-btn');
  const wishlistCountEl = document.getElementById('wishlist-count');
  const wishlistItemsList = document.getElementById('wishlist-items-list');
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchResultsGrid = document.getElementById('search-results-grid');
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewCloseBtn = document.getElementById('quick-view-close');
  const appointmentModal = document.getElementById('appointment-modal');
  const appointmentCloseBtn = document.getElementById('appointment-close');
  const sizingModal = document.getElementById('sizing-modal');
  const sizingCloseBtn = document.getElementById('sizing-close');

  // Format Money helper
  function formatMoney(amountUSD) {
    const cur = state.currencyRates[state.currency] || state.currencyRates.USD;
    const converted = amountUSD * cur.rate;
    return cur.symbol + Math.round(converted).toLocaleString();
  }

  // Save Cart to storage
  function saveCart() {
    localStorage.setItem('tct_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  // Save Wishlist
  function saveWishlist() {
    localStorage.setItem('tct_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  // Update Cart UI
  function updateCartUI() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartSubtotalEl.textContent = formatMoney(subtotal);

    // Free shipping threshold ($1,000 USD)
    const threshold = 1000;
    if (subtotal >= threshold) {
      shippingFillEl.style.width = '100%';
      shippingMsgEl.innerHTML = '🎉 <strong>Complimentary Armored Worldwide Shipping Unlocked!</strong>';
    } else {
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      shippingFillEl.style.width = pct + '%';
      const remaining = threshold - subtotal;
      shippingMsgEl.innerHTML = `Add <strong>${formatMoney(remaining)}</strong> more to unlock Complimentary Insured Armored Shipping`;
    }

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #9CA3AF;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.5;">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p style="font-family: var(--font-serif); font-size: 1.1rem; color: #111; margin-bottom: 0.5rem;">Your Jewellery Bag is Empty</p>
          <p style="font-size: 0.85rem;">Discover our mastercrafted lab-grown diamond collections.</p>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = state.cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-meta">${item.metal} · ${item.carat} · ${item.certification}</p>
          <p style="font-weight: 500; font-size: 0.95rem; margin-top: 0.3rem;">${formatMoney(item.price)}</p>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;">
            <button class="cart-qty-btn" data-action="dec" data-index="${index}" style="width: 24px; height: 24px; border: 1px solid #D1D5DB; background: #FFF; border-radius: 2px; cursor: pointer;">-</button>
            <span style="font-size: 0.85rem; font-weight: 500;">${item.qty}</span>
            <button class="cart-qty-btn" data-action="inc" data-index="${index}" style="width: 24px; height: 24px; border: 1px solid #D1D5DB; background: #FFF; border-radius: 2px; cursor: pointer;">+</button>
          </div>
        </div>
        <button class="cart-remove-btn" data-index="${index}" style="background: none; border: none; color: #9CA3AF; cursor: pointer;" title="Remove Item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');

    // Attach listeners
    cartItemsList.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const act = e.target.dataset.action;
        if (act === 'inc') {
          state.cart[idx].qty += 1;
        } else if (act === 'dec') {
          state.cart[idx].qty -= 1;
          if (state.cart[idx].qty <= 0) {
            state.cart.splice(idx, 1);
          }
        }
        saveCart();
      });
    });

    cartItemsList.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        state.cart.splice(idx, 1);
        saveCart();
      });
    });
  }

  // Update Wishlist UI
  function updateWishlistUI() {
    wishlistCountEl.textContent = state.wishlist.length;
    if (state.wishlist.length === 0) {
      wishlistItemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: #9CA3AF;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.5;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p style="font-family: var(--font-serif); font-size: 1.1rem; color: #111; margin-bottom: 0.5rem;">Your Wishlist is Empty</p>
          <p style="font-size: 0.85rem;">Save your favorite diamond creations for future reference.</p>
        </div>
      `;
      return;
    }

    wishlistItemsList.innerHTML = state.wishlist.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          <p style="font-weight: 500; font-size: 0.95rem; margin-top: 0.3rem;">${formatMoney(item.price)}</p>
          <button class="wishlist-move-btn" data-index="${index}" style="margin-top: 0.5rem; background: var(--c-dark); color: #FFF; border: none; padding: 0.35rem 0.75rem; font-size: 0.72rem; letter-spacing: 0.1em; border-radius: 2px; cursor: pointer;">
            Move to Bag
          </button>
        </div>
        <button class="wishlist-remove-btn" data-index="${index}" style="background: none; border: none; color: #9CA3AF; cursor: pointer;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');

    wishlistItemsList.querySelectorAll('.wishlist-move-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const wItem = state.wishlist[idx];
        state.cart.push({
          id: wItem.id,
          name: wItem.name,
          price: wItem.price,
          image: wItem.image,
          metal: '18K Yellow Gold',
          carat: '1.50 Carat',
          certification: 'IGI Certified',
          qty: 1
        });
        state.wishlist.splice(idx, 1);
        saveCart();
        saveWishlist();
        openCart();
      });
    });

    wishlistItemsList.querySelectorAll('.wishlist-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        state.wishlist.splice(idx, 1);
        saveWishlist();
        renderProducts();
      });
    });
  }

  // Render Products Grid
  function renderProducts() {
    let filtered = PRODUCTS_DATA;
    if (state.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === state.activeCategory);
    }

    productsGrid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.some(w => w.id === product.id);
      const defaultMetal = product.metals[0];
      const defaultCarat = product.carats[0];
      const calculatedPrice = Math.round((product.basePrice * defaultCarat.multiplier) + defaultMetal.premium);

      return `
        <div class="product-card" data-id="${product.id}" data-base-price="${product.basePrice}">
          <div class="product-media-wrap">
            <span class="product-badge">${product.badge || 'Certified'}</span>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="Save to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <img src="${defaultMetal.image}" alt="${product.name}" class="product-img" id="img-${product.id}">
            <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
          </div>

          <div class="product-body">
            <span class="product-category">${product.category} · ${product.shape} cut</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-grade">${product.diamondGrade}</p>

            <!-- Metal Swatches -->
            <div class="swatches-row">
              ${product.metals.map((m, i) => `
                <div class="metal-dot ${i === 0 ? 'active' : ''}" 
                     style="background: ${m.color};" 
                     data-id="${product.id}" 
                     data-code="${m.code}" 
                     data-image="${m.image}" 
                     data-premium="${m.premium}"
                     title="${m.name}">
                </div>
              `).join('')}
            </div>

            <!-- Carat selector pills -->
            <div class="carat-selector-pills">
              ${product.carats.slice(0, 3).map((c, i) => `
                <button class="carat-pill ${i === 0 ? 'active' : ''}" 
                        data-id="${product.id}" 
                        data-multiplier="${c.multiplier}" 
                        data-label="${c.label}">
                  ${c.carat} ct
                </button>
              `).join('')}
            </div>

            <div class="product-footer">
              <div class="product-price" id="price-${product.id}">${formatMoney(calculatedPrice)}</div>
              <button class="add-cart-btn" data-id="${product.id}">Add to Bag</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card event listeners
    attachProductCardEvents();
  }

  function attachProductCardEvents() {
    // Metal swatch clicks
    document.querySelectorAll('.metal-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        const prodId = e.target.dataset.id;
        const newImg = e.target.dataset.image;
        const card = e.target.closest('.product-card');

        card.querySelectorAll('.metal-dot').forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');

        const imgEl = document.getElementById(`img-${prodId}`);
        if (imgEl) imgEl.src = newImg;

        recalculateCardPrice(card);
      });
    });

    // Carat pill clicks
    document.querySelectorAll('.carat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        card.querySelectorAll('.carat-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');

        recalculateCardPrice(card);
      });
    });

    // Wishlist click
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.dataset.id;
        const prod = PRODUCTS_DATA.find(p => p.id === prodId);
        if (!prod) return;

        const existsIdx = state.wishlist.findIndex(w => w.id === prodId);
        if (existsIdx > -1) {
          state.wishlist.splice(existsIdx, 1);
        } else {
          state.wishlist.push({
            id: prod.id,
            name: prod.name,
            price: prod.basePrice,
            image: prod.metals[0].image
          });
        }
        saveWishlist();
        renderProducts();
      });
    });

    // Quick View click
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.dataset.id;
        openQuickView(prodId);
      });
    });

    // Add to Cart from card
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.dataset.id;
        const card = e.currentTarget.closest('.product-card');
        const prod = PRODUCTS_DATA.find(p => p.id === prodId);
        if (!prod) return;

        const activeMetalDot = card.querySelector('.metal-dot.active');
        const activeCaratPill = card.querySelector('.carat-pill.active');

        const metalName = activeMetalDot ? activeMetalDot.getAttribute('title') : prod.metals[0].name;
        const metalImg = activeMetalDot ? activeMetalDot.dataset.image : prod.metals[0].image;
        const caratLabel = activeCaratPill ? activeCaratPill.dataset.label : prod.carats[0].label;
        const mult = activeCaratPill ? parseFloat(activeCaratPill.dataset.multiplier) : prod.carats[0].multiplier;
        const prem = activeMetalDot ? parseFloat(activeMetalDot.dataset.premium) : prod.metals[0].premium;

        const finalPrice = Math.round((prod.basePrice * mult) + prem);

        state.cart.push({
          id: prod.id + '-' + Date.now(),
          name: prod.name,
          price: finalPrice,
          image: metalImg,
          metal: metalName,
          carat: caratLabel,
          certification: prod.certification,
          qty: 1
        });

        saveCart();
        openCart();
      });
    });
  }

  function recalculateCardPrice(card) {
    const prodId = card.dataset.id;
    const basePrice = parseFloat(card.dataset.basePrice);
    const activeCarat = card.querySelector('.carat-pill.active');
    const activeMetal = card.querySelector('.metal-dot.active');

    const mult = activeCarat ? parseFloat(activeCarat.dataset.multiplier) : 1.0;
    const premium = activeMetal ? parseFloat(activeMetal.dataset.premium) : 0;

    const newPrice = Math.round((basePrice * mult) + premium);
    const priceEl = document.getElementById(`price-${prodId}`);
    if (priceEl) priceEl.textContent = formatMoney(newPrice);
  }

  // Quick View Modal
  function openQuickView(prodId) {
    const prod = PRODUCTS_DATA.find(p => p.id === prodId);
    if (!prod) return;

    const modalBody = document.getElementById('quick-view-body');
    modalBody.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-img">
          <img src="${prod.metals[0].image}" alt="${prod.name}" id="qv-img">
        </div>
        <div class="quick-view-info">
          <span style="font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--c-gold-dark);">
            ${prod.category} · ${prod.shape} Cut
          </span>
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin: 0.4rem 0 0.75rem;">
            ${prod.name}
          </h2>
          <div style="font-size: 1.45rem; font-family: var(--font-serif); color: var(--c-dark); margin-bottom: 1.25rem;" id="qv-price">
            ${formatMoney(prod.basePrice)}
          </div>
          <p style="font-size: 0.9rem; color: #4B5563; line-height: 1.65; margin-bottom: 1.5rem;">
            ${prod.description}
          </p>

          <div style="margin-bottom: 1.25rem;">
            <label style="font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.5rem;">
              Select Precious Metal
            </label>
            <div style="display: flex; gap: 0.75rem;">
              ${prod.metals.map((m, i) => `
                <div class="metal-dot ${i === 0 ? 'active' : ''}" 
                     style="background: ${m.color}; width: 26px; height: 26px;" 
                     data-image="${m.image}" 
                     data-premium="${m.premium}"
                     title="${m.name}"
                     id="qv-metal-${m.code}">
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.5rem;">
              Select Diamond Carat Weight
            </label>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${prod.carats.map((c, i) => `
                <button class="carat-pill ${i === 0 ? 'active' : ''}" data-multiplier="${c.multiplier}" data-label="${c.label}">
                  ${c.label}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom: 1.75rem; padding: 1rem; background: var(--c-cream); border-radius: 4px; border: 1px solid var(--c-cream-border);">
            <ul style="list-style: none; font-size: 0.8rem; color: #4B5563;">
              <li style="margin-bottom: 0.35rem;">✦ <strong>Certification:</strong> ${prod.certification}</li>
              <li style="margin-bottom: 0.35rem;">✦ <strong>Optical Grading:</strong> ${prod.diamondGrade}</li>
              <li>✦ <strong>Guarantee:</strong> Lifetime Buyback &amp; 100% Conflict-Free</li>
            </ul>
          </div>

          <button id="qv-add-bag" class="btn btn-primary" style="width: 100%;">
            Add To Jewellery Bag
          </button>
        </div>
      </div>
    `;

    // Hook quick view events
    const qvModalEl = modalBody.querySelector('.quick-view-grid');
    const qvImg = document.getElementById('qv-img');
    const qvPrice = document.getElementById('qv-price');
    let qvMult = prod.carats[0].multiplier;
    let qvPrem = prod.metals[0].premium;
    let selectedMetalName = prod.metals[0].name;
    let selectedCaratLabel = prod.carats[0].label;

    modalBody.querySelectorAll('.metal-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        modalBody.querySelectorAll('.metal-dot').forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');
        qvImg.src = e.target.dataset.image;
        qvPrem = parseFloat(e.target.dataset.premium);
        selectedMetalName = e.target.getAttribute('title');
        qvPrice.textContent = formatMoney(Math.round((prod.basePrice * qvMult) + qvPrem));
      });
    });

    modalBody.querySelectorAll('.carat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        modalBody.querySelectorAll('.carat-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        qvMult = parseFloat(e.target.dataset.multiplier);
        selectedCaratLabel = e.target.dataset.label;
        qvPrice.textContent = formatMoney(Math.round((prod.basePrice * qvMult) + qvPrem));
      });
    });

    document.getElementById('qv-add-bag').addEventListener('click', () => {
      state.cart.push({
        id: prod.id + '-' + Date.now(),
        name: prod.name,
        price: Math.round((prod.basePrice * qvMult) + qvPrem),
        image: qvImg.src,
        metal: selectedMetalName,
        carat: selectedCaratLabel,
        certification: prod.certification,
        qty: 1
      });
      saveCart();
      closeModal(quickViewModal);
      openCart();
    });

    openModal(quickViewModal);
  }

  // Interactive Shape Selector
  function updateShapeDetail(shapeId) {
    const s = DIAMOND_SHAPES.find(item => item.id === shapeId) || DIAMOND_SHAPES[0];
    state.activeShape = shapeId;

    shapeTabs.forEach(t => {
      t.classList.toggle('active', t.dataset.shape === shapeId);
    });

    shapeDetailCard.innerHTML = `
      <div class="shape-preview-box">
        <svg viewBox="0 0 100 100">
          <path d="${s.svgPath}" fill="none" />
          <circle cx="50" cy="50" r="3" fill="#D4AF37" />
        </svg>
        <span style="font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c-gold-light); display: block; margin-top: 1rem;">
          ${s.facets}
        </span>
      </div>
      <div class="shape-info-box">
        <span class="shape-tagline">${s.tagline}</span>
        <h3>${s.name} Diamond</h3>
        <div class="shape-meta-pills">
          <span class="shape-meta-pill">Brilliance Index: ${s.brilliance}</span>
          <span class="shape-meta-pill">Optical Symmetries: Excellent</span>
          <span class="shape-meta-pill">Ideal Ratio: 1.0 - 1.45</span>
        </div>
        <p class="shape-desc">${s.desc}</p>
        <div style="display: flex; gap: 1rem;">
          <a href="#collection" class="btn btn-dark" style="font-size: 0.75rem; padding: 0.6rem 1.4rem;">
            Explore ${s.name} Jewellery
          </a>
          <button class="btn btn-primary" onclick="openAtelierWithShape('${s.id}')" style="font-size: 0.75rem; padding: 0.6rem 1.4rem;">
            Design With This Shape
          </button>
        </div>
      </div>
    `;
  }

  // Interactive Custom Ring Builder (Atelier)
  function initAtelier() {
    const choices = document.querySelectorAll('.atelier-choice');
    choices.forEach(c => {
      c.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const val = e.target.dataset.value;
        const price = parseFloat(e.target.dataset.price || 0);

        // De-select siblings
        e.target.parentElement.querySelectorAll('.atelier-choice').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');

        if (type === 'setting') {
          state.atelier.setting = val;
          state.atelier.settingPrice = price;
        } else if (type === 'shape') {
          state.atelier.shape = val;
        } else if (type === 'carat') {
          state.atelier.carat = parseFloat(val);
          state.atelier.caratPrice = price;
        } else if (type === 'metal') {
          state.atelier.metal = val;
          state.atelier.metalPrice = price;
        }

        updateAtelierSummary();
      });
    });

    document.getElementById('atelier-reserve-btn').addEventListener('click', () => {
      openAppointmentModal(`Custom Bespoke Ring Commission: ${state.atelier.setting} with ${state.atelier.carat}ct ${state.atelier.shape.toUpperCase()} diamond in ${state.atelier.metal}`);
    });
  }

  function updateAtelierSummary() {
    document.getElementById('summary-setting').textContent = state.atelier.setting;
    document.getElementById('summary-diamond').textContent = `${state.atelier.carat} ct ${state.atelier.shape.toUpperCase()} Cut (D-E / VVS1)`;
    document.getElementById('summary-metal').textContent = state.atelier.metal;

    const total = state.atelier.settingPrice + state.atelier.caratPrice + state.atelier.metalPrice;
    document.getElementById('summary-total-price').textContent = formatMoney(total);
  }

  window.openAtelierWithShape = function(shapeId) {
    const sBtn = document.querySelector(`.atelier-choice[data-type="shape"][data-value="${shapeId}"]`);
    if (sBtn) sBtn.click();
    document.getElementById('custom-atelier').scrollIntoView({ behavior: 'smooth' });
  };

  // Drawer Controls
  function openCart() {
    closeAllModals();
    cartDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openWishlist() {
    closeAllModals();
    wishlistDrawer.classList.add('active');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlist() {
    wishlistDrawer.classList.remove('active');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openModal(modal) {
    closeAllModals();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    document.querySelectorAll('.drawer-panel').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Search Functionality
  function initSearch() {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResultsGrid.innerHTML = '<p style="color: #9CA3AF; grid-column: span 2; text-align: center; padding: 2rem;">Type to search rings, tennis bracelets, solitaires...</p>';
        return;
      }

      const results = PRODUCTS_DATA.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.shape.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );

      if (results.length === 0) {
        searchResultsGrid.innerHTML = '<p style="color: #9CA3AF; grid-column: span 2; text-align: center; padding: 2rem;">No matching jewels found.</p>';
        return;
      }

      searchResultsGrid.innerHTML = results.map(p => `
        <div style="display: flex; gap: 1rem; align-items: center; padding: 0.75rem; border: 1px solid var(--c-cream-border); border-radius: 4px; cursor: pointer;" onclick="openProductDetailFromSearch('${p.id}')">
          <img src="${p.metals[0].image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
          <div>
            <h5 style="font-family: var(--font-serif); font-size: 0.95rem;">${p.name}</h5>
            <span style="font-size: 0.8rem; color: var(--c-gold-dark);">${formatMoney(p.basePrice)}</span>
          </div>
        </div>
      `).join('');
    });
  }

  window.openProductDetailFromSearch = function(id) {
    closeModal(searchModal);
    openQuickView(id);
  };

  // Appointment Modal
  window.openAppointmentModal = function(customSubject = '') {
    const subjInput = document.getElementById('app-subject');
    if (subjInput && customSubject) subjInput.value = customSubject;
    openModal(appointmentModal);
  };

  // FAQ Accordion
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        item.classList.toggle('open');
      });
    });
  }

  // Event Listeners Wiring
  catalogTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      catalogTabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      state.activeCategory = e.target.dataset.category;
      renderProducts();
    });
  });

  shapeTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      updateShapeDetail(e.currentTarget.dataset.shape);
    });
  });

  currencySelector.addEventListener('change', (e) => {
    state.currency = e.target.value;
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    updateAtelierSummary();
  });

  cartToggleBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  wishlistToggleBtn.addEventListener('click', openWishlist);
  wishlistCloseBtn.addEventListener('click', closeWishlist);
  drawerBackdrop.addEventListener('click', closeAllModals);

  searchToggleBtn.addEventListener('click', () => openModal(searchModal));
  searchCloseBtn.addEventListener('click', () => closeModal(searchModal));
  quickViewCloseBtn.addEventListener('click', () => closeModal(quickViewModal));
  appointmentCloseBtn.addEventListener('click', () => closeModal(appointmentModal));
  sizingCloseBtn.addEventListener('click', () => closeModal(sizingModal));

  // Global Ring Sizer Trigger
  document.querySelectorAll('.trigger-ring-sizer').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(sizingModal);
    });
  });

  // Global Book Appointment Trigger
  document.querySelectorAll('.trigger-appointment').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openAppointmentModal();
    });
  });

  // Appointment Form Submit
  const appForm = document.getElementById('appointment-form');
  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you. A dedicated Senior Gemological Concierge from The Carat Theory has reserved your appointment and will send your private invitation link shortly.');
      closeModal(appointmentModal);
    });
  }

  // Newsletter Form Submit
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Welcome to The Carat Theory VIP Circle. Your private privilege code TCT-PRIVILEGE-10 has been issued.');
      newsletterForm.reset();
    });
  }

  // Scroll Header Effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Checkout button
  document.getElementById('cart-checkout-btn').addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Your bag is currently empty.');
      return;
    }
    alert('Proceeding to Secure Encrypted Checkout with Worldwide Armored Delivery...');
  });

  // Initialize all
  renderProducts();
  updateShapeDetail('round');
  updateCartUI();
  updateWishlistUI();
  initAtelier();
  updateAtelierSummary();
  initSearch();
  initFAQ();
});
