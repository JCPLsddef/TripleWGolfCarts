import type { Metadata, Viewport } from 'next';
import './globals.css';
import { business } from '@/content/siteContent';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: `Lithium & Gas Golf Cart Rentals Tyler, TX | ${business.name} | Delivery Included`,
  description: 'Lithium and gas 4-seater golf cart rentals in Tyler, TX & East Texas. From $300+ (3-day min). Delivery & pickup included. Call (972) 965-6901.',
  keywords: 'golf cart rental Tyler TX, golf cart rental East Texas, Longview golf cart rental, wedding golf cart rental, RV park golf cart, resort golf cart rental, 4-seater golf cart, Club Car rental, EZGO rental, golf cart delivery Tyler, lithium golf cart rental Tyler TX, electric golf cart rental East Texas, silent golf cart wedding rental, battery powered golf cart rental, Govecourt lithium cart rental',
  openGraph: {
    title: `Lithium & Gas Golf Cart Rentals Tyler, TX | ${business.name}`,
    description: 'Lithium and gas 4-seater golf cart rentals delivered & picked up. Quiet, powerful lithium fleet or classic gas. From $300+ (3-day min). Serving Tyler & East Texas.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Lithium & Gas Golf Cart Rentals Tyler, TX | ${business.name}`,
    description: 'Lithium and gas 4-seater golf cart rentals delivered & picked up. Quiet, powerful lithium fleet or classic gas. From $300+ (3-day min).',
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
        
        {/* Google Ads Global Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10835426783"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10835426783');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
