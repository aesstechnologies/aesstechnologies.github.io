import { useEffect, useState } from 'react';

const MANIFEST_URL = `${process.env.PUBLIC_URL || ''}/spectra-downloads.json`;

/**
 * Load /spectra-downloads.json (updated by SpectraUI build-customer workflow).
 * Returns null entries until the first public release sync runs.
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
          setManifest(data);
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

  const downloads = manifest?.downloads ?? {};
  const hasDownloads = Boolean(
    downloads.linux?.url || downloads.macos?.url || downloads.windows?.url
  );

  return { manifest, downloads, hasDownloads, loading, error };
}

export const spectraDownloadLabels = {
  linux: 'Linux',
  macos: 'macOS',
  windows: 'Windows',
};
