import React, { useState } from 'react';
import { DIAMOND_SHAPES } from '../data/products';

export const ShopByShape = () => {
  const [selectedShape, setSelectedShape] = useState(DIAMOND_SHAPES[0]);

  return (
    <section className="section-padding shapes-section" id="shapes">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Shop by Shape</h2>
        </div>

        {/* Shapes Horizontal Selector */}
        <div className="shapes-row">
          {DIAMOND_SHAPES.slice(0, 8).map((shape) => (
            <div
              key={shape.id}
              className={`shape-card-ref ${selectedShape.id === shape.id ? 'active' : ''}`}
              onClick={() => setSelectedShape(shape)}
            >
              <svg viewBox="0 0 100 100">
                <path d={shape.svgPath} />
              </svg>
              <div className="shape-card-ref-title">{shape.name.split(' ')[0]}</div>
            </div>
          ))}
        </div>

        {/* Selected Shape Detail Box (Peach background #FFF3E3 with Wine Red #55142A borders) */}
        <div className="shape-detail-ref">
          <div className="shape-detail-icon-wrap">
            <svg viewBox="0 0 100 100">
              <path d={selectedShape.svgPath} />
            </svg>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--c-wine)', letterSpacing: '0.12em', display: 'block', marginTop: '0.5rem' }}>
              {selectedShape.facets}
            </span>
          </div>

          <div className="shape-detail-info">
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--c-wine)' }}>
              {selectedShape.tagline}
            </span>
            <h3>{selectedShape.name}</h3>
            <p>{selectedShape.desc}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#collection" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem' }}>
                Explore {selectedShape.name.split(' ')[0]} Jewellery
              </a>
              <a href="#customise" className="btn btn-outline-wine" style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem' }}>
                Design With This Cut
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
