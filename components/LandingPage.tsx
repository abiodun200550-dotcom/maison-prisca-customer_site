import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { whatsappNumber } from '@/src/data';

const wa = (text: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

const journal = [
  { n: 'I', t: 'Tell us the moment', d: 'An occasion, a date, a feeling you want to carry into the room.' },
  { n: 'II', t: 'Shape the details', d: 'We confirm fit, fabric and construction together before a single cut is made.' },
  { n: 'III', t: 'Wear your presence', d: 'Fittings and adjustments continue until the piece sits exactly as it should.' },
];

export default function LandingPage() {
  return <div className="min-h-screen bg-[var(--paper)]">
    <header className="site-header"><div className="shell flex h-[82px] items-center justify-between">
      <Link href="/" className="brand-lockup"><Image src="/images/logo-mark.png" alt="Maison Prisca" width={40} height={40} /><span><strong className="serif block text-xl">Maison Prisca</strong><small>Atelier, Lagos</small></span></Link>
      <nav className="hidden items-center gap-7 text-sm font-medium md:flex"><a href="#about">The atelier</a><a href="#services">Services</a><a href="#contact">Contact</a><Link href="/store" className="btn btn-dark !px-5 !py-2.5">Enter the shop <ArrowRight size={16} /></Link></nav>
      <Link href="/store" className="btn btn-dark !px-4 !py-2.5 text-sm md:hidden">Shop</Link>
    </div></header>

    <main>
      {/* Hero — asymmetric editorial spread, spine rail + stacked headline */}
      <section className="shell grid gap-10 py-16 md:grid-cols-[28px_1fr_.85fr] md:py-24">
        <div className="spine-rail hidden md:flex md:items-end md:pb-2"><span className="masthead">Maison Prisca — Lagos Atelier</span></div>
        <div className="max-w-xl">
          <p className="eyebrow">Lagos, Nigeria</p>
          <h1 className="headline-stack mt-6 text-7xl sm:text-8xl"><span>Made to be</span><span className="italic text-[var(--rose-deep)]">unforgettable.</span></h1>
          <p className="mt-8 max-w-md text-[15px] leading-8 text-[var(--muted)]">A Lagos atelier creating confident, body-aware pieces around your occasion, your measurements and the feeling you want to carry into the room.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/store" className="btn btn-grad">Explore the shop <ArrowRight size={17} /></Link><a href={wa('Hello Maison Prisca, I would like to book a private fitting.')} className="btn btn-line">Book a fitting</a></div>
        </div>
        <div className="mt-4 flex flex-col justify-end md:mt-0">
          <div className="arch relative aspect-[4/5] w-full overflow-hidden"><div className="absolute inset-0 grid place-items-center bg-[var(--white)] p-10"><Image src="/images/logo-full.png" alt="Maison Prisca" width={420} height={220} className="w-full object-contain" /></div></div>
          <p className="mt-3 text-[11px] text-[var(--muted)]">Fig. 1 — the house mark, Festac atelier</p>
        </div>
      </section>

      {/* Trust strip — single divided row, not repeated icon cards */}
      <section className="border-y border-[var(--line)] bg-[var(--white)]"><div className="shell flex flex-col divide-y divide-[var(--line)] py-2 sm:flex-row sm:divide-x sm:divide-y-0">
        <p className="flex-1 py-4 text-sm sm:pr-6"><strong className="block">Considered design</strong><span className="text-[var(--muted)]">Every detail has a reason</span></p>
        <p className="flex-1 py-4 text-sm sm:px-6"><strong className="block">Fit, not guesswork</strong><span className="text-[var(--muted)]">Guided measurements and counsel</span></p>
        <p className="flex-1 py-4 text-sm sm:pl-6"><strong className="block">A human experience</strong><span className="text-[var(--muted)]">Direct WhatsApp concierge</span></p>
      </div></section>

      {/* About — pull quote + margin note, left-aligned asymmetric grid */}
      <section id="about" className="shell grid gap-12 py-24 md:grid-cols-[1.1fr_.9fr] md:items-start">
        <div>
          <p className="eyebrow">The atelier</p>
          <blockquote className="pull-quote mt-5 text-4xl sm:text-5xl">Luxury is the feeling of being perfectly understood.</blockquote>
          <p className="mt-7 max-w-lg leading-8 text-[var(--muted)]">From Ankara and Adire to bridal, pageant and occasion looks, every piece is designed with care in our Lagos atelier — we take the time to understand your fit, your date and the story you want the piece to tell.</p>
        </div>
        <div className="margin-note pt-2">
          {journal.map(step => <div key={step.n} className="toc-row"><span className="toc-num">{step.n}</span><div><strong className="block text-[15px]">{step.t}</strong><span className="text-sm text-[var(--muted)]">{step.d}</span></div></div>)}
        </div>
      </section>

      {/* Services — asymmetric feature tiles, not identical cards */}
      <section id="services" className="border-y border-[var(--line)] py-20"><div className="shell">
        <p className="eyebrow">Choose your experience</p>
        <h2 className="serif mt-4 text-5xl">Your moment, our craft.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="feature-tile feature-tile-lg md:row-span-2"><h3 className="serif text-4xl">Bespoke commissions</h3><p className="mt-3 max-w-sm text-sm leading-7 text-white/70">A one-of-one piece shaped from your references, your proportions and your occasion.</p><a href={wa('Hello Maison Prisca, I would like to discuss a bespoke commission.')} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--champagne)]">Discuss a commission <ArrowRight size={14} /></a></article>
          <article className="feature-tile feature-tile-sm"><h3 className="serif text-2xl">Bridal &amp; occasion</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/70">Soft drama, intelligent fit, and the confidence to stay present in every photograph.</p><a href={wa('Hello Maison Prisca, I would like to discuss bridal or occasion dressing.')} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--champagne)]">Start your story <ArrowRight size={14} /></a></article>
          <article className="feature-tile feature-tile-sm"><h3 className="serif text-2xl">Ready-to-wear</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/70">A considered edit of pieces made to move beautifully from wardrobe to calendar.</p><Link href="/store" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[var(--champagne)]">Shop the edit <ArrowRight size={14} /></Link></article>
        </div>
      </div></section>

      {/* Signature note — left-aligned pull quote, not centered */}
      <section className="shell py-24"><div className="max-w-2xl border-t border-[var(--line)] pt-8">
        <blockquote className="pull-quote text-4xl leading-tight sm:text-5xl">"Your body is not a problem to solve. It is the canvas every beautiful detail begins with."</blockquote>
        <p className="mt-5 text-sm text-[var(--muted)]">— Maison Prisca</p>
      </div></section>

      <section className="border-y border-[var(--line)] py-16"><div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div><p className="eyebrow">The signature edit</p><h2 className="serif mt-3 text-5xl">Pieces with presence.</h2><p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">Browse published pieces, explore every product photo, choose your size, and send your order directly to WhatsApp.</p></div>
        <Link href="/store" className="btn btn-dark shrink-0">View the shop <ArrowRight size={17} /></Link>
      </div></section>
    </main>

    {/* Footer — colophon page treatment */}
    <footer id="contact" className="footer-luxury py-16 text-white"><div className="shell grid gap-12 md:grid-cols-[1fr_.9fr]">
      <div>
        <Image src="/images/logo-full-white.png" alt="Maison Prisca" width={300} height={160} className="w-[210px] object-contain" />
        <p className="mt-6 max-w-md leading-7 text-white/65">Bespoke, bridal, occasion and ready-to-wear fashion designed in Lagos.</p>
        <a href={wa('Hello Maison Prisca, I would like to make an enquiry.')} className="btn btn-grad mt-8"><MessageCircle size={17} /> WhatsApp the atelier</a>
      </div>
      <div>
        <p className="eyebrow" style={{ color: 'var(--champagne)' }}>Visit &amp; connect</p>
        <div className="mt-2">
          <div className="colophon-link"><span className="flex items-center gap-3 text-white/75"><MapPin size={16} className="text-[var(--champagne)]" /> Lagos, Nigeria</span></div>
          <a href={wa('Hello Maison Prisca, I would like to make an enquiry.')} className="colophon-link"><span className="flex items-center gap-3 text-white/75"><Phone size={16} className="text-[var(--champagne)]" /> 0814 500 0582</span><ArrowRight size={14} className="text-white/40" /></a>
          <a href="#" className="colophon-link"><span className="flex items-center gap-3 text-white/75"><Instagram size={16} className="text-[var(--champagne)]" /> Instagram</span><ArrowRight size={14} className="text-white/40" /></a>
        </div>
      </div>
    </div>
    <div className="shell mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-xs text-white/40"><span>© 2026 Maison Prisca — Lagos.</span><a href={process.env.NEXT_PUBLIC_ADMIN_SITE_URL || 'https://maison-prisca-admin.netlify.app'} className="underline">Private atelier access</a></div>
    </footer>
    <a href={wa('Hello Maison Prisca, I would like to make an enquiry.')} className="whatsapp-float" aria-label="Chat on WhatsApp"><MessageCircle size={22} /></a>
  </div>;
}
