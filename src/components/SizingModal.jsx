import React from 'react';

export const SizingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '2.5rem' }}>
        <button className="modal-close-corner" onClick={onClose}>&times;</button>

        <span style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--c-wine)', display: 'block', marginBottom: '0.25rem' }}>
          Precision Fit Guide
        </span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>
          International Ring Size Conversion
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-text-muted)', marginBottom: '1.5rem' }}>
          Every bespoke ring from The Carat Theory includes one complimentary resize within 60 days of delivery. Refer to our millimeter chart below for precise fit:
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ background: 'var(--c-peach)', borderBottom: '2px solid rgba(85,20,42,0.2)' }}>
              <th style={{ padding: '0.65rem', color: 'var(--c-wine)' }}>Inside Diameter</th>
              <th style={{ padding: '0.65rem', color: 'var(--c-wine)' }}>US &amp; Canada</th>
              <th style={{ padding: '0.65rem', color: 'var(--c-wine)' }}>UK &amp; Australia</th>
              <th style={{ padding: '0.65rem', color: 'var(--c-wine)' }}>EU &amp; Germany</th>
              <th style={{ padding: '0.65rem', color: 'var(--c-wine)' }}>Japan</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>15.7 mm</td><td>5</td><td>J 1/2</td><td>49</td><td>9</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>16.1 mm</td><td>5.5 (Odd)</td><td>L</td><td>50.5</td><td>10.5</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>16.5 mm</td><td>6</td><td>M</td><td>52</td><td>12</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)', backgroundColor: 'rgba(255, 243, 227, 0.4)', fontWeight: '600' }}><td style={{ padding: '0.5rem' }}>16.9 mm</td><td>6.5 (Usual Standard)</td><td>N</td><td>53</td><td>13</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>17.3 mm</td><td>7</td><td>O</td><td>54</td><td>14</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>17.7 mm</td><td>7.5 (Odd)</td><td>P</td><td>55.5</td><td>15</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>18.1 mm</td><td>8</td><td>Q</td><td>57</td><td>16</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>18.5 mm</td><td>8.5 (Odd)</td><td>R</td><td>58</td><td>17</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>19.0 mm</td><td>9</td><td>S</td><td>59</td><td>18</td></tr>
            <tr style={{ borderBottom: '1px solid var(--c-border)' }}><td style={{ padding: '0.5rem' }}>19.8 mm</td><td>10</td><td>T 1/2</td><td>62</td><td>20</td></tr>
          </tbody>
        </table>

        <div style={{ background: '#FFF8F6', border: '1px solid #F5D3CE', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: '#55142A', marginBottom: '1.5rem', lineHeight: '1.45' }}>
          <strong>T&amp;C Notice:</strong> Odd / half ring sizes (such as 6.5) and custom orders are crafted exclusively to client specifications and carry a strict <strong>No Cancellation &amp; Non-Refundable Policy</strong> once production has commenced.
        </div>

        <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
          Close Guide
        </button>
      </div>
    </div>
  );
};
