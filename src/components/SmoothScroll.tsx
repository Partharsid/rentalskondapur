'use client';

import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const rAF = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      rAF.current = requestAnimationFrame(raf);
    }

    rAF.current = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rAF.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}