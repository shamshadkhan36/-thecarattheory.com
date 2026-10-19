import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { PRIMARY_PRODUCT, RELATED_PRODUCTS } from '../data/products';

export const ProductPage = ({
  product = PRIMARY_PRODUCT,
  onOpenSizing,
  onOpenAppointment,
  onSelectProduct
}) => {
  const { formatPrice } = useCurrency();
  const { addToCart, setIsCartOpen } = useCart();

  // Selected State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPurity, setSelectedPurity] = useState('18K');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  // Accordion State: Description, Product Details, Price Breakup, Shipping & Returns
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    details: false,
    breakup: false,
    shipping: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Color selection switches active color and primary view
  const handleColorSelect = (color) => {
    setSelectedColor(color.id);
    if (typeof color.imageIndex === 'number' && product.images[color.imageIndex]) {
      setSelectedImageIndex(color.imageIndex);
    }
  };

  // Price calculations based on selected purity
  const currentPrice = product.pricesByPurity?.[selectedPurity] || product.priceINR;

  const handleAddToCart = (openDrawer = true) => {
    addToCart({
      id: `${product.id}-${selectedPurity}-${selectedColor}-${selectedSize || 'Standard'}`,
      productId: product.id,
      name: `${product.name} (${selectedPurity} - ${selectedColor.toUpperCase()})`,
      priceINR: currentPrice,
      priceUSD: Math.round(currentPrice / 83),
      image: product.images[selectedImageIndex]?.src || product.images[0].src,
      metal: selectedPurity,
      color: selectedColor,
      size: selectedSize || 'Standard Size'
    }, quantity);

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(true);
  };

  return (
    <div className="product-page-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="container">
        <nav className="pdp-breadcrumbs">
          <a href="#" onClick={(e) => { e.preventDefault(); if (onSelectProduct) onSelectProduct(null); }}>Home</a>
          <span className="pdp-breadcrumb-sep">/</span>
          <a href="#collection">Shop Gold</a>
          <span className="pdp-breadcrumb-sep">/</span>
          <span className="pdp-breadcrumb-current">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Grid: Gallery (Left) & Purchase Panel (Right) */}
      <div className="container pdp-main-container">
        <div className="pdp-grid">
          {/* LEFT COLUMN: Image Gallery & Thumbnail Slider */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-card">
              <img
                src={product.images[selectedImageIndex]?.src || product.images[0]?.src}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                className="pdp-main-img"
              />
              {product.images[selectedImageIndex]?.isVideo && (
                <div className="pdp-video-play-center" title="360 Interactive Video View">
                  <div className="pdp-play-circle">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#55142A">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            <div className="pdp-thumbnails-strip">
              {product.images.map((img, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`pdp-thumb-btn ${isActive ? 'active-thumb' : ''}`}
                    title={img.alt || `View angle ${idx + 1}`}
                  >
                    <img src={img.src} alt={img.alt} className="pdp-thumb-img" />
                    {img.isVideo && (
                      <span className="pdp-thumb-video-badge">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Configuration & Purchase Card */}
          <div className="pdp-info-col">
            <div className="pdp-config-card">
              {/* Product Title & Reviews */}
              <div className="pdp-header-section">
                <h1 className="pdp-product-title">{product.name}</h1>
                <div className="pdp-price-row">
                  <span className="pdp-price-tag">
                    {formatPrice(currentPrice, Math.round(currentPrice / 83))}
                  </span>
                  <span className="pdp-tax-inclusive">Inclusive of all taxes &amp; insured shipping</span>
                </div>
              </div>

              {/* Metal Purity Selector */}
              <div className="pdp-purity-row">
                <span className="pdp-section-label">Metal Purity:</span>
                <div className="pdp-purity-buttons">
                  {product.metals.map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedPurity(metal)}
                      className={`pdp-purity-btn ${selectedPurity === metal ? 'active' : ''}`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Color Swatches */}
              <div className="pdp-swatches-section">
                <div className="pdp-swatches-list">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleColorSelect(color)}
                        className={`pdp-swatch-circle ${isSelected ? 'active-swatch' : ''}`}
                        title={color.name}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Ring Size Dropdown */}
              <div className="pdp-size-section">
                <label htmlFor="pdp-size-select" className="pdp-size-label">
                  Ring Size
                </label>
                <select
                  id="pdp-size-select"
                  className="pdp-size-dropdown"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select Size</option>
                  <option value="Size 6 (14.5 mm)">Size 6 (14.5 mm)</option>
                  <option value="Size 7 (15.0 mm)">Size 7 (15.0 mm)</option>
                  <option value="Size 8 (15.5 mm)">Size 8 (15.5 mm)</option>
                  <option value="Size 9 (16.0 mm)">Size 9 (16.0 mm)</option>
                  <option value="Size 10 (16.5 mm)">Size 10 (16.5 mm)</option>
                  <option value="Size 11 (17.0 mm)">Size 11 (17.0 mm)</option>
                  <option value="Size 12 (17.5 mm)">Size 12 (17.5 mm)</option>
                  <option value="Size 13 (18.0 mm)">Size 13 (18.0 mm)</option>
                  <option value="Size 14 (18.5 mm)">Size 14 (18.5 mm)</option>
                  <option value="Size 15 (19.0 mm)">Size 15 (19.0 mm)</option>
                  <option value="Size 16 (19.5 mm)">Size 16 (19.5 mm)</option>
                </select>

                {/* Helper Links Matching Reference */}
                <div className="pdp-size-links">
                  <div className="pdp-size-guide-link">
                    Not sure about size?{' '}
                    <button
                      type="button"
                      onClick={onOpenSizing}
                      className="pdp-link-red"
                    >
                      Open Size Guide &rarr;
                    </button>
                  </div>
                  <div className="pdp-buyback-policy-link">
                    India's First Lifetime Full-Value Buyback Policy{' '}
                    <button
                      type="button"
                      onClick={onOpenAppointment}
                      className="pdp-link-maroon"
                    >
                      Know More &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Action Buttons */}
              <div className="pdp-actions-row">
                {/* Quantity Stepper */}
                <div className="pdp-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="pdp-qty-btn"
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="pdp-qty-display">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="pdp-qty-btn"
                    aria-label="Increase quantity"
                  >
                    &#43;
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="pdp-btn-add-cart"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>Add to cart</span>
                </button>

                {/* Buy It Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="pdp-btn-buy-now"
                >
                  Buy it now
                </button>
              </div>

              {/* Toast Feedback */}
              {addedToast && (
                <div className="pdp-toast-alert">
                  ✓ Successfully added to your shopping bag!
                </div>
              )}

              {/* Accordions Matching Reference Site */}
              <div className="pdp-accordions-group">
                {/* 1. Description */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => toggleAccordion('description')}
                  >
                    <span>Description</span>
                    <span className="pdp-accordion-icon">
                      {openAccordions.description ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordions.description && (
                    <div className="pdp-accordion-content">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>

                {/* 2. Product Details */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => toggleAccordion('details')}
                  >
                    <span>Product Details</span>
                    <span className="pdp-accordion-icon">
                      {openAccordions.details ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordions.details && (
                    <div className="pdp-accordion-content">
                      <table className="pdp-spec-table">
                        <tbody>
                          {product.details?.map((spec, i) => (
                            <tr key={i}>
                              <td className="pdp-spec-label">{spec.label}</td>
                              <td className="pdp-spec-value">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 3. Price Breakup */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => toggleAccordion('breakup')}
                  >
                    <span>Price Breakup</span>
                    <span className="pdp-accordion-icon">
                      {openAccordions.breakup ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordions.breakup && (
                    <div className="pdp-accordion-content">
                      <table className="pdp-breakup-table">
                        <tbody>
                          {product.priceBreakup?.map((row, i) => (
                            <tr key={i} className={row.highlight ? 'pdp-breakup-highlight' : ''}>
                              <td>{row.item}</td>
                              <td style={{ textAlign: 'right', fontWeight: row.highlight ? '700' : '500' }}>
                                {row.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* 4. Shipping & Returns */}
                <div className="pdp-accordion-item">
                  <button
                    type="button"
                    className="pdp-accordion-header"
                    onClick={() => toggleAccordion('shipping')}
                  >
                    <span>Shipping &amp; Returns</span>
                    <span className="pdp-accordion-icon">
                      {openAccordions.shipping ? '−' : '+'}
                    </span>
                  </button>
                  {openAccordions.shipping && (
                    <div className="pdp-accordion-content">
                      <p>{product.shippingInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (Screenshot 2) */}
      <section className="pdp-related-section">
        <div className="container">
          <h2 className="pdp-related-title">Related products</h2>
          <div className="pdp-related-grid">
            {RELATED_PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="pdp-related-card"
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(item);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="pdp-related-img-box">
                  <img src={item.image} alt={item.name} className="pdp-related-img" />
                  <button
                    className="pdp-related-quick-btn"
                    title="Quick Add to Bag"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: item.id,
                        name: item.name,
                        priceINR: item.priceINR,
                        priceUSD: item.priceUSD,
                        image: item.image,
                        metal: '18K',
                        color: 'Yellow'
                      }, 1);
                      setIsCartOpen(true);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </button>
                </div>

                <div className="pdp-related-info">
                  <h3 className="pdp-related-name">{item.name}</h3>
                  <div className="pdp-related-price">
                    {formatPrice(item.priceINR, item.priceUSD)}
                  </div>

                  {/* Purity Buttons */}
                  <div className="pdp-related-purity-row">
                    {item.metals.map((m, idx) => (
                      <span key={idx} className="pdp-related-purity-badge">
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Metal Color Dots */}
                  <div className="pdp-related-dots-row">
                    {item.colors.map((c, idx) => (
                      <span
                        key={idx}
                        className="pdp-related-color-dot"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
