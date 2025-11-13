/**
 * Plausible Analytics Integration (Self-hosted)
 * Privacy-focused, open-source analytics
 * 
 * To set up self-hosted Plausible:
 * 1. Deploy Plausible on your server (see https://plausible.io/docs/self-hosting)
 * 2. Update REACT_APP_PLAUSIBLE_SCRIPT_URL to point to your self-hosted instance
 * 3. Update REACT_APP_PLAUSIBLE_DOMAIN to your domain
 */

import { config } from '../config/env';

let scriptLoaded = false;

/**
 * Initialize Plausible Analytics
 * Loads the script dynamically
 */
export const initPlausible = () => {
  if (scriptLoaded) return;
  
  const domain = config.analytics.plausibleDomain;
  const scriptUrl = config.analytics.plausibleScriptUrl;

  if (!domain || !scriptUrl || scriptUrl.includes('placeholder')) {
    console.warn('Plausible Analytics not configured. Please set REACT_APP_PLAUSIBLE_DOMAIN and REACT_APP_PLAUSIBLE_SCRIPT_URL in your .env file.');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = domain;
  script.src = scriptUrl;
  script.async = true;

  // Add to document
  document.head.appendChild(script);
  scriptLoaded = true;
};

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {object} props - Additional properties (optional)
 */
export const trackEvent = (eventName, props = {}) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  } else {
    console.log('Plausible event (not tracked):', eventName, props);
  }
};

/**
 * Track page view
 * This is usually handled automatically by Plausible, but can be called manually if needed
 */
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview');
  }
};

export default {
  initPlausible,
  trackEvent,
  trackPageView,
};

