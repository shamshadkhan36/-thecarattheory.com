import React from 'react';

const FEATURED = [
  {
    name: 'SOLITAIRE',
    image: 'https://purepromisediamonds.com/cdn/shop/collections/20251112_1346_Pink_Gradient_Background_remix_01k9vj4409ekvvwm12jmqkh1b1.png',
    link: '#collection'
  },
  {
    name: 'DESIGNER',
    image: 'https://purepromisediamonds.com/cdn/shop/collections/20251112_1328_Elegant_Diamond_Ring_remix_01k9vh3w7refsvrzhpy9yb157k.png',
    link: '#collection'
  },
  {
    name: 'EVERYDAY',
    image: 'https://purepromisediamonds.com/cdn/shop/collections/45_3_939494e0-e999-4278-93e2-7ebfc5c43ac6.png',
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
