/**
 * Smoothly scrolls to the quote form with proper offset for header
 * IDENTICAL behavior on mobile and desktop - no separate paths
 */
export const scrollToForm = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }
  
  const form = document.getElementById('quote-form');
  if (!form) return;

  // Calculate header height dynamically - works for both mobile and desktop
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  
  // Add consistent breathing room
  const breathingRoom = 32;
  const offset = headerHeight + breathingRoom;
  
  // Use same calculation for mobile and desktop
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
