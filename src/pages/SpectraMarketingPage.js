import React, { useCallback } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faDownload,
  faHashtag,
  faImage,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { spectraConfig } from '../config/spectra';
import usePageMeta from '../hooks/usePageMeta';
import { absoluteUrl, siteConfig } from '../config/site';
import { trackEvent } from '../services/analytics';

const marketingAssets = [
  {
    id: 'ig-square',
    title: 'Instagram / LinkedIn post',
    size: '1080 × 1080',
    path: '/marketing/spectra-ig-square.svg',
    downloadName: 'spectra-aess-ig-square.svg',
    useFor: 'Feed posts, carousel slides, square ads',
  },
  {
    id: 'ig-story',
    title: 'Instagram / TikTok story',
    size: '1080 × 1920',
    path: '/marketing/spectra-ig-story.svg',
    downloadName: 'spectra-aess-ig-story.svg',
    useFor: 'Stories, Reels cover, vertical ads',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn / Open Graph banner',
    size: '1200 × 628',
    path: '/marketing/spectra-linkedin-banner.svg',
    downloadName: 'spectra-aess-linkedin-banner.svg',
    useFor: 'Link previews, LinkedIn posts, email headers',
  },
];

const socialSnippets = [
  {
    label: 'Short hook (Instagram / X)',
    text: 'Real-time operator UIs need more than click tests. Spectra runs browser actions, socket events, and screen baselines in one YAML suite — 30-day free trial → aesstechnologies.com/spectra',
  },
  {
    label: 'Technical (LinkedIn)',
    text: 'Playwright validates clicks. Who validates the socket payload and the pixel?\n\nWe built Spectra at AESS for healthtech, robotics, and IoT dashboards: YAML suites, dashboard for QA, CLI for CI.\n\nTry it free for 30 days: aesstechnologies.com/spectra',
  },
  {
    label: 'Blog cross-post',
    text: 'New on our blog: UI testing frameworks in the modern era — why teams stitching Playwright + socket scripts + visual diffs are moving to unified suites.\n\nRead → aesstechnologies.com/blog/ui-testing-frameworks-modern-era',
  },
];

const hashtags = [
  '#SoftwareTesting',
  '#QA',
  '#TestAutomation',
  '#Playwright',
  '#SocketIO',
  '#HealthTech',
  '#IoT',
  '#DevOps',
  '#Gothenburg',
  '#Spectra',
];

const CopyButton = ({ text, eventName }) => {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent(eventName || 'spectra_marketing_copy', { length: text.length });
    } catch {
      /* clipboard unavailable */
    }
  }, [text, eventName]);

  return (
    <Button variant="outline-primary" size="sm" onClick={handleCopy}>
      <FontAwesomeIcon icon={faCopy} className="me-1" />
      Copy
    </Button>
  );
};

