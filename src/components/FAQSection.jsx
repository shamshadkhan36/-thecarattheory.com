import React, { useState } from 'react';

const FAQS = [
  {
    q: 'What is the return & cancellation policy?',
    a: 'We offer a 15-day return policy on standard, unworn, unaltered diamond jewellery accompanied by original security tags, certification, and packaging. Please note: Odd ring sizes (e.g., 6.5 standard, half sizes) and custom bespoke orders are made exclusively to order and carry a strict no-cancellation / non-refundable policy.'
  },
  {
    q: 'Are odd ring sizes and custom orders eligible for cancellation?',
    a: 'No. Odd ring sizes (e.g., 6.5, 7.5, etc.) and bespoke custom creations are crafted specifically to client specifications and cannot be cancelled or returned once casting commences. However, they remain fully covered by our Lifetime Care & Service Guarantee.'
  },
  {
    q: 'What does your Lifetime Care & Service Guarantee include?',
    a: 'Every fine jewellery piece from The Carat Theory comes with complimentary lifetime servicing, including annual ultrasonic cleaning, claw prong inspections and tightening, rhodium polishing, and lifetime authenticity support.'
  },
  {
    q: 'Where are your diamonds sourced and certified?',
    a: 'All pieces are handset with ethically engineered, conflict-free Type IIa lab diamonds authenticated by premier international gemological laboratories (IGI and GIA) with laser-inscribed girdle certifications.'
  },
  {
    q: 'How much does shipping cost and how long does it take?',
    a: 'We offer 100% Free, Fully Insured Worldwide Express Shipping via secured armored transport. Ready designs arrive in 3-5 business days, and made-to-order creations take 10-14 business days.'
  }
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="section-padding faq-section-ref" style={{ backgroundColor: '#FFF' }}>
      <div className="container container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h3 className="title-ref" style={{ fontSize: '2.4rem', fontWeight: 400 }}>
            Frequently asked questions
          </h3>
        </div>

        <div className="faq-wrap-ref">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={faq.q} className="faq-card-ref">
                <button
                  className="faq-btn-ref"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                >
                  <span className="faq-q-text-ref">{faq.q}</span>
                  <span className="faq-plus-icon-ref">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-content-ref">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
