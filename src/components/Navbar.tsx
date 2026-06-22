'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, Info } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MARQUEE_TEXTS } from '@/lib/constants';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      {/* Announcement marquee */}
      <div className="relative overflow-hidden border-b border-white/[0.04] bg-obsidian/60">
        <div className="animate-marquee whitespace-nowrap py-1.5 text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">
          {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
            <span key={i} className="mx-10">
              ◆ {text}
            </span>
          ))}
        </div>
      </div>

      {/* Floating pill navbar */}
      <div className="sticky top-0 z-40 flex justify-center px-4 py-3">
        <motion.nav
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-3xl transition-all duration-500 ${
            scrolled
              ? 'glass-strong rounded-2xl shadow-2xl shadow-black/50'
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Building2 size={14} className="text-emerald-400" />
              </div>
              <span className="text-sm font-bold tracking-tight">
                <span className="text-white">RENTALS</span>
                <span className="text-gradient-emerald"> KONDAPUR</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-tube-light relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/[0.06]'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <>
                          <span className="absolute -top-[2px] left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-b-full bg-emerald-400 shadow-[0_0_8px_2px_rgba(16,185,129,0.6)]" />
                          <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 h-[10px] w-6 rounded-b-full bg-gradient-to-b from-emerald-400/20 to-transparent blur-sm" />
                        </>
                      )}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/properties"
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-emerald-500 glow-emerald"
              >
                View Properties
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-all md:hidden"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-deep/90 md:hidden"
          >
            {links.map((link, i) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold transition-all ${
                      isActive
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon size={20} />
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
