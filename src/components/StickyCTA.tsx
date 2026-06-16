'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP_LINK, BROKER_PHONE, PHONE_HREF } from '@/lib/constants';

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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
        >
          <a
            href={PHONE_HREF}
            className="flex flex-1 items-center justify-center gap-2 bg-emerald-600 py-4 text-sm font-semibold text-white active:bg-emerald-500"
          >
            <Phone size={18} />
            Call Us
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-4 text-sm font-semibold text-white active:bg-[#20BD5A]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}