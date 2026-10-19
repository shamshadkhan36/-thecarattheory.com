import React from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const CartDrawer = () => {
  const { cart, updateQty, removeFromCart, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const { formatMoney } = useCurrency();

  if (!isCartOpen) return null;

  const threshold = 1000;
  const freeShipping = subtotal >= threshold;
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}></div>
      <aside className="drawer-panel">
        <div className="drawer-head">
          <h3>Your Jewellery Bag</h3>
          <button className="drawer-close" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div className="drawer-body">
          {/* Free Shipping Progress */}
          <div className="shipping-progress">
            <div style={{ fontSize: '0.78rem', color: 'var(--c-wine)', fontWeight: 500 }}>
              {freeShipping
                ? '🎉 Complimentary Armored Worldwide Shipping Unlocked!'
                : `Add ${formatMoney(threshold - subtotal)} more to unlock Free Armored Shipping`}
            </div>
            <div className="shipping-bar-track">
              <div className="shipping-bar-fill" style={{ width: `${pct}%` }}></div>
            </div>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#999' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--c-dark)', marginBottom: '0.5rem' }}>
                Your Bag Is Empty
              </p>
              <p style={{ fontSize: '0.85rem' }}>Explore our best-selling certified diamond creations.</p>
            </div>
          ) : (
            cart.map((item, index) => (
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>
                    {item.metal} · {item.carat}
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--c-wine)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {formatMoney(item.price)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                    <button
                      onClick={() => updateQty(index, -1)}
                      style={{ width: '22px', height: '22px', border: '1px solid #CCC', background: '#FFF', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(index, 1)}
                      style={{ width: '22px', height: '22px', border: '1px solid #CCC', background: '#FFF', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', padding: '0.5rem' }}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>
              <span>Subtotal</span>
              <span style={{ color: 'var(--c-wine)' }}>{formatMoney(subtotal)}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--c-text-muted)', marginBottom: '1rem' }}>
              Taxes &amp; Armored Insurance calculated at checkout. Lifetime Buyback guarantee applies.
            </p>
            <button
              onClick={() => alert('Proceeding to Encrypted 256-bit Secure Checkout...')}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
