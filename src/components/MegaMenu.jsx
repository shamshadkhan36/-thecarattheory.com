import React from 'react';

export const GOLD_MEGA_MENU = [
  {
    title: 'Rings',
    category: 'rings',
    image: '/assets/products/tct-three-stone-yellow.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Rings', category: 'rings', link: '#collection' },
      { name: 'Solitaire Rings', category: 'rings', link: '#collection' },
      { name: 'Three Stone Rings', category: 'rings', link: '#collection' },
      { name: 'Two Stone Rings', category: 'rings', link: '#collection' },
      { name: 'Halo Rings', category: 'rings', link: '#collection' },
      { name: 'Eternity Bands', category: 'rings', link: '#collection' }
    ]
  },
  {
    title: 'Earrings',
    category: 'earrings',
    image: '/assets/tct-category-earrings.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Earrings', category: 'earrings', link: '#collection' },
      { name: 'Hoops', category: 'earrings', link: '#collection' },
      { name: 'Solitaire Earrings', category: 'earrings', link: '#collection' },
      { name: 'Drop & Danglers', category: 'earrings', link: '#collection' },
      { name: 'Studs', category: 'earrings', link: '#collection' }
    ]
  },
  {
    title: 'Bracelets',
    category: 'bracelets',
    image: '/assets/products/tct-tennis-bracelet.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Bangles & Bracelets', category: 'bracelets', link: '#collection' },
      { name: 'Tennis Bracelets', category: 'bracelets', link: '#collection' },
      { name: 'Everyday Wear Bracelets', category: 'bracelets', link: '#collection' }
    ]
  },
  {
    title: 'Pendants',
    category: 'pendants',
    image: '/assets/products/tct-solitaire-ring.jpg',
    link: '#collection',
    sublinks: [
      { name: 'All Pendants', category: 'pendants', link: '#collection' },
      { name: 'Solitaire Pendants', category: 'pendants', link: '#collection' },
      { name: 'Everyday Wear Pendants', category: 'pendants', link: '#collection' }
    ]
  },
  {
    title: 'Necklaces',
    category: 'necklaces',
    image: '/assets/products/tct-tennis-necklace.jpg',
    link: '#collection',
    sublinks: []
  },
  {
    title: 'Nosepins',
    category: 'nosepins',
    image: '/assets/products/tct-three-stone-rose.jpg',
    link: '#collection',
    sublinks: []
  }
];

export const SILVER_MEGA_MENU = [
  {
    title: 'Rings',
    category: 'rings',
    image: '/assets/products/tct-three-stone-white.jpg',
    link: '#collection'
  },
  {
    title: 'Earrings',
    category: 'earrings',
    image: '/assets/tct-category-earrings.jpg',
    link: '#collection'
  },
  {
    title: 'Bracelets',
    category: 'bracelets',
    image: '/assets/products/tct-tennis-bracelet.jpg',
    link: '#collection'
  },
  {
    title: 'Pendants',
    category: 'pendants',
    image: '/assets/products/tct-three-stone-white.jpg',
    link: '#collection'
  },
  {
    title: 'Necklaces',
    category: 'necklaces',
    image: '/assets/products/tct-tennis-necklace.jpg',
    link: '#collection'
  }
];

export const MegaMenu = ({ type, onClose, onSelectCategory }) => {
  if (!type) return null;

  const handleItemClick = (catId) => {
    onClose();
    if (onSelectCategory && catId) {
      onSelectCategory(catId);
    }
    const collectionElem = document.getElementById('collection');
    if (collectionElem) {
      collectionElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                  {/* Top Category Image */}
                  <a
                    href="#collection"
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(col.category);
                    }}
                    className="mega-img-box-gold"
                  >
                    <img src={col.image} alt={col.title} />
                  </a>

                  {/* Category Title */}
                  <a
                    href="#collection"
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(col.category);
                    }}
                    className="mega-col-title"
                  >
                    {col.title}
                  </a>

                  {/* Sublinks list */}
                  {col.sublinks && col.sublinks.length > 0 && (
                    <ul className="mega-sublinks-list">
                      {col.sublinks.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href="#collection"
                            onClick={(e) => {
                              e.preventDefault();
                              handleItemClick(sub.category || col.category);
                            }}
                          >
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
                  href="#collection"
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(col.category);
                  }}
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
