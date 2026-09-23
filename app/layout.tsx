import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Maison Prisca Atelier | Lagos Fashion Designer',
  description: 'Maison Prisca Atelier creates confident ready-to-wear, bespoke, bridal and occasion fashion in Lagos, designed around your occasion, measurements and presence.',
  metadataBase: new URL('https://priscastyling-customer.netlify.app'),
  icons: { icon: '/icon.png', apple: '/icon.png' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
