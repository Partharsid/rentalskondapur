'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME, MARQUEE_TEXTS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-obsidian/80 border-b border-white/5">
        <div className="animate-marquee whitespace-nowrap py-1.5 text-xs text-white/40 tracking-wider uppercase">
          {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
            <span key={i} className="mx-8">
              ★ {text}
            </span>
          ))}
        </div>
      </div>

      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'glass-strong'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">RENTALS </span>
            <span className="text-gradient-emerald">KONDAPUR</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-emerald-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 text-white/80 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-deep/95 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-semibold transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}