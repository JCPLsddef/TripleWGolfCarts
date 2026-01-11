export interface Testimonial {
  name: string;
  title: string;
  text: string;
  rating: number;
}

export const business = {
  name: 'Triple W Rentals',
  tagline: 'Golf Cart Rentals',
  logo: 'https://static.wixstatic.com/media/62f926_5c14016a71f74c77a7eedfa86309eadd~mv2.jpg',
  phone: '(972) 965-6901',
  phoneLink: 'tel:+19729656901',
  smsLink: 'sms:+19729656901',
  serviceArea: 'Tyler, Texas and East Texas',
  googleReviewsLink: 'https://maps.app.goo.gl/XonURzK5Pi9PX1j58',
  googleMapsLink: 'https://maps.app.goo.gl/wfrfy6869PhiRZ3PA',
  rating: 4.8,
  reviewCount: 188,
  minimumRental: 3,
  hours: 'Mon-Sun 8AM-6PM',
  responseTime: '30 minutes during business hours',
};

export const hero = {
  headline: '4-Seater Golf Cart Rentals in Tyler, TX — Delivered & Picked Up',
  scarcityBadge: 'Limited fleet — weekends fill fast',
  offerLine: 'Tyler + East Texas • Delivery + Pickup Included • 4-Seaters Only • 3-Day Minimum',
  pricingAnchor: 'Standard from $300+ | Luxury from $450+ (3-day minimum)',
  benefits: [
    'Delivery + pickup included',
    'Clean, fully charged carts',
    `${business.rating}★ from ${business.reviewCount} Google reviews`,
  ],
  ctaMicrocopy: 'No obligation. We confirm availability + exact total first.',
};

export const whyChooseUs = {
  title: 'Why Choose Triple W Rentals',
  features: [
    {
      title: 'Delivery & Pickup Included',
      description: 'We bring the cart to you and pick it up when you\'re done. No hassle.',
    },
    {
      title: 'Clean & Fully Charged',
      description: 'Every cart is inspected, cleaned, and arrives with a full battery.',
    },
    {
      title: 'Local & Responsive',
      description: 'Real people answering your calls. Fast quotes, clear communication.',
    },
    {
      title: 'Trusted by Hundreds',
      description: `${business.reviewCount} Google reviews with ${business.rating}★ rating. We deliver on our promises.`,
    },
  ],
};

export const cartTypes = [
  {
    id: 'standard',
    name: 'Standard 4-Seater',
    description: 'Reliable, comfortable, and perfect for most needs.',
    image: 'https://static.wixstatic.com/media/62f926_73745cfd9a974580b10944854a2c0275~mv2.jpeg',
    priceFrom: 'From $300+',
    priceNote: '3-day minimum',
    features: [
      'Seats 4 passengers comfortably',
      'Electric motor - quiet operation',
      'Headlights and taillights',
      'Weather canopy included',
    ],
    popular: false,
  },
  {
    id: 'luxury',
    name: 'Luxury 4-Seater',
    description: 'Premium features for a superior experience.',
    image: 'https://static.wixstatic.com/media/62f926_e9d8f493c6d94bc3914ee436e5706070~mv2.jpeg',
    priceFrom: 'From $450+',
    priceNote: '3-day minimum',
    features: [
      'Upgraded seating with armrests',
      'Extended range battery',
      'Premium sound system',
      'Custom wheels and trim',
    ],
    popular: true,
  },
];

export const useCases = {
  title: 'Where Our Carts Shine',
  subtitle: 'If it requires moving around with comfort and convenience, our carts fit perfectly.',
  items: [
    { icon: 'Palmtree', label: 'Resorts' },
    { icon: 'Waves', label: 'Beach Towns' },
    { icon: 'Tent', label: 'Campgrounds + RV Parks' },
    { icon: 'PartyPopper', label: 'Events' },
    { icon: 'Heart', label: 'Weddings' },
    { icon: 'Home', label: 'Private Property' },
    { icon: 'Map', label: 'Neighborhood Tours' },
    { icon: 'Flag', label: 'Golf Outings' },
  ],
};

export const howItWorks = {
  title: 'How It Works',
  steps: [
    {
      number: 1,
      title: 'Request a Quote',
      description: 'Tell us your dates, location, and how many carts you need.',
    },
    {
      number: 2,
      title: 'Get Your Total',
      description: 'We confirm availability and send exact pricing — no surprises.',
    },
    {
      number: 3,
      title: 'We Deliver & Pick Up',
      description: 'Enjoy your rental. We handle delivery and pickup.',
    },
  ],
  expectations: [
    'Clean carts',
    'Battery charged',
    'Delivery window confirmed',
    'Pickup scheduled',
  ],
};

export const whatHappensNext = [
  'We confirm availability',
  'We send exact total + delivery window',
  'You approve — then we deliver + pick up',
];

