# Translation Quick Start Guide

**5-Minute Quick Reference** for converting components to use translations.

## The 4-Step Process

### Step 1️⃣: Find Hard-Coded Text
Look for strings in JSX:
```jsx
<h1>Welcome to WAYD</h1>  // ← This needs translation!
<button>Learn More</button>  // ← This too!
```

---

### Step 2️⃣: Add to ALL 4 Language Files

**Location:** `/messages/` AND `/public/messages/`

You must add to **8 files total** (4 in each folder):
- `en.json` (English)
- `fr.json` (French)  
- `ar.json` (Arabic)
- `de.json` (German)

**Example - Add to EACH file:**

`en.json`:
```json
{
  "hero": {
    "title": "Welcome to WAYD",
    "button": "Learn More"
  }
}
```

`fr.json`:
```json
{
  "hero": {
    "title": "Bienvenue chez WAYD",
    "button": "En Savoir Plus"
  }
}
```

`ar.json`:
```json
{
  "hero": {
    "title": "مرحبا بك في WAYD",
    "button": "اعرف المزيد"
  }
}
```

`de.json`:
```json
{
  "hero": {
    "title": "Willkommen bei WAYD",
    "button": "Mehr Erfahren"
  }
}
```

---

### Step 3️⃣: Import the Hook

At the top of your component file:

```jsx
'use client';  // ← Add this if not present

import { useTranslations } from '@/hooks/useTranslations';
```

---

### Step 4️⃣: Replace Text

```jsx
export default function MyComponent() {
    // Get the translation function
    const { t } = useTranslations();
    
    return (
        <div>
            {/* ❌ Before: */}
            {/* <h1>Welcome to WAYD</h1> */}
            
            {/* ✅ After: */}
            <h1>{t('hero.title')}</h1>
            
            {/* ❌ Before: */}
            {/* <button>Learn More</button> */}
            
            {/* ✅ After: */}
            <button>{t('hero.button')}</button>
        </div>
    );
}
```

---

## Complete Example

**Before:**
```jsx
export default function Contact() {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you</p>
            <button>Send Message</button>
        </div>
    );
}
```

**After:**
```jsx
'use client';

import { useTranslations } from '@/hooks/useTranslations';

export default function Contact() {
    const { t } = useTranslations();
    
    return (
        <div>
            <h1>{t('contact.title')}</h1>
            <p>{t('contact.description')}</p>
            <button>{t('contact.send')}</button>
        </div>
    );
}
```

**JSON files (add to all 8):**
```json
{
  "contact": {
    "title": "Contact Us",
    "description": "We'd love to hear from you",
    "send": "Send Message"
  }
}
```

---

## Common Translations (Already Available)

These are already in the system - just use them!

```jsx
{t('common.learnMore')}    // "Learn More"
{t('common.readMore')}     // "Read More"
{t('common.close')}        // "Close"
{t('common.back')}         // "Back"
{t('common.next')}         // "Next"
{t('common.loading')}      // "Loading..."
{t('common.error')}        // "An error occurred"
{t('common.success')}      // "Success!"
```

---

## Testing

1. Save your files
2. Refresh browser
3. Click language selector in header
4. Switch between EN → FR → AR → DE
5. Verify text changes

---

## ⚠️ Common Mistakes

1. **Forgetting `'use client'`** at top of file
2. **Not adding to ALL 8 files** (4 in `/messages/`, 4 in `/public/messages/`)
3. **Wrong key path**: `t('hero.title')` ≠ `t('heroTitle')`
4. **JSON syntax error**: Missing comma or bracket breaks everything
5. **Testing in only one language**

---

## Need Help?

- Full guide: See `TRANSLATION_GUIDE.md`
- Check existing components for examples:
  - `src/components/home/HeroSection.jsx`
  - `src/components/home/MissionSection.jsx`
  - `src/components/layout/Header.jsx`

---

## Quick Reference Card

| Task | Code |
|------|------|
| Import hook | `import { useTranslations } from '@/hooks/useTranslations';` |
| Use hook | `const { t } = useTranslations();` |
| Translate text | `{t('section.key')}` |
| Get locale | `const { locale } = useTranslations();` |
| File locations | `/messages/*.json` AND `/public/messages/*.json` |

---

**Remember:** Always add to **ALL 8 JSON files** (4 languages × 2 folders)!