const SpectraMarketingPage = () => {
  usePageMeta({
    title: `Spectra marketing assets | ${siteConfig.name}`,
    description:
      'Download Spectra social banners, copy templates, and hashtags for Instagram, LinkedIn, and product launches.',
    canonicalPath: '/spectra/marketing',
    ogImage: '/marketing/spectra-linkedin-banner.svg',
  });

  return (
    <Container className="my-4 my-md-5 spectra-marketing-page">
      <Row className="mb-4 mb-md-5">
        <Col xs={12} lg={8}>
          <h1 className="display-6 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
            Spectra marketing kit
          </h1>
          <p className="lead mb-0" style={{ color: 'var(--color-textSecondary)' }}>
            Banners, captions, and hashtags to promote Spectra on social channels. SVG
            files scale cleanly — export to PNG in Figma or Canva if your platform requires
            raster images.
          </p>
        </Col>
        <Col xs={12} lg={4} className="d-flex align-items-start justify-content-lg-end mt-3 mt-lg-0">
          <Button
            as="a"
            href={spectraConfig.primaryCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            onClick={() => trackEvent('spectra_trial_click', { source: 'marketing_page' })}
            style={{
              backgroundColor: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
          >
            Start 30-day trial
          </Button>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <h2 className="h4 fw-bold mb-3">
            <FontAwesomeIcon icon={faImage} className="me-2" style={{ color: 'var(--color-accent)' }} />
            Download banners
          </h2>
          <Row xs={1} md={3} className="g-4">
            {marketingAssets.map((asset) => (
              <Col key={asset.id}>
                <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <div
                    className="p-2"
                    style={{ backgroundColor: 'var(--color-background)' }}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}${asset.path}`}
                      alt={asset.title}
                      className="w-100 d-block rounded"
                      loading="lazy"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title as="h3" className="h6 fw-bold">
                      {asset.title}
                    </Card.Title>
                    <Card.Text className="small mb-2" style={{ color: 'var(--color-textMuted)' }}>
                      {asset.size} · {asset.useFor}
                    </Card.Text>
                    <Button
                      as="a"
                      href={`${process.env.PUBLIC_URL}${asset.path}`}
                      download={asset.downloadName}
                      variant="outline-primary"
                      size="sm"
                      onClick={() => trackEvent('spectra_marketing_download', { asset: asset.id })}
                    >
                      <FontAwesomeIcon icon={faDownload} className="me-1" />
                      Download SVG
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12} lg={8}>
          <h2 className="h4 fw-bold mb-3">
            <FontAwesomeIcon icon={faShareNodes} className="me-2" style={{ color: 'var(--color-accent)' }} />
            Ready-to-post copy
          </h2>
          {socialSnippets.map((snippet) => (
            <Card
              key={snippet.label}
              className="mb-3 border-0"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <Card.Subtitle className="fw-semibold mb-0">{snippet.label}</Card.Subtitle>
                  <CopyButton text={snippet.text.replace('aesstechnologies.com', 'www.aesstechnologies.com')} />
                </div>
                <Card.Text
                  as="pre"
                  className="mb-0 small"
                  style={{
                    whiteSpace: 'pre-wrap',
                    color: 'var(--color-textSecondary)',
                    fontFamily: 'inherit',
                  }}
                >
                  {snippet.text}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col xs={12} lg={4} className="mt-4 mt-lg-0">
          <Card className="border-0 shadow-sm" style={{ backgroundColor: 'var(--color-surface)' }}>
            <Card.Body>
              <Card.Title as="h3" className="h6 fw-bold">
                <FontAwesomeIcon icon={faHashtag} className="me-2" />
                Suggested hashtags
              </Card.Title>
              <p className="small mb-3" style={{ color: 'var(--color-textSecondary)' }}>
                Mix 3–5 per post; add niche tags for your industry (e.g. #MedTech, #Robotics).
              </p>
              <div className="d-flex flex-wrap gap-1 mb-3">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="badge rounded-pill"
                    style={{
                      backgroundColor: 'var(--color-surfaceElevated)',
                      color: 'var(--color-textSecondary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <CopyButton text={hashtags.join(' ')} eventName="spectra_marketing_hashtags" />
            </Card.Body>
          </Card>

          <Alert variant="secondary" className="mt-4 border-0 small" style={{ backgroundColor: 'var(--color-surfaceElevated)' }}>
            <strong>Tip:</strong> Link always to{' '}
            <a href={absoluteUrl('/spectra')} style={{ color: 'var(--color-primary)' }}>
              /spectra
            </a>{' '}
            or the{' '}
            <Link to="/blog/ui-testing-frameworks-modern-era">blog article</Link> for thought
            leadership. Track clicks in Plausible with UTM params, e.g.{' '}
            <code>?utm_source=instagram&utm_medium=social</code>.
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h2 className="h4 fw-bold mb-3">Quick links</h2>
          <Table
            responsive
            className="mb-0 align-middle"
            style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
          >
            <thead>
              <tr style={{ borderColor: 'var(--color-border)' }}>
                <th>Asset</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderColor: 'var(--color-border)' }}>
                <td>Product page</td>
                <td>
                  <a href={absoluteUrl('/spectra')}>{absoluteUrl('/spectra')}</a>
                </td>
              </tr>
              <tr style={{ borderColor: 'var(--color-border)' }}>
                <td>Blog article</td>
                <td>
                  <a href={absoluteUrl('/blog/ui-testing-frameworks-modern-era')}>
                    {absoluteUrl('/blog/ui-testing-frameworks-modern-era')}
                  </a>
                </td>
              </tr>
              <tr style={{ borderColor: 'var(--color-border)' }}>
                <td>Demo video</td>
                <td>
                  <a href={absoluteUrl('/spectra-demo.mp4')}>{absoluteUrl('/spectra-demo.mp4')}</a>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SpectraMarketingPage;
