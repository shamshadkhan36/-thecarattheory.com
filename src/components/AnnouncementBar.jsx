import React from 'react';

export const AnnouncementBar = () => {
  return (
    <aside className="announcement-bar">
      <div className="announcement-text">
        <span>Free shipping On All diamond jewellery</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span>Lifetime Buyback Guarantee</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <a href="#collection">Shop Now</a>
      </div>
    </aside>
  );
};
