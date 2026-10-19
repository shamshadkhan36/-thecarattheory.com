import React from 'react';

const COLLECTIONS = [
  {
    name: 'SOLITAIRE',
    subtitle: 'Timeless Icons of Solitary Fire',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    link: '#collection'
  },
  {
    name: 'DESIGNER',
    subtitle: 'Contemporary Haute Joaillerie Masterworks',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=800&q=80',
    link: '#collection'
  },
  {
    name: 'EVERYDAY',
    subtitle: 'Effortless Diamond Radiance for Daily Wear',
    image: 'https://images.unsplash.com/photo-1611591475152-47354c030386?auto=format&fit=crop&w=800&q=80',
    link: '#collection'
  }
];

export const FeaturedCollections = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-white)' }}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Featured Collections</h2>
        </div>

        <div className="featured-colls-grid">
          {COLLECTIONS.map((coll) => (
            <a key={coll.name} href={coll.link} className="coll-card">
              <img src={coll.image} alt={coll.name} />
              <div className="coll-card-overlay">
                <h3 className="coll-card-title">{coll.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#FFF', marginBottom: '1rem', opacity: 0.9 }}>
                  {coll.subtitle}
                </p>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--c-peach)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  Explore Collection →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
