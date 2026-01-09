// EXAMPLE: How to use translations in your components
// Copy and adapt this pattern to any component

'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function ExampleTranslatedComponent() {
  // 1. Import and use the hook
  const { t, locale, changeLocale } = useTranslations();

  // 2. Use t() to get translations
  return (
    <div>
      {/* Simple translation */}
      <h1>{t('hero.title')}</h1>
      
      {/* Nested translation */}
      <p>{t('products.items.tomatoes.name')}</p>
      
      {/* In button text */}
      <button>{t('nav.requestQuote')}</button>
      
      {/* Current locale */}
      <p>Current language: {locale}</p>
      
      {/* Change language programmatically */}
      <button onClick={() => changeLocale('fr')}>
        Switch to French
      </button>
      
      {/* Map through data with translations */}
      {['tomatoes', 'cucumbers', 'carrots'].map(item => (
        <div key={item}>
          <h3>{t(`products.items.${item}.name`)}</h3>
          <p>{t(`products.items.${item}.description`)}</p>
        </div>
      ))}
    </div>
  );
}

// AVAILABLE TRANSLATION CATEGORIES:
// - site: Site information
// - nav: Navigation items
// - hero: Hero section
// - stats: Statistics
// - mission: Mission content
// - products: Product information
// - technology: Technology section
// - innovation: Innovation content
// - newsletter: Newsletter section
// - showcase: Showcase items
// - footer: Footer links
// - about: About page
// - sustainability: Sustainability page
// - certificates: Certificates page
// - contact: Contact form
// - quote: Quote request
// - harvest: Harvest page
// - common: Common UI elements
