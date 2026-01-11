'use client';

import { Check, Crown } from 'lucide-react';
import { cartTypes } from '@/content/siteContent';

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
              {cart.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Crown className="w-3 h-3" />
                    Most Popular
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

              <h3 className="text-xl font-bold text-text mb-2">{cart.name}</h3>
              <p className="text-text-muted text-sm mb-3">{cart.description}</p>

              <div className="mb-4 pb-4 border-b border-border">
                <div className="text-2xl font-bold text-primary">{cart.priceFrom}</div>
                <div className="text-sm text-text-muted">{cart.priceNote}</div>
              </div>

              <ul className="space-y-2 mb-6">
                {cart.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToForm}
                className={`w-full ${cart.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                Get Quote for {cart.name.replace(' 4-Seater', '')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
