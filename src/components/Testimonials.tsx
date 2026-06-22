'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    initials: 'RS',
    text: 'Found my 2BHK in Kondapur within a week. No visiting fee, just straight-up brokerage. Exactly what was promised.',
    stars: 5,
    color: 'emerald',
  },
  {
    name: 'Priya Reddy',
    role: 'Product Manager',
    initials: 'PR',
    text: 'The video walkthroughs saved so much time. Knew exactly what I was getting before even visiting. Highly recommend.',
    stars: 5,
    color: 'gold',
  },
  {
    name: 'Ankit Verma',
    role: 'Data Analyst',
    initials: 'AV',
    text: 'Smooth process from start to finish. The broker was transparent about everything. No hidden charges at all.',
    stars: 5,
    color: 'blue',
  },
  {
    name: 'Neha Gupta',
    role: 'UX Designer',
    initials: 'NG',
    text: 'Best rental experience in Hyderabad. All BHKs available, great locations, and the WhatsApp communication was super quick.',
    stars: 5,
    color: 'emerald',
  },
  {
    name: 'Arjun Nair',
    role: 'DevOps Engineer',
    initials: 'AN',
    text: 'Relocated from Bangalore and needed a place fast. These guys delivered in 3 days. Incredible service.',
    stars: 5,
    color: 'gold',
  },
  {
    name: 'Kavya Mehta',
    role: 'HR Manager',
    initials: 'KM',
    text: 'The property descriptions were accurate to the T. No surprises on move-in day. Very professional team.',
    stars: 5,
    color: 'blue',
  },
];

const colorMap = {
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/15 text-emerald-400',
  gold: 'from-amber-500/20 to-amber-600/5 border-amber-500/15 text-amber-400',
  blue: 'from-sky-500/20 to-sky-600/5 border-sky-500/15 text-sky-400',
};

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const colors = colorMap[t.color as keyof typeof colorMap];
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
      className="relative w-72 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-sm cursor-default select-none"
    >
      {/* Quote icon */}
      <Quote size={18} className="text-white/10 mb-3" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed text-white/55">"{t.text}"</p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${colors} border text-[11px] font-bold`}>
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white/80">{t.name}</p>
          <p className="text-xs text-white/30">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsColumn({
  items,
  duration = 20,
  className = '',
}: {
  items: typeof testimonials;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {items.map((t, i) => (
              <TestimonialCard key={`${idx}-${i}`} t={t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const col1 = testimonials.slice(0, 2);
  const col2 = testimonials.slice(2, 4);
  const col3 = testimonials.slice(4, 6);

  return (
    <section className="relative z-10 mx-auto max-w-7xl overflow-hidden px-4 pb-28 md:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <span className="section-label">Testimonials</span>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          What Our <span className="text-gradient-gold">Clients Say</span>
        </h2>
        <p className="mt-4 text-white/35 text-base max-w-md mx-auto">
          Real people, real experiences. Hear from tenants who found their home with us.
        </p>
      </motion.div>

      {/* Scrolling columns */}
      <div
        className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[520px] overflow-hidden"
      >
        <TestimonialsColumn items={col1} duration={18} />
        <TestimonialsColumn items={col2} duration={22} className="hidden md:flex" />
        <TestimonialsColumn items={col3} duration={16} className="hidden lg:flex" />
      </div>
    </section>
  );
}
