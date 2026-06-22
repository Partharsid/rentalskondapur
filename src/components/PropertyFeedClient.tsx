'use client';

import { motion } from 'framer-motion';
import type { Property } from '@/lib/types';
import PropertyVideoCard from './PropertyVideoCard';
import { Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertyFeedClient({ properties }: { properties: Property[] }) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 md:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="section-label">Listings</span>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">
            Available <span className="text-gradient-emerald">Properties</span>
          </h2>
          <p className="mt-3 max-w-md text-base text-white/35">
            Walkthrough videos of every listing. What you see is what you get — no surprises.
          </p>
        </div>
        <Link
          href="/properties"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/60 transition-all hover:bg-white/[0.08] hover:text-white self-start"
        >
          <Building2 size={15} />
          View all
          <ChevronRight size={14} />
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <PropertyVideoCard property={property} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
