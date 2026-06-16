import { SITE_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
      <h1 className="text-4xl font-bold text-white md:text-6xl">
        About <span className="text-gradient-emerald">RENTALS KONDAPUR</span>
      </h1>
      <div className="mt-8 space-y-6 text-lg text-white/60 leading-relaxed">
        <p>
          RENTALS KONDAPUR is a premium rental property service based in Kondapur,
          Hyderabad. We specialize in connecting tenants with the best rental homes
          in prime locations across the city.
        </p>
        <p>
          Our philosophy is simple: <strong className="text-white">no visiting fees, only brokerage.</strong>{' '}
          We believe in transparency and efficiency. Every property listing comes
          with a video walkthrough so you know exactly what you&apos;re getting before
          you step in.
        </p>
        <p>
          From 1 BHK to 3 BHK, we have options for every budget and lifestyle. Our
          deep knowledge of Kondapur and surrounding areas means we can find you
          the perfect home quickly and hassle-free.
        </p>
      </div>
    </div>
  );
}