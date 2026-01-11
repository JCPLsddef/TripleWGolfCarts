import { MapPin, Info, ExternalLink } from 'lucide-react';
import { deliveryAreas, business } from '@/content/siteContent';

export function DeliveryArea() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
              {deliveryAreas.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {deliveryAreas.cities.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 text-text-muted"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{city}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary-soft border border-primary/20 rounded-lg p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-text">
                We deliver nationwide! While we're based in East Texas, we can deliver anywhere in the U.S. All delivery details are confirmed during your quote call.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-bg-alt to-border rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432181.4835694784!2d-95.70133447812499!3d32.351288799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864b5e0e0e0e0e0f%3A0x0!2sTyler%2C%20TX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tyler, TX and East Texas Service Area"
              />
            </div>
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
              Nationwide Delivery
            </div>
            <div className="mt-4 text-center">
              <a
                href={business.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium text-sm transition-colors"
              >
                <MapPin className="w-4 h-4" />
                View on Google Maps
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
