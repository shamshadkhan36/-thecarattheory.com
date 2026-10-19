import React from 'react';

const PROMISES = [
  {
    title: 'LIFETIME BUYBACK',
    subtitle: 'A Policy, made for you.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 20 20" fill="#55142A">
        <path
          d="M9.69502 0.6786C9.91338 0.601796 10.1516 0.603123 10.3691 0.682353L18.2151 3.54058C18.61 3.68445 18.8728 4.05988 18.8728 4.48018V14.4287C18.8728 14.8074 18.6588 15.1537 18.32 15.3231L10.4731 19.2465C10.196 19.385 9.87022 19.3873 9.59117 19.2526L1.45405 15.3244C1.10843 15.1576 0.888794 14.8076 0.888794 14.4239V4.48434C0.888794 4.05997 1.15665 3.68181 1.55699 3.541L9.69502 0.6786ZM6.07999 3.01017L2.5346 4.25719L10.149 7.63545L13.5692 6.118L6.07999 3.01017ZM6.78606 2.76183L14.1997 5.83828L17.5367 4.35774L10.0268 1.62195L6.78606 2.76183ZM1.88879 14.4239L1.88879 5.06467L9.64898 8.50762V18.1701L1.88879 14.4239ZM17.8728 14.4287L10.649 18.0405V8.50762L17.8728 5.30263V14.4287Z"
          fillRule="evenodd"
        />
      </svg>
    )
  },
  {
    title: 'CERTIFIED JEWELRY',
    subtitle: 'Pure. Promise. Certified',
    icon: (
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: '#55142A',
          WebkitMask: "url('/assets/icons/promise-certified.png') no-repeat center / contain",
          mask: "url('/assets/icons/promise-certified.png') no-repeat center / contain"
        }}
      />
    )
  },
  {
    title: 'FREE SHIPPING',
    subtitle: 'Pure Service. Promised Delivery.',
    icon: (
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: '#55142A',
          WebkitMask: "url('/assets/icons/promise-shipping.png') no-repeat center / contain",
          mask: "url('/assets/icons/promise-shipping.png') no-repeat center / contain"
        }}
      />
    )
  },
  {
    title: 'EXCHANGE & UPGRADE',
    subtitle: 'Pure Flexibility. With a promise to evolve.',
    icon: (
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: '#55142A',
          WebkitMask: "url('/assets/icons/promise-exchange.png') no-repeat center / contain",
          mask: "url('/assets/icons/promise-exchange.png') no-repeat center / contain"
        }}
      />
    )
  },
  {
    title: 'SUSTAINABLE & ECO-FRIENDLY',
    subtitle: 'Pure materials, with a promise of responsibility.',
    icon: (
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: '#55142A',
          WebkitMask: "url('/assets/icons/promise-sustainable.png') no-repeat center / contain",
          mask: "url('/assets/icons/promise-sustainable.png') no-repeat center / contain"
        }}
      />
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
