import React, { useState } from 'react';
import { BESTSELLER_RINGS } from '../data/products';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';

export const Bestsellers = () => {
  const { currency, formatMoney } = useCurrency();
  const { addToCart } = useCart();

  // State for active metal selection per product
  const [selectedMetals, setSelectedMetals] = useState({
    'ring-kyla': '14K',
    'ring-mabel': '14K',
    'ring-kennedi': '14K',
    'ring-carmen': '14K'
  });

  const [selectedColors, setSelectedColors] = useState({
    'ring-kyla': 'yellow',
    'ring-mabel': 'yellow',
    'ring-kennedi': 'yellow',
    'ring-carmen': 'yellow'
  });

  const handleMetalChange = (id, metal) => {
    setSelectedMetals((prev) => ({ ...prev, [id]: metal }));
  };

  const handleColorChange = (id, color) => {
    setSelectedColors((prev) => ({ ...prev, [id]: color }));
  };

  const formatPrice = (ring) => {
    if (currency === 'INR') {
      return `Rs. ${ring.priceINR.toLocaleString('en-IN')}.00`;
    }
    return formatMoney(ring.priceUSD);
  };

  return (
    <section className="section-padding bestsellers-section-ref" id="collection">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="title-ref">BESTSELLERS</h2>
        </div>

        <div className="bestsellers-grid-ref">
          {BESTSELLER_RINGS.map((ring) => {
            const activeColor = selectedColors[ring.id] || 'yellow';
            const activeMetal = selectedMetals[ring.id] || '14K';
            const currentImg = ring.imagesByColor[activeColor] || ring.image;

            return (
              <div key={ring.id} className="bestseller-card-ref">
                {/* 3D Ring Render on Pure White Canvas */}
                <div className="bestseller-img-wrap-ref">
                  <img src={currentImg} alt={ring.name} />
                </div>

                <div className="bestseller-details-ref">
                  <h4 className="bestseller-title-ref">{ring.name}</h4>
                  <div className="bestseller-price-ref">{formatPrice(ring)}</div>

                  {/* Metal Purity Selector: 925 Silver, 9K, 14K, 18K */}
                  <div className="purity-selector-ref">
                    {ring.metals.map((m) => (
                      <button
                        key={m}
                        className={`purity-btn-ref ${activeMetal === m ? 'active' : ''}`}
                        onClick={() => handleMetalChange(ring.id, m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {/* Metal Color Dots: Yellow, White, Rose */}
                  <div className="color-dots-ref">
                    <button
                      className={`color-dot-ref yellow ${activeColor === 'yellow' ? 'active' : ''}`}
                      onClick={() => handleColorChange(ring.id, 'yellow')}
                      title="Yellow Gold"
                    />
                    <button
                      className={`color-dot-ref silver ${activeColor === 'white' ? 'active' : ''}`}
                      onClick={() => handleColorChange(ring.id, 'white')}
                      title="White Gold / Silver"
                    />
                    <button
                      className={`color-dot-ref rose ${activeColor === 'rose' ? 'active' : ''}`}
                      onClick={() => handleColorChange(ring.id, 'rose')}
                      title="Rose Gold"
                    />
                  </div>

                  <button
                    onClick={() =>
                      addToCart({
                        id: `${ring.id}-${activeMetal}-${activeColor}`,
                        name: ring.name,
                        price: ring.priceUSD,
                        image: currentImg,
                        metal: `${activeMetal} ${activeColor.toUpperCase()}`,
                        carat: '1.50 Carat',
                        certification: 'IGI Certified',
                        qty: 1
                      })
                    }
                    className="btn btn-outline"
                    style={{
                      width: '100%',
                      marginTop: '0.75rem',
                      padding: '0.45rem',
                      fontSize: '0.75rem'
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
