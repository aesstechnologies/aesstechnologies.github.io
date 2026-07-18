import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faCode,
  faDesktop,
  faEye,
  faFileCode,
  faHeartPulse,
  faIndustry,
  faLayerGroup,
  faPlay,
  faPlug,
  faRobot,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import {
  spectraDownloadUrl,
  spectraPricing,
  spectraPrimaryCta,
  spectraSeo,
  spectraStripeLinks,
  spectraSupportEmail,
} from '../config/spectra';

const formatSek = (amount) =>
  new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
  }).format(amount);

const StripeLink = ({ href, children, variant = 'primary', size, className = '' }) => (
  <Button
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variant={variant}
    size={size}
    className={className}
    style={
      variant === 'primary'
        ? { backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }
        : undefined
    }
  >
    {children}
  </Button>
);

const SectionHeading = ({ title, subtitle }) => (
  <Row className="mb-4 mb-md-5">
    <Col xs={12} className="text-center">
      <h2 className="display-6 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="lead mb-0" style={{ color: 'var(--color-textSecondary)' }}>
          {subtitle}
        </p>
      )}
    </Col>
  </Row>
);

const SpectraPage = () => {
  useEffect(() => {
    document.title = spectraSeo.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = spectraSeo.description;

    return () => {
      document.title = 'AESS Technologies - Digitalization on Demand';
    };
  }, []);

  const problemItems = [
    {
      icon: faLayerGroup,
      title: 'Split tooling',
      text: 'Browser automation, socket testing, and visual regression live in separate tools — hard to keep suites in sync.',
    },
    {
      icon: faPlug,
      title: 'Hard to simulate device events',
      text: 'Real-time dashboards and operator UIs depend on Socket.IO and hardware signals that generic E2E frameworks ignore.',
    },
    {
      icon: faWrench,
      title: 'Slow QA–DevOps feedback',
      text: 'Manual checks and brittle scripts delay releases when teams need fast, repeatable regression on live UIs.',
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      icon: faFileCode,
      title: 'Write YAML',
      text: 'Define browser actions, socket events, and screen baselines in readable suite files.',
    },
    {
      step: 2,
      icon: faPlay,
      title: 'Run',
      text: 'Execute from the CLI in CI or from the Spectra dashboard for interactive QA.',
    },
    {
      step: 3,
      icon: faBolt,
      title: 'Inject & assert',
      text: 'Simulate device events, capture screenshots, and compare against baselines automatically.',
    },
    {
      step: 4,
      icon: faEye,
      title: 'Report',
      text: 'Get clear pass/fail results with visual diffs and logs your whole team can trust.',
    },
  ];

  const audienceItems = [
    {
      icon: faHeartPulse,
      title: 'Healthtech operator UIs',
      text: 'Validate clinical and monitoring interfaces where accuracy and traceability matter.',
    },
    {
      icon: faRobot,
      title: 'IoT & robotics dashboards',
      text: 'Test control panels that react to live telemetry and command streams.',
    },
    {
      icon: faIndustry,
      title: 'Real-time monitoring',
      text: 'Regression-test Socket.IO dashboards and alerting views under realistic event loads.',
    },
  ];

  const afterSubscribeSteps = [
    'Check your email for a JWT license key (delivered by spectra-license-server).',
    'Download the Spectra tarball from the release below.',
    'Run npm run setup, then npm run ui to launch the dashboard.',
    'Open Profile → Activate and paste your license key.',
    `Need help? Email ${spectraSupportEmail}.`,
  ];

  return (
    <div className="spectra-page">
      {/* Hero */}
      <Container className="my-4 my-md-5">
        <Row className="align-items-center g-4 g-lg-5">
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <Badge
              bg="secondary"
              className="mb-3 px-3 py-2"
              style={{ backgroundColor: 'var(--color-surfaceElevated) !important' }}
            >
              Spectra by AESS Technologies
            </Badge>
            <h1
              className="display-5 fw-bold mb-3"
              style={{ color: 'var(--color-text)' }}
            >
              Test real-time UIs the way operators see them
            </h1>
            <p className="lead mb-4" style={{ color: 'var(--color-textSecondary)' }}>
              YAML suites for browser actions, socket events, and screen baselines —
              dashboard for QA, CLI for CI.
            </p>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
              <StripeLink href={spectraPrimaryCta}>Start 30-day trial</StripeLink>
              <Button variant="outline-primary" href="#pricing">
                View pricing
              </Button>
              <Button
                variant="link"
                href={`mailto:${spectraSupportEmail}`}
                style={{ color: 'var(--color-primary)' }}
              >
                Contact sales
              </Button>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div
              className="spectra-demo-placeholder rounded-3 d-flex flex-column align-items-center justify-content-center"
              style={{
                aspectRatio: '16 / 10',
                backgroundColor: 'var(--color-surface)',
                border: '2px dashed var(--color-border)',
                minHeight: '220px',
              }}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                size="3x"
                className="mb-3"
                style={{ color: 'var(--color-primary)', opacity: 0.6 }}
              />
              <p className="text-muted small mb-0 px-3 text-center">
                Demo preview — replace with public/spectra-demo.gif when available
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Problem */}
      <Container className="my-5 py-4">
        <SectionHeading
          title="Why teams need Spectra"
          subtitle="Operator-facing UIs need more than click-and-wait automation."
        />
        <Row xs={1} md={3} className="g-4">
          {problemItems.map((item) => (
            <Col key={item.title}>
              <Card
                className="h-100 text-center shadow-sm border-0"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <Card.Body className="p-4">
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="2x"
                    className="mb-3"
                    style={{ color: 'var(--color-primary)' }}
                  />
                  <Card.Title as="h3" className="h5 fw-bold">
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{ color: 'var(--color-textSecondary)' }}>
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* How it works */}
      <Container className="my-5 py-4">
        <SectionHeading title="How it works" />
        <Row xs={1} sm={2} lg={4} className="g-4">
          {howItWorksSteps.map((item) => (
            <Col key={item.step}>
              <Card
                className="h-100 text-center shadow-sm border-0"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <Card.Body className="p-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 fw-bold"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-background)',
                    }}
                  >
                    {item.step}
                  </div>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mb-3 d-block mx-auto"
                    style={{ color: 'var(--color-accent)', fontSize: '1.5rem' }}
                  />
                  <Card.Title as="h3" className="h5 fw-bold">
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{ color: 'var(--color-textSecondary)' }}>
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Who it's for */}
      <Container className="my-5 py-4">
        <SectionHeading title="Who it's for" />
        <Row xs={1} md={3} className="g-4">
          {audienceItems.map((item) => (
            <Col key={item.title}>
              <Card
                className="h-100 shadow-sm border-0"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderLeft: '4px solid var(--color-accent) !important',
                }}
              >
                <Card.Body className="p-4">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="me-2"
                    style={{ color: 'var(--color-accent)' }}
                  />
                  <Card.Title as="h3" className="h5 fw-bold d-inline">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="mt-2 mb-0" style={{ color: 'var(--color-textSecondary)' }}>
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Pricing */}
      <Container id="pricing" className="my-5 py-4 scroll-margin-top">
        <SectionHeading
          title="Pricing"
          subtitle="All plans include a 30-day free trial. Prices in SEK."
        />
        <Row className="justify-content-center">
          <Col xs={12} xl={10}>
            <div className="table-responsive">
              <Table
                hover
                className="align-middle mb-0"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                }}
              >
                <thead>
                  <tr style={{ borderColor: 'var(--color-border)' }}>
                    <th>Tier</th>
                    <th>For</th>
                    <th>Monthly</th>
                    <th>Annual</th>
                    <th className="text-center">Subscribe</th>
                  </tr>
                </thead>
                <tbody>
                  {spectraPricing.map((tier) => (
                    <tr
                      key={tier.id}
                      style={{
                        borderColor: 'var(--color-border)',
                        backgroundColor: tier.highlighted
                          ? 'var(--color-surfaceElevated)'
                          : undefined,
                      }}
                    >
                      <td className="fw-bold">
                        {tier.name}
                        {tier.highlighted && (
                          <Badge bg="primary" className="ms-2">
                            Popular
                          </Badge>
                        )}
                      </td>
                      <td style={{ color: 'var(--color-textSecondary)' }}>{tier.audience}</td>
                      <td>{formatSek(tier.monthly)}/mo</td>
                      <td>{formatSek(tier.annual)}/yr</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          <StripeLink href={tier.stripeMonthly} size="sm">
                            Monthly
                          </StripeLink>
                          <StripeLink href={tier.stripeAnnual} variant="outline-primary" size="sm">
                            Annual
                          </StripeLink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <p className="text-center mt-4 mb-0 small" style={{ color: 'var(--color-textMuted)' }}>
              Manage billing anytime via the{' '}
              <a
                href={spectraStripeLinks.customerPortal}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-primary)' }}
              >
                Stripe Customer Portal
              </a>
              .
            </p>
          </Col>
        </Row>
      </Container>

      {/* After you subscribe */}
      <Container className="my-5 py-4">
        <SectionHeading title="After you subscribe" />
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <ol
              className="ps-3"
              style={{ color: 'var(--color-textSecondary)', lineHeight: 1.8 }}
            >
              {afterSubscribeSteps.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))}
            </ol>
          </Col>
        </Row>
      </Container>

      {/* Download */}
      <Container id="download" className="my-5 py-4 scroll-margin-top">
        <SectionHeading
          title="Download"
          subtitle="Spectra Full includes CLI, UI dashboard, injector, and computer-vision regression."
        />
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Button variant="secondary" disabled size="lg">
              <FontAwesomeIcon icon={faCode} className="me-2" />
              Download Spectra Full (Linux) — Coming soon
            </Button>
            <p className="mt-3 small mb-0" style={{ color: 'var(--color-textMuted)' }}>
              Release URL placeholder: {spectraDownloadUrl}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Page footer links */}
      <Container className="my-5 py-4 border-top" style={{ borderColor: 'var(--color-border) !important' }}>
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <p className="mb-3" style={{ color: 'var(--color-textSecondary)' }}>
              <Link to="/contact" style={{ color: 'var(--color-primary)' }}>
                Contact
              </Link>
              {' · '}
              <a
                href={spectraStripeLinks.customerPortal}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-primary)' }}
              >
                Customer Portal
              </a>
              {' · '}
              <a
                href={`mailto:${spectraSupportEmail}`}
                style={{ color: 'var(--color-primary)' }}
              >
                {spectraSupportEmail}
              </a>
            </p>
            {/* TODO: Link Terms and Privacy pages when added site-wide before go-live */}
            <p className="small mb-0" style={{ color: 'var(--color-textMuted)' }}>
              Terms &amp; Privacy pages — coming soon
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SpectraPage;
