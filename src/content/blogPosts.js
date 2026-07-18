import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { spectraConfig } from '../config/spectra';

const BlogPostUiTestingFrameworks = () => (
  <article className="blog-article">
    <p className="lead" style={{ color: 'var(--color-textSecondary)' }}>
      Operator dashboards in healthtech, robotics, and IoT are no longer static forms.
      They stream live device events, update charts in real time, and expect QA to prove
      both behaviour and appearance before every release. The tooling landscape has evolved —
      but most teams still stitch together three separate stacks to get there.
    </p>

    <h2 className="h4 fw-bold mt-5 mb-3">The first wave: browser automation</h2>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      Selenium pioneered cross-browser UI automation. Cypress and Playwright refined the
      developer experience with fast feedback, trace viewers, and reliable selectors. For
      marketing sites and CRUD apps, they remain the default choice: click a button, assert
      on DOM text, ship.
    </p>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      That model breaks down when the UI you care about is driven by{' '}
      <strong>WebSockets or Socket.IO</strong>. A green Playwright run can miss a broken
      telemetry payload, a stale chart, or a modal that never opens because the socket
      event never arrived. Teams compensate with ad-hoc Node scripts that emit fake device
      packets — useful, but disconnected from the browser assertions and CI reporting
      developers already trust.
    </p>

    <h2 className="h4 fw-bold mt-5 mb-3">The second wave: visual and API layers</h2>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      Visual regression tools (Percy, Chromatic, Applitools) compare screenshots between
      builds. API contract tests validate REST and GraphQL. Each solves one slice well.
      None of them orchestrate{' '}
      <em>“inject device fault → wait for socket → assert pixel + payload in one report.”</em>
    </p>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      In practice, QA engineers maintain a Playwright suite, a separate socket harness, and
      a manual checklist for operator workflows. DevOps sees three pipelines, three failure
      modes, and three places to update when a selector changes.
    </p>

    <h2 className="h4 fw-bold mt-5 mb-3">What modern real-time UIs actually need</h2>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      Teams shipping operator-facing software in 2026 typically need five capabilities in
      one gate:
    </p>
    <ul style={{ color: 'var(--color-textSecondary)', lineHeight: 1.9 }}>
      <li>
        <strong>Browser actions</strong> — navigate, click, fill forms (Playwright-class)
      </li>
      <li>
        <strong>Socket assertions</strong> — emit and listen for events with timing control
      </li>
      <li>
        <strong>Screen baselines</strong> — computer-vision diff on critical widgets, not
        whole-page noise
      </li>
      <li>
        <strong>One declarative suite</strong> — readable by QA and version-controlled with
        the app
      </li>
      <li>
        <strong>Dual runners</strong> — dashboard for exploratory runs, CLI identically for
        CI
      </li>
    </ul>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      YAML has re-emerged as the lingua franca for this kind of orchestration: readable
      diffs in pull requests, no recompile to tweak a wait, and a single artifact auditors
      can replay.
    </p>

    <h2 className="h4 fw-bold mt-5 mb-3">Where Spectra fits</h2>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      We built{' '}
      <Link to="/spectra" style={{ color: 'var(--color-primary)' }}>
        Spectra
      </Link>{' '}
      at AESS because our own client work kept hitting this wall. Spectra runs{' '}
      <code>ui.*</code>, <code>socket.*</code>, and <code>screen.assert</code> steps from
      one suite file — with HTML and JSON reports that bundle screenshots, socket traces,
      and step timings.
    </p>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      QA uses the dashboard to author and debug suites. Engineering runs the same suites
      headlessly in GitHub Actions or Azure DevOps via <code>spectra run</code>. No second
      repo of one-off injectors; no “socket team” separate from “UI team.”
    </p>

    <Alert
      variant="secondary"
      className="my-5 border-0"
      style={{ backgroundColor: 'var(--color-surfaceElevated)' }}
    >
      <Alert.Heading as="h3" className="h5">
        Example: one YAML step sequence
      </Alert.Heading>
      <pre
        className="mb-0 p-3 rounded small"
        style={{ backgroundColor: 'var(--color-background)', overflowX: 'auto' }}
      >
{`steps:
  - ui.goto: /dashboard
  - socket.emit:
      event: device.status
      payload: { state: "fault" }
  - ui.waitFor: "[data-testid=alert-banner]"
  - screen.assert:
      region: alert-banner
      baseline: baselines/fault-alert.png`}
      </pre>
      <p className="small mb-0 mt-3 text-muted">
        Browser, socket, and pixel assertions — one report, one CI job.
      </p>
    </Alert>

    <h2 className="h4 fw-bold mt-5 mb-3">Choosing your stack in 2026</h2>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      If you ship static or form-heavy web apps, stay with Playwright or Cypress — they are
      excellent. If your product is a <strong>live operator UI</strong> (monitoring,
      telehealth, fleet control, robotics HMIs), evaluate whether your current trio of tools
      still scales. The cost of a missed regression in those domains is measured in
      downtime and trust, not just a broken checkout button.
    </p>
    <p style={{ color: 'var(--color-textSecondary)', lineHeight: 1.85 }}>
      Spectra offers a 30-day trial on all tiers — CLI for pipelines, UI for operators, Full
      for teams that want injector + computer-vision worker in one bundle. We are based in
      Gothenburg and use it daily on client engagements before we recommend it externally.
    </p>

    <div className="d-flex flex-wrap gap-2 mt-5 pt-4 border-top" style={{ borderColor: 'var(--color-border) !important' }}>
      <Button
        as="a"
        href={spectraConfig.primaryCtaUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
      >
        Try Spectra free for 30 days
      </Button>
      <Button as={Link} to="/spectra" variant="outline-primary">
        Explore Spectra
      </Button>
      <Button as={Link} to="/spectra/marketing" variant="link" style={{ color: 'var(--color-primary)' }}>
        Marketing assets for teams
      </Button>
    </div>
  </article>
);

export const blogPostContentBySlug = {
  'ui-testing-frameworks-modern-era': BlogPostUiTestingFrameworks,
};

export default blogPostContentBySlug;
