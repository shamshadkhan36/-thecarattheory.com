import React from 'react';

const FEATURED = [
  {
    name: 'SOLITAIRE',
    image: '/assets/products/tct-solitaire-ring.jpg',
    link: '#collection'
  },
  {
    name: 'DESIGNER',
    image: '/assets/products/tct-three-stone-yellow.jpg',
    link: '#collection'
  },
  {
    name: 'EVERYDAY',
    image: '/assets/products/tct-tennis-bracelet.jpg',
    link: '#collection'
  }
];

export const FeaturedCollections = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-white)', paddingTop: '0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow-ref">TRENDING COLLECTIONS</span>
          <h2 className="title-ref">FEATURED COLLECTIONS</h2>
        </div>

        <div className="featured-grid-ref">
          {FEATURED.map((f) => (
            <a key={f.name} href={f.link} className="featured-card-ref">
              <div className="featured-img-wrap">
                <img src={f.image} alt={f.name} />
              </div>
              <h3 className="featured-card-title">{f.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
