/**
 * Smoothly scrolls to the quote form with proper offset for mobile and desktop
 * Ensures the form title is fully visible after scroll
 */
export const scrollToForm = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  const form = document.getElementById('quote-form');
  if (!form) return;

  // Mobile needs much larger offset to ensure form is fully visible
  // Account for: sticky header (64px) + breathing room (100px) = 164px minimum
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  let offset;
  if (isMobile) {
    offset = 180; // Mobile: generous offset for full visibility
  } else if (isTablet) {
    offset = 140; // Tablet: moderate offset
  } else {
    offset = 100; // Desktop: standard offset
  }
  
  const elementPosition = form.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
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
