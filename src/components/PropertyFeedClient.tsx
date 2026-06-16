'use client';

import { motion } from 'framer-motion';
import type { Property } from '@/lib/types';
import PropertyVideoCard from './PropertyVideoCard';

export default function PropertyFeedClient({ properties }: { properties: Property[] }) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          Available <span className="text-gradient-emerald">Properties</span>
        </h2>
        <p className="mt-4 text-white/40 text-lg">
          Walkthrough videos of every listing. What you see is what you get.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <PropertyVideoCard property={property} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}