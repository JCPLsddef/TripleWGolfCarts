import { Star, ExternalLink } from 'lucide-react';
import { business, testimonials } from '@/content/siteContent';
import { TestimonialCard } from './TestimonialCard';

export function Testimonials() {
  return (
    <section className="section-padding bg-bg-alt">
      <div className="container-default">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white border border-border rounded-full px-5 py-2.5 mb-4 shadow-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-text font-bold text-lg">{business.rating}</span>
            <span className="text-border">|</span>
            <span className="text-text-muted">{business.reviewCount} reviews</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-2">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>

        <div className="text-center">
          <a
            href={business.googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary-soft px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
          >
            Read All Google Reviews
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
