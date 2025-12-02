'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

const TranslationContext = createContext();

let translations = {};
let currentLocale = 'en';
let isInitialized = false;

// Load translations for a given locale
async function loadTranslations(locale) {
  try {
    const response = await fetch(`/messages/${locale}.json`);
    const data = await response.json();
    translations = data;
    currentLocale = locale;
    isInitialized = true;
    return data;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    return {};
  }
}

// Get nested translation by key (e.g., "nav.products")
function getTranslation(key) {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value;
}

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    
    // Load translations
    loadTranslations(savedLocale).then(() => {
      // Small delay to ensure everything is ready
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  }, []);

  const changeLocale = (newLocale) => {
    // Show loading immediately
    setIsLoading(true);
    
    // Save the new locale
    localStorage.setItem('locale', newLocale);
    
    // Reload immediately - the loading screen will persist until page reloads
    window.location.reload();
  };

  const t = (key) => {
    if (!isInitialized) return '';
    return getTranslation(key);
  };

  // Show loading screen while translations load
  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          zIndex: 9999,
          gap: 2,
        }}
      >
        <CircularProgress size={50} sx={{ color: '#2A2A2A' }} />
        <Box sx={{ color: '#2A2A2A', fontWeight: 500, fontSize: '16px' }}>
          {locale === 'en' ? 'Loading...' : 'Chargement...'}
        </Box>
      </Box>
    );
  }

  return (
    <TranslationContext.Provider value={{ locale, changeLocale, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslations must be used within TranslationProvider');
  }
  return context;
}
