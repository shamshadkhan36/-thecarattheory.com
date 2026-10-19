import React from 'react';

export const AnnouncementBar = ({ currentView, onToggleView }) => {
  return (
    <aside className="announcement-bar">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="announcement-text" style={{ textAlign: 'center' }}>
          <span>Free shipping On All diamond jewellery</span>
        </div>
        {onToggleView && (
          <button
            onClick={onToggleView}
            style={{
              position: 'absolute',
              right: '1rem',
              background: 'rgba(85, 20, 42, 0.9)',
              color: '#FFF',
              border: 'none',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.74rem',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'background 0.2s'
            }}
            title={currentView === 'product' ? 'Switch to Home Storefront' : 'Switch to Product Page'}
          >
            {currentView === 'product' ? '← Home Storefront' : 'Product Page (PDP) →'}
          </button>
        )}
      </div>
    </aside>
  );
};

