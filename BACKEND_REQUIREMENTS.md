# Backend Requirements

This document outlines the backend endpoints and functionality needed to support the AESS Technologies website. Since the website is deployed on GitHub Pages (static hosting), all backend functionality must be implemented separately, preferably on Azure.

## Required Endpoints

### 1. Email/Contact Form Endpoint

**Endpoint:** `POST /email/post-email`

**Purpose:** Handle contact form submissions and quote requests

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+46 70 123 45 67", // Optional
  "message": "Message content here",
  "quoteRequest": false, // true if this is a quote request
  "serviceId": "2", // Present if quoteRequest is true
  "serviceName": "Mobile App Development" // Present if quoteRequest is true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Implementation Notes:**
- Validate email format
- Sanitize input to prevent injection attacks
- Send email notification to AESS team
- For quote requests, include service information in the email
- Consider rate limiting to prevent spam

**Example Implementation (Node.js):**
```javascript
app.post('/email/post-email', async (req, res) => {
  try {
    const { name, email, phone, message, quoteRequest, serviceId, serviceName } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Send email (using nodemailer, SendGrid, etc.)
    await sendEmail({
      to: 'aess.technologies@gmail.com',
      subject: quoteRequest 
        ? `Quote Request: ${serviceName}` 
        : 'Contact Form Submission',
      html: `
        <h2>${quoteRequest ? 'Quote Request' : 'Contact Form'}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${quoteRequest ? `<p><strong>Service:</strong> ${serviceName} (ID: ${serviceId})</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});
```

---

### 2. Stripe Checkout Session Creation

**Endpoint:** `POST /api/stripe/create-checkout-session`

**Purpose:** Create a Stripe Checkout session for fixed-price services

**Request Body:**
```json
{
  "serviceId": "1",
  "amount": 1500000, // Amount in smallest currency unit (öre for SEK)
  "serviceName": "Web Development",
  "successUrl": "https://www.aesstechnologies.com/checkout/success?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://www.aesstechnologies.com/checkout/cancel"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_..."
}
```

**Error Response:**
```json
{
  "message": "Error message here"
}
```

**Implementation Notes:**
- Use Stripe Secret Key (never expose in frontend)
- Validate service ID and amount
- Set appropriate currency (SEK)
- Include metadata for order tracking
- Handle Stripe API errors gracefully

**Example Implementation:** See [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed examples.

---

### 3. Error Reporting Endpoint (Optional)

**Endpoint:** `POST /api/errors`

**Purpose:** Collect client-side errors for monitoring and debugging

**Request Body:**
```json
{
  "error": "Error message",
  "stack": "Error stack trace",
  "userAgent": "Browser user agent",
  "url": "Page URL where error occurred",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true
}
```

**Implementation Notes:**
- Log errors for analysis
- Consider rate limiting
- Sanitize input
- Don't expose sensitive information
- Consider using a service like Sentry instead

---

## Recommended Additional Endpoints

### 4. Webhook Handler (Stripe)

**Endpoint:** `POST /api/stripe/webhook`

**Purpose:** Handle Stripe webhook events (payment completion, etc.)

**Implementation Notes:**
- Verify webhook signature
- Handle `checkout.session.completed` event
- Send confirmation emails
- Update order status
- Trigger fulfillment processes

See [Stripe Webhook Documentation](https://stripe.com/docs/webhooks) for details.

---

## Security Considerations

1. **CORS Configuration**
   - Allow requests from `https://www.aesstechnologies.com`
   - Allow requests from `https://aesstechnologies.github.io` (GitHub Pages)
   - Restrict to specific methods (GET, POST)

2. **Input Validation**
   - Validate all input data
   - Sanitize user input
   - Use parameterized queries for database operations

3. **Rate Limiting**
   - Implement rate limiting on all endpoints
   - Prevent spam and abuse
   - Consider using Azure API Management or similar

4. **Authentication** (if needed)
   - Use API keys for service-to-service communication
   - Implement proper authentication for admin endpoints

5. **Error Handling**
   - Don't expose internal error details to clients
   - Log errors securely
   - Return user-friendly error messages

---

## Azure Implementation

### Option 1: Azure Functions

- Serverless, cost-effective
- Easy to deploy and scale
- Good for simple endpoints

### Option 2: Azure App Service

- Full web application hosting
- More control and flexibility
- Better for complex applications

### Option 3: Azure API Management

- API gateway functionality
- Rate limiting and throttling
- Request/response transformation

---

## Environment Variables Needed

Your backend will need these environment variables:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CORS
ALLOWED_ORIGINS=https://www.aesstechnologies.com,https://aesstechnologies.github.io
```

---

## Testing

Test your endpoints using:

1. **Postman** or **curl**:
   ```bash
   curl -X POST https://your-backend.azurewebsites.net/email/post-email \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "Test message"
     }'
   ```

2. **Frontend Integration**
   - Test from the website
   - Check browser console for errors
   - Verify CORS is working

---

## Monitoring and Logging

Consider implementing:

- Application Insights (Azure)
- Error tracking (Sentry, Rollbar)
- Logging service (Azure Log Analytics)
- Uptime monitoring

---

## Support

For questions about backend implementation:
- Check the main [README.md](./README.md)
- Review [STRIPE_SETUP.md](./STRIPE_SETUP.md) for Stripe-specific details
- Open an issue on GitHub for website-specific questions

