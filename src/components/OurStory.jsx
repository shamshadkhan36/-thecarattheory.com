import React from 'react';

export const OurStory = ({ onOpenLogoGuide }) => {
  return (
    <section className="split-banner ivory-bg" id="story">
      <div className="split-media">
        <img
          src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80"
          alt="Our Story"
        />
      </div>

      <div className="split-content">
        <h2 className="section-title">Our Story</h2>
        <span className="section-subtitle">
          The Theory Behind The Sparkle.
        </span>
        <p className="section-desc" style={{ marginBottom: '1.5rem' }}>
          The Carat Theory was founded on an uncompromising principle: that modern diamond jewellery should embody both the highest physics of light reflection and complete ethical responsibility.
        </p>
        <p className="section-desc" style={{ marginBottom: '2rem' }}>
          By eliminating the environmental destruction and opaque supply chains of traditional mining, we channel 100% of our focus into master craftsmanship, certified Type IIa purity, and direct-to-consumer value that lasts for generations.
        </p>

        <button onClick={onOpenLogoGuide} className="btn btn-outline-wine">
          Know More
        </button>
      </div>
    </section>
  );
};
