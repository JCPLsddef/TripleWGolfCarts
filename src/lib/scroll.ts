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
  
  // CRITICAL FIX: Get absolute position from top of document
  // offsetTop gives position relative to offsetParent, need to traverse up
  let absoluteTop = 0;
  let element = form as HTMLElement | null;
  
  while (element) {
    absoluteTop += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  
  // Calculate final scroll position
  const targetScrollPosition = absoluteTop - offset;
  
  window.scrollTo({
    top: targetScrollPosition,
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
