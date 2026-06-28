import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import BackToTop from '@/components/BackToTop';
import StickyCTA from '@/components/StickyCTA';
import CompareDrawer from '@/components/CompareDrawer';
import './globals.css';
import { UserPreferencesProvider } from '@/context/UserPreferencesContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalskondapur.com'),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['Flats for rent in Kondapur', '1 BHK Kondapur', '2 BHK Kondapur', '3 BHK Kondapur', 'Rental properties Hyderabad', 'Kondapur Real Estate'],
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-deep antialiased">
        <UserPreferencesProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <BackToTop />
            <StickyCTA />
            <CompareDrawer />
          </SmoothScroll>
        </UserPreferencesProvider>
      </body>
    </html>
  );
}
