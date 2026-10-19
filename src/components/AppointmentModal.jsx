import React, { useState } from 'react';

export const AppointmentModal = ({ isOpen, onClose, initialSubject = '' }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Virtual Video Consultation (Zoom HD Macro)');
  const [notes, setNotes] = useState(initialSubject);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consultationType: type, notes })
      });
    } catch {
      console.log('Appointment registered locally');
    }
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', padding: '2.5rem' }}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💎</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--c-wine)', margin: '1rem 0 0.5rem' }}>
              Consultation Reserved
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', marginBottom: '1.5rem' }}>
              Thank you, {name}. A dedicated Senior Gemologist has reserved your consultation. You will receive private calendar access and direct Zoom details via email shortly.
            </p>
            <button onClick={onClose} className="btn btn-primary">
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1.25rem', color: 'var(--c-wine)', display: 'block', marginBottom: '0.25rem' }}>
              Private VIP Concierge
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>
              Book An Appointment
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--c-text-muted)', marginBottom: '1.5rem' }}>
              Schedule a one-on-one session with our GIA/IGI-trained diamond specialists to review certified stones under 4K macro magnification.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Consultation Format
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--c-border)', outline: 'none' }}
              >
                <option>Virtual Video Consultation (Zoom HD Macro)</option>
                <option>Private Showroom Viewing (New York Atelier)</option>
                <option>Private Showroom Viewing (Antwerp Atelier)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--c-border)' }}
                  required
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--c-border)' }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Jewel Interest &amp; Custom Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 2.0ct Oval Solitaire in 18k Yellow Gold"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--c-border)' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Confirm Appointment
            </button>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)', fontSize: '0.8rem', color: 'var(--c-text-muted)', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span><strong>Email:</strong> <a href="mailto:concierge@thecarattheory.com" style={{ color: 'var(--c-wine)' }}>concierge@thecarattheory.com</a></span>
                <span><strong>Phone:</strong> +1 (800) 582-0190</span>
              </div>
              <div>
                <strong>Ateliers:</strong> 580 Fifth Ave, New York, NY 10036 &bull; Hoveniersstraat 55, Antwerp
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
