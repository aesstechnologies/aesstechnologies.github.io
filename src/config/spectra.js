/**
 * Spectra product configuration — Stripe Payment Links and pricing.
 * No secret keys; public Payment Link URLs only.
 */

export const spectraSupportEmail = 'hello@aesstechnologies.com';

export const spectraStripeLinks = {
  cliMonthly: 'https://buy.stripe.com/8x23cveLJ5Rac9WfNW7N605',
  uiMonthly: 'https://buy.stripe.com/3cI3cvgTR5Ra4Hu0T27N603',
  fullMonthly: 'https://buy.stripe.com/5kQ9AT3311AUfm8atC7N602',
  cliAnnual: 'https://buy.stripe.com/fZufZhgTR0wQde0eJS7N606',
  uiAnnual: 'https://buy.stripe.com/00w5kD8nl4N63Dq31a7N604',
  fullAnnual: 'https://buy.stripe.com/eVq6oHgTR6Ve0re59i7N601',
  customerPortal: 'https://billing.stripe.com/p/login/cNi3cvavt7Zi5LyatC7N600',
};

export const spectraSeo = {
  title: 'Spectra — Real-time UI Testing | AESS Technologies',
  description:
    'YAML-driven UI regression testing for browser actions, socket events, and screen baselines. CLI for CI pipelines, dashboard for QA operators. 30-day free trial on all plans.',
};

export const spectraPricing = [
  {
    id: 'cli',
    name: 'CLI',
    monthly: 49,
    annual: 490,
    audience: 'CI pipelines',
    stripeMonthly: spectraStripeLinks.cliMonthly,
    stripeAnnual: spectraStripeLinks.cliAnnual,
  },
  {
    id: 'ui',
    name: 'UI',
    monthly: 59,
    annual: 590,
    audience: 'QA operators',
    stripeMonthly: spectraStripeLinks.uiMonthly,
    stripeAnnual: spectraStripeLinks.uiAnnual,
  },
  {
    id: 'full',
    name: 'Full',
    monthly: 69,
    annual: 690,
    audience: 'Teams (CLI + UI + injector + CV)',
    stripeMonthly: spectraStripeLinks.fullMonthly,
    stripeAnnual: spectraStripeLinks.fullAnnual,
    highlighted: true,
  },
];

/** Primary hero CTA — Full tier monthly with 30-day trial */
export const spectraPrimaryCta = spectraStripeLinks.fullMonthly;

/** GitHub Release download URL — replace when first release is published */
export const spectraDownloadUrl = '#download';
