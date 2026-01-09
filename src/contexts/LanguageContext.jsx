'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');

  // Load saved language preference on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
  }, []);

  // Save language preference and reload page when language changes
  const changeLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    // Force reload to apply new language
    window.location.reload();
  };

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    changeLocale(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
