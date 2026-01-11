export const BUSINESS = {
  name: 'Triple W Rentals',
  phone: '(972) 965-6901',
  phoneLink: 'tel:+19729656901',
  smsLink: 'sms:+19729656901',
  serviceArea: 'Tyler, Texas and East Texas',
  googleReviewsLink: 'https://maps.app.goo.gl/XonURzK5Pi9PX1j58',
  rating: 4.8,
  reviewCount: 188,
  minimumRental: 3,
  hours: 'Mon-Sun 8AM-6PM',
  responseSLA: 'usually within 30 minutes during business hours',
  offerLine: 'Tyler + East Texas • Delivery + Pickup • 4-seaters only • 3-day minimum',
  scarcityBadge: 'Limited fleet — weekends fill fast',
  deliveryCopy: 'Delivery included in Tyler. Outside Tyler: we confirm a distance fee before booking — no surprises.',
  startingPrice: '$__',
};

export const DELIVERY_AREAS = [
  'Tyler',
  'Longview',
  'Jacksonville',
  'Canton',
  'Athens',
  'Henderson',
  'Lindale',
  'Whitehouse',
  'Bullard',
  'Flint',
  'Mineola',
  'Kilgore',
  'Marshall',
  'Palestine',
  'Nacogdoches',
];

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=1920',
  standardCart: 'https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&w=800',
  luxuryCart: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=800',
  trustGallery: {
    cart1: 'https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&w=400',
    cart2: 'https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=400',
    delivery: 'https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  gallery: {
    wedding: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600',
    resort: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600',
    campground: 'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg?auto=compress&cs=tinysrgb&w=600',
    event: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
};

export const CART_TYPES = [
  { value: 'standard', label: 'Standard 4-Seater' },
  { value: 'luxury', label: 'Luxury 4-Seater' },
  { value: 'not_sure', label: 'Not Sure' },
] as const;

export const CART_QUANTITY_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 1);

export const CONTACT_METHODS = [
  { value: 'call', label: 'Phone Call' },
  { value: 'text', label: 'Text Message' },
] as const;

export const BEST_TIMES = [
  { value: 'asap', label: 'ASAP' },
  { value: 'morning', label: 'Morning (8AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-5PM)' },
  { value: 'evening', label: 'Evening (5PM-7PM)' },
] as const;
