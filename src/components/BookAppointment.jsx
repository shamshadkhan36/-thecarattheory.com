import React from 'react';

export const BookAppointment = ({ onOpenAppointment }) => {
  return (
    <section className="split-banner reverse peach-bg" id="appointment">
      <div className="split-media">
        <img
          src="/assets/products/tct-ring-hand-model.jpg"
          alt="The Carat Theory Private Appointment"
        />
      </div>

      <div className="split-content">
        <h2 className="section-title">Book An Appointment</h2>
        <span className="section-subtitle">
          Personalized VIP Diamond Concierge.
        </span>
        <p className="section-desc" style={{ marginBottom: '1.75rem', color: '#4A1B28' }}>
          Schedule a one-on-one virtual consultation or private boutique viewing. Inspect live stones with 4K macro magnification, compare color grades, and receive expert diamond guidance with zero sales pressure.
        </p>

        <ul style={{ listStyle: 'none', marginBottom: '2rem', fontSize: '0.9rem', color: '#5A2A38' }}>
          <li style={{ marginBottom: '0.6rem' }}>✓ <strong>Virtual Zoom Consultation:</strong> Direct stone comparison with high-resolution macro cameras</li>
          <li style={{ marginBottom: '0.6rem' }}>✓ <strong>In-Person Suites:</strong> Antwerp &amp; New York Diamond District showrooms</li>
          <li>✓ <strong>Complimentary Ring Sizing Kit:</strong> Shipped to your home worldwide</li>
        </ul>

        <button onClick={() => onOpenAppointment && onOpenAppointment()} className="btn btn-primary">
          Book Now
        </button>
      </div>
    </section>
  );
};
