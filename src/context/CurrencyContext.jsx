import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 84.5, label: 'INR (₹)' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (AED)' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const formatMoney = (amountUSD) => {
    const cur = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = amountUSD * cur.rate;
    return cur.symbol + Math.round(converted).toLocaleString();
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney, rates: CURRENCY_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
