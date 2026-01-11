'use client';

import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  text: string;
  rating: number;
}

export function TestimonialCard({ name, title, text, rating }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract initials from full name
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Truncate text at ~150 characters with word boundary
  const getTruncatedText = (fullText: string): string => {
    if (fullText.length <= 150) return fullText;

    const truncated = fullText.slice(0, 150);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
  };

  const shouldTruncate = text.length > 150;
  const displayText = isExpanded ? text : getTruncatedText(text);

  return (
    <div className="card">
      {/* Stars and Quote Icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1" aria-hidden="true">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-400 fill-yellow-400 star-animated"
            />
          ))}
        </div>
        <span className="sr-only">{rating} out of 5 stars</span>
        <Quote className="w-5 h-5 text-border" />
      </div>

      {/* Review Title */}
      <h3 className="text-base sm:text-lg font-bold text-text mb-2">
        {title}
      </h3>

      {/* Review Text */}
      <p className="text-text-muted text-sm leading-relaxed mb-2">
        "{displayText}"
      </p>

      {/* Read More / Show Less */}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary-hover text-sm font-medium transition-colors mb-4"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* User Info */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center">
            <span className="text-primary font-medium text-sm">
              {getInitials(name)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-text font-medium text-sm">{name}</span>
            <span className="text-text-muted text-xs">Verified Customer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
