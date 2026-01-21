# Translation Implementation Guide

This guide will help you convert hard-coded text in components to use the multi-language translation system.

## Table of Contents
1. [Understanding the System](#understanding-the-system)
2. [Translation File Structure](#translation-file-structure)
3. [Step-by-Step Process](#step-by-step-process)
4. [Examples](#examples)
5. [Best Practices](#best-practices)
6. [Common Patterns](#common-patterns)

---

## Understanding the System

### How It Works
1. **Translation Files**: JSON files store text in 4 languages (EN, FR, AR, DE)
2. **Translation Hook**: `useTranslations()` hook provides the `t()` function
3. **Dynamic Display**: Text automatically changes when user switches language

### Supported Languages
- 🇬🇧 English (`en`) - Primary/Fallback
- 🇫🇷 French (`fr`)
- 🇸🇦 Arabic (`ar`) - RTL support
- 🇩🇪 German (`de`)

### File Locations
```
/messages/           - Translation files (server-side)
├── en.json
├── fr.json
├── ar.json
└── de.json

/public/messages/    - Translation files (client-side fallback)
├── en.json
├── fr.json
├── ar.json
└── de.json
```

---

## Translation File Structure

### Organization by Feature
```json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "about": "About"
  },
  "hero": {
    "title": "Welcome",
    "subtitle": "Our Amazing Product"
  },
  "common": {
    "learnMore": "Learn More",
    "readMore": "Read More"
  }
}
```

### Naming Convention
- Use **camelCase** for keys
- Group related translations under a parent key
- Keep keys descriptive and meaningful
- Use consistent naming across languages

---

## Step-by-Step Process

### Step 1: Identify Hard-Coded Text

Look for components with hard-coded strings:

**❌ Before (Hard-coded):**
```jsx
export default function MyComponent() {
    return (
        <div>
            <h1>Welcome to Our Website</h1>
            <p>Discover our amazing products</p>
            <button>Learn More</button>
        </div>
    );
}
```

### Step 2: Add Translations to JSON Files

Add the text to **all 4 language files**.

#### `/messages/en.json`
```json
{
  "myComponent": {
    "title": "Welcome to Our Website",
    "description": "Discover our amazing products",
    "button": "Learn More"
  }
}
```

#### `/messages/fr.json`
```json
{
  "myComponent": {
    "title": "Bienvenue sur Notre Site Web",
    "description": "Découvrez nos produits incroyables",
    "button": "En Savoir Plus"
  }
}
```

#### `/messages/ar.json`
```json
{
  "myComponent": {
    "title": "مرحبا بك في موقعنا",
    "description": "اكتشف منتجاتنا المذهلة",
    "button": "اعرف المزيد"
  }
}
```

#### `/messages/de.json`
```json
{
  "myComponent": {
    "title": "Willkommen auf Unserer Website",
    "description": "Entdecken Sie unsere erstaunlichen Produkte",
    "button": "Mehr Erfahren"
  }
}
```

> **⚠️ Important**: Also add to `/public/messages/*.json` files with identical content!

### Step 3: Import the Translation Hook

Add the import at the top of your component:

```jsx
import { useTranslations } from '@/hooks/useTranslations';
```

### Step 4: Use the Hook in Your Component

```jsx
export default function MyComponent() {
    // Get the translation function
    const { t } = useTranslations();
    
    return (
        <div>
            <h1>{t('myComponent.title')}</h1>
            <p>{t('myComponent.description')}</p>
            <button>{t('myComponent.button')}</button>
        </div>
    );
}
```

**✅ After (Translated):**
```jsx
'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function MyComponent() {
    const { t } = useTranslations();
    
    return (
        <div>
            <h1>{t('myComponent.title')}</h1>
            <p>{t('myComponent.description')}</p>
            <button>{t('myComponent.button')}</button>
        </div>
    );
}
```

---

## Examples

### Example 1: Simple Component

**Original:**
```jsx
export default function Footer() {
    return (
        <footer>
            <p>© 2024 WAYD Groupe. All rights reserved.</p>
            <a href="/privacy">Privacy Policy</a>
        </footer>
    );
}
```

**Step 1: Add to JSON files**
```json
// en.json
{
  "footer": {
    "copyright": "© 2024 WAYD Groupe. All rights reserved.",
    "privacyPolicy": "Privacy Policy"
  }
}

// fr.json
{
  "footer": {
    "copyright": "© 2024 WAYD Groupe. Tous droits réservés.",
    "privacyPolicy": "Politique de Confidentialité"
  }
}
```

**Step 2: Update Component**
```jsx
'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function Footer() {
    const { t } = useTranslations();
    
    return (
        <footer>
            <p>{t('footer.copyright')}</p>
            <a href="/privacy">{t('footer.privacyPolicy')}</a>
        </footer>
    );
}
```

---

### Example 2: Component with Variables

Sometimes you need to insert dynamic values into translations.

**Add to JSON:**
```json
{
  "product": {
    "price": "Price: ${amount}",
    "inStock": "Only {count} left in stock"
  }
}
```

**Component:**
```jsx
const { t } = useTranslations();
const price = 99.99;
const stock = 5;

return (
    <div>
        {/* Manual replacement */}
        <p>{t('product.price').replace('${amount}', `$${price}`)}</p>
        <p>{t('product.inStock').replace('{count}', stock)}</p>
    </div>
);
```

---

### Example 3: Buttons and CTAs

**JSON:**
```json
{
  "cta": {
    "getStarted": "Get Started",
    "contactUs": "Contact Us",
    "learnMore": "Learn More",
    "requestQuote": "Request a Quote"
  }
}
```

**Component:**
```jsx
const { t } = useTranslations();

return (
    <div>
        <button>{t('cta.getStarted')}</button>
        <button>{t('cta.contactUs')}</button>
    </div>
);
```

---

## Best Practices

### 1. Use Descriptive Keys
```json
// ❌ Bad - Unclear
{
  "text1": "Welcome",
  "btn": "Click",
  "msg": "Thank you"
}

// ✅ Good - Clear and descriptive
{
  "hero": {
    "welcomeTitle": "Welcome",
    "primaryButton": "Click Here",
    "successMessage": "Thank you"
  }
}
```

### 2. Group Related Translations
```json
{
  "auth": {
    "login": "Login",
    "logout": "Logout",
    "register": "Register"
  },
  "profile": {
    "settings": "Settings",
    "edit": "Edit Profile"
  }
}
```

### 3. Reuse Common Translations
```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success!"
  }
}
```

Use them like: `{t('common.save')}`

### 4. Handle Pluralization
```json
{
  "items": {
    "one": "1 item",
    "many": "{count} items"
  }
}
```

```jsx
const count = products.length;
const text = count === 1 
    ? t('items.one') 
    : t('items.many').replace('{count}', count);
```

### 5. Keep Formatting Consistent
```json
{
  "date": {
    "format": "MMM DD, YYYY",  // Use same format variables
    "label": "Date:"
  }
}
```

---

## Common Patterns

### Pattern 1: Navigation Menu
```json
{
  "nav": {
    "home": "Home",
    "products": "Products",
    "about": "About Us",
    "contact": "Contact"
  }
}
```

### Pattern 2: Form Fields
```json
{
  "form": {
    "firstName": "First Name",
    "lastName": "Last Name",
    "email": "Email Address",
    "phone": "Phone Number",
    "message": "Message",
    "submit": "Submit",
    "required": "This field is required"
  }
}
```

### Pattern 3: Status Messages
```json
{
  "messages": {
    "success": {
      "saved": "Changes saved successfully",
      "deleted": "Item deleted successfully",
      "sent": "Message sent successfully"
    },
    "error": {
      "generic": "An error occurred. Please try again.",
      "network": "Network error. Check your connection.",
      "notFound": "Item not found"
    }
  }
}
```

---

## Quick Checklist

When translating a component, check off these items:

- [ ] Identified all hard-coded text
- [ ] Added translations to `/messages/en.json`
- [ ] Added translations to `/messages/fr.json`
- [ ] Added translations to `/messages/ar.json`
- [ ] Added translations to `/messages/de.json`
- [ ] Copied same content to `/public/messages/*.json` files
- [ ] Imported `useTranslations` hook
- [ ] Added `'use client'` directive (if not already present)
- [ ] Replaced hard-coded text with `t('key.path')`
- [ ] Tested in browser with all 4 languages
- [ ] Verified RTL works correctly for Arabic

---

## Testing Your Changes

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test each language:**
   - Open the website
   - Click language selector in header
   - Switch to each language (EN, FR, AR, DE)
   - Verify text changes correctly

3. **Check for missing translations:**
   - If text doesn't change, the key is wrong or missing
   - Check browser console for errors
   - Verify JSON syntax is valid

---

## Arabic (RTL) Considerations

Arabic requires right-to-left text direction:

**Automatic RTL:**
The translation provider should handle this automatically, but if needed:

```jsx
<div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    {t('myText')}
</div>
```

---

## Getting Help

**Common Issues:**

1. **Text not changing?**
   - Check if key path is correct
   - Ensure all 4 JSON files have the translation
   - Verify you're using `t('correct.key.path')`

2. **Component crashes?**
   - Make sure you added `'use client'` at the top
   - Check JSON files for syntax errors (missing commas, brackets)

3. **Arabic not showing?**
   - Check font supports Arabic characters
   - Verify RTL direction is applied

---

## Next Steps

1. Choose a component to translate
2. Follow the step-by-step process above
3. Test in all 4 languages
4. Move to the next component

**Start with simple components first** (like footers, headers, buttons) before tackling complex pages!

Good luck! 🚀
