'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, PHONE_HREF } from '@/lib/constants';

export default function StickyCTA() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 100) {
        setVisible(currentY < lastScrollY);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-4 left-4 right-4 z-50 flex gap-2 md:hidden"
        >
          <a
            href={PHONE_HREF}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-semibold text-white glow-emerald active:scale-95 transition-transform"
          >
            <Phone size={16} />
            Call Us
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-semibold text-white active:scale-95 transition-transform"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
