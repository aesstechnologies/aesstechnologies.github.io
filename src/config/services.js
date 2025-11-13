/**
 * Service configuration with pricing and details
 */

export const services = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Responsive, engaging, and accessible web applications built with modern technologies.',
    icon: 'faGlobe',
    pricingModel: 'fixed',
    priceRange: {
      min: 15000,
      max: 50000,
      currency: 'SEK',
    },
    includes: [
      'Responsive design (mobile, tablet, desktop)',
      '3-5 pages',
      'Basic SEO optimization',
      'Contact form integration',
      '1 month post-launch support',
      'Basic analytics setup',
    ],
    tooltip: 'Starting from 15,000 SEK for a basic website. Price varies based on complexity, number of pages, and additional features.',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS, Android, and other platforms.',
    icon: 'faMobileScreen',
    pricingModel: 'quote',
    includes: [
      'Native iOS/Android or cross-platform development',
      'App store submission support',
      'User interface design',
      'Backend integration',
      'Testing and quality assurance',
    ],
    tooltip: 'Complex projects require consultation. We will work with you to understand your requirements and provide a detailed quote.',
  },
  {
    id: 3,
    name: 'Custom Software Development',
    description: 'Tailored software solutions to meet your unique business requirements.',
    icon: 'faFileCode',
    pricingModel: 'quote',
    includes: [
      'Requirements analysis',
      'Custom architecture design',
      'Full-stack development',
      'Integration with existing systems',
      'Documentation and training',
    ],
    tooltip: 'Every custom solution is unique. We will analyze your requirements and provide a detailed quote tailored to your needs.',
  },
  {
    id: 4,
    name: 'Platform Engineering',
    description: 'Design and build toolchains and workflows with Internal Developer Platforms (IDPs) to enable self-service capabilities for software engineering organizations.',
    icon: 'faCubes',
    pricingModel: 'quote',
    includes: [
      'IDP setup and configuration',
      'CI/CD pipeline implementation',
      'Infrastructure as Code',
      'Monitoring and observability',
      'Developer experience optimization',
    ],
    tooltip: 'Enterprise-level infrastructure requires detailed planning. Contact us for a consultation and custom quote.',
  },
];

export default services;

