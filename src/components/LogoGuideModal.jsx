import React from 'react';

export const LogoGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '980px', padding: '3rem' }}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--c-wine)', display: 'block', marginBottom: '0.25rem' }}>
          Brand Identity &amp; Master Logo System
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '1rem' }}>
          THE CARAT THEORY (thecarattheory.com)
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--c-text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
          Engineered with mathematical precision and 100% original intellectual property to protect your business from copyright claims while matching the luxury allure of world-class diamond ateliers.
        </p>

        {/* Physical Mockup Display */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--c-peach)', padding: '2rem', marginBottom: '2.5rem', border: '1px solid rgba(85,20,42,0.2)' }}>
          <img src="/assets/brand-identity-mockup.jpg" alt="Physical Mockup" style={{ border: '1px solid rgba(85,20,42,0.2)' }} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--c-wine)', marginBottom: '0.75rem' }}>
              Haute Packaging &amp; Certificate
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#4A1B28', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              Matte black and cream velvet ring presentation box gold-foil embossed with <strong>THE CARAT THEORY</strong> and the 58-facet diamond emblem, paired with an official Certificate of Authenticity card.
            </p>
            <a href="/assets/brand-identity-mockup.jpg" download className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem' }}>
              Download Mockup (JPG)
            </a>
          </div>
        </div>

        {/* Logo Lockups Grid */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--c-wine)' }}>
          Vector SVG Logo Suite
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ border: '1px solid var(--c-border)', padding: '1.5rem', textAlign: 'center', background: '#FFF' }}>
            <img src="/assets/logo/logo-primary.svg" alt="Primary Logo" style={{ maxHeight: '70px', margin: '1rem auto' }} />
            <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', marginTop: '1rem' }}>Primary Horizontal (Light)</h5>
            <a href="/assets/logo/logo-primary.svg" download className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem', marginTop: '0.75rem' }}>
              Download SVG
            </a>
          </div>

          <div style={{ border: '1px solid rgba(85,20,42,0.3)', padding: '1.5rem', textAlign: 'center', background: 'var(--c-wine)' }}>
            <img src="/assets/logo/logo-gold-dark.svg" alt="Gold Dark Logo" style={{ maxHeight: '70px', margin: '1rem auto' }} />
            <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--c-peach)', marginTop: '1rem' }}>Champagne Gold (Dark)</h5>
            <a href="/assets/logo/logo-gold-dark.svg" download className="btn btn-peach" style={{ fontSize: '0.75rem', padding: '0.35rem 0.8rem', marginTop: '0.75rem' }}>
              Download SVG
            </a>
          </div>
        </div>

        {/* IP Protection Matrix */}
        <div style={{ background: '#FFF', border: '1px solid #10B981', borderLeft: '4px solid #10B981', padding: '1.5rem', marginBottom: '2rem' }}>
          <h4 style={{ color: '#065F46', marginBottom: '0.5rem' }}>
            ✓ 100% Protected Against Copyright &amp; Trademark Infringement
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: '1.6' }}>
            The Carat Theory uses original vector geometry, bespoke typographic lockups, unique diamond shape narratives, and proprietary copywriting, giving your client complete intellectual property protection.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <a href="/logo-guide.html" target="_blank" rel="noreferrer" className="btn btn-outline-wine">
            Open Standalone Brand Portal ↗
          </a>
          <button onClick={onClose} className="btn btn-primary">
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};
