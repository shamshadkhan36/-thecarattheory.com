import React from 'react';

export const OurStory = ({ onOpenLogoGuide }) => {
  return (
    <section className="section-padding our-story-section-ref" id="story">
      <div className="container container-narrow" style={{ textAlign: 'center' }}>
        <h2 className="title-ref" style={{ marginBottom: '1.5rem' }}>OUR STORY</h2>

        <p style={{ fontSize: '0.92rem', lineHeight: '1.85', color: '#333', maxWidth: '780px', margin: '0 auto 1.5rem' }}>
          At <strong>The Carat Theory</strong>, we believe true luxury is born from purity — of design, of values, and of intent. Each piece is crafted with <strong>ethically grown lab diamonds</strong>, combining brilliance with responsibility. Our creations reflect a <strong>modern promise</strong>: timeless beauty without compromise on sustainability or conscience.
        </p>

        <p style={{ fontSize: '0.88rem', color: '#555', fontStyle: 'italic', marginBottom: '2.5rem' }}>
          Because every diamond should shine as purely as the promise it represents.
        </p>

        <button onClick={onOpenLogoGuide} className="btn-pill-wine-ref">
          KNOW MORE
        </button>
      </div>
    </section>
  );
};
