import React from 'react';

const PROMISES = [
  {
    title: 'LIFETIME BUYBACK',
    subtitle: 'A Policy, made for you.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55142A" strokeWidth="1.6">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    title: 'CERTIFIED JEWELRY',
    subtitle: 'Pure. Promise. Certified.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55142A" strokeWidth="1.6">
        <polygon points="6 3 18 3 22 9 12 22 2 9" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <polyline points="10 3 12 9 14 3" />
      </svg>
    )
  },
  {
    title: 'FREE SHIPPING',
    subtitle: 'Pure Service. Promised Delivery.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55142A" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  },
  {
    title: 'EXCHANGE & UPGRADE',
    subtitle: 'Pure Flexibility. With a promise to evolve.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55142A" strokeWidth="1.6">
        <polyline points="17 11 21 7 17 3" />
        <line x1="21" y1="7" x2="9" y2="7" />
        <polyline points="7 13 3 17 7 21" />
        <line x1="3" y1="17" x2="15" y2="17" />
      </svg>
    )
  },
  {
    title: 'SUSTAINABLE & ECO-FRIENDLY',
    subtitle: 'Pure materials, with a promise of responsibility.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55142A" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    )
  }
];

export const OurPromise = () => {
  return (
    <section className="promise-banner-ref" id="promises">
      <div className="container">
        <h2 className="promise-title-ref">OUR PROMISE</h2>

        <div className="promise-grid-ref">
          {PROMISES.map((item) => (
            <div key={item.title} className="promise-item-ref">
              <div className="promise-icon-ref">{item.icon}</div>
              <h4 className="promise-name-ref">{item.title}</h4>
              <p className="promise-sub-ref">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
