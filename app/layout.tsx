import type { Metadata } from 'next';
import DemoNotice from '@/components/DemoNotice';
import MobileNav from '@/components/MobileNav';
import './globals.css';
export const metadata: Metadata = {
  title: 'Maison Prisca Atelier | Lagos Fashion Store Demo',
  description: 'Browse the published Maison Prisca fashion collection, choose a size, build your bag and prepare an order for WhatsApp.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_PUBLIC_SITE_URL || 'https://maison-prisca-customer.netlify.app'),
  icons: { icon: '/icon.png', apple: '/icon.png' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><DemoNotice/>{children}<MobileNav/></body></html>;
}
