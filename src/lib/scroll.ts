/**
 * Smoothly scrolls to the quote form with proper offset for mobile
 * Desktop behavior remains unchanged (native scroll)
 */
export const scrollToForm = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  const form = document.getElementById('quote-form');
  if (!form) return;

  // Check if mobile (viewport width < 1024px which is Tailwind's lg breakpoint)
  const isMobile = window.innerWidth < 1024;

  if (isMobile) {
    // Mobile: smooth scroll with offset
    const offset = 80; // Offset so form title is visible
    const elementPosition = form.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    // Desktop: native scroll
    form.scrollIntoView({ behavior: 'smooth' });
  }
};

/**
 * Smoothly scrolls to the top of the page
 */
export const scrollToTop = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
