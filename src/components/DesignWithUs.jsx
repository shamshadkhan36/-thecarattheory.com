import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

export const DesignWithUs = ({ onOpenAppointment }) => {
  const { formatMoney } = useCurrency();
  const [setting, setSetting] = useState('Classic Four-Prong Solitaire');
  const [settingPrice, setSettingPrice] = useState(750);
  const [shape, setShape] = useState('Round');
  const [carat, setCarat] = useState(2.0);
  const [caratPrice, setCaratPrice] = useState(1800);
  const [metal, setMetal] = useState('18K Yellow Gold');
  const [metalPrice, setMetalPrice] = useState(0);

  const total = settingPrice + caratPrice + metalPrice;

  return (
    <section className="split-banner ivory-bg" id="customise">
      <div className="split-media">
        <img
          src="/assets/brand-identity-mockup.jpg"
          alt="The Carat Theory Bespoke Atelier"
        />
      </div>

      <div className="split-content">
        <h2 className="section-title">Design With Us</h2>
        <span className="section-subtitle">
          From A Dream To A Masterpiece.
        </span>
        <p className="section-desc" style={{ marginBottom: '1.75rem' }}>
          Collaborate directly with our senior diamond setters to design your bespoke engagement ring or fine jewelry piece, cut to optical tolerances measured in fractions of a millimeter.
        </p>

        {/* Quick Interactive Configurator */}
        <div style={{ background: '#FFF', border: '1px solid var(--c-border)', padding: '1.5rem', marginBottom: '1.75rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', color: 'var(--c-wine)' }}>
              1. Choose Setting Style
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { name: 'Classic Solitaire', price: 750 },
                { name: 'Hidden Halo', price: 1050 },
                { name: 'Three-Stone Tribute', price: 1350 }
              ].map((s) => (
                <button
                  key={s.name}
                  onClick={() => { setSetting(s.name); setSettingPrice(s.price); }}
                  style={{
                    background: setting === s.name ? 'var(--c-wine)' : 'transparent',
                    color: setting === s.name ? 'var(--c-peach)' : 'var(--c-dark)',
                    border: '1px solid var(--c-border)',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer'
                  }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', color: 'var(--c-wine)' }}>
              2. Center Diamond (Carat &amp; Shape)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { label: '1.50 ct', val: 1.5, p: 1350 },
                { label: '2.00 ct', val: 2.0, p: 1800 },
                { label: '3.00 ct', val: 3.0, p: 3200 }
              ].map((c) => (
                <button
                  key={c.label}
                  onClick={() => { setCarat(c.val); setCaratPrice(c.p); }}
                  style={{
                    background: carat === c.val ? 'var(--c-wine)' : 'transparent',
                    color: carat === c.val ? 'var(--c-peach)' : 'var(--c-dark)',
                    border: '1px solid var(--c-border)',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--c-border)', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>Estimated Investment:</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--c-wine)' }}>
              {formatMoney(total)}
            </span>
          </div>
        </div>

        <button
          onClick={() => onOpenAppointment && onOpenAppointment(`Custom Bespoke Ring: ${setting} with ${carat}ct center stone`)}
          className="btn btn-primary"
        >
          Start Now
        </button>
      </div>
    </section>
  );
};
