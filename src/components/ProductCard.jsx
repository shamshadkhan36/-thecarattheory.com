import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { formatMoney } = useCurrency();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedMetal, setSelectedMetal] = useState(product.metals[0]);
  const [selectedCarat, setSelectedCarat] = useState(product.carats[0]);

  const price = Math.round((product.basePrice * selectedCarat.multiplier) + selectedMetal.premium);
  const wishActive = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart({
      id: `${product.id}-${selectedMetal.code}-${selectedCarat.carat}`,
      name: product.name,
      price: price,
      image: selectedMetal.image,
      metal: selectedMetal.name,
      carat: selectedCarat.label,
      certification: product.certification,
      qty: 1
    });
  };

  return (
    <div className="product-card">
      <div className="product-media">
        {product.badge && <span className="product-badge-ref">{product.badge}</span>}
        <button
          className={`product-wish-btn ${wishActive ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          title="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img
          src={selectedMetal.image}
          alt={product.name}
          onClick={() => onQuickView && onQuickView(product)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="product-info">
        <span className="product-sub">{product.category} · {product.shape} cut</span>
        <h4 className="product-name" onClick={() => onQuickView && onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h4>
        <p className="product-spec">{product.diamondGrade}</p>

        {/* Metal Swatches */}
        <div className="product-swatches">
          {product.metals.map((m) => (
            <div
              key={m.code}
              className={`swatch-circle ${selectedMetal.code === m.code ? 'active' : ''}`}
              style={{ backgroundColor: m.color }}
              onClick={() => setSelectedMetal(m)}
              title={m.name}
            />
          ))}
        </div>

        {/* Carat Weight Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {product.carats.slice(0, 3).map((c) => (
            <button
              key={c.carat}
              onClick={() => setSelectedCarat(c)}
              style={{
                background: selectedCarat.carat === c.carat ? 'var(--c-wine)' : 'transparent',
                color: selectedCarat.carat === c.carat ? 'var(--c-peach)' : 'var(--c-dark)',
                border: '1px solid var(--c-border)',
                padding: '0.2rem 0.5rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer'
              }}
            >
              {c.carat} ct
            </button>
          ))}
        </div>

        <div className="product-card-footer">
          <div className="product-card-price">{formatMoney(price)}</div>
          <button className="btn-card-add" onClick={handleAdd}>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
