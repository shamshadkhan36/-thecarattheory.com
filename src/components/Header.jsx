import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MegaMenu } from './MegaMenu';

export const Header = ({ onOpenSearch, onOpenAppointment, onNavigateHome, onSelectCategory }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState('gold');

  const handleNavClick = (menuType, e) => {
    e.preventDefault();
    setActiveMegaMenu((prev) => (prev === menuType ? null : menuType));
  };

  const handleMobileCategorySelect = (catId) => {
    setIsMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  const handleMobileNavAction = (action) => {
    setIsMobileMenuOpen(false);
    if (action) action();
  };

  return (
    <header
      className="ref-header"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="container header-container-ref">
        {/* Left Cluster: Mobile Hamburger Toggle + Brand Logo */}
        <div className="header-left-cluster">
          {/* Mobile Hamburger Menu Toggle (Hidden on Desktop) */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

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
        </div>

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

          <button onClick={onOpenAppointment} className="icon-btn-ref header-account-btn" title="Account / Concierge">
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

      {/* Desktop Mega Menu Dropdown */}
      <MegaMenu
        type={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
        onSelectCategory={onSelectCategory}
      />

      {/* Mobile Navigation Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <aside
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="mobile-nav-header">
              <img
                src="/assets/logo/the-carat-theory-gold.svg"
                alt="The Carat Theory"
                className="mobile-nav-logo"
              />
              <button
                type="button"
                className="mobile-nav-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>

            {/* Quick Search Shortcut */}
            <div className="mobile-nav-search-box">
              <button
                type="button"
                className="mobile-search-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span>Search certified diamonds &amp; jewelry...</span>
              </button>
            </div>

            {/* Navigation Sections */}
            <div className="mobile-nav-body">
              {/* Accordion: SHOP GOLD */}
              <div className="mobile-nav-section">
                <button
                  type="button"
                  className="mobile-nav-accordion-trigger"
                  onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'gold' ? null : 'gold')}
                >
                  <span className="mobile-nav-title">Shop Gold Collections</span>
                  <span className="mobile-nav-arrow">{expandedMobileCategory === 'gold' ? '−' : '+'}</span>
                </button>
                {expandedMobileCategory === 'gold' && (
                  <div className="mobile-nav-sublinks">
                    <button type="button" onClick={() => handleMobileCategorySelect('rings')}>Solitaire &amp; Three-Stone Rings</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('earrings')}>Diamond Studs &amp; Hoops</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('bracelets')}>Tennis &amp; Bangle Bracelets</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('pendants')}>Solitaire Pendants</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('nosepins')}>Gold Diamond Nose Pins</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('necklaces')}>High Fine Necklaces</button>
                    <button type="button" className="mobile-nav-view-all" onClick={() => handleMobileCategorySelect('all')}>
                      View All 242 Gold Creations →
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion: SHOP SILVER */}
              <div className="mobile-nav-section">
                <button
                  type="button"
                  className="mobile-nav-accordion-trigger"
                  onClick={() => setExpandedMobileCategory(expandedMobileCategory === 'silver' ? null : 'silver')}
                >
                  <span className="mobile-nav-title">Shop 925 Sterling Silver</span>
                  <span className="mobile-nav-arrow">{expandedMobileCategory === 'silver' ? '−' : '+'}</span>
                </button>
                {expandedMobileCategory === 'silver' && (
                  <div className="mobile-nav-sublinks">
                    <button type="button" onClick={() => handleMobileCategorySelect('rings')}>925 Silver Solitaire Rings</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('bracelets')}>925 Silver Tennis Bracelets</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('pendants')}>925 Silver Pendants</button>
                    <button type="button" onClick={() => handleMobileCategorySelect('earrings')}>925 Silver Earrings</button>
                  </div>
                )}
              </div>

              {/* Standalone Nav Items */}
              <div className="mobile-nav-links-list">
                <a
                  href="#collection"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>All Fine Jewellery</span>
                  <span className="mobile-link-badge">242 pieces</span>
                </a>

                <a
                  href="#shapes"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Diamond Cuts &amp; 4Cs Guide</span>
                </a>

                <a
                  href="#customise"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Bespoke &amp; Custom Design</span>
                </a>

                <a
                  href="#promises"
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Our Lifetime Care Promise</span>
                </a>

                <button
                  type="button"
                  className="mobile-nav-link mobile-nav-btn-link"
                  onClick={() => handleMobileNavAction(onOpenAppointment)}
                >
                  <span>Book Atelier Consultation</span>
                  <span className="mobile-nav-badge-gold">Complimentary</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer with Client Care details */}
            <div className="mobile-nav-footer">
              <div className="mobile-nav-contacts">
                <div className="mobile-contact-line">
                  <strong>Concierge:</strong> <a href="mailto:concierge@thecarattheory.com">concierge@thecarattheory.com</a>
                </div>
                <div className="mobile-contact-line">
                  <strong>Direct:</strong> <a href="tel:+18005820190">+1 (800) 582-0190</a>
                </div>
                <div className="mobile-trust-badge">
                  ✦ Certified DEF/VVS Lab Diamonds · New York &amp; Antwerp
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

