import React, { useState } from 'react';

export const Footer = ({ onOpenSizing, onOpenAppointment, onOpenLogoGuide, onSelectCategory, onSelectShape }) => {
  // Accordion open/close state
  const [openSections, setOpenSections] = useState({
    contact: false,
    why: false,
    about: false,
    learn: false,
    searches: false
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const scrollToCollection = (category = null, shape = null) => {
    if (category && onSelectCategory) onSelectCategory(category);
    if (shape && onSelectShape) onSelectShape(shape);
    const elem = document.getElementById('collection');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="rare-carat-footer">
      <div className="container rare-footer-container">
        {/* Intro Overview Statement matching Screenshot 2 */}
        <div className="rare-footer-overview">
          <p>
            The Carat Theory is America's highest-rated jewelry brand on Trustpilot, specializing in natural &amp; lab-grown diamond rings, earrings, bracelets, wedding bands and eternity rings. What sets us apart is our product quality, our prices, and the exceptional energy we put into customer service from A to Z.
          </p>
        </div>

        {/* Section Header: OUR SERVICES & POLICIES */}
        <div className="rare-footer-section-header">
          <h3>OUR SERVICES &amp; POLICIES</h3>
        </div>

        {/* Accordions List matching Screenshot 2 */}
        <div className="rare-footer-accordion-group">
          {/* 1. CONTACT US */}
          <div className="rare-accordion-item">
            <button
              type="button"
              className="rare-accordion-trigger"
              onClick={() => toggleSection('contact')}
            >
              <span>CONTACT US</span>
              <svg
                className={`rare-chevron ${openSections.contact ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openSections.contact && (
              <div className="rare-accordion-panel">
                <p><strong>Diamond Concierge Hotline:</strong> +1 (800) 246-8190</p>
                <p><strong>Email:</strong> <a href="mailto:concierge@thecarattheory.com">concierge@thecarattheory.com</a></p>
                <p><strong>Consultation Hours:</strong> Monday &ndash; Sunday: 8:00 AM &ndash; 10:00 PM EST</p>
                <p><strong>Headquarters:</strong> 2000 Town Center, Southfield MI 48075</p>
                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="rare-footer-action-btn"
                  >
                    Schedule Free Consultation &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. WHY THE CARAT THEORY? */}
          <div className="rare-accordion-item">
            <button
              type="button"
              className="rare-accordion-trigger"
              onClick={() => toggleSection('why')}
            >
              <span>WHY THE CARAT THEORY?</span>
              <svg
                className={`rare-chevron ${openSections.why ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openSections.why && (
              <div className="rare-accordion-panel">
                <ul className="rare-links-list">
                  <li>✦ <strong>Lifetime Care &amp; Service Guarantee</strong> &mdash; Complimentary prong tightening, polishing, and stone inspection for life.</li>
                  <li>✦ <strong>100% Conflict-Free Lab Grown Diamonds</strong> &mdash; DEF Color, VVS-VS Clarity certified by IGI &amp; GIA.</li>
                  <li>✦ <strong>Honest Transparent Pricing in USD ($)</strong> &mdash; Pure atelier pricing with complete transparent price breakup.</li>
                  <li>✦ <strong>Insured Global Armored Delivery</strong> &mdash; Tamper-evident luxury packaging with armored escort.</li>
                </ul>
              </div>
            )}
          </div>

          {/* 3. ABOUT */}
          <div className="rare-accordion-item">
            <button
              type="button"
              className="rare-accordion-trigger"
              onClick={() => toggleSection('about')}
            >
              <span>ABOUT</span>
              <svg
                className={`rare-chevron ${openSections.about ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openSections.about && (
              <div className="rare-accordion-panel">
                <ul className="rare-links-list">
                  <li><a href="#about">Our Story &amp; Philosophy</a></li>
                  <li><a href="#about">Master Hand-Setting &amp; Craftsmanship</a></li>
                  <li><a href="#promises">Sustainable Diamond Creation</a></li>
                  <li><a href="#promises">Certified Authenticity &amp; Laser Inscriptions</a></li>
                  <li><button onClick={onOpenLogoGuide} className="rare-plain-link">Brand Identity &amp; Logo System</button></li>
                </ul>
              </div>
            )}
          </div>

          {/* 4. LEARN MORE */}
          <div className="rare-accordion-item">
            <button
              type="button"
              className="rare-accordion-trigger"
              onClick={() => toggleSection('learn')}
            >
              <span>LEARN MORE</span>
              <svg
                className={`rare-chevron ${openSections.learn ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openSections.learn && (
              <div className="rare-accordion-panel">
                <ul className="rare-links-list">
                  <li><a href="#shapes">Diamond 4Cs Education (Cut, Color, Clarity, Carat)</a></li>
                  <li><button onClick={onOpenSizing} className="rare-plain-link">Ring Sizing Guide</button></li>
                  <li><a href="#promises">Terms &amp; Conditions &mdash; Odd Ring Sizes (e.g. 6.5) &amp; Custom Orders Non-Cancellable</a></li>
                  <li><a href="#collection">Gold Purities Guide (18K Solid, 14K, 9K, 925 Silver)</a></li>
                  <li><a href="#promises">Lifetime Care &amp; Service Program</a></li>
                </ul>
              </div>
            )}
          </div>

          {/* 5. POPULAR SEARCHES */}
          <div className="rare-accordion-item">
            <button
              type="button"
              className="rare-accordion-trigger"
              onClick={() => toggleSection('searches')}
            >
              <span>POPULAR SEARCHES</span>
              <svg
                className={`rare-chevron ${openSections.searches ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openSections.searches && (
              <div className="rare-accordion-panel">
                <div className="rare-search-pills">
                  <span onClick={() => scrollToCollection('rings')}>Solitaire Diamond Rings</span>
                  <span onClick={() => scrollToCollection('bracelets')}>Tennis Bracelets</span>
                  <span onClick={() => scrollToCollection('earrings')}>Diamond Stud Earrings</span>
                  <span onClick={() => scrollToCollection('pendants')}>Diamond Pendants</span>
                  <span onClick={() => scrollToCollection(null, 'Oval')}>Oval Cut Diamonds</span>
                  <span onClick={() => scrollToCollection(null, 'Emerald')}>Emerald Cut Diamonds</span>
                  <span onClick={() => scrollToCollection(null, 'Round')}>Round Brilliant Diamonds</span>
                  <span onClick={() => scrollToCollection('nosepins')}>Diamond Nose Pins</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Icons matching Screenshot 2 */}
        <div className="rare-footer-social-row">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rare-social-icon" title="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>

          {/* Pinterest */}
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="rare-social-icon" title="Pinterest">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.18c-.05-.98-.1-2.48.02-3.55l.72-3.06s-.18-.37-.18-.92c0-.86.5-1.5 1.13-1.5.53 0 .79.4.79.88 0 .54-.34 1.34-.52 2.08-.15.62.31 1.13.92 1.13 1.1 0 1.95-1.16 1.95-2.84 0-1.48-1.07-2.52-2.59-2.52-1.77 0-2.8 1.32-2.8 2.69 0 .53.2.1.1.48.05.24.06.33-.03.67-.09.34-.28.47-.48.47-.19 0-.3-.02-.45-.07-1.34-.56-2.18-2.31-2.18-3.72 0-3.03 2.2-5.81 6.35-5.81 3.33 0 5.92 2.38 5.92 5.56 0 3.32-2.09 5.99-5 5.99-.98 0-1.9-.51-2.21-1.11l-.6 2.3c-.22.84-.81 1.9-1.21 2.54A12 12 0 1 0 12 0z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="rare-social-icon" title="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rare-social-icon" title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* Copyright & US Address matching Screenshot 2 */}
        <div className="rare-footer-address-block">
          <p className="rare-copy-line">&copy; 2026 The Carat Theory</p>
          <p className="rare-address-line">2000 Town Center, Southfield MI 48075</p>
        </div>

        {/* Legal Links Row matching Screenshot 2 */}
        <div className="rare-footer-legal-row">
          <div className="rare-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Your Privacy Choices</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
          <p className="rare-savings-note">*Savings based on Comp. value</p>
        </div>
      </div>
    </footer>
  );
};
