'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { House, MessageCircle, ShoppingBag, Store } from 'lucide-react';
import { readCart } from '@/src/cart';
import { waLink } from '@/src/data';
export default function MobileNav() {
  const [count, setCount] = useState(0);
  useEffect(() => { const update = () => setCount(readCart().reduce((n, item) => n + item.quantity, 0)); update(); window.addEventListener('storage', update); window.addEventListener('cartchange', update); return () => { window.removeEventListener('storage', update); window.removeEventListener('cartchange', update); }; }, []);
  const items = [{ href: '/', label: 'Home', icon: House }, { href: '/store', label: 'Shop', icon: Store }, { href: '/cart', label: 'Bag', icon: ShoppingBag }, { href: waLink('Hello Maison Prisca, I would like help with an order.'), label: 'WhatsApp', icon: MessageCircle, external: true }];
  return <nav className="mobile-nav" aria-label="Mobile navigation">{items.map(({ href, label, icon: Icon, external }) => external ? <a key={label} href={href} aria-label={label}><Icon size={19}/><span>{label}</span></a> : <Link key={label} href={href} aria-label={label} className={label === 'Bag' && count ? 'has-count' : ''}><Icon size={19}/><span>{label}</span>{label === 'Bag' && count > 0 && <small>{count}</small>}</Link>)}</nav>;
}
