import React from 'react';
import { CATEGORIES_DATA } from '../data/products';

export const ShopByCategory = ({ onSelectCategory }) => {
  const handleCategoryClick = (catName, e) => {
    e.preventDefault();
    const catId = catName.toLowerCase().replace(/\s+/g, '');
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const collectionElem = document.getElementById('collection');
    if (collectionElem) {
      collectionElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding cat-section-ref">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="eyebrow-ref">CURATED PICKS</span>
          <h2 className="title-ref">SHOP BY CATEGORY</h2>
        </div>

        <div className="cat-cards-grid-ref">
          {CATEGORIES_DATA.map((cat) => (
            <a
              key={cat.name}
              href="#collection"
              onClick={(e) => handleCategoryClick(cat.name, e)}
              className="cat-card-ref"
            >
              <div className="cat-card-img-wrap">
                <img src={cat.image} alt={cat.name} />
              </div>
              <span className="cat-card-label-ref">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
