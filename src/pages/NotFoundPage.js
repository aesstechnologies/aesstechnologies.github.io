import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import usePageMeta from '../hooks/usePageMeta';
import { siteConfig } from '../config/site';

const NotFoundPage = () => {
  usePageMeta({
    title: `Page not found | ${siteConfig.name}`,
    description: 'The page you requested could not be found.',
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <Container className="my-5 py-5 text-center">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <p className="display-1 fw-bold mb-3" style={{ color: 'var(--color-accent)' }}>
            404
          </p>
          <h1 className="h2 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
            Page not found
          </h1>
          <p className="mb-4" style={{ color: 'var(--color-textSecondary)' }}>
            The link may be outdated or mistyped. Head back home or explore Spectra — our
            UI testing product for real-time operator dashboards.
          </p>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Button
              as={Link}
              to="/"
              variant="primary"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              }}
            >
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Home
            </Button>
            <Button as={Link} to="/spectra" variant="outline-primary">
              Explore Spectra
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
