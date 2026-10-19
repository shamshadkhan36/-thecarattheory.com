import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const WishlistDrawer = () => {
  const { wishlist, toggleWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();
  const { formatMoney } = useCurrency();

  if (!isWishlistOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsWishlistOpen(false)}></div>
      <aside className="drawer-panel">
        <div className="drawer-head">
          <h3>Saved Wishlist</h3>
          <button className="drawer-close" onClick={() => setIsWishlistOpen(false)}>&times;</button>
        </div>

        <div className="drawer-body">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#999' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--c-dark)', marginBottom: '0.5rem' }}>
                Your Wishlist Is Empty
              </p>
              <p style={{ fontSize: '0.85rem' }}>Save your favorite diamond jewels to inspect later.</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr auto',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--c-border)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                    {item.name}
                  </h4>
                  <div style={{ fontWeight: 600, color: 'var(--c-wine)', fontSize: '0.9rem' }}>
                    {formatMoney(item.price)}
                  </div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: `${item.id}-default`,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        metal: '18K Yellow Gold',
                        carat: '1.50 Carat',
                        certification: 'IGI Certified',
                        qty: 1
                      });
                      toggleWishlist(item);
                    }}
                    style={{
                      background: 'var(--c-wine)',
                      color: 'var(--c-peach)',
                      border: 'none',
                      padding: '0.3rem 0.6rem',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      marginTop: '0.4rem'
                    }}
                  >
                    Move to Bag
                  </button>
                </div>
                <button
                  onClick={() => toggleWishlist(item)}
                  style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '0.5rem' }}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};
