import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

/**
 * Checkout Success Page
 * Shown after successful Stripe checkout
 */
const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, you might want to verify the session with your backend
    // For now, we'll just show the success message
    setLoading(false);
  }, [sessionId]);

  if (loading) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="text-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center p-5 shadow-sm">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="4x"
              className="text-success mb-4"
            />
            <Card.Title as="h2" className="mb-3">
              Payment Successful!
            </Card.Title>
            <Card.Text className="lead mb-4">
              Thank you for your purchase. Your order has been confirmed.
            </Card.Text>

            {sessionId && (
              <Alert variant="info" className="text-start">
                <strong>Session ID:</strong> {sessionId}
                <br />
                <small className="text-muted">
                  Please save this for your records. You will receive a confirmation email shortly.
                </small>
              </Alert>
            )}

            <div className="mt-4">
              <p className="mb-3">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                A confirmation email has been sent to your email address.
              </p>
              <p className="text-muted small">
                Our team will contact you within 24 hours to discuss your project requirements.
              </p>
            </div>

            <div className="d-flex gap-2 justify-content-center mt-4 flex-wrap">
              <Button variant="primary" as={Link} to="/services">
                Browse More Services
              </Button>
              <Button variant="outline-secondary" as={Link} to="/">
                Return Home
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutSuccessPage;

