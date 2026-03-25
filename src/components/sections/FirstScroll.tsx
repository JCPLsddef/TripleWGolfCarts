import { Star } from 'lucide-react';
import { business } from '@/content/siteContent';

export function FirstScroll() {
  return (
    <section className="py-12 lg:py-16 bg-bg-alt border-y border-border">
      <div className="container-default">
        <div className="max-w-4xl mx-auto">
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
