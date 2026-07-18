import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import usePageMeta from '../hooks/usePageMeta';
import { siteConfig } from '../config/site';

const PortfolioPage = () => {
  usePageMeta({
    title: `Portfolio | ${siteConfig.name}`,
    description:
      'Client case studies from AESS Technologies — custom software, platforms, and real-time operator UIs.',
    canonicalPath: '/portfolio',
  });

  return (
    <Container className="my-4 my-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card
            className="text-center border-0 shadow-sm p-4 p-md-5"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              size="3x"
              className="mb-4"
              style={{ color: 'var(--color-accent)' }}
            />
            <Card.Title as="h1" className="h2 fw-bold mb-3">
              Case studies coming soon
            </Card.Title>
            <Card.Text className="mb-4" style={{ color: 'var(--color-textSecondary)' }}>
              We are preparing public write-ups from recent engagements — platform
              engineering, healthtech dashboards, and IoT operator UIs. In the meantime,
              explore <Link to="/spectra">Spectra</Link>, our product for testing real-time
              web applications, or get in touch about your project.
            </Card.Text>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Button
                as={Link}
                to="/spectra"
                variant="primary"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                }}
              >
                Explore Spectra
              </Button>
              <Button as={Link} to="/contact" variant="outline-primary">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                Contact us
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PortfolioPage;
