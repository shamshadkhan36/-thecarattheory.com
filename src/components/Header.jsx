import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MegaMenu } from './MegaMenu';

export const Header = ({ onOpenSearch, onOpenAppointment, onNavigateHome }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const handleNavClick = (menuType, e) => {
    e.preventDefault();
    setActiveMegaMenu((prev) => (prev === menuType ? null : menuType));
  };

  return (
    <header
      className="ref-header"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="container header-container-ref">
        {/* The Carat Theory Master Logo */}
        <a
          href="#"
          className="brand-logo-ref"
          title="The Carat Theory Diamonds"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
          }}
        >
          <img
            src="/assets/logo/the-carat-theory-white.svg"
            alt="The Carat Theory Diamonds"
            className="brand-logo-img-ref"
          />
        </a>

        {/* Center Nav Links (SHOP GOLD, SHOP SILVER, CUSTOMISE, CONTACT, EDUCATE) */}
        <nav className="center-nav-ref">
          <div
            className="nav-item-wrapper"
            onMouseEnter={() => setActiveMegaMenu('gold')}
          >
            <a
              href="#collection"
              className={`nav-item-ref ${activeMegaMenu === 'gold' ? 'active-nav-link' : ''}`}
              onClick={(e) => handleNavClick('gold', e)}
            >
              SHOP GOLD
            </a>
          </div>

          <div
            className="nav-item-wrapper"
            onMouseEnter={() => setActiveMegaMenu('silver')}
          >
            <a
              href="#collection"
              className={`nav-item-ref ${activeMegaMenu === 'silver' ? 'active-nav-link' : ''}`}
              onClick={(e) => handleNavClick('silver', e)}
            >
              SHOP SILVER
            </a>
          </div>

          <a
            href="#customise"
            className="nav-item-ref"
            onMouseEnter={() => setActiveMegaMenu(null)}
          >
            CUSTOMISE
          </a>

          <button
            onClick={onOpenAppointment}
            className="nav-item-ref nav-btn-ref"
            onMouseEnter={() => setActiveMegaMenu(null)}
          >
            CONTACT
          </button>

          <a
            href="#shapes"
            className="nav-item-ref"
            onMouseEnter={() => setActiveMegaMenu(null)}
          >
            EDUCATE
          </a>
        </nav>

        {/* Right Action Icons (Search, Profile, Cart Bag) */}
        <div className="right-actions-ref">
          <button onClick={onOpenSearch} className="icon-btn-ref" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button onClick={onOpenAppointment} className="icon-btn-ref" title="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          <button onClick={() => setIsCartOpen(true)} className="icon-btn-ref cart-btn-ref" title="Shopping Bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-badge-ref">{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        type={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
      />
    </header>
  );
};

