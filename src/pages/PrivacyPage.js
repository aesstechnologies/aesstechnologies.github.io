import React from 'react';
import LegalPage from '../components/LegalPage';
import { spectraConfig } from '../config/spectra';

const LAST_UPDATED = '18 July 2026';

const PrivacyPage = () => (
  <LegalPage
    title="Privacy Policy"
    description="How AESS Technologies collects, uses, and protects personal data on aesstechnologies.com and Spectra subscriptions."
    lastUpdated={LAST_UPDATED}
  >
    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      1. Data controller
    </h2>
    <p>
      Advanced Engineering for Software Solutions (AESS Technologies)<br />
      Liberagatan 32, 417 52 Göteborg, Sweden<br />
      Email: <a href={`mailto:${spectraConfig.supportEmail}`}>{spectraConfig.supportEmail}</a>
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      2. What we collect
    </h2>
    <p>Depending on how you interact with us, we may process:</p>
    <ul>
      <li>Contact details (name, email, phone, company) when you reach out or subscribe</li>
      <li>Billing and subscription data processed by Stripe (we do not store full card numbers)</li>
      <li>License activation metadata required to deliver and support Spectra subscriptions</li>
      <li>Anonymous usage analytics on our website (see section 4)</li>
    </ul>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      3. How we use data
    </h2>
    <p>We use personal data to:</p>
    <ul>
      <li>Provide websites, services, and Spectra subscriptions</li>
      <li>Send license keys, transactional emails, and support responses</li>
      <li>Process payments and manage billing through Stripe</li>
      <li>Improve our products and comply with legal obligations</li>
    </ul>
    <p>
      Legal bases under GDPR include contract performance, legitimate interests, and consent where
      required (for example marketing communications).
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      4. Analytics
    </h2>
    <p>
      We use privacy-focused, self-hosted Plausible Analytics on our website. Plausible does not use
      cookies for tracking and collects aggregated visit statistics without building individual
      profiles for advertising.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      5. Processors and sharing
    </h2>
    <p>We share data with service providers only as needed to operate our business, including:</p>
    <ul>
      <li>Stripe — payment processing and subscription management</li>
      <li>Email delivery providers — license keys and transactional messages</li>
      <li>Hosting providers — website and license server infrastructure</li>
    </ul>
    <p>We do not sell personal data.</p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      6. Retention
    </h2>
    <p>
      We retain data for as long as needed to provide services, meet legal requirements, and resolve
      disputes. Subscription and billing records are kept according to applicable accounting rules.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      7. Your rights
    </h2>
    <p>
      If you are in the EEA, you may have rights to access, rectify, erase, restrict, or port your
      data, and to object to certain processing. Contact us at{' '}
      <a href={`mailto:${spectraConfig.supportEmail}`}>{spectraConfig.supportEmail}</a>. You may also
      lodge a complaint with your local supervisory authority.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      8. Security
    </h2>
    <p>
      We apply reasonable technical and organizational measures to protect personal data. No method of
      transmission or storage is completely secure; please use strong credentials and protect your
      license keys.
    </p>
  </LegalPage>
);

export default PrivacyPage;
