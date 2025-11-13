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

  // Theme
  theme: {
    defaultTheme: getEnvVar('REACT_APP_DEFAULT_THEME', 'default'),
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

