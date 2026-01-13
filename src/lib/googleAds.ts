/**
 * Google Ads conversion tracking
 * Fire ONLY on successful form submission
 */

/**
 * Track form submission as Google Ads conversion
 * Call this ONLY after successful submission (not on click, not on error)
 */
export const trackConversion = () => {
  if (typeof window === 'undefined') return;
  
  const gtag = (window as any).gtag;
  if (!gtag) {
    console.warn('Google Ads gtag not loaded');
    return;
  }

  try {
    // Fire conversion event
    gtag('event', 'conversion', {
      'send_to': 'AW-10835426783/CONVERSION_LABEL', // TODO: Replace with real conversion label from Google Ads
    });
    
    console.log('✅ Google Ads conversion tracked');
  } catch (error) {
    console.error('❌ Error tracking Google Ads conversion:', error);
  }
};
