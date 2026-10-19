import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Are your diamonds real authentic diamonds?',
    a: 'Yes, absolutely. Optically, chemically, and physically, our lab-grown diamonds are identical to mined diamonds. They are pure crystallized carbon, rated 10 on the Mohs hardness scale, and are accompanied by independent gemological certification from IGI or GIA.'
  },
  {
    q: 'How does the Lifetime Buyback Policy work?',
    a: 'We offer full transparency and value security. You can trade in or upgrade your diamond jewelry at any time for up to 100% store credit toward a larger stone or new design, or opt for cash buyback as outlined in your Certificate of Authenticity.'
  },
  {
    q: 'How are the orders shipped?',
    a: 'All orders are shipped via insured, priority armored couriers (such as FedEx Priority or Brinks). Packages arrive in completely discreet unmarked exterior cartons to prevent theft, requiring an adult signature upon delivery.'
  },
  {
    q: 'What if my ring needs resizing?',
    a: 'We offer one complimentary ring resize within 60 days of delivery, including prepaid insured return shipping. You can also view our international ring sizing chart or request a free plastic ring sizer in the mail.'
  },
  {
    q: 'Can I design a custom piece from scratch?',
    a: 'Yes! Our "Design With Us" bespoke service pairs you directly with our senior gemologists and 3D CAD team to produce a one-of-a-kind ring, necklace, or bracelet from your sketches or reference photos.'
  }
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-white)' }}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Frequently asked questions</h2>
        </div>

        <div className="faq-wrap">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={faq.q} className="faq-card">
                <button
                  className="faq-btn"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--c-wine)'
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="faq-content">
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
