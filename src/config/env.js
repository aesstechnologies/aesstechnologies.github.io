/**
 * Environment variable configuration utility
 * Provides type-safe access to environment variables with defaults
 */

const getEnvVar = (key, defaultValue = null) => {
  return process.env[key] || defaultValue;
};

const getBooleanEnvVar = (key, defaultValue = false) => {
  const value = getEnvVar(key);
  if (value === null) return defaultValue;
  return value === 'true' || value === '1';
};

export const config = {
  // Feature Flags
  features: {
    enableBlog: getBooleanEnvVar('REACT_APP_ENABLE_BLOG', true),
    enablePortfolio: getBooleanEnvVar('REACT_APP_ENABLE_PORTFOLIO', true),
    enableNewsletter: getBooleanEnvVar('REACT_APP_ENABLE_NEWSLETTER', false),
  },

  // Circuit Background
  circuitBackground: {
    // Use 3D version (Three.js) instead of 2D version (Canvas)
    // Set to true for 3D, false for 2D
    use3D: getBooleanEnvVar('REACT_APP_CIRCUIT_BG_3D', true),
    // Configuration options (applies to both 2D and 3D)
    opacity: parseFloat(getEnvVar('REACT_APP_CIRCUIT_BG_OPACITY', '0.2')) || 0.2,
    speed: parseFloat(getEnvVar('REACT_APP_CIRCUIT_BG_SPEED', '0.5')) || 0.5,
    density: parseFloat(getEnvVar('REACT_APP_CIRCUIT_BG_DENSITY', '1.2')) || 1.2,
    floating: getBooleanEnvVar('REACT_APP_CIRCUIT_BG_FLOATING', true),
    verticalScroll: getBooleanEnvVar('REACT_APP_CIRCUIT_BG_VERTICAL_SCROLL', true),
    // 3D-specific option
    depth: parseFloat(getEnvVar('REACT_APP_CIRCUIT_BG_DEPTH', '1000')) || 1000,
  },

  // Theme
  theme: {
    defaultTheme: getEnvVar('REACT_APP_DEFAULT_THEME', 'dark'),
  },

  // Stripe
  stripe: {
    publishableKey: getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY', ''),
    mode: getEnvVar('REACT_APP_STRIPE_MODE', 'test'),
  },

  // Analytics
  analytics: {
    plausibleDomain: getEnvVar('REACT_APP_PLAUSIBLE_DOMAIN', 'aesstechnologies.com'),
    plausibleScriptUrl: getEnvVar('REACT_APP_PLAUSIBLE_SCRIPT_URL', 'https://plausible.io/js/script.js'),
  },

  // API
  api: {
    baseUrl: getEnvVar('REACT_APP_API_BASE_URL', 'https://aessserver.azurewebsites.net'),
  },

  // Mailchimp
  mailchimp: {
    formUrl: getEnvVar('REACT_APP_MAILCHIMP_URL', ''),
  },
};

export default config;

