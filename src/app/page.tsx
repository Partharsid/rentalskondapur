import Hero from '@/components/Hero';
import PropertyFeed from '@/components/PropertyFeed';
import StatsSection from '@/components/StatsSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <PropertyFeed />
      <Testimonials />
      <ContactSection />
    </>
  );
}