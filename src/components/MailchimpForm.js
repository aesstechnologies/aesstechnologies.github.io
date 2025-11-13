import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { config } from '../config/env';
import { trackEvent } from '../services/analytics';

/**
 * Mailchimp Newsletter Subscription Form
 * Conditional rendering based on feature flag
 * 
 * To set up Mailchimp:
 * 1. Create a Mailchimp account
 * 2. Create a signup form and get the form URL
 * 3. Set REACT_APP_MAILCHIMP_URL in your .env file
 * 4. Set REACT_APP_ENABLE_NEWSLETTER=true
 */
const MailchimpForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!config.features.enableNewsletter) {
    return null;
  }

  const mailchimpUrl = config.mailchimp.formUrl;

  if (!mailchimpUrl || mailchimpUrl.includes('placeholder')) {
    return (
      <Alert variant="info">
        Newsletter subscription is not yet configured. Please set REACT_APP_MAILCHIMP_URL in your .env file.
      </Alert>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Mailchimp form submission
      // This uses Mailchimp's embedded form endpoint
      const formData = new FormData();
      formData.append('EMAIL', email);

      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Mailchimp forms typically use no-cors
      });

      // Since we're using no-cors, we can't check the response
      // Assume success if no error is thrown
      setSuccess(true);
      setEmail('');
      trackEvent('Newsletter Subscription', { source: 'website' });
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError('Failed to subscribe. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="mailchimp-form">
      <h4 className="mb-3">Subscribe to Our Newsletter</h4>
      <p className="text-muted mb-3">
        Stay up-to-date with our latest news, insights, and updates.
      </p>

      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
          <strong>Success!</strong> You've been subscribed to our newsletter.
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <strong>Error:</strong> {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ borderRadius: '0.5rem 0 0 0.5rem' }}
          />
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ borderRadius: '0 0.5rem 0.5rem 0' }}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </InputGroup>
        <Form.Text className="text-muted mt-2">
          We respect your privacy. Unsubscribe at any time.
        </Form.Text>
      </Form>
    </div>
  );
};

export default MailchimpForm;

