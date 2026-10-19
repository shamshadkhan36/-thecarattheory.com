import React, { useState } from 'react';

export const Footer = ({ onOpenSizing, onOpenAppointment, onOpenLogoGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      console.log('Newsletter subscription simulated');
    }

    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-columns">
          {/* Brand Info */}
          <div>
            <img
              src="/assets/logo/the-carat-theory-gold.svg"
              alt="The Carat Theory"
              style={{ height: '48px', marginBottom: '1.25rem' }}
            />
            <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: '#E2C2CB', marginBottom: '1.25rem' }}>
              The Carat Theory represents the pure convergence of optical physics, master diamond craftsmanship, and conflict-free lab engineered stones.
            </p>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-peach)' }}>
              ✦ IGI &amp; GIA Certified · Antwerp &amp; New York
            </div>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h5>Collections</h5>
            <ul>
              <li><a href="#collection">Solitaire Rings</a></li>
              <li><a href="#collection">Three-Stone Rings</a></li>
              <li><a href="#collection">Halo Rings</a></li>
              <li><a href="#collection">Tennis Bracelets</a></li>
              <li><a href="#collection">Everyday Bracelets</a></li>
              <li><a href="#collection">Solitaire Pendants</a></li>
            </ul>
          </div>

          {/* Guides */}
          <div className="footer-col">
            <h5>Guides &amp; Care</h5>
            <ul>
              <li><button onClick={onOpenSizing} style={{ background: 'none', border: 'none', color: '#E2C2CB', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Sizing Guide - Rings</button></li>
              <li><button onClick={onOpenSizing} style={{ background: 'none', border: 'none', color: '#E2C2CB', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Sizing Guide - Bangles</button></li>
              <li><a href="#shapes">Diamond Cut &amp; 4Cs Guide</a></li>
              <li><a href="#promises">Metal &amp; Alloy Guide</a></li>
              <li><a href="#promises">Jewellery Care Guide</a></li>
              <li><button onClick={onOpenLogoGuide} style={{ background: 'none', border: 'none', color: '#FDC656', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>Brand &amp; Logo System</button></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-col">
            <h5>Our Policies</h5>
            <ul>
              <li><a href="#promises">Lifetime Buyback Policy</a></li>
              <li><a href="#promises">Exchange &amp; Upgrade</a></li>
              <li><a href="#promises">Complimentary Insured Shipping</a></li>
              <li><a href="#promises">Return &amp; Refund Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h5>Stay Connected</h5>
            <p style={{ fontSize: '0.85rem', color: '#E2C2CB', marginBottom: '0.75rem' }}>
              Subscribe to receive private invitations to vault releases and a 10% welcome privilege code.
            </p>
            {subscribed ? (
              <div style={{ background: '#3F0C1E', border: '1px solid #73253F', padding: '0.75rem', fontSize: '0.8rem', color: 'var(--c-peach)' }}>
                ✓ Welcome! Use privilege code: <strong>TCT-PRIVILEGE-10</strong>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-box-input">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                />
                <button type="submit" className="btn btn-peach" style={{ padding: '0 1rem', fontSize: '0.75rem' }}>
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; 2026 THE CARAT THEORY (thecarattheory.com). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,243,227,0.1)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem' }}>IGI CERTIFIED</span>
            <span style={{ background: 'rgba(255,243,227,0.1)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem' }}>GIA ALUMNI</span>
            <span style={{ background: 'rgba(255,243,227,0.1)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem' }}>ARMORED DELIVERY</span>
            <span style={{ background: 'rgba(255,243,227,0.1)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem' }}>AMEX</span>
            <span style={{ background: 'rgba(255,243,227,0.1)', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem' }}>APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
