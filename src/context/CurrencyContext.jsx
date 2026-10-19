import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD ($)' },
  AUD: { symbol: 'AU$', rate: 1.52, label: 'AUD ($)' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const formatMoney = (amountUSD) => {
    const cur = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = (amountUSD || 0) * cur.rate;
    return cur.symbol + Math.round(converted).toLocaleString('en-US');
  };

  const formatPrice = (amountUSD, amountAlt) => {
    const target = amountUSD || (amountAlt ? Math.round(amountAlt / 84.5) : 940);
    return formatMoney(target);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney, formatPrice, rates: CURRENCY_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
