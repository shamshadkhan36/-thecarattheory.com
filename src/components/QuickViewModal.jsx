import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const QuickViewModal = ({ product, onClose, onSelectProduct }) => {
  if (!product) return null;

  const { formatMoney } = useCurrency();
  const { addToCart, setIsCartOpen } = useCart();

  // Determine format (Imported catalog format vs legacy mock format)
  const isImported = Array.isArray(product.metals) && typeof product.metals[0] === 'string';

  // Metals list
  const metalsList = isImported
    ? product.metals
    : (product.metals ? product.metals.map((m) => m.name || m.code) : ['925 Silver', '9K', '14K', '18K']);

  // Selected purity
  const [selectedPurity, setSelectedPurity] = useState(() => {
    if (isImported) {
      return product.metals.includes('18K') ? '18K' : product.metals[0];
    }
    return product.metals?.[0]?.name || '18K';
  });

  // Selected color
  const [selectedColor, setSelectedColor] = useState('yellow');

  // Selected legacy metal object if legacy
  const [legacyMetal, setLegacyMetal] = useState(isImported ? null : product.metals?.[0]);
  const [legacyCarat, setLegacyCarat] = useState(product.carats?.[0] || null);

  // Price determination
  let currentPrice = 940;
  if (isImported) {
    currentPrice = product.pricesByPurity?.[selectedPurity] || product.priceUSD || 940;
  } else if (product.basePrice && legacyCarat && legacyMetal) {
    currentPrice = Math.round((product.basePrice * (legacyCarat.multiplier || 1)) + (legacyMetal.premium || 0));
  } else {
    currentPrice = product.priceUSD || 940;
  }

  // Image determination
  const primaryImg = (product.images && product.images[0]?.src) ||
    product.image ||
    legacyMetal?.image ||
    '/assets/products/tct-three-stone-yellow.jpg';

  const handleAdd = () => {
    addToCart({
      id: `${product.id}-${selectedPurity}-${selectedColor}`,
      productId: product.id,
      name: `${product.name} (${selectedPurity} - ${selectedColor.toUpperCase()})`,
      price: currentPrice,
      priceUSD: currentPrice,
      image: primaryImg,
      metal: selectedPurity,
      color: selectedColor,
      size: 'US 6.5 (Standard Size)'
    }, 1);
    onClose();
    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(true);
    }
  };

  const handleFullView = () => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '2rem' }}>
          <div style={{ background: '#FFFFFF', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderRight: '1px solid var(--c-border)' }}>
            <img
              src={primaryImg}
              alt={product.name}
              style={{ width: '100%', maxHeight: '360px', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/products/tct-three-stone-yellow.jpg';
              }}
            />
          </div>

          <div style={{ padding: '2rem 2rem 2rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-wine)', fontWeight: 600 }}>
                {product.categoryLabel || product.category || 'Fine Jewellery'} · {product.shape || 'Round'} Cut
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: '0.35rem 0 0.5rem', textTransform: 'uppercase', color: '#1a1a1a', lineHeight: '1.2' }}>
                {product.name}
              </h2>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--c-wine)', fontWeight: 600, marginBottom: '1rem' }}>
                {formatMoney(currentPrice)}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', lineHeight: '1.6', marginBottom: '1.25rem', maxHeight: '72px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.description}
              </p>

              {/* Metal Purity Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Metal Purity: <span style={{ color: 'var(--c-wine)' }}>{selectedPurity}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {metalsList.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedPurity(m);
                        if (!isImported && product.metals) {
                          const found = product.metals.find((met) => met.name === m || met.code === m);
                          if (found) setLegacyMetal(found);
                        }
                      }}
                      style={{
                        padding: '0.3rem 0.75rem',
                        border: selectedPurity === m ? '1.5px solid var(--c-wine)' : '1px solid var(--c-border)',
                        background: selectedPurity === m ? 'var(--c-wine)' : '#FFF',
                        color: selectedPurity === m ? '#FFF' : '#1a1a1a',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                  Metal Tone
                </label>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                  {[
                    { id: 'yellow', name: 'Yellow Gold', color: '#E5A93C' },
                    { id: 'white', name: 'White Gold', color: '#D9D9D9' },
                    { id: 'rose', name: 'Rose Gold', color: '#C87D7D' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c.id)}
                      title={c.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: c.color,
                        border: selectedColor === c.id ? '2px solid var(--c-wine)' : '1px solid #CCC',
                        outline: selectedColor === c.id ? '2px solid rgba(85, 20, 42, 0.25)' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleAdd} className="btn btn-primary" style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                Add to Bag
              </button>
              <button onClick={handleFullView} className="btn btn-outline-wine" style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem' }}>
                Full Product Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
