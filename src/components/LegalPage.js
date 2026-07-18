import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const LegalPage = ({ title, description, lastUpdated, children }) => {
  useEffect(() => {
    document.title = `${title} | AESS Technologies`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    return () => {
      document.title = 'AESS Technologies - Digitalization on Demand';
    };
  }, [title, description]);

  return (
    <Container className="my-4 my-md-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <h1 className="display-6 fw-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {title}
          </h1>
          <p className="text-muted small mb-4">Last updated: {lastUpdated}</p>
          <div
            className="legal-content text-start"
            style={{ color: 'var(--color-textSecondary)', lineHeight: 1.75 }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LegalPage;
