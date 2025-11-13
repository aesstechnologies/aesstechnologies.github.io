import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { config } from '../config/env';
import { services } from '../config/services';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if this is a quote request
  const quoteServiceId = searchParams.get('quote');
  const quoteServiceName = searchParams.get('service');
  const isQuoteRequest = !!quoteServiceId;

  useEffect(() => {
    // Scroll to form if it's a quote request
    if (isQuoteRequest) {
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isQuoteRequest]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
  
    const name = event.target.formName.value;
    const email = event.target.formEmail.value;
    const message = event.target.formMessage.value;
    const phone = event.target.formPhone?.value || '';
  
    if (!name || !email || !message) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address!');
      setLoading(false);
      return;
    }

    const payload = {
      name,
      email,
      message,
      phone,
      ...(isQuoteRequest && {
        quoteRequest: true,
        serviceId: quoteServiceId,
        serviceName: quoteServiceName || 'Unknown Service',
      }),
    };
  
    try {
      await axios.post(`${config.api.baseUrl}/email/post-email`, payload);
      setSuccess(true);
      event.target.reset();
      
      // Clear URL params after successful submission
      if (isQuoteRequest) {
        window.history.replaceState({}, '', '/contact');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending message. Please try again or contact us directly.');
    }
  
    setLoading(false);
  };

  const selectedService = quoteServiceId 
    ? services.find(s => s.id === parseInt(quoteServiceId))
    : null;

  return (
    <Container className="my-4 my-md-5">
      <Row className="mb-4 mb-md-5">
        <Col>
          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          {isQuoteRequest ? (
            <div>
              <Alert variant="info" className="mb-3">
                <strong>Quote Request:</strong> {quoteServiceName || selectedService?.name || 'Service'}
                <br />
                <small>Please fill out the form below with your project requirements and we'll get back to you with a detailed quote.</small>
              </Alert>
            </div>
          ) : (
            <p className="lead">We'd love to hear from you! Get in touch using the form below:</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
              <strong>Success!</strong> Your message has been sent. We'll get back to you soon!
            </Alert>
          )}
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <strong>Error:</strong> {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} id="contact-form">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name *</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Your Name" 
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address *</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="your.email@example.com" 
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone (Optional)</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="+46 70 123 45 67" 
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message *</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                placeholder={isQuoteRequest 
                  ? "Please describe your project requirements, timeline, and any specific features you need..." 
                  : "Your Message"
                }
                required
                disabled={loading}
              />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="w-100"
              size="lg"
            >
              {loading ? 'Sending...' : (isQuoteRequest ? 'Request Quote' : 'Send Message')}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h3>Other Ways to Reach Us</h3>
          <p>
            Email: aess.technologies@gmail.com <br />
            Phone: +46 (072) 208 37 56 <br />

          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Our Location</h3>
          <p>
            AESS Headquarters <br />
            Liberagatan 32 <br />
            417 52 Göteborg, Sweden <br />
          </p>
        </Col>
      </Row>
      {/* Full-width map */}
      <Row className="mb-4 mb-md-5">
        <Col xs={12} className="p-0">
          <div className="ratio ratio-16x9 map-container" style={{ maxHeight: '450px' }}>
            <iframe
              title="AESS Location - Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d23248.01560996478!2d11.938823!3d57.7058711!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff350fd308407%3A0xa60d2609b8db6dd7!2sLiberagatan%2032%2C%20417%2052%20G%C3%B6teborg!5e1!3m2!1sen!2sse!4v1763059686451!5m2!1sen!2sse"
              style={{ border: 0, overflow: 'hidden' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              scrolling="no"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
