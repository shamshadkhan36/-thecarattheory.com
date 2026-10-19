import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

export const SearchModal = ({ isOpen, onClose, products, onSelectProduct }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const { formatMoney } = useCurrency();

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.shape.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', padding: '2.5rem' }}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', textAlign: 'center', marginBottom: '1.5rem', color: 'var(--c-wine)' }}>
          Search The Carat Theory
        </h3>

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by solitaire, oval, tennis bracelet, earrings..."
            autoFocus
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              border: '1px solid var(--c-border)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {query.trim() === '' ? (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem', padding: '1rem 0' }}>
              Type product name, category, or diamond cut to search...
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem', padding: '1rem 0' }}>
              No matching diamonds found.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    border: '1px solid var(--c-border)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={prod.metals[0].image}
                    alt={prod.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {prod.name}
                    </h5>
                    <span style={{ fontSize: '0.8rem', color: 'var(--c-wine)', fontWeight: 600 }}>
                      {formatMoney(prod.basePrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
