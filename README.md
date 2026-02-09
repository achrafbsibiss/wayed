# WAYD Groupe - Generational Roots Global Reach

A modern, high-performance website for WAYD Groupe, showcasing Morocco's finest agricultural exports with a focus on quality, sustainability, and innovation.

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Fully Responsive**: Works seamlessly across all devices
- **Performance Optimized**: Built with Next.js 15.5.4 and Turbopack
- **SEO Friendly**: Optimized for search engines
- **Accessibility**: WCAG compliant

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: Material-UI (MUI) v7.3.4
- **Styling**: Tailwind CSS v4 + MUI sx prop
- **Icons**: Iconify React
- **Carousel**: Swiper.js
- **Font**: Roboto (Google Fonts)
- **React**: 19.1.0

## 📋 Prerequisites

- Node.js v18.x or higher
- npm v9.x or higher

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd wayd-groupe

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🗂️ Project Structure

```
wayd-groupe/
├── public/              # Static assets
│   └── images/         # Images organized by section
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── about/
│   │   ├── certificates/
│   │   ├── contact/
│   │   ├── harvest/
│   │   ├── layout.js
│   │   ├── page.jsx
│   │   └── globals.css
│   ├── components/     # React components
│   │   ├── home/      # Home page sections
│   │   └── layout/    # Header & Footer
│   └── lib/           # Utilities & constants
├── .gitignore
├── package.json
├── next.config.mjs
└── README.md
```

## 🎨 Design System

**Colors**
- Primary: `#2A2A2A`
- Background: `#F0EFEF`, `#F5F5F5`
- Accent: `#D9D9D9`

**Typography**
- Font: Roboto (300, 400, 500, 700, 900)

**Border Radius**
- Cards: 35px
- Buttons: 68px (pill)

## 📱 Pages & Features

- **Home**: Hero, Stats, Mission, Products, Technology, Innovation
- **About**: Company information
- **Harvest**: Product showcase
- **Certificates**: Quality certifications
- **Contact**: Contact form

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub, then:
# 1. Import repo in Vercel
# 2. Deploy automatically
```

### Other Platforms
Compatible with: Netlify, AWS Amplify, GCP, Custom Node.js server

## 🔧 Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@waydgroupe.com
```

## 📝 Code Style

- ESLint configured
- Functional components with hooks
- PascalCase for components
- camelCase for functions

## 📞 Contact

**WAYD Groupe**
- Email: contact@waydgroupe.com
- Location: Morocco

---

Built with ❤️ for Moroccan agriculture
