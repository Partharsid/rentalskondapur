import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import BackToTop from '@/components/BackToTop';
import StickyCTA from '@/components/StickyCTA';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Premium Rental Properties in Kondapur`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-deep antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <StickyCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}