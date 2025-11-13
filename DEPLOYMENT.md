# Deployment Guide

This guide covers deploying the AESS Technologies website to GitHub Pages.

## Prerequisites

- GitHub account
- Repository set up with GitHub Pages enabled
- GitHub Actions enabled for the repository

## Automatic Deployment (Recommended)

The website is configured for automatic deployment via GitHub Actions. Every push to the `main` branch will trigger a build and deployment.

### Setup Steps

1. **Ensure GitHub Pages is enabled**
   - Go to repository **Settings** → **Pages**
   - Source: **GitHub Actions**

2. **Set up GitHub Secrets** (if needed)
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Add secrets for environment variables (see [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md))

3. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

4. **Monitor deployment**
   - Go to **Actions** tab in GitHub
   - Watch the deployment workflow run
   - Check for any errors

5. **Verify deployment**
   - Visit `https://www.aesstechnologies.com` (or your custom domain)
   - Test all functionality

## Manual Deployment

If you need to deploy manually:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm install -g gh-pages
   gh-pages -d build
   ```

## Custom Domain Setup

The website uses a custom domain (`www.aesstechnologies.com`).

### DNS Configuration

1. **Add CNAME file** (already in repository)
   - File: `public/CNAME`
   - Content: `www.aesstechnologies.com`

2. **Configure DNS** (at your domain registrar)
   - Type: `CNAME`
   - Name: `www`
   - Value: `aesstechnologies.github.io`

3. **Wait for propagation**
   - DNS changes can take up to 48 hours
   - Use `dig` or online tools to verify

### SSL Certificate

GitHub Pages automatically provides SSL certificates for custom domains. It may take a few minutes to provision.

## Environment Variables in Production

For GitHub Pages deployment, environment variables must be set as GitHub Secrets:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add each required variable as a secret
3. Update `.github/workflows/deploy-pages.yml` to use secrets:

```yaml
- name: Build
  run: npm run build
  env:
    REACT_APP_STRIPE_PUBLISHABLE_KEY: ${{ secrets.REACT_APP_STRIPE_PUBLISHABLE_KEY }}
    REACT_APP_PLAUSIBLE_DOMAIN: ${{ secrets.REACT_APP_PLAUSIBLE_DOMAIN }}
    REACT_APP_PLAUSIBLE_SCRIPT_URL: ${{ secrets.REACT_APP_PLAUSIBLE_SCRIPT_URL }}
    REACT_APP_API_BASE_URL: ${{ secrets.REACT_APP_API_BASE_URL }}
    REACT_APP_DEFAULT_THEME: ${{ secrets.REACT_APP_DEFAULT_THEME }}
    REACT_APP_ENABLE_BLOG: ${{ secrets.REACT_APP_ENABLE_BLOG }}
    REACT_APP_ENABLE_PORTFOLIO: ${{ secrets.REACT_APP_ENABLE_PORTFOLIO }}
    REACT_APP_ENABLE_NEWSLETTER: ${{ secrets.REACT_APP_ENABLE_NEWSLETTER }}
```

## Deployment Workflow

The deployment workflow (`.github/workflows/deploy-pages.yml`) does the following:

1. **Checkout code**
2. **Setup Node.js**
3. **Install dependencies** (`npm ci`)
4. **Build project** (`npm run build`)
5. **Ensure CNAME file** (for custom domain)
6. **Upload artifact**
7. **Deploy to GitHub Pages**

## Troubleshooting

### Build fails
- Check GitHub Actions logs
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible

### Deployment fails
- Check GitHub Pages settings
- Verify repository permissions
- Check Actions tab for error messages

### Site not updating
- Clear browser cache
- Check deployment status in Actions
- Verify latest commit is deployed

### Custom domain not working
- Verify DNS configuration
- Check CNAME file exists in `public/`
- Wait for DNS propagation
- Check SSL certificate status in repository settings

### Environment variables not working
- Verify secrets are set correctly
- Check workflow file uses secrets
- Ensure variable names match exactly

## Rollback

To rollback to a previous version:

1. **Find previous commit**
   ```bash
   git log
   ```

2. **Revert to previous commit**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

Or manually deploy a previous build:

1. Go to **Actions** → Select previous successful workflow
2. Re-run the workflow

## Performance Optimization

The build process includes:
- Code minification
- Asset optimization
- Tree shaking
- Code splitting

To analyze bundle size:
```bash
npm run build
npx serve -s build
# Then use browser DevTools to analyze
```

## Monitoring

After deployment, monitor:
- Site uptime
- Page load times
- Error rates
- Analytics data

Consider using:
- GitHub Pages status page
- Uptime monitoring services
- Analytics (Plausible)
- Error tracking

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)

## Support

For deployment issues:
- Check GitHub Actions logs
- Review [README.md](./README.md)
- Open an issue on GitHub

