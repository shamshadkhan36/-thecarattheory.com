import React from 'react';

export const HeroSlider = ({ onOpenAppointment }) => {
  return (
    <section className="hero-slider-section">
      <img
        src="/assets/hero-banner.jpg"
        alt="The Carat Theory Fine Jewellery"
        className="hero-slide-bg"
      />
      <div className="hero-slide-overlay"></div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-slide-content">
          <h1 className="hero-slide-title">
            Lifetime Promises
          </h1>
          <span className="hero-slide-accent">
            Including Our "Lifetime Buyback" Promise.
          </span>
          <p className="hero-slide-desc">
            Mastercrafted certified diamonds engineered for pure brilliance, guaranteed value retention, and conflict-free peace of mind.
          </p>
          <div className="hero-slide-actions">
            <a href="#promises" className="btn btn-outline" style={{ color: '#FFF', borderColor: '#FFF' }}>
              Know More
            </a>
            <a href="#collection" className="btn btn-primary">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
