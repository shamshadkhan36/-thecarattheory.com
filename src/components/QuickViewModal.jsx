import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  const { formatMoney } = useCurrency();
  const { addToCart } = useCart();

  const [metal, setMetal] = useState(product.metals[0]);
  const [carat, setCarat] = useState(product.carats[0]);

  const price = Math.round((product.basePrice * carat.multiplier) + metal.premium);

  const handleAdd = () => {
    addToCart({
      id: `${product.id}-${metal.code}-${carat.carat}`,
      name: product.name,
      price: price,
      image: metal.image,
      metal: metal.name,
      carat: carat.label,
      certification: product.certification,
      qty: 1
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: '#F8F8F8', minHeight: '380px' }}>
            <img src={metal.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-wine)', fontWeight: 500 }}>
              {product.category} · {product.shape} Cut
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', margin: '0.3rem 0 0.5rem', textTransform: 'uppercase' }}>
              {product.name}
            </h2>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--c-wine)', fontWeight: 600, marginBottom: '1.25rem' }}>
              {formatMoney(price)}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Select Metal
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {product.metals.map((m) => (
                  <div
                    key={m.code}
                    className={`swatch-circle ${metal.code === m.code ? 'active' : ''}`}
                    style={{ backgroundColor: m.color, width: '22px', height: '22px' }}
                    onClick={() => setMetal(m)}
                    title={m.name}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Select Carat Weight
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {product.carats.map((c) => (
                  <button
                    key={c.carat}
                    onClick={() => setCarat(c)}
                    style={{
                      background: carat.carat === c.carat ? 'var(--c-wine)' : 'transparent',
                      color: carat.carat === c.carat ? 'var(--c-peach)' : 'var(--c-dark)',
                      border: '1px solid var(--c-border)',
                      padding: '0.25rem 0.6rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAdd} className="btn btn-primary" style={{ width: '100%' }}>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
