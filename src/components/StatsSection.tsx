'use client';

import { motion } from 'framer-motion';
import { Building2, Users, MapPin } from 'lucide-react';

const stats = [
  { icon: Building2, label: 'Active Properties', value: '50-100' },
  { icon: Users, label: 'Happy Tenants', value: '200' },
  { icon: MapPin, label: 'Area Covered', value: 'Kondapur' },
];

export default function StatsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 md:px-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <stat.icon className="mx-auto mb-3 text-emerald-400" size={28} />
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-sm text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}