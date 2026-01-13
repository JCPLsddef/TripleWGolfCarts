'use client';

import { useState } from 'react';
import { ChevronDown, Phone, FileText } from 'lucide-react';
import { business, faqs } from '@/content/siteContent';
import { scrollToForm } from '@/lib/scroll';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-border last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none focus:bg-bg-alt rounded-lg px-2 -mx-2 transition-colors"
              >
                <span className="font-medium text-text pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <p className="text-text-muted text-sm leading-relaxed px-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-bg-alt rounded-xl p-6">
          <p className="text-text-muted mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={scrollToForm} className="btn-primary">
              <FileText className="w-5 h-5" />
              Request a Quote
            </button>
            <a href={business.phoneLink} className="btn-secondary">
              <Phone className="w-5 h-5" />
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
