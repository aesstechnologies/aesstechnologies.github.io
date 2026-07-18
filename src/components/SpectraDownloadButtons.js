import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useSpectraDownloads, spectraDownloadLabels } from '../hooks/useSpectraDownloads';

const platformOrder = ['linux', 'macos', 'windows'];

/**
 * Download buttons driven by public/spectra-downloads.json
 * (synced from SpectraUI releases via build-customer workflow).
 */
const SpectraDownloadButtons = ({ size = 'lg', className = '' }) => {
  const { downloads, hasDownloads, loading } = useSpectraDownloads();

  if (loading) {
    return (
      <div className={`d-flex justify-content-center ${className}`}>
        <Spinner animation="border" size="sm" role="status">
          <span className="visually-hidden">Loading downloads…</span>
        </Spinner>
      </div>
    );
  }

  if (!hasDownloads) {
    return (
      <Button variant="secondary" disabled size={size} className={className}>
        <FontAwesomeIcon icon={faCode} className="me-2" />
        Download Spectra Full — Coming soon
      </Button>
    );
  }

  return (
    <div className={`d-flex flex-wrap gap-2 justify-content-center ${className}`}>
      {platformOrder.map((platform) => {
        const entry = downloads[platform];
        if (!entry?.url) {
          return null;
        }

        return (
          <Button
            key={platform}
            as="a"
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size={size}
            style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
          >
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Spectra Full ({spectraDownloadLabels[platform]})
          </Button>
        );
      })}
    </div>
  );
};

export default SpectraDownloadButtons;
