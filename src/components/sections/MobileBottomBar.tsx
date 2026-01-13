'use client';

import { Phone, FileText } from 'lucide-react';
import { business } from '@/content/siteContent';
import { useState, useEffect } from 'react';
import { scrollToForm } from '@/lib/scroll';

export function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height
      const heroSection = document.querySelector('section');
      const heroHeight = heroSection?.offsetHeight || 600;
      
      // Get form position
      const form = document.getElementById('quote-form');
      const formRect = form?.getBoundingClientRect();
      
      // Show after scrolling past hero, hide when form is in view
      const scrolledPastHero = window.scrollY > heroHeight;
      const formInView = formRect ? formRect.top < window.innerHeight && formRect.bottom > 0 : false;
      
      setIsVisible(scrolledPastHero && !formInView);
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-lg lg:hidden transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <button
          onClick={scrollToForm}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2.5 px-3 rounded-lg font-semibold transition-colors text-sm"
        >
          <FileText className="w-4 h-4" />
          Check Availability
        </button>
        <a
          href={business.phoneLink}
          className="flex items-center justify-center gap-2 bg-bg-900 hover:bg-bg-800 text-white py-2.5 px-3 rounded-lg font-semibold transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </div>
  );
}
