/** Site-wide URLs and branding — canonical host matches public/CNAME */
export const siteConfig = {
  name: 'AESS Technologies',
  tagline: 'Digitalization on Demand',
  url: 'https://www.aesstechnologies.com',
  defaultTitle: 'AESS Technologies - Digitalization on Demand',
  defaultDescription:
    'AESS Technologies builds custom software and Spectra — YAML-driven UI, socket, and computer-vision regression testing for real-time operator dashboards.',
  defaultOgImage: '/og/default.png',
  locale: 'en_GB',
  contactEmail: 'hello@aesstechnologies.com',
  licensesEmail: 'licenses@aesstechnologies.com',
  address: {
    street: 'Liberagatan 32',
    city: 'Göteborg',
    postalCode: '417 52',
    country: 'Sweden',
  },
};

export const absoluteUrl = (path = '/') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
};

export default siteConfig;
