import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Header = ({ onOpenSearch, onOpenLogoGuide, onOpenAppointment }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();

  return (
    <header className="ref-header">
      <div className="container header-container-ref">
        {/* Brand Logo matching reference style */}
        <a href="#" className="brand-logo-ref">
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" stroke="#FFF" strokeWidth="2.5" style={{ minWidth: '34px' }}>
            <circle cx="50" cy="50" r="46" stroke="#FFF" strokeWidth="2" />
            <polygon points="25,25 75,25 90,48 50,88 10,48" stroke="#FFF" strokeWidth="2.5" />
            <polygon points="35,25 65,25 75,48 25,48" stroke="#FFF" strokeWidth="2" />
            <line x1="50" y1="48" x2="50" y2="88" stroke="#FFF" strokeWidth="2" />
            <circle cx="50" cy="48" r="3" fill="#FFF" />
          </svg>
          <div className="brand-text-ref">
            <span className="brand-title-ref">THE CARAT THEORY</span>
            <span className="brand-sub-ref">DIAMONDS</span>
          </div>
        </a>

        {/* Center Nav Links (SHOP GOLD, SHOP SILVER, CUSTOMISE, CONTACT, EDUCATE) */}
        <nav className="center-nav-ref">
          <a href="#collection" className="nav-item-ref">SHOP GOLD</a>
          <a href="#collection" className="nav-item-ref">SHOP SILVER</a>
          <a href="#customise" className="nav-item-ref">CUSTOMISE</a>
          <button onClick={onOpenAppointment} className="nav-item-ref nav-btn-ref">CONTACT</button>
          <a href="#shapes" className="nav-item-ref">EDUCATE</a>
          <button onClick={onOpenLogoGuide} className="nav-item-ref nav-btn-ref" style={{ border: '1px dashed rgba(255,255,255,0.4)', padding: '0.2rem 0.5rem' }}>
            BRAND LOGO
          </button>
        </nav>

        {/* Right Action Icons (Search, Profile, Cart Bag) */}
        <div className="right-actions-ref">
          <button onClick={onOpenSearch} className="icon-btn-ref" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button onClick={onOpenAppointment} className="icon-btn-ref" title="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <button onClick={() => setIsCartOpen(true)} className="icon-btn-ref cart-btn-ref" title="Shopping Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge-ref">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};
