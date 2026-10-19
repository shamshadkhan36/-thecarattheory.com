import React, { useState } from 'react';

const FAQS = [
  {
    q: 'What is the return policy?',
    a: 'We offer a 15-day return and exchange policy on all unworn, unaltered diamond jewellery accompanied by original security tags, certification, and packaging.'
  },
  {
    q: 'Are any purchases final sale?',
    a: 'Custom bespoke creations made to unique client specifications and engraved items are final sale, but remain fully eligible for our Lifetime Buyback Guarantee.'
  },
  {
    q: 'When will I get my order?',
    a: 'Ready-to-ship designs arrive in 3-5 business days via fully insured courier. Made-to-order pieces take approximately 10-14 business days from crafting to doorstep delivery.'
  },
  {
    q: 'Where are your products manufactured?',
    a: 'All pieces are cast and hand-set in our state-of-the-art atelier by master artisans utilizing recycled gold, 925 sterling silver, and ethically grown Type IIa diamonds.'
  },
  {
    q: 'How much does shipping cost?',
    a: 'We offer 100% Free, Fully Insured Shipping on all orders across India and globally.'
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
