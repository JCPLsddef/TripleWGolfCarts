'use client';

import Script from 'next/script';

interface GoogleAdsTrackingProps {
  conversionId?: string; // e.g., "AW-123456789"
}

export function GoogleAdsTracking({ conversionId }: GoogleAdsTrackingProps) {
  // If no conversion ID is provided, don't render tracking scripts
  if (!conversionId) {
    return null;
  }

  return (
    <>
      {/* Google Ads Global Site Tag */}
      <Script
        id="google-ads-gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${conversionId}');
          `,
        }}
      />
    </>
  );
}

// Helper function to track conversions
export function trackGoogleAdsConversion(
  conversionId: string,
  conversionLabel: string,
  value?: number
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value || 0,
      currency: 'USD',
    });
  }
}

// Helper function to track phone calls
export function trackPhoneCall() {
  if (typeof window !== 'undefined') {
    // Track with dataLayer for GTM
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'phone_call_click',
        event_category: 'engagement',
        event_label: 'phone_number_clicked',
      });
    }

    // Track with gtag for Google Ads
    if ((window as any).gtag) {
      (window as any).gtag('event', 'phone_call', {
        event_category: 'engagement',
        event_label: 'click_to_call',
      });
    }
  }
}

// Helper function to track form submissions
export function trackFormSubmission(formName: string = 'quote_form') {
  if (typeof window !== 'undefined') {
    // Track with dataLayer for GTM
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submit',
        event_category: 'conversion',
        event_label: formName,
      });
    }

    // Track with gtag for Google Ads
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: formName,
      });
    }
  }
}
