/**
 * Spectra product configuration — Stripe Payment Links and pricing.
 * Source of truth: SpectraUI docs/WEBSITE_INTEGRATION.md
 * No secret keys; public Payment Link URLs only.
 */

export const spectraConfig = {
  trialNote: '30-day trial on all plans · prices excl. VAT where applicable',
  supportEmail: 'hello@aesstechnologies.com',
  portalUrl: 'https://billing.stripe.com/p/login/cNi3cvavt7Zi5LyatC7N600',
  /** Set when first GitHub Release tarball is published */
  downloadUrl: null,
  primaryCtaUrl: 'https://buy.stripe.com/5kQ9AT3311AUfm8atC7N602',
  seo: {
    title: 'Spectra — UI + socket + vision regression testing | AESS Technologies',
    description:
      'YAML test suites for real-time operator UIs. Socket inject, Playwright, and CV baselines in one report. 30-day trial.',
    canonical: 'https://aesstechnologies.com/spectra',
  },
  welcomeSeo: {
    title: 'Welcome to Spectra | AESS Technologies',
    description:
      'Your Spectra trial has started. Install, activate your license key, and start testing real-time operator UIs.',
  },
  tiers: [
    {
      id: 'cli',
      name: 'CLI',
      for: 'CI pipelines',
      includes: 'spectra run, JSON/HTML reports',
      monthlySek: 49,
      annualSek: 490,
      monthlyUrl: 'https://buy.stripe.com/8x23cveLJ5Rac9WfNW7N605',
      annualUrl: 'https://buy.stripe.com/fZufZhgTR0wQde0eJS7N606',
    },
    {
      id: 'ui',
      name: 'UI',
      for: 'QA operators',
      includes: 'Dashboard, suite builder, exports',
      monthlySek: 59,
      annualSek: 590,
      monthlyUrl: 'https://buy.stripe.com/3cI3cvgTR5Ra4Hu0T27N603',
      annualUrl: 'https://buy.stripe.com/00w5kD8nl4N63Dq31a7N604',
    },
    {
      id: 'full',
      name: 'Full',
      for: 'Product teams',
      includes: 'CLI + UI + injector + CV worker',
      monthlySek: 69,
      annualSek: 690,
      monthlyUrl: 'https://buy.stripe.com/5kQ9AT3311AUfm8atC7N602',
      annualUrl: 'https://buy.stripe.com/eVq6oHgTR6Ve0re59i7N601',
      highlighted: true,
    },
  ],
};

/** @deprecated Use spectraConfig — kept for minimal import churn */
export const spectraSupportEmail = spectraConfig.supportEmail;
export const spectraStripeLinks = {
  customerPortal: spectraConfig.portalUrl,
};
export const spectraSeo = spectraConfig.seo;
export const spectraPricing = spectraConfig.tiers;
export const spectraPrimaryCta = spectraConfig.primaryCtaUrl;
export const spectraDownloadUrl = spectraConfig.downloadUrl;
