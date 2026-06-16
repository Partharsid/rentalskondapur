'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    text: 'Found my 2BHK in Kondapur within a week. No visiting fee, just straight-up brokerage. Exactly what was promised.',
  },
  {
    name: 'Priya Reddy',
    text: 'The video walkthroughs saved so much time. Knew exactly what I was getting before even visiting. Highly recommend.',
  },
  {
    name: 'Ankit Verma',
    text: 'Smooth process from start to finish. The broker was transparent about everything. No hidden charges at all.',
  },
  {
    name: 'Neha Gupta',
    text: 'Best rental experience in Hyderabad. All BHKs available, great locations, and the WhatsApp communication was super quick.',
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold text-white md:text-5xl">
          What Our <span className="text-gradient-gold">Clients Say</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <p className="text-white/70 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 font-semibold text-white">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}