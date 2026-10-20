import React from 'react';
import { SHAPES_DATA } from '../data/products';

export const ShopByShape = ({ onSelectShape }) => {
  const handleShapeClick = (shapeName, e) => {
    e.preventDefault();
    if (onSelectShape) {
      onSelectShape(shapeName);
    }
    const collectionElem = document.getElementById('collection');
    if (collectionElem) {
      collectionElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding shapes-section-ref" id="shapes">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="title-ref">SHOP BY SHAPE</h2>
        </div>

        {/* 8 Shapes Row Matching Reference */}
        <div className="shapes-grid-ref">
          {SHAPES_DATA.map((shape) => (
            <a
              key={shape.name}
              href="#collection"
              onClick={(e) => handleShapeClick(shape.name, e)}
              className="shape-item-ref"
            >
              <div className="shape-stone-img-wrap">
                <img src={shape.image} alt={shape.name} />
              </div>
              <span className="shape-label-ref">{shape.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
