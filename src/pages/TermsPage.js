import React from 'react';
import LegalPage from '../components/LegalPage';
import { spectraConfig } from '../config/spectra';

const LAST_UPDATED = '18 July 2026';

const TermsPage = () => (
  <LegalPage
    title="Terms of Service"
    description="Terms of Service for AESS Technologies websites and Spectra software subscriptions."
    lastUpdated={LAST_UPDATED}
  >
    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      1. Agreement
    </h2>
    <p>
      These Terms of Service (&quot;Terms&quot;) govern your use of websites operated by Advanced
      Engineering for Software Solutions (&quot;AESS Technologies&quot;, &quot;we&quot;, &quot;us&quot;)
      and subscription access to Spectra software. By using our sites or subscribing to Spectra, you
      agree to these Terms.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      2. Services
    </h2>
    <p>
      AESS Technologies provides custom software development services and commercial software
      products. Spectra is licensed as a subscription service. Features available to you depend on
      the plan purchased (CLI, UI, or Full).
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      3. Subscriptions and trials
    </h2>
    <p>
      Spectra subscriptions are billed through Stripe. All plans include a 30-day free trial unless
      stated otherwise at checkout. After the trial, your selected plan renews automatically at the
      price shown unless you cancel via the Stripe Customer Portal before the renewal date.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      4. License keys
    </h2>
    <p>
      Upon successful subscription, you receive a license key by email. Keys are personal to your
      organization and must not be shared publicly or resold. You are responsible for keeping your
      key confidential and for activity under your account.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      5. Acceptable use
    </h2>
    <p>You agree not to:</p>
    <ul>
      <li>Reverse engineer, decompile, or attempt to extract source code except where permitted by law</li>
      <li>Circumvent license enforcement or share keys outside your licensed organization</li>
      <li>Use the software for unlawful purposes or to infringe third-party rights</li>
      <li>Interfere with or disrupt our services, license server, or infrastructure</li>
    </ul>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      6. Intellectual property
    </h2>
    <p>
      AESS Technologies retains all rights in Spectra, our websites, and related materials. Your
      subscription grants a limited, non-exclusive, non-transferable license to use Spectra according
      to your plan for the subscription term.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      7. Disclaimer and limitation of liability
    </h2>
    <p>
      Software and websites are provided &quot;as is&quot; to the extent permitted by applicable law.
      AESS Technologies is not liable for indirect, incidental, or consequential damages. Our total
      liability for any claim relating to Spectra is limited to the fees you paid to us in the twelve
      months before the claim.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      8. Governing law
    </h2>
    <p>
      These Terms are governed by the laws of Sweden. Disputes shall be subject to the exclusive
      jurisdiction of the courts of Gothenburg, Sweden, unless mandatory consumer protection rules
      require otherwise.
    </p>

    <h2 className="h4 fw-semibold mt-4" style={{ color: 'var(--color-text)' }}>
      9. Contact
    </h2>
    <p>
      AESS Technologies<br />
      Liberagatan 32, 417 52 Göteborg, Sweden<br />
      <a href={`mailto:${spectraConfig.supportEmail}`}>{spectraConfig.supportEmail}</a>
    </p>
  </LegalPage>
);

export default TermsPage;
