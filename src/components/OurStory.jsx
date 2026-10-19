import React from 'react';

export const OurStory = ({ onOpenLogoGuide }) => {
  return (
    <section className="section-padding our-story-section-ref" id="story">
      <div className="container container-narrow" style={{ textAlign: 'center' }}>
        <h2 className="title-ref" style={{ marginBottom: '2rem' }}>OUR STORY</h2>

        <div className="story-content-ref">
          <p className="story-p-ref">
            At <strong>Pure Promise</strong>, we believe true luxury is born from purity — of design, of values, and of intent. Each piece is crafted with <strong>ethically grown lab diamonds</strong>, combining brilliance with responsibility.<br />
            Our creations reflect a <strong>modern promise</strong>: timeless beauty without compromise on sustainability or conscience.
          </p>

          <p className="story-p-ref" style={{ marginTop: '1.25rem', marginBottom: '2.5rem' }}>
            Because every diamond should shine as purely as the promise it represents.
          </p>
        </div>

        <button onClick={onOpenLogoGuide} className="btn-pill-wine-ref">
          KNOW MORE
        </button>
      </div>
    </section>
  );
};
