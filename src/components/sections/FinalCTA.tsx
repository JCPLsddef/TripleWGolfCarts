'use client';

import { Phone, ArrowRight, Truck, Users, Sparkles, Check } from 'lucide-react';
import { business, finalCta } from '@/content/siteContent';
import { scrollToForm } from '@/lib/scroll';

const icons = [Truck, Users, Sparkles, Check];

export function FinalCTA() {

  return (
    <section className="section-padding bg-bg-900">
      <div className="container-default text-center">
        <p className="text-xl text-primary mb-3 font-semibold">
          {finalCta.preheadline}
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          {finalCta.headline}
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {finalCta.benefits.map((benefit, index) => {
            const Icon = icons[index];
            return (
              <div
                key={benefit}
                className="flex items-center gap-2 text-white/80"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span>{benefit}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
          >
            {finalCta.ctaText}
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={business.phoneLink}
            className="btn-ghost"
          >
            <Phone className="w-5 h-5" />
            Call Now: {business.phone}
          </a>
        </div>

        <p className="text-white/50 text-sm">
          {business.hours}
        </p>
      </div>
    </section>
  );
}
