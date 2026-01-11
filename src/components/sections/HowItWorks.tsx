import { Check } from 'lucide-react';
import { howItWorks } from '@/content/siteContent';

export function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            {howItWorks.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {howItWorks.steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                {step.title}
              </h3>
              <p className="text-text-muted text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-success-soft border border-success/20 rounded-xl p-6">
          <h4 className="text-center font-semibold text-text mb-4">What you can expect</h4>
          <div className="flex flex-wrap justify-center gap-6">
            {howItWorks.expectations.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-sm text-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