export const testimonials: Testimonial[] = [
  {
    name: "Giovanna Iriel",
    title: "Highly Recommend Triple W Rentals!",
    text: "If you're looking for hassle-free, top-notch golf cart rentals, Triple W Rentals is the way to go! Their customer service was outstanding—so personable, responsive, and accommodating. They made the entire process seamless by delivering our luxury golf cart right to our stalls at the horse show. The night before, they even texted me a picture to confirm delivery, so we didn't have to worry about a thing. No need to go off-site for pickup or drop-off—they handled everything! The golf cart was in excellent condition, super clean, and incredibly comfortable—perfect for getting around all week at the show. I can't recommend Triple W Rentals enough for their convenience and service. Will definitely rent from them again!",
    rating: 5
  },
  {
    name: "Daniel Henson",
    title: "Excellent Customer Service",
    text: "Have rented from this company many times. They have excellent customer service and the RV has always been in great shape. What stands out about this company is the convenience. They will deliver a golf cart and RV to wherever you're at and you don't have to touch a thing.",
    rating: 5
  },
  {
    name: "Kay Flock",
    title: "Amazing Company",
    text: "Triple W RV and golf cart rentals is such an amazing company. They make sure everything is good and are very helpful to ensure your visit is a safe and good one. I highly recommend this company to anyone that needs an RV or golf cart rented.",
    rating: 5
  },
  {
    name: "Weston Shaffer",
    title: "Top Notch Service",
    text: "Have used this company many times for RV rentals, golf cart rentals, and RV transportation. The service is top notch! Highly recommend!",
    rating: 5
  },
  {
    name: "Julia Feliciano",
    title: "Luxury Cart and Beautiful RV",
    text: "Me and my family went to Great Southwest Equestrian Center for a horse show. We rented an RV and a golf cart from this company. Triple W Rentals offers their \"Luxury Cart\" and we opted for that option. The golf cart was extremely luxurious and had very comfortable seats that we loved! We also rented an RV from this company for the horse show too! The RV was beautiful, clean, and perfect for our family! If you want the best company with the best service, Triple W Rentals should be your go-to provider. Highly recommend!",
    rating: 5
  },
  {
    name: "Ashley Ellis",
    title: "Wonderful Experience",
    text: "We had a wonderful experience renting a golf cart for the Katy horse show at Greater Southwest! Westin was so helpful and got us fixed up with a really nice golf cart. We will definitely be using them again in the future!",
    rating: 5
  }
];

export const deliveryAreas = {
  title: 'We Deliver Throughout Tyler, Texas and East Texas',
  cities: [
    'Tyler',
    'Longview',
    'Jacksonville',
    'Henderson',
    'Lindale',
    'Whitehouse',
    'Kilgore',
    'Marshall',
    'Canton',
    'Athens',
    'Mineola',
    'Gladewater',
  ],
  note: 'Delivery fees depend on distance. We confirm exact pricing before booking.',
};

export const pricing = {
  title: 'Transparent Pricing',
  subtitle: 'Standard 4-seater carts from $300+ (3-day min). Luxury 4-seater carts from $450+ (3-day min). Exact total depends on dates, delivery location, and number of carts.',
  trustMessage: 'We confirm total pricing before you commit — no hidden fees or surprises.',
  priceFactors: [
    'Rental duration (3-day minimum)',
    'Delivery distance from Tyler, TX',
    'Number of carts needed (1-6 available)',
    'Cart type: Standard or Luxury',
    'Peak season / weekend rates',
  ],
  included: [
    'Delivery to your location',
    'Pickup when rental ends',
    'Fully charged battery',
    'Clean, inspected cart',
    'Phone support during rental',
  ],
};

export const faqs = [
  {
    question: 'How much do golf cart rentals cost in Tyler, TX?',
    answer: 'Standard 4-seater carts start from $300+ for a 3-day minimum. Luxury 4-seater carts start from $450+ for 3 days. Final price depends on rental duration, delivery distance, and cart type. Call (972) 965-6901 for an exact quote.',
  },
  {
    question: 'Do you deliver to RV parks and resorts?',
    answer: 'Yes! We deliver to RV parks, resorts, campgrounds, and event venues throughout Tyler and East Texas. Delivery and pickup are included.',
  },
  {
    question: 'Can I rent golf carts for a wedding?',
    answer: 'Absolutely. Wedding transportation is one of our specialties. Our 4-seater carts are perfect for large venues, helping guests move between ceremony and reception areas. Book early — weddings fill our calendar fast.',
  },
  {
    question: "What's the minimum rental period?",
    answer: '3-day minimum on all cart rentals. This applies to both standard and luxury 4-seater carts.',
  },
  {
    question: 'How fast do you respond to quote requests?',
    answer: 'Usually within 30 minutes during business hours (Mon-Sun 8AM-6PM). Text is fastest. Call (972) 965-6901 or submit a quote form.',
  },
  {
    question: 'Do you deliver and pick up the carts?',
    answer: 'Yes. Delivery and pickup are included throughout Tyler and East Texas. We coordinate timing with you and handle all logistics.',
  },
  {
    question: 'What cities do you serve in East Texas?',
    answer: 'We deliver to Tyler, Longview, Jacksonville, Henderson, Lindale, Whitehouse, Kilgore, Marshall, Canton, Athens, Mineola, Gladewater, and surrounding East Texas communities.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'As early as possible. Weekends and holidays book fast. 2-4 weeks ahead is recommended, especially for events and peak summer season.',
  },
  {
    question: 'Are your carts fully charged?',
    answer: 'Yes. Every cart arrives fully charged and inspected. We include phone support during your rental if you have any questions.',
  },
  {
    question: 'What brands of golf carts do you rent?',
    answer: 'We rent Club Car and EZGO golf carts. All are 4-seater models, clean, and well-maintained.',
  },
];

export const finalCta = {
  headline: 'Comfortable, Clean, Stress-Free Mobility — Delivered to You',
  benefits: [
    'Delivery + pickup handled',
    'Responsive team available',
    'Premium appearance',
    'Simple, clear process',
  ],
  disclaimer: 'Rates vary by dates and location. 3-day minimum rental.',
};
