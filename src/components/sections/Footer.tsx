'use client';

import { Phone, MapPin } from 'lucide-react';
import { business, finalCta } from '@/content/siteContent';
import { scrollToTop } from '@/lib/scroll';

export function Footer() {
  return (
    <footer className="bg-bg-800 border-t border-border-dark">
      <div className="container-default py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity mx-auto md:mx-0"
              aria-label="Scroll to top"
            >
              <img
                src={business.logo}
                alt={`${business.name} Logo`}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="text-left">
                <div className="font-bold text-white">{business.name}</div>
                <div className="text-xs text-white/60">{business.tagline}</div>
              </div>
            </button>
            <p className="text-white/60 text-sm text-center md:text-left">
              Premium golf cart rentals delivered to your door in Tyler and East Texas.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href={business.phoneLink}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {business.phone}
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                {business.serviceArea}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Hours</h4>
            <p className="text-white/60 text-sm mb-4">{business.hours}</p>
            <p className="text-white/60 text-sm">
              Response time: {business.responseTime}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border-dark">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
            <p className="text-white/40 text-xs text-center sm:text-right">
              {finalCta.disclaimer}
            </p>
          </div>
        </div>
      </div>

      <div className="h-16 lg:hidden" />
    </footer>
  );
}
