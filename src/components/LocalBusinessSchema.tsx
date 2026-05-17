import { business, deliveryAreas } from '@/content/siteContent';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://triplewrentals.com',
    name: business.name,
    description: `${business.tagline} in ${business.serviceArea}. Lithium and gas 4-seater carts available. Delivery and pickup included. 3-day minimum.`,
    image: 'https://triplewrentals.com/og-image.jpg',
    telephone: business.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tyler',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.3513,
      longitude: -95.3011,
    },
    url: 'https://triplewrentals.com',
    areaServed: deliveryAreas.cities.map((city) => ({
      '@type': 'City',
      name: `${city}, Texas`,
    })),
    openingHours: 'Mo-Su 08:00-18:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [business.googleReviewsLink],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Golf Cart Rentals',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Govecourt Lithium 4-Seater Golf Cart',
            description: 'Lithium-powered 4-seater golf cart rental. Silent, fume-free, instant torque, full event day on one overnight charge.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Govecourt Lithium Luxury 4-Seater Golf Cart',
            description: 'Lifted lithium-powered 4-seater luxury golf cart rental with premium seats and upgraded wheels. Handles grass, gravel, and uneven terrain.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Classic Gas 4-Seater Golf Cart',
            description: 'Traditional gas-powered 4-seater golf cart rental. Proven reliability for renters who prefer gas.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
