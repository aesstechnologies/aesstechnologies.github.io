import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { services } from '../config/services';
import { redirectToCheckout } from '../services/stripe';

/**
 * Checkout Page
 * Handles redirect to Stripe Checkout for fixed-price services
 */
const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serviceId = searchParams.get('service');

  useEffect(() => {
    const handleCheckout = async () => {
      if (!serviceId) {
        setError('No service specified');
        setLoading(false);
        return;
      }

      const service = services.find(s => s.id === parseInt(serviceId));
      if (!service) {
        setError('Service not found');
        setLoading(false);
        return;
      }

      if (service.pricingModel !== 'fixed') {
        setError('This service requires a custom quote. Please use the "Get Quote" button instead.');
        setLoading(false);
        return;
      }

      try {
        // Use minimum price for checkout (in production, you might want to let user choose)
        const amount = service.priceRange.min * 100; // Convert to smallest currency unit
        await redirectToCheckout(serviceId, amount, service.name);
      } catch (err) {
        console.error('Checkout error:', err);
        setError(err.message || 'Failed to initiate checkout. Please try again or contact us.');
        setLoading(false);
      }
    };

    handleCheckout();
  }, [serviceId, navigate]);

  if (loading) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center p-5">
              <Spinner animation="border" role="status" className="mb-3">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h4>Redirecting to secure checkout...</h4>
              <p className="text-muted">Please wait while we prepare your order.</p>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Alert variant="danger">
              <Alert.Heading>Checkout Error</Alert.Heading>
              <p>{error}</p>
              <hr />
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/services')}
                >
                  Back to Services
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return null;
};

export default CheckoutPage;

