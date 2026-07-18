/**
 * Spectra product configuration — Stripe Payment Links and pricing.
 * Source of truth: SpectraUI docs/WEBSITE_INTEGRATION.md
 * No secret keys; public Payment Link URLs only.
 */

export const spectraConfig = {
  trialNote: '30-day trial on all plans · prices excl. VAT where applicable',
  supportEmail: 'hello@aesstechnologies.com',
  portalUrl: 'https://billing.stripe.com/p/login/cNi3cvavt7Zi5LyatC7N600',
  /** @deprecated Use /spectra-downloads.json via useSpectraDownloads */
  downloadUrl: null,
  primaryCtaUrl: 'https://buy.stripe.com/5kQ9AT3311AUfm8atC7N602',
  seo: {
    title: 'Spectra — UI + socket + vision regression testing | AESS Technologies',
    description:
      'YAML test suites for real-time operator UIs. Socket inject, Playwright, and CV baselines in one report. 30-day trial.',
    canonical: 'https://www.aesstechnologies.com/spectra',
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
  faq: [
    {
      question: 'How does the 30-day trial work?',
      answer:
        'Choose a plan and complete checkout via Stripe. Your trial starts immediately. You will receive a license key by email within a few minutes. Cancel anytime during the trial from the Stripe Customer Portal.',
    },
    {
      question: 'Which download matches my plan?',
      answer:
        'CLI subscribers download the CLI build. UI subscribers download the UI build. Full includes CLI, dashboard, injector, and computer-vision worker — download the Full package.',
    },
    {
      question: 'Where is my license key?',
      answer:
        'It is emailed to the address you used at Stripe checkout from licenses@aesstechnologies.com. Check spam. Allow up to five minutes after payment.',
    },
    {
      question: 'Can I run Spectra in CI?',
      answer:
        'Yes. CLI and Full tiers include the spectra run command for headless pipelines. The same YAML suites run in the dashboard and in CI.',
    },
    {
      question: 'What stack does Spectra require?',
      answer:
        'Node 20+, Python 3.11+, and Chromium (installed via Playwright during setup). Linux, macOS, and Windows builds are available.',
    },
    {
      question: 'How is Spectra different from Playwright alone?',
      answer:
        'Playwright excels at browser automation. Spectra adds socket event injection and screen baselines in the same YAML suite — built for real-time operator dashboards, not static forms.',
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
