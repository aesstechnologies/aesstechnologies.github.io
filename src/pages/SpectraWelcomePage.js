import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { spectraConfig } from '../config/spectra';

const SpectraWelcomePage = () => {
  useEffect(() => {
    document.title = spectraConfig.welcomeSeo.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = spectraConfig.welcomeSeo.description;

    return () => {
      document.title = 'AESS Technologies - Digitalization on Demand';
    };
  }, []);

  const { supportEmail, portalUrl, downloadUrl } = spectraConfig;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <Card className="text-center p-4 p-md-5 shadow-sm" style={{ backgroundColor: 'var(--color-surface)' }}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="4x"
              className="text-success mb-4"
            />
            <Card.Title as="h1" className="h2 mb-3">
              Welcome to Spectra
            </Card.Title>
            <Card.Text className="lead mb-4" style={{ color: 'var(--color-textSecondary)' }}>
              Your 30-day trial has started. Check your email for your license key.
            </Card.Text>

            <Alert variant="success" className="text-start mb-4">
              <ol className="mb-0 ps-3" style={{ lineHeight: 1.8 }}>
                <li className="mb-3">
                  <strong>Check your email</strong> — We sent a <strong>license key</strong> (long JWT
                  string). Copy the whole key.
                  <br />
                  <small className="text-muted">
                    Didn&apos;t receive it within 5 minutes? Check spam or contact{' '}
                    <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
                  </small>
                </li>
                <li className="mb-3">
                  <strong>Download Spectra</strong> —{' '}
                  {downloadUrl ? (
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                      Download Spectra Full (Linux)
                    </a>
                  ) : (
                    <span>
                      <Link to="/spectra#download">Download Spectra Full (Linux)</Link> — coming soon
                    </span>
                  )}
                </li>
                <li className="mb-3">
                  <strong>Install</strong> — Extract the archive, then in a terminal:
                  <pre
                    className="mt-2 mb-0 p-2 rounded small"
                    style={{ backgroundColor: 'var(--color-surfaceElevated)' }}
                  >
                    npm run setup{'\n'}npm run ui
                  </pre>
                  <small className="text-muted d-block mt-1">
                    Requires Node 20+, Python 3.11+, Chromium (Playwright installs automatically).
                  </small>
                </li>
                <li className="mb-3">
                  <strong>Activate</strong> — Open the dashboard → <strong>Profile</strong> →{' '}
                  <strong>Subscription</strong> → paste key → <strong>Activate key</strong>
                </li>
                <li>
                  <strong>Manage billing</strong> —{' '}
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer">
                    Stripe Customer Portal
                  </a>
                </li>
              </ol>
            </Alert>

            <div className="d-flex gap-2 justify-content-center flex-wrap">
              <Button
                as={Link}
                to="/spectra#download"
                variant="primary"
                style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
              >
                Download Spectra
              </Button>
              <Button as="a" href={`mailto:${supportEmail}`} variant="secondary">
                Get help
              </Button>
              <Button as={Link} to="/spectra" variant="outline-primary">
                Back to Spectra overview
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SpectraWelcomePage;
