import { useEffect, useState } from 'react';

const MANIFEST_URL = `${process.env.PUBLIC_URL || ''}/spectra-downloads.json`;

export const SPECTRA_TIER_ORDER = ['cli', 'ui', 'full'];

export const SPECTRA_TIER_META = {
  cli: {
    label: 'CLI',
    description: 'CI pipelines — spectra run, JSON/HTML reports',
  },
  ui: {
    label: 'UI',
    description: 'QA operators — dashboard, suite builder, exports',
  },
  full: {
    label: 'Full',
    description: 'Teams — CLI + UI + injector + CV worker',
    highlighted: true,
  },
};

export const spectraDownloadLabels = {
  linux: 'Linux',
  macos: 'macOS',
  windows: 'Windows',
};

const platformOrder = ['linux', 'macos', 'windows'];

/** Normalize legacy single-tier manifest or new multi-tier shape. */
export function normalizeManifest(raw) {
  if (!raw) {
    return { updatedAt: null, tiers: {} };
  }

  if (raw.tiers && typeof raw.tiers === 'object') {
    return {
      updatedAt: raw.updatedAt ?? null,
      tiers: raw.tiers,
    };
  }

  if (raw.tier && raw.downloads) {
    return {
      updatedAt: raw.publishedAt ?? null,
      tiers: {
        [raw.tier]: {
          version: raw.version,
          buildNumber: raw.buildNumber,
          publishedAt: raw.publishedAt,
          sourceTag: raw.sourceTag,
          sourceRunId: raw.sourceRunId,
          downloads: raw.downloads,
        },
      },
    };
  }

  return { updatedAt: null, tiers: {} };
}

export function tierHasDownloads(tierData) {
  const downloads = tierData?.downloads ?? {};
  return platformOrder.some((platform) => Boolean(downloads[platform]?.url));
}

export function formatBuildDate(isoDate) {
  if (!isoDate) return null;
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return null;
  }
}

export function formatBuildBadge(tierData) {
  if (!tierData) return null;
  const parts = [];
  if (tierData.buildNumber != null) {
    parts.push(`Build ${tierData.buildNumber}`);
  } else if (tierData.version) {
    parts.push(tierData.version);
  }
  const date = formatBuildDate(tierData.publishedAt);
  if (date) parts.push(date);
  return parts.length ? parts.join(' · ') : null;
}

/**
 * Load /spectra-downloads.json (updated by SpectraUI build-customer workflow).
 */
export function useSpectraDownloads() {
  const [manifest, setManifest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(MANIFEST_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load download manifest (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setManifest(normalizeManifest(data));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const tiers = manifest?.tiers ?? {};
  const hasDownloads = SPECTRA_TIER_ORDER.some((tierId) => tierHasDownloads(tiers[tierId]));

  const getTier = (tierId) => tiers[tierId] ?? null;

  return { manifest, tiers, getTier, hasDownloads, loading, error };
}
