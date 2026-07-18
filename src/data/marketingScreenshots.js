/** Product screenshots extracted from spectra-demo.mp4 (1280x720) */
export const marketingScreenshots = [
  {
    id: 'run-graph',
    file: 'run-graph.png',
    title: 'Run graph',
    description: 'YAML suite flow with UI, socket, wait, and screen-assert steps — pass/fail at a glance.',
    useFor: 'Blog hero, LinkedIn, ads',
  },
  {
    id: 'suite-editor',
    file: 'suite-editor.png',
    title: 'Suite editor',
    description: 'Pick YAML suites, test cases, and baselines — then run from the dashboard.',
    useFor: 'How it works, product tours',
  },
  {
    id: 'socket-step-detail',
    file: 'socket-step-detail.png',
    title: 'Socket inject + assert',
    description: 'Purple SOCKET.INJECT and SOCKET.WAIT steps beside UI and screen asserts in one graph.',
    useFor: 'Differentiator vs Playwright-only stacks',
  },
  {
    id: 'screen-assert',
    file: 'screen-assert.png',
    title: 'Screen assert / live UI',
    description: 'Operator console under test with anomaly modal — captured during a live suite run.',
    useFor: 'Vision feature, social posts',
  },
  {
    id: 'html-report',
    file: 'html-report.png',
    title: 'HTML report + evidence',
    description: 'Step timings, socket payloads, and expandable screenshot evidence for stakeholders.',
    useFor: 'QA buyers, audit trails',
  },
  {
    id: 'profile-activate-key',
    file: 'profile-activate-key.png',
    title: 'Activate license key',
    description: 'Paste JWT from email in Profile → Subscription → Activate key.',
    useFor: 'Welcome page, onboarding emails',
  },
  {
    id: 'subscription-tier',
    file: 'subscription-tier.png',
    title: 'Subscription tier',
    description: 'FULL plan active with org, expiry, and local license file hint.',
    useFor: 'Trust, pricing follow-up',
  },
  {
    id: 'artifacts-evidence',
    file: 'artifacts-evidence.png',
    title: 'Artifacts bundle',
    description: 'WebM replay plus per-step PNGs including diff images for CI artifacts.',
    useFor: 'DevOps, compliance',
  },
];

export const screenshotUrl = (file) =>
  `${process.env.PUBLIC_URL}/marketing/screenshots/${file}`;

export default marketingScreenshots;
