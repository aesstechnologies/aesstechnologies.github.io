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

let plausibleScriptLoaded = false;
let linkedInTagLoaded = false;

/**
 * Initialize Plausible Analytics
 * Loads the script dynamically
 */
export const initPlausible = () => {
  if (plausibleScriptLoaded) return;
  
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
  plausibleScriptLoaded = true;
};

/**
 * Initialize LinkedIn Insight Tag for conversion tracking and ad attribution.
 * @see https://www.linkedin.com/help/lms/answer/a489169
 */
export const initLinkedInInsightTag = () => {
  if (linkedInTagLoaded) return;

  const partnerId = config.analytics.linkedinPartnerId;
  if (!partnerId || partnerId.includes('placeholder')) {
    return;
  }

  window._linkedin_partner_id = partnerId;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(partnerId);

  if (!window.lintrk) {
    window.lintrk = function lintrk(a, b) {
      window.lintrk.q.push([a, b]);
    };
    window.lintrk.q = [];
  }

  const firstScript = document.getElementsByTagName('script')[0];
  const insightScript = document.createElement('script');
  insightScript.type = 'text/javascript';
  insightScript.async = true;
  insightScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  firstScript.parentNode.insertBefore(insightScript, firstScript);

  linkedInTagLoaded = true;
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

const analyticsService = {
  initPlausible,
  initLinkedInInsightTag,
  trackEvent,
  trackPageView,
};

export default analyticsService;

