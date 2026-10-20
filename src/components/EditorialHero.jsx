import React from 'react';

export const EditorialHero = ({ onShopRings, onShopJewelry, onSelectProduct }) => {
  const spotlightItems = [
    {
      id: 'spotlight-1',
      title: 'Virelia Lab Ring',
      image: '/assets/spotlight-ring-1.jpg',
      category: 'rings',
      shape: 'Round'
    },
    {
      id: 'spotlight-2',
      title: 'Midnight Noir Hoops',
      image: '/assets/spotlight-hoops.jpg',
      category: 'earrings',
      shape: 'Round'
    },
    {
      id: 'spotlight-3',
      title: 'Sculpted C-Prong Pavé Ring',
      image: '/assets/spotlight-ring-2.jpg',
      category: 'rings',
      shape: 'Round'
    }
  ];

  const handleSpotlightClick = (item) => {
    if (onSelectProduct) {
      onSelectProduct({
        id: item.id,
        name: item.title,
        priceUSD: 1450,
        pricesByPurity: {
          '925 Silver': 380,
          '9K': 890,
          '14K': 1180,
          '18K': 1450
        },
        metals: ['925 Silver', '9K', '14K', '18K'],
        colors: [
          { id: 'yellow', name: 'Yellow Gold', hex: '#F2C94C', imageIndex: 0 },
          { id: 'white', name: 'White Gold', hex: '#C4C4C4', imageIndex: 0 },
          { id: 'rose', name: 'Rose Gold', hex: '#E08E88', imageIndex: 0 }
        ],
        image: item.image,
        images: [{ src: item.image, alt: item.title, isVideo: false }],
        category: item.category,
        categoryLabel: item.category === 'rings' ? 'Rings' : 'Earrings',
        shape: item.shape,
        description: `${item.title} showcases master craftsmanship with exceptional DEF/VVS lab-grown diamonds set in 18k solid gold. Covered by our Lifetime Care & Service Guarantee.`,
        details: [
          { label: 'Metal Purity', value: '18K Solid Gold / 14K / 9K / 925 Sterling Silver' },
          { label: 'Diamond Color & Clarity', value: 'DEF Color · VVS-VS Clarity' },
          { label: 'Diamond Cut', value: 'Excellent / Ideal (Hearts & Arrows)' },
          { label: 'Warranty & Care', value: 'Lifetime Care & Service Guarantee' }
        ],
        priceBreakup: [
          { item: 'Precious Metal Value', amount: '$460' },
          { item: 'Certified Lab Diamonds (DEF / VVS)', amount: '$850' },
          { item: 'Master Hand-Setting', amount: '$115' },
          { item: 'Insured Armored Express Delivery', amount: '$25' },
          { item: 'Total Selling Price', amount: '$1,450', highlight: true }
        ],
        shippingInfo: 'Complimentary insured express delivery in 3-5 business days worldwide. Odd ring sizes (e.g. 6.5) and bespoke orders are non-cancellable. Covered by our Lifetime Care & Service Guarantee.'
      });
    } else if (onShopRings) {
      onShopRings();
    }
  };

  return (
    <section className="editorial-hero-theme">
      {/* Background Model Image with Gradient Fade */}
      <div className="editorial-hero-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/editorial-model-original.jpg" />
          <img
            src="/assets/editorial-hero-banner.jpg"
            alt="The Carat Theory High Jewelry Collection"
            className="editorial-hero-img"
          />
        </picture>
        <div className="editorial-hero-gradient-overlay" />
      </div>

      {/* Floating Foreground Content matching Screenshot 1 */}
      <div className="editorial-hero-content-wrapper">
        <div className="container editorial-hero-container">
          <div className="editorial-hero-text-block">
            <span className="editorial-eyebrow">THE</span>
            <h1 className="editorial-main-title">
              CHRISTIAN SIRIANO
            </h1>
            <span className="editorial-sub-title">COLLECTION</span>
            <p className="editorial-description">
              The debut jewelry collection by Project Runway&reg; designer Christian Siriano for The Carat Theory.
            </p>
          </div>

          {/* 3 Horizontal Spotlight Cards on Velvet */}
          <div className="editorial-spotlight-cards">
            {spotlightItems.map((item) => (
              <div
                key={item.id}
                className="editorial-spotlight-card"
                onClick={() => handleSpotlightClick(item)}
                title={`Explore ${item.title}`}
              >
                <div className="editorial-spotlight-img-box">
                  <img src={item.image} alt={item.title} />
                </div>
                <span className="editorial-spotlight-label">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Dual Rounded Pill Buttons matching Screenshot 1 */}
          <div className="editorial-hero-actions">
            <button
              type="button"
              onClick={onShopRings}
              className="editorial-pill-btn"
            >
              Shop rings
            </button>
            <button
              type="button"
              onClick={onShopJewelry}
              className="editorial-pill-btn"
            >
              Shop jewelry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
