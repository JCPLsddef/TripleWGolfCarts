'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { business } from '@/content/siteContent';
import { scrollToForm } from '@/lib/scroll';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToForm = (e: React.MouseEvent) => {
    scrollToForm(e);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <img
              src={business.logo}
              alt={`${business.name} Logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <div className={`font-bold text-lg ${isScrolled ? 'text-text' : 'text-white'}`}>
                {business.name}
              </div>
              <div className={`text-xs ${isScrolled ? 'text-text-muted' : 'text-white/70'}`}>
                {business.tagline}
              </div>
            </div>
          </div>

          <div className={`hidden lg:flex items-center gap-2 text-sm ${isScrolled ? 'text-text-muted' : 'text-white/80'}`}>
            <span>Fast quotes by phone</span>
            <span className="mx-2">•</span>
            <span>Speak to a human</span>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleScrollToForm}
              className="btn-primary"
            >
              Get Your Exact Quote
            </button>
            <a
              href={business.phoneLink}
              className={`btn-secondary ${!isScrolled ? '!bg-white/10 !text-white !border-white/30 hover:!bg-white/20' : ''}`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'text-text' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <div className="container-default py-4 space-y-3">
            <button
              onClick={handleScrollToForm}
              className="btn-primary w-full"
            >
              Get Your Exact Quote
            </button>
            <a
              href={business.phoneLink}
              className="btn-secondary w-full"
            >
              <Phone className="w-4 h-4" />
              Call Now: {business.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
