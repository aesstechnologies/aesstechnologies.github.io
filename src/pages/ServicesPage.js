import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFlask } from '@fortawesome/free-solid-svg-icons';
import ServiceCard from '../components/ServiceCard';
import { services } from '../config/services';
import { spectraConfig } from '../config/spectra';

/**
 * Services Page
 * Displays all available services in a modern card layout
 * Mobile-first responsive design
 */
const ServicesPage = () => {
  return (
    <Container className="my-4 my-md-5">
      <Row className="mb-4 mb-md-5">
        <Col xs={12} className="text-center">
          <h1 className="display-5 fw-bold mb-3">
            <FontAwesomeIcon icon={faCode} className="me-2" style={{ color: 'var(--color-primary)' }} />
            Our Services
          </h1>
          <p className="lead" style={{ color: 'var(--color-textSecondary)' }}>
            Custom software development and our Spectra test-automation product.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <Card
            className="border-0 shadow-sm"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderLeft: '4px solid var(--color-accent) !important',
            }}
          >
            <Card.Body className="p-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faFlask} style={{ color: 'var(--color-accent)' }} />
                  <Card.Title as="h2" className="h4 mb-0">
                    Spectra
                  </Card.Title>
                  <Badge bg="primary">Product</Badge>
                </div>
                <Card.Text className="mb-0" style={{ color: 'var(--color-textSecondary)' }}>
                  YAML-driven UI + socket + computer-vision regression. Self-serve subscriptions
                  with CLI, UI, and Full tiers — 30-day trial.
                </Card.Text>
              </div>
              <div className="d-flex flex-wrap gap-2 flex-shrink-0">
                <Button
                  as={Link}
                  to="/spectra"
                  variant="primary"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-accent)',
                  }}
                >
                  View Spectra
                </Button>
                <Button
                  as="a"
                  href={spectraConfig.primaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-primary"
                >
                  Start trial
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <h2 className="h5 fw-semibold mb-0" style={{ color: 'var(--color-textSecondary)' }}>
            Custom development services
          </h2>
        </Col>
      </Row>

      <Row className="g-4">
        {services.map((service) => (
          <Col xs={12} sm={6} lg={3} key={service.id}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col xs={12} className="text-center">
          <p className="text-muted">
            Need help choosing the right service?{' '}
            <a href="/contact" style={{ color: 'var(--color-primary)' }}>
              Contact us
            </a>{' '}
            for a free consultation.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;
