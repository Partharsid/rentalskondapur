'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Property } from '@/lib/types';
import PropertyVideoCard from './PropertyVideoCard';
import { Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertyFeedClient({ properties }: { properties: Property[] }) {
  const [selectedBhk, setSelectedBhk] = useState<string>('All');

  // Extract unique BHK options
  const bhkOptions = useMemo(() => {
    const options = new Set<string>();
    properties.forEach((p) => {
      if (p.bhk) options.add(p.bhk);
    });
    return ['All', ...Array.from(options).sort()];
  }, [properties]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    if (selectedBhk === 'All') return properties;
    return properties.filter((p) => p.bhk === selectedBhk);
  }, [properties, selectedBhk]);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 md:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between"
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

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-wrap items-center justify-start md:justify-end gap-2"
      >
        {bhkOptions.map((bhk) => (
          <button
            key={bhk}
            onClick={() => setSelectedBhk(bhk)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              selectedBhk === bhk
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {bhk === 'All' ? 'All Properties' : bhk}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <PropertyVideoCard property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-12 text-center text-white/40"
          >
            No properties found for {selectedBhk}.
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
