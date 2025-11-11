import { Roboto } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: 'WAYD Groupe - Bringing Moroccan Harvests To The World',
  description: 'High-quality organic vegetables from Morocco. Certified organic tomatoes, cucumbers, carrots, and more exported internationally.',
  keywords: 'organic vegetables, Morocco, export, tomatoes, agriculture, sustainable farming',
  metadataBase: new URL('https://waydgroupe.com'),
  openGraph: {
    title: 'WAYD Groupe - Bringing Moroccan Harvests To The World',
    description: 'High-quality organic vegetables from Morocco.',
    siteName: 'WAYD Groupe',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <ThemeRegistry>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}