'use client';
import { useEffect, useRef, useState } from 'react';
export default function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ transition: 'opacity .4s cubic-bezier(.2,.7,.3,1), transform .4s cubic-bezier(.2,.7,.3,1)', transitionDelay: `${delay}ms`, opacity: shown ? 1 : 0, transform: shown ? 'translateY(0)' : 'translateY(16px)', willChange: 'opacity, transform' }}>{children}</div>;
}
