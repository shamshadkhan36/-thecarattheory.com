import React from 'react';

export const AnnouncementBar = ({ currentView, onToggleView, onOpenAdmin }) => {
  return (
    <aside className="announcement-bar">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="announcement-text" style={{ textAlign: 'center' }}>
          <span>Free insured express shipping worldwide &middot; Pure USD pricing</span>
        </div>

        <div style={{ position: 'absolute', right: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Admin Panel Link */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: currentView === 'admin' ? '#2563EB' : 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.2rem 0.65rem',
              borderRadius: '20px',
              fontSize: '0.72rem',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Open Atelier Executive Admin Console"
          >
            <span>⚙ Atelier Admin</span>
          </button>

          {/* View Switcher (PDP / Storefront) */}
          {currentView !== 'admin' && onToggleView && (
            <button
              onClick={onToggleView}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                border: 'none',
                padding: '0.2rem 0.65rem',
                borderRadius: '20px',
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title={currentView === 'product' ? 'Switch to Home Storefront' : 'Switch to Product Page'}
            >
              {currentView === 'product' ? '← Storefront' : 'PDP View →'}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
