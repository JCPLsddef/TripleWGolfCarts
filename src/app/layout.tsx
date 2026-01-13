import type { Metadata, Viewport } from 'next';
import './globals.css';
import { business } from '@/content/siteContent';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  minimumScale: 1,
  userScalable: true,
};

export const metadata: Metadata = {
  title: `${business.name} | 4-Seater Golf Cart Rentals Tyler, TX | Delivery Included`,
  description: '4-seater golf cart rentals in Tyler, TX & East Texas. From $300+ (3-day min). Delivery & pickup included. Perfect for weddings, RV parks, resorts & events. Fast quotes. Call (972) 965-6901.',
  keywords: 'golf cart rental Tyler TX, golf cart rental East Texas, Longview golf cart rental, wedding golf cart rental, RV park golf cart, resort golf cart rental, 4-seater golf cart, Club Car rental, EZGO rental, golf cart delivery Tyler',
  openGraph: {
    title: `${business.name} | 4-Seater Golf Cart Rentals Tyler, TX`,
    description: '4-seater golf cart rentals delivered & picked up. From $300+ (3-day min). Serving Tyler & East Texas.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
