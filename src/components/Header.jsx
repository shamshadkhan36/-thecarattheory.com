import React, { useState, useEffect } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Header = ({ onOpenSearch, onOpenLogoGuide, onOpenAppointment }) => {
  const { currency, setCurrency, rates } = useCurrency();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        {/* Brand Logo */}
        <a href="#" className="header-brand">
          <img src="/assets/logo/logo-primary.svg" alt="The Carat Theory - Certified Diamonds & Fine Jewellery" />
        </a>

        {/* Navigation Menu */}
        <nav>
          <ul className="main-nav">
            <li className="nav-item">
              <a href="#collection" className="nav-link">Rings</a>
            </li>
            <li className="nav-item">
              <a href="#collection" className="nav-link">Earrings</a>
            </li>
            <li className="nav-item">
              <a href="#collection" className="nav-link">Bracelets</a>
            </li>
            <li className="nav-item">
              <a href="#collection" className="nav-link">Pendants</a>
            </li>
            <li className="nav-item">
              <a href="#collection" className="nav-link">Necklaces</a>
            </li>
            <li className="nav-item">
              <a href="#customise" className="nav-link" style={{ color: 'var(--c-wine)' }}>CUSTOMISE</a>
            </li>
            <li className="nav-item">
              <button
                onClick={onOpenAppointment}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                CONTACT
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={onOpenLogoGuide}
                className="nav-link"
                style={{
                  background: 'none',
                  border: '1px dashed var(--c-wine)',
                  padding: '0.2rem 0.6rem',
                  cursor: 'pointer',
                  color: 'var(--c-wine)'
                }}
              >
                LOGO &amp; BRAND
              </button>
            </li>
          </ul>
        </nav>

        {/* Action Icons */}
        <div className="header-actions">
          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
            title="Currency"
          >
            {Object.keys(rates).map((key) => (
              <option key={key} value={key}>
                {rates[key].label}
              </option>
            ))}
          </select>

          {/* Search Trigger */}
          <button onClick={onOpenSearch} className="action-icon-btn" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Wishlist Trigger */}
          <button onClick={() => setIsWishlistOpen(true)} className="action-icon-btn" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="badge-count">{wishlistCount}</span>
          </button>

          {/* Cart Bag Trigger */}
          <button onClick={() => setIsCartOpen(true)} className="action-icon-btn" title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="badge-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
