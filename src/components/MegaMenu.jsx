import React from 'react';

export const GOLD_MEGA_MENU = [
  {
    title: 'Rings',
    image: '/assets/products/tct-three-stone-yellow.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Rings', link: '#collection' },
      { name: 'Solitaire Rings', link: '#collection' },
      { name: 'Three Stone Rings', link: '#collection' },
      { name: 'Two Stone Rings', link: '#collection' },
      { name: 'Halo Rings', link: '#collection' },
      { name: 'Eternity Bands', link: '#collection' }
    ]
  },
  {
    title: 'Earrings',
    image: '/assets/tct-category-earrings.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Earrings', link: '#collection' },
      { name: 'Hoops', link: '#collection' },
      { name: 'Solitaire Earrings', link: '#collection' },
      { name: 'Drop & Danglers', link: '#collection' },
      { name: 'Studs', link: '#collection' }
    ]
  },
  {
    title: 'Bracelets',
    image: '/assets/products/tct-tennis-bracelet.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Bangles & Bracelets', link: '#collection' },
      { name: 'Tennis Bracelets', link: '#collection' },
      { name: 'Everyday Wear Bracelets', link: '#collection' }
    ]
  },
  {
    title: 'Pendants',
    image: '/assets/products/tct-solitaire-ring.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Pendants', link: '#collection' },
      { name: 'Solitaire Pendants', link: '#collection' },
      { name: 'Everyday Wear Pendants', link: '#collection' }
    ]
  },
  {
    title: 'Necklaces',
    image: '/assets/products/tct-tennis-necklace.jpg',
    link: '#collection',
    sublinks: []
  },
  {
    title: 'Nosepins',
    image: '/assets/products/tct-three-stone-rose.jpg',
    link: '#collection',
    sublinks: []
  }
];

export const SILVER_MEGA_MENU = [
  {
    title: 'Rings',
    image: '/assets/products/tct-three-stone-white.jpg',
    link: '#collection'
  },
  {
    title: 'Earrings',
    image: '/assets/tct-category-earrings.jpg',
    link: '#collection'
  },
  {
    title: 'Bracelets',
    image: '/assets/products/tct-tennis-bracelet.jpg',
    link: '#collection'
  },
  {
    title: 'Pendants',
    image: '/assets/products/tct-three-stone-white.jpg',
    link: '#collection'
  },
  {
    title: 'Necklaces',
    image: '/assets/products/tct-tennis-necklace.jpg',
    link: '#collection'
  }
];

export const MegaMenu = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="mega-menu-wrapper"
      onMouseLeave={onClose}
    >
      <div className="mega-menu-content">
        <div className="container">
          {type === 'gold' && (
            <div className="mega-menu-gold-grid">
              {GOLD_MEGA_MENU.map((col) => (
                <div key={col.title} className="mega-menu-col">
                  {/* Top Category Image on dark maroon studio background */}
                  <a href={col.link} onClick={onClose} className="mega-img-box-gold">
                    <img src={col.image} alt={col.title} />
                  </a>

                  {/* Category Title */}
                  <a href={col.link} onClick={onClose} className="mega-col-title">
                    {col.title}
                  </a>

                  {/* Sublinks list */}
                  {col.sublinks && col.sublinks.length > 0 && (
                    <ul className="mega-sublinks-list">
                      {col.sublinks.map((sub) => (
                        <li key={sub.name}>
                          <a href={sub.link} onClick={onClose}>
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {type === 'silver' && (
            <div className="mega-menu-silver-grid">
              {SILVER_MEGA_MENU.map((col) => (
                <a
                  key={col.title}
                  href={col.link}
                  onClick={onClose}
                  className="mega-menu-silver-item"
                >
                  <div className="mega-img-box-silver">
                    <img src={col.image} alt={col.title} />
                  </div>
                  <span className="mega-silver-label">{col.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
