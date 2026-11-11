import React from 'react';

export const AnnouncementBar = ({ currentView, onToggleView, onOpenAdmin }) => {
  return (
    <aside className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-text">
          <span>Free insured express shipping worldwide &middot; Pure USD pricing</span>
        </div>

        <div className="announcement-actions">
          {/* Admin Panel Link */}
          <button
            onClick={onOpenAdmin}
            className={`announcement-action-btn ${currentView === 'admin' ? 'active-admin' : ''}`}
            title="Open Atelier Executive Admin Console"
          >
            <span>⚙ Admin</span>
          </button>

          {/* View Switcher (PDP / Storefront) */}
          {currentView !== 'admin' && onToggleView && (
            <button
              onClick={onToggleView}
              className="announcement-action-btn"
              title={currentView === 'product' ? 'Switch to Home Storefront' : 'Switch to Product Page'}
            >
              <span>{currentView === 'product' ? '← Store' : 'PDP →'}</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
