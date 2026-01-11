'use client';

import { Check, Crown } from 'lucide-react';
import { cartTypes, cartComparison, perfectFor } from '@/content/siteContent';

export function ChooseYourCart() {
  const scrollToForm = () => {
    const form = document.getElementById('quote-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            Choose Your Cart
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Both options include delivery, pickup, and our full support during your rental.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cartTypes.map((cart) => (
            <div
              key={cart.id}
              className={`card relative ${
                cart.popular ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {cart.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Crown className="w-3 h-3" />
                    {cart.badge}
                  </span>
                </div>
              )}

              <div className="aspect-video bg-gradient-to-br from-bg-alt to-border rounded-lg mb-4 overflow-hidden">
                <img
                  src={cart.image}
                  alt={`${cart.name} - Golf Cart Rental`}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-text mb-1">{cart.name}</h3>
              {cart.subtitle && (
                <p className="text-primary text-sm font-semibold mb-2">{cart.subtitle}</p>
              )}
              <p className="text-text-muted text-sm mb-3">{cart.description}</p>

              <div className="mb-4 pb-4 border-b border-border">
                <div className="text-2xl font-bold text-primary">{cart.priceFrom}</div>
                <div className="text-sm text-text-muted">{cart.priceNote}</div>
              </div>

              <ul className="space-y-2 mb-4">
                {cart.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {cart.perfectFor && (
                <div className="mb-6 p-3 bg-primary-soft/30 rounded-lg border border-primary/20">
                  <p className="text-xs font-semibold text-primary mb-1">Perfect if you want:</p>
                  <p className="text-sm text-text">{cart.perfectFor}</p>
                </div>
              )}

              <button
                onClick={scrollToForm}
                className={`w-full ${cart.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                Get Your Exact Quote
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="card bg-bg-alt border-primary/20">
            <h3 className="text-lg font-bold text-text mb-4 text-center">{cartComparison.title}</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-text text-sm mb-1">Standard:</p>
                  <p className="text-text-muted text-sm">{cartComparison.standard}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-text text-sm mb-1">Premium:</p>
                  <p className="text-text-muted text-sm">{cartComparison.premium}</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border text-center">
              <p className="text-primary font-medium text-sm">{cartComparison.helpText}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-text mb-6">{perfectFor.title}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {perfectFor.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-left p-4 bg-white rounded-lg border border-border">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-text font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
