import React from 'react';
import LegalPage from '../components/LegalPage';
import { spectraConfig } from '../config/spectra';

const LAST_UPDATED = '18 July 2026';

const RefundPolicyPage = () => (
  <LegalPage
    title="Refund Policy"
    description="Refund policy for Spectra subscriptions sold by AESS Technologies."
    lastUpdated={LAST_UPDATED}
  >
    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      1. Free trial
    </h2>
    <p>
      All Spectra plans include a 30-day free trial. No charge is made during the trial if you cancel
      before it ends. Cancel anytime via the{' '}
      <a href={spectraConfig.portalUrl} target="_blank" rel="noopener noreferrer">
        Stripe Customer Portal
      </a>
      .
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      2. 14-day refund window
    </h2>
    <p>
      If you are charged after your trial and are not satisfied, you may request a full refund within
      <strong> 14 days</strong> of your first paid invoice. Contact{' '}
      <a href={`mailto:${spectraConfig.supportEmail}`}>{spectraConfig.supportEmail}</a> with the email
      address used at checkout and your invoice reference.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      3. After 14 days
    </h2>
    <p>
      Subscription fees are generally non-refundable after the 14-day window, except where required
      by mandatory consumer protection law. You may cancel at any time to stop future renewals; access
      continues until the end of the current billing period.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      4. How refunds are processed
    </h2>
    <p>
      Approved refunds are returned to the original payment method through Stripe. Processing times
      depend on your bank or card issuer, typically 5–10 business days.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      5. License on refund
    </h2>
    <p>
      When a refund is issued for a Spectra subscription, the associated license key is revoked at
      the end of the refund processing period. Continued use of Spectra after a refund requires a new
      active subscription.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      6. Custom services
    </h2>
    <p>
      Refunds for custom development services quoted through AESS Technologies are handled under the
      separate agreement for that project. This policy applies to Spectra software subscriptions.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      7. Contact
    </h2>
    <p>
      Questions about billing or refunds:{' '}
      <a href={`mailto:${spectraConfig.supportEmail}`}>{spectraConfig.supportEmail}</a>
    </p>
  </LegalPage>
);

export default RefundPolicyPage;
