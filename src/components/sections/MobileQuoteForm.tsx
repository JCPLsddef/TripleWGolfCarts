'use client';

import { QuoteForm } from './QuoteForm';

export function MobileQuoteForm() {
  return (
    <section id="mobile-quote-section" className="section-padding bg-bg-alt lg:hidden">
      <div className="container-default">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text mb-2">Get Your Quote</h2>
          <p className="text-text-muted">
            Tell us your dates and location. We'll confirm availability and pricing fast.
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
