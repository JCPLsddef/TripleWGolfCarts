import { business, deliveryAreas } from '@/content/siteContent';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://triplewrentals.com',
    name: business.name,
    description: `${business.tagline} in ${business.serviceArea}. Delivery and pickup included. 4-seater carts only. 3-day minimum.`,
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
            name: 'Standard 4-Seater Golf Cart',
            description: 'Reliable, comfortable 4-seater golf cart rental',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Luxury 4-Seater Golf Cart',
            description: 'Premium 4-seater golf cart rental with upgraded features',
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
