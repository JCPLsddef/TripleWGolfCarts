declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: any[]) => void;
  }
}

type TrackingEvent =
  | 'form_submit_quote'
  | 'click_call_now'
  | 'click_request_quote'
  | 'click_read_reviews'
  | 'phone_call_click'
  | 'form_start'
  | 'form_step_completed';

export function trackEvent(eventName: TrackingEvent, eventData?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    // Track with dataLayer (GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });

    // Also track with Google Ads / GA4 if available
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  }
}

// Track phone call clicks (for Google Ads call conversion)
export function trackPhoneClick(source: string = 'unknown') {
  trackEvent('click_call_now', {
    event_category: 'engagement',
    event_label: `phone_click_${source}`,
    conversion_event: true,
  });
}

// Track form submission (for Google Ads lead conversion)
export function trackFormSubmit(formData?: { cart_type?: string; location?: string }) {
  trackEvent('form_submit_quote', {
    event_category: 'conversion',
    event_label: 'quote_request_submitted',
    conversion_event: true,
    ...formData,
  });
}

// Track form interactions for optimization
export function trackFormStart() {
  trackEvent('form_start', {
    event_category: 'engagement',
    event_label: 'quote_form_started',
  });
}

export function trackFormStep(step: number) {
  trackEvent('form_step_completed', {
    event_category: 'engagement',
    event_label: `quote_form_step_${step}`,
    step_number: step,
  });
}
