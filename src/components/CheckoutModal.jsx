import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { createNewOrder } from '../services/adminStore';

export const CheckoutModal = ({ isOpen, onClose, directItem = null }) => {
  const { cart, clearCart } = useCart();
  const { formatMoney } = useCurrency();

  // If a directItem is provided (e.g. from "Buy It Now" on PDP), use that; otherwise use cart
  const items = directItem ? [directItem] : cart;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!isOpen) return null;

  const totalUSD = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);

  // Check if any item has odd ring size (e.g. 6.5) or bespoke flag
  const hasOddSize = items.some((item) => {
    const s = String(item.size || item.carat || '').toLowerCase();
    return s.includes('6.5') || s.includes('odd') || s.includes('custom') || s.includes('bespoke');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to The Carat Theory Terms & Conditions to proceed.');
      return;
    }
    setIsSubmitting(true);

    const formattedAddress = `${address}, ${city}, ${state} ${zip}, ${country}`;
    const orderItems = items.map((i) => ({
      name: i.name,
      purity: i.metal || '18K Yellow Gold',
      color: i.color || 'Yellow Gold',
      size: i.size || '6.5',
      price: Number(i.price) || 0,
      qty: i.qty || 1,
      isOddSize: String(i.size || '').includes('6.5') || String(i.carat || '').includes('6.5')
    }));

    const paymentLabel =
      paymentMethod === 'card'
        ? 'Encrypted Credit Card (Stripe 256-Bit)'
        : paymentMethod === 'wire'
        ? 'Direct Atelier Wire Transfer (Bank SWIFT)'
        : 'Apple Pay / Digital Wallet';

    setTimeout(() => {
      const newOrder = createNewOrder({
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim() || '+1 (Direct Client)',
        shippingAddress: formattedAddress,
        items: orderItems,
        totalAmountUSD: totalUSD,
        paymentStatus: `Authorized (${paymentLabel})`
      });

      // Clear the storefront cart
      clearCart();
      setIsSubmitting(false);
      setPlacedOrder(newOrder);
    }, 600);
  };

  const handleResetAndClose = () => {
    setPlacedOrder(null);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    onClose();
  };

  const handleGoToAdmin = () => {
    handleResetAndClose();
    if (typeof window !== 'undefined') {
      window.location.hash = 'admin';
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          borderRadius: '12px',
          background: '#FFFFFF',
          color: '#18181B',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
        }}
      >
        <button
          className="modal-close-corner"
          onClick={handleResetAndClose}
          style={{ fontSize: '1.75rem', color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          &times;
        </button>

        {placedOrder ? (
          /* Order Confirmation Success State */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.4rem',
                margin: '0 auto 1.25rem'
              }}
            >
              ✓
            </div>

            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'var(--c-wine)',
                display: 'block',
                marginBottom: '0.25rem'
              }}
            >
              Commission Confirmed
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.85rem',
                color: '#18181B',
                marginBottom: '0.75rem'
              }}
            >
              Thank You for Your Order
            </h2>

            <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
              Your order reference is <strong style={{ color: '#18181B' }}>{placedOrder.id}</strong>. A master gemologist has been assigned to oversee the casting, hand-setting, and GIA/IGI verification of your lab-grown diamond piece.
            </p>

            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '1.75rem',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748B' }}>Order Reference</span>
                <strong style={{ color: 'var(--c-wine)', fontFamily: 'monospace', fontSize: '0.95rem' }}>{placedOrder.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: '#64748B' }}>Client Name</span>
                <strong>{placedOrder.customerName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: '#64748B' }}>Armored Courier Delivery To</span>
                <strong style={{ maxWidth: '60%', textAlign: 'right' }}>{placedOrder.shippingAddress}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ color: '#64748B' }}>Total Paid</span>
                <strong style={{ color: 'var(--c-wine)', fontSize: '1.1rem' }}>{formatMoney(placedOrder.totalAmountUSD)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Policy &amp; Guarantee</span>
                <span style={{ color: placedOrder.isNonCancellable ? '#DC2626' : '#059669', fontWeight: 600 }}>
                  {placedOrder.isNonCancellable
                    ? '✦ Size 6.5 (Strictly Non-Cancellable)'
                    : 'Lifetime Care & Service Guarantee'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleResetAndClose}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                Continue Shopping
              </button>
              <button
                onClick={handleGoToAdmin}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 2rem' }}
              >
                View in Atelier Admin Console &rarr;
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit}>
            <div style={{ borderBottom: '1px solid #E4E4E7', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: 'var(--c-wine)',
                  display: 'block',
                  marginBottom: '0.2rem'
                }}
              >
                256-Bit Encrypted Secure Checkout
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', margin: 0 }}>
                Complete Your Diamond Commission
              </h2>
            </div>

            {/* Odd Ring Size T&C Alert Banner */}
            {hasOddSize && (
              <div
                style={{
                  background: '#FFFBEB',
                  border: '1px solid #FCD34D',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start'
                }}
              >
                <span style={{ fontSize: '1.3rem', color: '#D97706' }}>⚠</span>
                <div>
                  <strong style={{ display: 'block', color: '#92400E', fontSize: '0.88rem', marginBottom: '0.25rem' }}>
                    Special Terms &amp; Conditions: Odd Ring Size / Bespoke Casting (Size 6.5)
                  </strong>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#78350F', lineHeight: '1.45' }}>
                    Your order includes an odd ring size (Size 6.5) or custom bespoke creation. In accordance with The Carat Theory T&amp;C, these pieces are custom-cast and set specifically to your measurements and <strong>cannot be cancelled or returned</strong> once confirmed.
                  </p>
                </div>
              </div>
            )}

            {/* Order Items Preview */}
            <div
              style={{
                background: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#64748B',
                  marginBottom: '0.75rem'
                }}
              >
                Pieces in this Commission ({items.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.image || '/assets/products/tct-three-stone-yellow.jpg'}
                        alt={item.name}
                        style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#18181B' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          {item.metal || '18K Gold'} &bull; Size: <strong>{item.size || '6.5'}</strong> (Qty: {item.qty || 1})
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--c-wine)' }}>
                      {formatMoney((item.price || 0) * (item.qty || 1))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Details Section */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: '#18181B'
                }}
              >
                1. Client Contact &amp; Armored Delivery
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Email Address (For Certification) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@domain.com"
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Street Address &amp; Suite *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, Penthouse / Suite"
                  required
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    State / Prov *
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="NY"
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="10036"
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="European Union">European Union</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Direct Telephone (Courier Coordination)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.05rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  color: '#18181B'
                }}
              >
                2. Encrypted Payment Method
              </h3>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <label
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '0.85rem',
                    border: paymentMethod === 'card' ? '2px solid var(--c-wine)' : '1px solid #CBD5E1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: paymentMethod === 'card' ? '#FFF9FA' : '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Visa, MC, Amex, 256-Bit</div>
                  </div>
                </label>

                <label
                  style={{
                    flex: '1',
                    minWidth: '180px',
                    padding: '0.85rem',
                    border: paymentMethod === 'wire' ? '2px solid var(--c-wine)' : '1px solid #CBD5E1',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: paymentMethod === 'wire' ? '#FFF9FA' : '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <input
                    type="radio"
                    name="paymethod"
                    checked={paymentMethod === 'wire'}
                    onChange={() => setPaymentMethod('wire')}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Bank Wire Transfer</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Direct Atelier SWIFT Escrow</div>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div
                  style={{
                    background: '#F8FAFC',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.2rem' }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.2rem' }}>
                      Exp
                    </label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.2rem' }}>
                      CVC
                    </label>
                    <input
                      type="password"
                      defaultValue="888"
                      style={{ width: '100%', padding: '0.55rem', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div
              style={{
                background: '#FAFAFA',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #E4E4E7',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Items Subtotal</span>
                <span>{formatMoney(totalUSD)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Insured Armored Delivery</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>Complimentary ($0.00)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Lifetime Care &amp; Service Guarantee</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>Included</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #E4E4E7',
                  paddingTop: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  color: 'var(--c-wine)'
                }}
              >
                <span>Total Commission (USD)</span>
                <span>{formatMoney(totalUSD)}</span>
              </div>
            </div>

            {/* T&C Agreement */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.5' }}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  style={{ marginTop: '0.2rem', accentColor: 'var(--c-wine)' }}
                  required
                />
                <span>
                  I acknowledge and agree to <strong>The Carat Theory Terms &amp; Conditions</strong>. I understand that odd ring sizes (e.g. 6.5) and bespoke creations are hand-cast to order and are strictly non-cancellable once placed. All creations include our Lifetime Care &amp; Service Guarantee.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', letterSpacing: '0.08em' }}
            >
              {isSubmitting ? 'Securing Commission...' : `Authorize Commission & Place Order (${formatMoney(totalUSD)})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
