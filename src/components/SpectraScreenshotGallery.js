import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { marketingScreenshots, screenshotUrl } from '../data/marketingScreenshots';

const SpectraScreenshotGallery = ({ ids = null, title = 'See Spectra in action' }) => {
  const items = ids
    ? marketingScreenshots.filter((s) => ids.includes(s.id))
    : marketingScreenshots;

  return (
    <div className="spectra-screenshot-gallery">
      {title && (
        <h2 className="h4 fw-bold text-center mb-4 mb-md-5" style={{ color: 'var(--color-text)' }}>
          {title}
        </h2>
      )}
      <Row xs={1} md={2} className="g-4">
        {items.map((shot) => (
          <Col key={shot.id}>
            <Card className="h-100 border-0 shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
              <img
                src={screenshotUrl(shot.file)}
                alt={shot.title}
                className="w-100 d-block"
                loading="lazy"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              />
              <Card.Body>
                <Card.Title as="h3" className="h6 fw-bold mb-2">
                  {shot.title}
                </Card.Title>
                <Card.Text className="small mb-0" style={{ color: 'var(--color-textSecondary)' }}>
                  {shot.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SpectraScreenshotGallery;
