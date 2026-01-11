import { Truck, Sparkles, MessageCircle, Star } from 'lucide-react';
import { whyChooseUs } from '@/content/siteContent';

const icons = [Truck, Sparkles, MessageCircle, Star];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-default">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            {whyChooseUs.title}
          </h2>
          <p className="text-lg text-text mb-4">
            {whyChooseUs.description}
          </p>
          <p className="text-base text-primary font-medium mb-3">
            {whyChooseUs.confirmation}
          </p>
          <p className="text-sm text-text-muted italic">
            {whyChooseUs.trustLine}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
