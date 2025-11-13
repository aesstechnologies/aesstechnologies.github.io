import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import ServiceCard from '../components/ServiceCard';
import { services } from '../config/services';

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
            We offer a wide range of services, including custom software
            development, web development, mobile app development, platform engineering, and more.
          </p>
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
