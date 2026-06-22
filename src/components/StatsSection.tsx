'use client';

import { motion } from 'framer-motion';
import { Building2, Users, MapPin, Shield, Zap, Star } from 'lucide-react';

const bentoItems = [
  {
    icon: Building2,
    value: '50–100',
    label: 'Active Listings',
    description: 'Premium properties available right now across Kondapur',
    color: 'emerald',
    colSpan: 'md:col-span-1',
    size: 'large',
  },
  {
    icon: Users,
    value: '200+',
    label: 'Happy Tenants',
    description: 'Families and professionals who found their home with us',
    color: 'gold',
    colSpan: 'md:col-span-1',
    size: 'large',
  },
  {
    icon: MapPin,
    value: 'Kondapur',
    label: 'Coverage Area',
    description: 'Hyderabad\'s most sought-after IT corridor',
    color: 'blue',
    colSpan: 'md:col-span-1',
    size: 'large',
  },
  {
    icon: Shield,
    value: 'Zero',
    label: 'Visiting Charges',
    description: 'Visit any property for free, pay only successful brokerage',
    color: 'emerald',
    colSpan: 'md:col-span-2',
    size: 'wide',
  },
  {
    icon: Zap,
    value: '24h',
    label: 'Quick Response',
    description: 'We respond same day, always',
    color: 'gold',
    colSpan: 'md:col-span-1',
    size: 'small',
  },
];

const colorMap = {
  emerald: {
    icon: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/15',
    value: 'text-gradient-emerald',
    glow: 'rgba(16,185,129,0.06)',
  },
  gold: {
    icon: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/15',
    value: 'text-gradient-gold',
    glow: 'rgba(245,158,11,0.06)',
  },
  blue: {
    icon: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/15',
    value: 'text-sky-400',
    glow: 'rgba(56,189,248,0.06)',
  },
};

export default function StatsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 md:px-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-center text-center"
      >
        <span className="section-label mb-3">Why Choose Us</span>
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Numbers that <span className="text-gradient-emerald">speak</span>
        </h2>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {bentoItems.map((item, i) => {
          const colors = colorMap[item.color as keyof typeof colorMap];
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 cursor-default ${item.colSpan}`}
              style={{ boxShadow: `inset 0 0 40px ${colors.glow}` }}
            >
              {/* Hover radial */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

              {/* Gradient border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 1px ${colors.glow.replace('0.06', '0.4')}` }} />

              <div className="relative z-10 flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}>
                  <Icon size={18} className={colors.icon} />
                </div>
                {item.size === 'wide' && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/20 border border-white/[0.06] px-2 py-0.5 rounded-full">
                    Guaranteed
                  </span>
                )}
              </div>

              <div className="relative z-10 mt-5">
                <p className={`text-3xl font-black tracking-tight ${colors.value}`}>
                  {item.value}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white/80">{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/35">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stars / social proof row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 flex items-center justify-center gap-4"
      >
        <div className="flex -space-x-2">
          {['RK', 'PR', 'AV', 'NG'].map((init) => (
            <div
              key={init}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#060810] bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 text-[10px] font-bold text-emerald-300"
            >
              {init}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-xs text-white/30">
          <span className="font-semibold text-white/60">200+</span> happy tenants
        </span>
      </motion.div>
    </section>
  );
}
