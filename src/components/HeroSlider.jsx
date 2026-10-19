import React, { useState } from 'react';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/assets/hero-banner-exact.png',
      alt: 'Pure Promise Diamonds Fine Jewellery'
    },
    {
      image: '/assets/hero-slide-model2.png',
      alt: 'Pure Promise Diamonds Earrings Editorial'
    }
  ];

  return (
    <section className="hero-slider-section-ref">
      <div className="hero-slide-item-ref">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].alt}
          className="hero-slide-img-ref"
        />
      </div>

      {/* Navigation Arrows on Left and Right (thin stroke matching screenshot 1) */}
      <button
        className="hero-arrow-ref hero-arrow-left"
        onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
        aria-label="Previous Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <button
        className="hero-arrow-ref hero-arrow-right"
        onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
        aria-label="Next Slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </section>
  );
};
