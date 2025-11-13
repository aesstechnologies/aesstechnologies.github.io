# Environment Variables Reference

Complete reference for all environment variables used in the AESS Technologies website.

## Quick Start

1. Copy `.env.example` to `.env`
2. Fill in the values below
3. Restart your development server

## Feature Flags

### `REACT_APP_ENABLE_BLOG`
- **Type:** Boolean
- **Default:** `true`
- **Description:** Enable or disable the blog page
- **Example:** `REACT_APP_ENABLE_BLOG=true`

### `REACT_APP_ENABLE_PORTFOLIO`
- **Type:** Boolean
- **Default:** `true`
- **Description:** Enable or disable the portfolio page
- **Example:** `REACT_APP_ENABLE_PORTFOLIO=true`

### `REACT_APP_ENABLE_NEWSLETTER`
- **Type:** Boolean
- **Default:** `false`
- **Description:** Enable or disable the newsletter subscription form
- **Example:** `REACT_APP_ENABLE_NEWSLETTER=false`

## Theme Configuration

### `REACT_APP_DEFAULT_THEME`
- **Type:** String
- **Default:** `default`
- **Options:** `default`, `light`, `dark`
- **Description:** Default theme to use when user first visits the site
- **Example:** `REACT_APP_DEFAULT_THEME=default`

**Note:** Users can override this by selecting a different theme, which will be saved in localStorage.

## Stripe Configuration

### `REACT_APP_STRIPE_PUBLISHABLE_KEY`
- **Type:** String
- **Default:** `""`
- **Description:** Your Stripe publishable API key
- **Example:** `REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEf...`
- **Required:** Yes (for Stripe checkout functionality)

**How to get:**
1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key**

**Security Note:** This is safe to expose in frontend code. Never use your Secret key here.

### `REACT_APP_STRIPE_MODE`
- **Type:** String
- **Default:** `test`
- **Options:** `test`, `live`
- **Description:** Stripe mode (test or live)
- **Example:** `REACT_APP_STRIPE_MODE=test`

**When to use:**
- `test` - Development and testing
- `live` - Production (accepting real payments)

## Analytics Configuration

### `REACT_APP_PLAUSIBLE_DOMAIN`
- **Type:** String
- **Default:** `aesstechnologies.com`
- **Description:** Your domain for Plausible Analytics
- **Example:** `REACT_APP_PLAUSIBLE_DOMAIN=aesstechnologies.com`

### `REACT_APP_PLAUSIBLE_SCRIPT_URL`
- **Type:** String
- **Default:** `https://plausible.io/js/script.js`
- **Description:** URL to your Plausible Analytics script
- **Example (self-hosted):** `REACT_APP_PLAUSIBLE_SCRIPT_URL=https://analytics.yourdomain.com/js/script.js`
- **Example (hosted):** `REACT_APP_PLAUSIBLE_SCRIPT_URL=https://plausible.io/js/script.js`

**Self-hosting Plausible:**
1. Deploy Plausible on your server (see [Plausible Self-hosting Guide](https://plausible.io/docs/self-hosting))
2. Update this URL to point to your instance

## API Configuration

### `REACT_APP_API_BASE_URL`
- **Type:** String
- **Default:** `https://aessserver.azurewebsites.net`
- **Description:** Base URL for your backend API
- **Example:** `REACT_APP_API_BASE_URL=https://aessserver.azurewebsites.net`

**Used for:**
- Contact form submissions
- Quote requests
- Stripe checkout session creation

## Mailchimp Configuration

### `REACT_APP_MAILCHIMP_URL`
- **Type:** String
- **Default:** `""`
- **Description:** Mailchimp form submission URL
- **Example:** `REACT_APP_MAILCHIMP_URL=https://yourdomain.us1.list-manage.com/subscribe/post?u=...`

**How to get:**
1. Log in to [Mailchimp](https://mailchimp.com)
2. Create a signup form
3. Get the form action URL
4. Paste it here

**Note:** Only used if `REACT_APP_ENABLE_NEWSLETTER=true`

## Complete Example

```env
# Feature Flags
REACT_APP_ENABLE_BLOG=true
REACT_APP_ENABLE_PORTFOLIO=true
REACT_APP_ENABLE_NEWSLETTER=false

# Theme Configuration
REACT_APP_DEFAULT_THEME=default

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
REACT_APP_STRIPE_MODE=test

# Analytics Configuration
REACT_APP_PLAUSIBLE_DOMAIN=aesstechnologies.com
REACT_APP_PLAUSIBLE_SCRIPT_URL=https://plausible.io/js/script.js

# API Configuration
REACT_APP_API_BASE_URL=https://aessserver.azurewebsites.net

# Mailchimp Configuration
REACT_APP_MAILCHIMP_URL=
```

## GitHub Pages Deployment

For GitHub Pages deployment, you need to set these as GitHub Secrets:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Add each environment variable as a secret
3. Update `.github/workflows/deploy-pages.yml` to use these secrets

**Example workflow update:**
```yaml
- name: Build
  run: npm run build
  env:
    REACT_APP_STRIPE_PUBLISHABLE_KEY: ${{ secrets.REACT_APP_STRIPE_PUBLISHABLE_KEY }}
    REACT_APP_PLAUSIBLE_DOMAIN: ${{ secrets.REACT_APP_PLAUSIBLE_DOMAIN }}
    # ... other variables
```

## Important Notes

1. **Prefix Required:** All React environment variables must start with `REACT_APP_`
2. **Restart Required:** Changes to `.env` require restarting the development server
3. **Build Time:** Environment variables are embedded at build time, not runtime
4. **Security:** Never commit `.env` file with real keys to version control
5. **GitHub Pages:** Environment variables must be set as GitHub Secrets for deployment

## Troubleshooting

### Variables not working
- Ensure variable names start with `REACT_APP_`
- Restart development server after changes
- Check for typos in variable names
- Verify `.env` file is in project root

### Build fails
- Check that all required variables are set
- Verify variable values don't have extra quotes
- Check for syntax errors in `.env` file

### Production issues
- Ensure GitHub Secrets are set correctly
- Verify workflow file uses secrets correctly
- Check build logs for missing variables

## Additional Resources

- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

