import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDownload } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from '../services/analytics';
import {
  useSpectraDownloads,
  spectraDownloadLabels,
  SPECTRA_TIER_META,
  SPECTRA_TIER_ORDER,
  tierHasDownloads,
  formatBuildBadge,
} from '../hooks/useSpectraDownloads';

const platformOrder = ['linux', 'macos', 'windows'];

/**
 * Download buttons for one or all Spectra tiers (from public/spectra-downloads.json).
 * @param {string} [tier] - 'cli' | 'ui' | 'full' — omit for all tiers with downloads
 */
const SpectraDownloadButtons = ({
  tier = null,
  size = 'lg',
  className = '',
  showBuildBadge = false,
}) => {
  const { tiers, getTier, hasDownloads, loading } = useSpectraDownloads();

  if (loading) {
    return (
      <div className={`d-flex justify-content-center ${className}`}>
        <Spinner animation="border" size="sm" role="status">
          <span className="visually-hidden">Loading downloads…</span>
        </Spinner>
      </div>
    );
  }

  const tierIds = tier ? [tier] : SPECTRA_TIER_ORDER.filter((id) => tierHasDownloads(tiers[id]));

  if (!hasDownloads || tierIds.length === 0) {
    const label = tier ? SPECTRA_TIER_META[tier]?.label ?? tier : 'Spectra';
    return (
      <Button variant="secondary" disabled size={size} className={className}>
        <FontAwesomeIcon icon={faCode} className="me-2" />
        Download Spectra {label} — Coming soon
      </Button>
    );
  }

  return (
    <div className={className}>
      {tierIds.map((tierId) => {
        const tierData = getTier(tierId);
        const meta = SPECTRA_TIER_META[tierId];
        const badge = showBuildBadge ? formatBuildBadge(tierData) : null;

        return (
          <div key={tierId} className={tierIds.length > 1 ? 'mb-3' : ''}>
            {tierIds.length > 1 && (
              <p
                className="small fw-semibold mb-2 text-start"
                style={{ color: 'var(--color-textSecondary)' }}
              >
                {meta?.label}
                {badge && (
                  <span className="fw-normal text-muted ms-2">({badge})</span>
                )}
              </p>
            )}
            {badge && tierIds.length === 1 && (
              <p className="small text-muted mb-2">{badge}</p>
            )}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {platformOrder.map((platform) => {
                const entry = tierData?.downloads?.[platform];
                if (!entry?.url) return null;

                return (
                  <Button
                    key={`${tierId}-${platform}`}
                    as="a"
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size={size}
                    onClick={() =>
                      trackEvent('spectra_download_click', {
                        tier: tierId,
                        platform,
                      })
                    }
                    style={{
                      backgroundColor: 'var(--color-accent)',
                      borderColor: 'var(--color-accent)',
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                    {meta?.label} ({spectraDownloadLabels[platform]})
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpectraDownloadButtons;
