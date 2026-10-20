import React, { useState, useMemo } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Creations', count: 242 },
  { id: 'rings', label: 'Rings', count: 96 },
  { id: 'earrings', label: 'Earrings', count: 38 },
  { id: 'bracelets', label: 'Bracelets', count: 35 },
  { id: 'pendants', label: 'Pendants', count: 32 },
  { id: 'nosepins', label: 'Nose Pins', count: 33 },
  { id: 'necklaces', label: 'Necklaces', count: 8 }
];

const SHAPE_FILTERS = [
  'All',
  'Round',
  'Oval',
  'Emerald',
  'Cushion',
  'Pear',
  'Princess',
  'Marquise',
  'Heart'
];

export const CatalogSection = ({
  onSelectProduct,
  onQuickView,
  selectedCategory = 'all',
  onSelectCategory,
  selectedShape = 'All',
  onSelectShape
}) => {
  const { formatMoney } = useCurrency();

  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [activeShape, setActiveShape] = useState(selectedShape);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(24);

  // Per-card selected purity state: { [productId]: '18K' }
  const [cardPurities, setCardPurities] = useState({});
  // Per-card selected color state: { [productId]: 'yellow' }
  const [cardColors, setCardColors] = useState({});
  // Per-card hover image state: { [productId]: true }
  const [hoveredCard, setHoveredCard] = useState(null);

  // Sync external props if provided
  React.useEffect(() => {
    if (selectedCategory && selectedCategory !== activeCategory) {
      setActiveCategory(selectedCategory);
      setVisibleCount(24);
    }
  }, [selectedCategory]);

  React.useEffect(() => {
    if (selectedShape && selectedShape !== activeShape) {
      setActiveShape(selectedShape);
      setVisibleCount(24);
    }
  }, [selectedShape]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(24);
    if (onSelectCategory) onSelectCategory(catId);
  };

  const handleShapeClick = (shape) => {
    setActiveShape(shape);
    setVisibleCount(24);
    if (onSelectShape) onSelectShape(shape);
  };

  const handleCardPurityChange = (productId, purity, e) => {
    e.stopPropagation();
    setCardPurities((prev) => ({ ...prev, [productId]: purity }));
  };

  const handleCardColorChange = (productId, colorId, e) => {
    e.stopPropagation();
    setCardColors((prev) => ({ ...prev, [productId]: colorId }));
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      // Shape filter
      if (activeShape !== 'All') {
        const prodShape = (prod.shape || '').toLowerCase();
        if (prodShape !== activeShape.toLowerCase()) {
          return false;
        }
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = prod.name.toLowerCase().includes(q);
        const matchCategory = prod.categoryLabel?.toLowerCase().includes(q) || prod.category.toLowerCase().includes(q);
        const matchShape = prod.shape?.toLowerCase().includes(q);
        const matchDesc = prod.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchShape && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') {
        return (a.priceUSD || 0) - (b.priceUSD || 0);
      }
      if (sortBy === 'price-high-low') {
        return (b.priceUSD || 0) - (a.priceUSD || 0);
      }
      if (sortBy === 'name-a-z') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      // 'featured': default catalog order
      return 0;
    });
  }, [activeCategory, activeShape, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredProducts.length));
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveShape('All');
    setSearchQuery('');
    setSortBy('featured');
    setVisibleCount(24);
    if (onSelectCategory) onSelectCategory('all');
    if (onSelectShape) onSelectShape('All');
  };

  return (
    <section className="section-padding catalog-section" id="collection" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--c-border)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow-ref">THE CARAT THEORY ATELIER</span>
          <h2 className="title-ref">FINE JEWELLERY COLLECTION</h2>
          <p style={{ maxWidth: '640px', margin: '0.8rem auto 0', color: 'var(--c-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Handcrafted with certified DEF / VVS lab-grown diamonds set in 18K solid gold, 14K, 9K, and 925 sterling silver.
            Every piece includes our Lifetime Care &amp; Service Guarantee.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="catalog-tabs-bar" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryClick(tab.id)}
                style={{
                  padding: '0.55rem 1.25rem',
                  border: isActive ? '1.5px solid var(--c-wine)' : '1px solid var(--c-border)',
                  backgroundColor: isActive ? 'var(--c-wine)' : '#FFFFFF',
                  color: isActive ? 'var(--c-peach)' : '#1a1a1a',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    opacity: isActive ? 0.9 : 0.6,
                    padding: '0.1rem 0.35rem',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255, 243, 227, 0.2)' : 'rgba(0,0,0,0.06)'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Shape & Search Controls Bar */}
        <div
          className="catalog-controls-card"
          style={{
            background: '#FAF9F1',
            padding: '1.25rem 1.5rem',
            border: '1px solid var(--c-border)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {/* Top row: Shape pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-wine)', fontWeight: 600, marginRight: '0.25rem' }}>
              Cut / Shape:
            </span>
            {SHAPE_FILTERS.map((shape) => {
              const isShapeActive = activeShape.toLowerCase() === shape.toLowerCase();
              return (
                <button
                  key={shape}
                  type="button"
                  onClick={() => handleShapeClick(shape)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-body)',
                    border: isShapeActive ? '1px solid var(--c-wine)' : '1px solid rgba(0,0,0,0.12)',
                    background: isShapeActive ? 'var(--c-wine)' : '#FFFFFF',
                    color: isShapeActive ? '#FFFFFF' : '#333333',
                    cursor: 'pointer',
                    borderRadius: '20px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {shape}
                </button>
              );
            })}
          </div>

          {/* Bottom row: Search input & Sort dropdown */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            {/* Search Box */}
            <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '360px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(24);
                }}
                placeholder="Filter within 242 creations..."
                style={{
                  width: '100%',
                  padding: '0.45rem 0.85rem 0.45rem 2rem',
                  fontSize: '0.85rem',
                  border: '1px solid var(--c-border)',
                  background: '#FFFFFF',
                  outline: 'none',
                  borderRadius: '2px'
                }}
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1rem' }}
                >
                  &times;
                </button>
              )}
            </div>

            {/* Results counter & Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
                Showing <strong>{displayedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> creations
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#555' }}>
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.82rem',
                    border: '1px solid var(--c-border)',
                    background: '#FFFFFF',
                    outline: 'none',
                    cursor: 'pointer',
                    borderRadius: '2px'
                  }}
                >
                  <option value="featured">Featured / Atelier Curated</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-a-z">Alphabetical (A - Z)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FAF9F1', border: '1px dashed var(--c-border)', margin: '2rem 0' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--c-wine)', marginBottom: '0.5rem' }}>
              No Creations Match Your Selection
            </h4>
            <p style={{ color: 'var(--c-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try adjusting your category, diamond cut, or search terms to explore our atelier.
            </p>
            <button onClick={resetFilters} className="btn btn-outline-wine" style={{ padding: '0.6rem 1.5rem', fontSize: '0.82rem' }}>
              Reset All Filters
            </button>
          </div>
        )}

        {/* Products Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        <div
          className="catalog-products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '2.5rem 1.75rem'
          }}
        >
          {displayedProducts.map((prod) => {
            const activePurity = cardPurities[prod.id] || '18K';
            const activeColor = cardColors[prod.id] || 'yellow';
            const priceUSD = prod.pricesByPurity?.[activePurity] || prod.priceUSD || 940;

            const primaryImg = (prod.images && prod.images[0]?.src) || prod.image || '/assets/products/tct-three-stone-yellow.jpg';
            const hoverImg = (prod.images && prod.images.length > 1 && prod.images[1]?.src) || primaryImg;
            const isHovered = hoveredCard === prod.id;
            const currentImg = isHovered ? hoverImg : primaryImg;

            return (
              <div
                key={prod.id}
                className="catalog-product-card"
                onMouseEnter={() => setHoveredCard(prod.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  border: '1px solid var(--c-border)',
                  padding: '1.25rem',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  boxShadow: isHovered ? '0 10px 24px rgba(85, 20, 42, 0.08)' : 'none',
                  borderColor: isHovered ? 'var(--c-wine)' : 'var(--c-border)'
                }}
              >
                {/* Shape / Badge Tag */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(255, 243, 227, 0.9)',
                      color: 'var(--c-wine)',
                      fontWeight: 600,
                      borderRadius: '2px',
                      border: '1px solid rgba(85, 20, 42, 0.15)'
                    }}
                  >
                    {prod.shape || 'Round'} Cut
                  </span>
                </div>

                {/* Clickable Image Area */}
                <div
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                  title={`View details for ${prod.name}`}
                >
                  <img
                    src={currentImg}
                    alt={prod.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      maxWidth: '92%',
                      maxHeight: '92%',
                      objectFit: 'contain',
                      transition: 'transform 0.35s ease, opacity 0.25s ease'
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/products/tct-three-stone-yellow.jpg';
                    }}
                  />
                </div>

                {/* Info Container */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'center' }}>
                  {/* Category Label */}
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#888', marginBottom: '0.25rem' }}>
                    {prod.categoryLabel || prod.category}
                  </span>

                  {/* Title */}
                  <h4
                    onClick={() => onSelectProduct && onSelectProduct(prod)}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.96rem',
                      letterSpacing: '0.04em',
                      color: '#1a1a1a',
                      marginBottom: '0.4rem',
                      cursor: 'pointer',
                      lineHeight: '1.3',
                      minHeight: '2.6em',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                    title={prod.name}
                  >
                    {prod.name}
                  </h4>

                  {/* Price */}
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--c-wine)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {formatMoney(priceUSD)}
                  </div>

                  {/* Metal Purity Selector: [ 925 Silver ] [ 9K ] [ 14K ] [ 18K ] */}
                  <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', marginBottom: '0.65rem' }}>
                    {['925 Silver', '9K', '14K', '18K'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={(e) => handleCardPurityChange(prod.id, m, e)}
                        style={{
                          background: activePurity === m ? '#1a1a1a' : '#FFFFFF',
                          color: activePurity === m ? '#FFFFFF' : '#1a1a1a',
                          border: '1px solid #1a1a1a',
                          padding: '0.2rem 0.45rem',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-body)',
                          cursor: 'pointer',
                          borderRadius: '0px',
                          transition: 'all 0.15s ease'
                        }}
                        title={`Select ${m}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {/* Metal Color Dots */}
                  <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                    <button
                      type="button"
                      onClick={(e) => handleCardColorChange(prod.id, 'yellow', e)}
                      title="Yellow Gold"
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: '#E5A93C',
                        cursor: 'pointer',
                        outline: activeColor === 'yellow' ? '1.5px solid #55142A' : 'none',
                        outlineOffset: '2px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => handleCardColorChange(prod.id, 'white', e)}
                      title="White Gold"
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: '#D9D9D9',
                        cursor: 'pointer',
                        outline: activeColor === 'white' ? '1.5px solid #55142A' : 'none',
                        outlineOffset: '2px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => handleCardColorChange(prod.id, 'rose', e)}
                      title="Rose Gold"
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: '#C87D7D',
                        cursor: 'pointer',
                        outline: activeColor === 'rose' ? '1.5px solid #55142A' : 'none',
                        outlineOffset: '2px'
                      }}
                    />
                  </div>

                  {/* Actions Row */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => onSelectProduct && onSelectProduct(prod)}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        padding: '0.55rem 0.5rem',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em'
                      }}
                    >
                      View Creation
                    </button>
                    {onQuickView && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(prod);
                        }}
                        className="btn btn-outline"
                        style={{
                          padding: '0.55rem 0.65rem',
                          fontSize: '0.75rem',
                          letterSpacing: '0.06em'
                        }}
                        title="Quick Preview"
                      >
                        Quick View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button & Progress Bar */}
        {visibleCount < filteredProducts.length && (
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <div style={{ maxWidth: '300px', margin: '0 auto 1.25rem', height: '3px', background: 'var(--c-border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--c-wine)',
                  width: `${Math.round((displayedProducts.length / filteredProducts.length) * 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--c-text-muted)', marginBottom: '1rem' }}>
              Showing {displayedProducts.length} of {filteredProducts.length} creations
            </p>
            <button
              type="button"
              onClick={handleLoadMore}
              className="btn btn-outline-wine"
              style={{ padding: '0.85rem 2.5rem', fontSize: '0.88rem' }}
            >
              Load More Creations ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
