'use client';

import { Phone, Check, Star } from 'lucide-react';
import { business, hero } from '@/content/siteContent';
import { QuoteForm } from './QuoteForm';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-900 via-bg-800 to-bg-900 pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="container-default relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning-soft text-warning text-sm font-medium mb-6">
              {hero.scarcityBadge}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {hero.headline}
            </h1>

            <p className="text-base text-blue-100 mb-4 leading-relaxed">
              {hero.subheadline}
            </p>

            <p className="text-lg text-blue-100 mb-2 font-medium">
              {hero.offerLine}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 mb-6">
              <span className="text-white font-bold text-lg">{hero.pricingAnchor}</span>
            </div>

            <div className="space-y-3 mb-8">
              {hero.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <a
                href={business.phoneLink}
                className="inline-flex items-center gap-3 bg-white hover:bg-bg-alt text-bg-900 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Call Now: {business.phone}
              </a>
              <p className="text-sm text-white/60">
                {hero.ctaMicrocopy}
              </p>
            </div>

            <div className="mt-10 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-white font-semibold mb-3">Real Carts. Real Team. Real Reviews.</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="flex justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-white font-bold text-xl">{business.rating}</div>
                  <div className="text-white/60 text-xs">Google Rating</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-white font-bold text-xl">{business.reviewCount}</div>
                  <div className="text-white/60 text-xs">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-xl">{business.minimumRental}+</div>
                  <div className="text-white/60 text-xs">Day Minimum</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
