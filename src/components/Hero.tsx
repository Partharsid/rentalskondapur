'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, BROKER_PHONE, PHONE_HREF } from '@/lib/constants';

const headlineItems = [
  { text: 'NO VISITING FEE', accent: 'emerald' },
  { text: 'ONLY BROKERAGE', accent: 'emerald' },
  { text: 'RENTAL HOUSES AVAILABLE IN KONDAPUR', accent: 'white' },
  { text: 'ALL BHKs AVAILABLE', accent: 'gold' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 pt-8 pb-32 md:pt-16 md:pb-40">
      <div className="hero-glow bg-emerald-500 -top-32 -left-32" />
      <div className="hero-glow bg-gold-500 -bottom-32 -right-32" />
      <div className="hero-glow bg-emerald-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="relative z-10 flex max-w-4xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {headlineItems.map((item) => (
          <motion.div
            key={item.text}
            variants={wordVariants}
            className="overflow-hidden"
          >
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight ${
                item.accent === 'emerald'
                  ? 'text-gradient-emerald'
                  : item.accent === 'gold'
                  ? 'text-gradient-gold'
                  : 'text-white'
              }`}
            >
              {item.text}
            </h1>
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg text-white/50 md:text-xl"
        >
          Premium rental properties in Kondapur, Hyderabad. Zero hassle, zero
          visiting fees — just straight-up brokerage. Find your perfect home
          today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95 glow-emerald"
          >
            <Phone size={20} />
            Call Us
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-[#20BD5A] hover:scale-105 active:scale-95"
          >
            <MessageCircle size={20} />
            WhatsApp Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}