# AESS Technologies Website

Enterprise-grade website for Advanced Engineering for Software Solutions (AESS), a software development and technology solutions company based in Gothenburg, Sweden.

## 🚀 Features

- **Modern React Application** - Built with React 18 and React Router
- **Mobile-First Design** - Responsive design that works seamlessly on all devices
- **Theme System** - Three color palettes (Default, Light, Dark) with user-controlled switching
- **Service Management** - Fixed-price and quote-based service offerings
- **Stripe Integration** - Secure payment processing for fixed-price services
- **Quote Request System** - Streamlined quote request flow for complex services
- **Analytics** - Self-hosted Plausible Analytics integration
- **Newsletter** - Mailchimp integration (optional)
- **Performance Optimized** - Code splitting, lazy loading, and optimized assets
- **Error Handling** - Comprehensive error boundaries and user-friendly error pages
- **Environment Configuration** - Flexible feature flags and configuration via environment variables

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account (for deployment)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aesstechnologies/aesstechnologies.github.io.git
   cd aesstechnologies.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your environment variables. See [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) for details.

4. **Start development server**
   ```bash
   npm start
   ```
   
   The app will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.js       # Navigation bar with theme switcher
│   ├── ServiceCard.js  # Service display card component
│   ├── ThemeSwitcher.js # Theme switching component
│   ├── ErrorBoundary.js # Error handling component
│   └── MailchimpForm.js # Newsletter subscription form
├── config/             # Configuration files
│   ├── env.js         # Environment variable utilities
│   ├── services.js    # Service pricing and configuration
│   └── theme.js       # Theme system configuration
├── pages/              # Page components
│   ├── HomePage.js    # Homepage with carousel
│   ├── AboutPage.js   # About page
│   ├── ServicesPage.js # Services listing page
│   ├── ContactPage.js  # Contact and quote request form
│   ├── CheckoutPage.js # Stripe checkout redirect
│   ├── CheckoutSuccessPage.js # Post-checkout success page
│   └── CheckoutCancelPage.js  # Post-checkout cancel page
├── services/           # Service integrations
│   ├── stripe.js      # Stripe Checkout integration
│   └── analytics.js   # Plausible Analytics integration
└── hooks/              # Custom React hooks
    └── useTheme.js     # Theme management hook
```

## 🎨 Theme System

The website supports three themes:
- **Default** - Professional blue theme
- **Light** - Bright, clean theme
- **Dark** - Dark mode theme

Users can switch themes using the theme switcher in the navigation bar. The selected theme is persisted in localStorage.

To set a default theme, configure `REACT_APP_DEFAULT_THEME` in your `.env` file.

## 💳 Stripe Integration

The website integrates with Stripe Checkout for secure payment processing. See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed setup instructions.

**Note:** Stripe integration requires backend support. See [BACKEND_REQUIREMENTS.md](./BACKEND_REQUIREMENTS.md) for endpoint specifications.

## 📊 Analytics

The website uses self-hosted Plausible Analytics for privacy-focused analytics. Configure your Plausible instance in the `.env` file:

```env
REACT_APP_PLAUSIBLE_DOMAIN=yourdomain.com
REACT_APP_PLAUSIBLE_SCRIPT_URL=https://your-plausible-instance.com/js/script.js
```

## 📧 Newsletter

Mailchimp integration is available for newsletter subscriptions. Configure it in your `.env` file:

```env
REACT_APP_ENABLE_NEWSLETTER=true
REACT_APP_MAILCHIMP_URL=your_mailchimp_form_url
```

## 🚀 Deployment

The website is deployed to GitHub Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. The site will be available at `https://www.aesstechnologies.com`

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📦 Build

Create a production build:
```bash
npm run build
```

The build output will be in the `build/` directory.

## 🔧 Configuration

### Feature Flags

Control which pages are visible using environment variables:

- `REACT_APP_ENABLE_BLOG` - Show/hide blog page
- `REACT_APP_ENABLE_PORTFOLIO` - Show/hide portfolio page
- `REACT_APP_ENABLE_NEWSLETTER` - Enable/disable newsletter form

### Service Configuration

Service pricing and details are configured in `src/config/services.js`. You can:
- Add new services
- Update pricing
- Modify service descriptions
- Configure what's included in each service

## 📝 Documentation

- [Environment Variables](./ENVIRONMENT_VARIABLES.md) - Complete reference for all environment variables
- [Stripe Setup](./STRIPE_SETUP.md) - Stripe integration setup guide
- [Backend Requirements](./BACKEND_REQUIREMENTS.md) - Backend endpoints needed
- [Deployment Guide](./DEPLOYMENT.md) - Deployment instructions

## 🐛 Troubleshooting

### Theme not applying
- Clear browser cache and localStorage
- Check that theme CSS variables are loaded

### Stripe checkout not working
- Verify Stripe keys are configured correctly
- Ensure backend endpoint is implemented (see BACKEND_REQUIREMENTS.md)
- Check browser console for errors

### Analytics not tracking
- Verify Plausible domain and script URL are correct
- Check browser console for script loading errors
- Ensure your Plausible instance is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Contact

**AESS Technologies**
- Address: Liberagatan 32, 417 52 Göteborg, Sweden
- Email: aess.technologies@gmail.com
- Phone: +46 (072) 208 37 56

## 🙏 Acknowledgments

- React Bootstrap for UI components
- Font Awesome for icons
- Stripe for payment processing
- Plausible Analytics for privacy-focused analytics
