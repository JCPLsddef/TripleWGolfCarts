'use client';

import { Phone, FileText } from 'lucide-react';
import { business } from '@/content/siteContent';

export function MobileBottomBar() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-3">
        <button
          onClick={scrollToForm}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          <FileText className="w-5 h-5" />
          Get Quote
        </button>
        <a
          href={business.phoneLink}
          className="flex items-center justify-center gap-2 bg-bg-900 hover:bg-bg-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
      </div>
    </div>
  );
}
