'use client';

import { motion } from 'framer-motion';
import type { Property } from '@/lib/types';
import PropertyVideoCard from '@/components/PropertyVideoCard';

export default function PropertiesPageClient({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-3xl font-bold text-white md:text-5xl">All Properties</h1>
          <p className="mt-4 text-white/40">No properties listed yet. Check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          All <span className="text-gradient-emerald">Properties</span>
        </h1>
        <p className="mt-4 text-white/40 text-lg">{properties.length} listings in Kondapur</p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <PropertyVideoCard property={property} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}