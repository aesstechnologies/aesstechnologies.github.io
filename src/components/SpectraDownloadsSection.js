import React from 'react';
import { Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import {
  useSpectraDownloads,
  SPECTRA_TIER_META,
  SPECTRA_TIER_ORDER,
  tierHasDownloads,
  formatBuildBadge,
} from '../hooks/useSpectraDownloads';
import SpectraDownloadButtons from './SpectraDownloadButtons';

/**
 * Full download section with per-tier anchors for /spectra#download-{tier}.
 */
const SpectraDownloadsSection = () => {
  const { tiers, hasDownloads, loading } = useSpectraDownloads();

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" size="sm" role="status">
          <span className="visually-hidden">Loading downloads…</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Row xs={1} lg={3} className="g-4">
      {SPECTRA_TIER_ORDER.map((tierId) => {
        const meta = SPECTRA_TIER_META[tierId];
        const tierData = tiers[tierId];
        const available = tierHasDownloads(tierData);
        const badge = formatBuildBadge(tierData);

        return (
          <Col key={tierId}>
            <Card
              id={`download-${tierId}`}
              className="h-100 shadow-sm border-0 scroll-margin-top"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderTop: meta.highlighted
                  ? '3px solid var(--color-accent)'
                  : '3px solid var(--color-border)',
              }}
            >
              <Card.Body className="p-4 d-flex flex-column text-center">
                <div className="mb-2">
                  <Card.Title as="h3" className="h5 fw-bold d-inline">
                    Spectra {meta.label}
                  </Card.Title>
                  {meta.highlighted && (
                    <Badge bg="primary" className="ms-2">
                      Popular
                    </Badge>
                  )}
                </div>
                <Card.Text
                  className="small mb-2"
                  style={{ color: 'var(--color-textSecondary)' }}
                >
                  {meta.description}
                </Card.Text>
                {badge && (
                  <p className="small text-muted mb-3">{badge}</p>
                )}
                <div className="mt-auto">
                  {available ? (
                    <SpectraDownloadButtons tier={tierId} size="sm" />
                  ) : (
                    <p className="small text-muted mb-0">Coming soon</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
      {!hasDownloads && (
        <Col xs={12}>
          <p className="text-center text-muted mb-0">
            Downloads will appear here after the first customer build sync.
          </p>
        </Col>
      )}
    </Row>
  );
};

export default SpectraDownloadsSection;
