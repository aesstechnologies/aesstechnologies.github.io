import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { config } from '../config/env';

const Footer = () => {
  const { features } = config;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-4 py-md-5" style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3" style={{ color: 'var(--color-text)' }}>AESS Technologies</h5>
            <p className="text-muted small mb-0">
              Digitalization on Demand
            </p>
            <p className="text-muted small mt-2 mb-0">
              Liberagatan 32<br />
              417 52 Göteborg, Sweden
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h6 className="fw-semibold mb-3" style={{ color: 'var(--color-text)' }}>Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  Services
                </Link>
              </li>
              {features.enablePortfolio && (
                <li className="mb-2">
                  <Link to="/portfolio" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                    Portfolio
                  </Link>
                </li>
              )}
              {features.enableBlog && (
                <li className="mb-2">
                  <Link to="/blog" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                    Blog
                  </Link>
                </li>
              )}
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h6 className="fw-semibold mb-3" style={{ color: 'var(--color-text)' }}>Contact</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">
                <Link to="/contact" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  Get in Touch
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-muted text-decoration-none" style={{ color: 'var(--color-textSecondary)' }}>
                  Request a Quote
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4" style={{ borderColor: 'var(--color-border)' }} />
        <Row>
          <Col xs={12} className="text-center">
            <p className="text-muted small mb-0">
              &copy; {currentYear} AESS Technologies. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

