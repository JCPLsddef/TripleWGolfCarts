import { Star } from 'lucide-react';
import { business } from '@/content/siteContent';

export function FirstScroll() {
  return (
    <section className="py-12 lg:py-16 bg-bg-alt border-y border-border">
      <div className="container-default">
        <div className="max-w-4xl mx-auto">
          {/* Pricing Clarity */}
          <div className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-text mb-2">Standard Carts</h3>
                <p className="text-2xl font-bold text-primary mb-1">$300 for 3 days</p>
                <p className="text-sm text-text-muted">3-day minimum • Can rent longer</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-text mb-2">Luxury Carts</h3>
                <p className="text-2xl font-bold text-primary mb-1">$450 for 3 days</p>
                <p className="text-sm text-text-muted">3-day minimum • Can rent longer</p>
              </div>
            </div>
            <p className="text-center text-sm text-text-muted max-w-2xl mx-auto">
              3-day minimum rental. Need more days? Just let us know your dates for exact pricing. Final price depends on location, duration, and number of carts.
            </p>
          </div>

          {/* Social Proof */}
          <div className="border-t border-border pt-10">
            <div className="text-center mb-8">
              <p className="text-base text-text-muted mb-6">
                Used for major events like the Great Southwest Equestrian Center shows
              </p>
            </div>

            {/* Google Rating Block */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <div className="grid grid-cols-3 gap-6 text-center stats-mobile-row">
                {/* Column 1: Google Rating with stars */}
                <div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-text">{business.rating}</div>
                  <div className="text-xs text-text-muted mt-1">Google Rating</div>
                </div>
                {/* Column 2: Reviews with empty placeholder for alignment */}
                <div className="border-x border-border">
                  <div className="flex justify-center mb-2" style={{ visibility: 'hidden' }}>
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-text">{business.reviewCount}</div>
                  <div className="text-xs text-text-muted mt-1">Reviews</div>
                </div>
                {/* Column 3: Day Minimum with empty placeholder for alignment */}
                <div>
                  <div className="flex justify-center mb-2" style={{ visibility: 'hidden' }}>
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-text">{business.minimumRental}+</div>
                  <div className="text-xs text-text-muted mt-1">Day Minimum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
