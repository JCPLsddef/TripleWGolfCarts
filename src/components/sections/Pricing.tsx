'use client';

import { Phone, FileText, Check, DollarSign, ShieldCheck } from 'lucide-react';
import { business, pricing } from '@/content/siteContent';
import { scrollToForm } from '@/lib/scroll';

export function Pricing() {

  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            {pricing.title}
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            {pricing.subtitle}
          </p>
        </div>

        <div className="bg-success-soft border border-success/20 rounded-xl p-4 max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-6 h-6 text-success flex-shrink-0" />
            <p className="text-success font-medium text-center">
              {pricing.trustMessage}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text">What Affects Your Price</h3>
            </div>
            <ul className="space-y-3">
              {pricing.priceFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                  <span className="text-primary">•</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success-soft rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-text">What's Included</h3>
            </div>
            <ul className="space-y-3">
              {pricing.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-text-muted">
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="btn-primary"
            >
              <FileText className="w-5 h-5" />
              Get Exact Total
            </button>
            <a
              href={business.phoneLink}
              className="btn-secondary"
            >
              <Phone className="w-5 h-5" />
              Call Now {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
