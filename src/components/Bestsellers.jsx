import React, { useState } from 'react';
import { ProductCard } from './ProductCard';

export const Bestsellers = ({ products, onQuickView }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'three-stone') return p.subCategory === 'three-stone';
    if (activeTab === 'solitaire') return p.subCategory === 'solitaire';
    if (activeTab === 'halo') return p.subCategory === 'halo';
    if (activeTab === 'tennis') return p.subCategory === 'tennis';
    if (activeTab === 'earrings') return p.category === 'earrings';
    return true;
  });

  return (
    <section className="section-padding bestsellers-section" id="collection">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Bestsellers</h2>
          <span className="section-subtitle">
            Our Most Coveted Designs, Loved. Worn. Remembered.
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`filter-tab-btn ${activeTab === 'three-stone' ? 'active' : ''}`}
            onClick={() => setActiveTab('three-stone')}
          >
            Three Stone
          </button>
          <button
            className={`filter-tab-btn ${activeTab === 'solitaire' ? 'active' : ''}`}
            onClick={() => setActiveTab('solitaire')}
          >
            Solitaire
          </button>
          <button
            className={`filter-tab-btn ${activeTab === 'halo' ? 'active' : ''}`}
            onClick={() => setActiveTab('halo')}
          >
            Halo
          </button>
          <button
            className={`filter-tab-btn ${activeTab === 'tennis' ? 'active' : ''}`}
            onClick={() => setActiveTab('tennis')}
          >
            Tennis Bracelets
          </button>
          <button
            className={`filter-tab-btn ${activeTab === 'earrings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earrings')}
          >
            Earrings
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
