import React from 'react';

const PROMISES = [
  {
    title: 'LIFETIME BUYBACK',
    subtitle: 'A Policy, made for you.',
    desc: 'Our signature guarantee ensures your investment is backed by lifetime buyback and full upgrade value retention.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 4v6h-6M1 20v-6h6" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    )
  },
  {
    title: 'CERTIFIED JEWELRY',
    subtitle: 'Pure. Certified. Provenance.',
    desc: 'Every diamond is independently evaluated by IGI or GIA, complete with a serial laser inscription on the girdle.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: 'FREE SHIPPING',
    subtitle: 'Pure Service. Promised Delivery.',
    desc: 'Fully insured, armored express delivery directly to your hands in unmarked, tamper-evident luxury presentation packaging.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    desc: 'Evolve your diamond with life milestones. Enjoy 100% credit value toward upgrading your center stone anytime.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    title: 'SUSTAINABLE & ECO-FRIENDLY',
    subtitle: 'Pure materials, with a promise of responsibility.',
    desc: 'Conflict-free lab engineered diamonds grown using renewable power, paired with 100% recycled 18k solid gold & platinum.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  }
];

export const OurPromise = () => {
  return (
    <section className="section-padding promise-section" id="promises">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Our Promise</h2>
        </div>

        <div className="promises-grid">
          {PROMISES.map((p) => (
            <div key={p.title} className="promise-card">
              <div className="promise-icon-wrap">{p.icon}</div>
              <h3 className="promise-card-title">{p.title}</h3>
              <p className="promise-card-sub">{p.subtitle}</p>
              <p className="promise-card-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
