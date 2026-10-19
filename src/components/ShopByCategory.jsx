import React from 'react';

const CATEGORIES = [
  { name: 'RINGS', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80', link: '#collection' },
  { name: 'EARRINGS', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80', link: '#collection' },
  { name: 'BRACELETS', image: 'https://images.unsplash.com/photo-1611591475152-47354c030386?auto=format&fit=crop&w=700&q=80', link: '#collection' },
  { name: 'PENDANTS', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=80', link: '#collection' },
  { name: 'NOSEPINS', image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80', link: '#collection' },
  { name: 'NECKLACE', image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=700&q=80', link: '#collection' }
];

export const ShopByCategory = ({ onSelectCategory }) => {
  return (
    <section className="section-padding categories-section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Shop by Category</h2>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={cat.link}
              onClick={() => onSelectCategory && onSelectCategory(cat.name.toLowerCase())}
              className="cat-box"
            >
              <div className="cat-img-wrap">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3 className="cat-box-title">{cat.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
