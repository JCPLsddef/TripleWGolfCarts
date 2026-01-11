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

  // Use larger offset on mobile to account for header and mobile bottom bar
  const isMobile = window.innerWidth < 1024;
  const offset = isMobile ? 120 : 100; // Larger offset on mobile
  
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
