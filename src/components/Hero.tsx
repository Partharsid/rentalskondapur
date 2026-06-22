'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Instagram, Youtube, ArrowRight, MapPin } from 'lucide-react';
import { WHATSAPP_LINK, BROKER_PHONE, PHONE_HREF } from '@/lib/constants';

const words = [
  { text: 'ZERO', color: 'emerald' },
  { text: 'VISITING', color: 'white' },
  { text: 'CHARGES', color: 'emerald' },
];

const subWords = [
  { text: 'Brokerage', color: 'gold' },
  { text: 'Applicable', color: 'white' },
];

const pills = [
  'All BHKs Available',
  'Furnished & Semi-furnished',
  'Kondapur, Hyderabad',
  'Instant Move-in',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-4 pb-28 mesh-bg">
      {/* Lamp glow top */}
      <div className="pointer-events-none absolute top-0 isolate z-0 flex w-full flex-1 items-start justify-center">
        {/* Main glow orb */}
        <div className="absolute top-0 z-50 h-40 w-[26rem] -translate-y-[30%] rounded-full bg-emerald-500/50 opacity-70 blur-3xl" />

        {/* Conic left */}
        <motion.div
          initial={{ opacity: 0, width: '12rem' }}
          animate={mounted ? { opacity: 1, width: '28rem' } : {}}
          transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.2, duration: 1.2 }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-52 overflow-visible bg-gradient-conic from-emerald-500/50 via-transparent to-transparent"
        >
          <div className="absolute left-0 bottom-0 z-20 h-40 w-full bg-gradient-to-t from-[#060810] to-transparent" />
          <div className="absolute left-0 bottom-0 z-20 h-full w-40 bg-gradient-to-r from-[#060810] to-transparent" />
        </motion.div>

        {/* Conic right */}
        <motion.div
          initial={{ opacity: 0, width: '12rem' }}
          animate={mounted ? { opacity: 1, width: '28rem' } : {}}
          transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.2, duration: 1.2 }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-52 overflow-visible bg-gradient-conic from-transparent via-transparent to-emerald-500/50"
        >
          <div className="absolute right-0 bottom-0 z-20 h-full w-40 bg-gradient-to-l from-[#060810] to-transparent" />
          <div className="absolute right-0 bottom-0 z-20 h-40 w-full bg-gradient-to-t from-[#060810] to-transparent" />
        </motion.div>

        {/* Top line */}
        <motion.div
          initial={{ width: '8rem' }}
          animate={mounted ? { width: '28rem' } : {}}
          transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.2, duration: 1.2 }}
          className="absolute top-0 z-50 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent"
        />

        {/* Bottom fade */}
        <div className="absolute top-52 z-40 h-40 w-full bg-gradient-to-b from-[#060810] to-transparent" />
      </div>

      {/* Gold orb bottom right */}
      <div className="hero-glow absolute bottom-0 right-0 h-[500px] w-[500px] bg-amber-500/30 translate-x-1/3 translate-y-1/3" />

      {/* Content */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ ease: [0.16, 1, 0.3, 1], delay: 0.4, duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl"
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-1.5"
        >
          <MapPin size={12} className="text-emerald-400" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-emerald-400">Kondapur, Hyderabad</span>
        </motion.div>

        {/* Big staggered headline */}
        <div className="mb-4 overflow-hidden">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={mounted ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-x-4"
          >
            {words.map((w) => (
              <span
                key={w.text}
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter ${
                  w.color === 'emerald' ? 'text-gradient-emerald' : 'text-gradient-white'
                }`}
              >
                {w.text}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mb-8 overflow-hidden">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={mounted ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-x-3"
          >
            {subWords.map((w) => (
              <span
                key={w.text}
                className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-none tracking-tight ${
                  w.color === 'gold' ? 'text-gradient-gold' : 'text-white/80'
                }`}
              >
                {w.text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mb-8 max-w-lg text-base text-white/40 leading-relaxed md:text-lg"
        >
          Premium rental properties in Kondapur. Zero hassle, zero visiting fees —
          just straight-up brokerage. Find your perfect home today.
        </motion.p>

        {/* Pill tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={PHONE_HREF}
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:scale-[1.03] active:scale-95 glow-emerald"
          >
            <Phone size={16} />
            Call Now
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/15 hover:scale-[1.03] active:scale-95"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <a
            href="/properties"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/[0.08] hover:text-white hover:scale-[1.03] active:scale-95"
          >
            Browse Listings
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex items-center gap-5"
        >
          <a
            href="https://www.instagram.com/flats_for_rent_sale_hyderabad?utm_source=qr&igsh=MWt2M3JuOTMxaHQyNA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all hover:border-[#E1306C]/30 hover:bg-[#E1306C]/10 hover:text-[#E1306C]"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://youtube.com/@prproperties-je9bc?si=lxZKyF-duS0XlAa1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 transition-all hover:border-[#FF0000]/30 hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
          >
            <Youtube size={16} />
          </a>
          <div className="h-px w-12 bg-white/10" />
          <span className="text-xs text-white/30 font-medium tracking-wider uppercase">Follow Us</span>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060810] to-transparent z-10" />
    </section>
  );
}
