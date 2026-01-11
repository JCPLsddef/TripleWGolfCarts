import { Palmtree, Waves, Tent, PartyPopper, Heart, Home, Map, Flag } from 'lucide-react';
import { useCases } from '@/content/siteContent';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palmtree,
  Waves,
  Tent,
  PartyPopper,
  Heart,
  Home,
  Map,
  Flag,
};

export function WhereCartsShine() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
            {useCases.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {useCases.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Map;
            return (
              <div
                key={index}
                className="card text-center py-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-text">{item.label}</span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-text-muted max-w-xl mx-auto">
          {useCases.subtitle}
        </p>
      </div>
    </section>
  );
}
