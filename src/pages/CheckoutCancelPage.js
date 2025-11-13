import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Checkout Cancel Page
 * Shown when user cancels Stripe checkout
 */
const CheckoutCancelPage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center p-5 shadow-sm">
            <FontAwesomeIcon
              icon={faTimesCircle}
              size="4x"
              className="text-warning mb-4"
            />
            <Card.Title as="h2" className="mb-3">
              Payment Cancelled
            </Card.Title>
            <Card.Text className="lead mb-4">
              Your checkout was cancelled. No charges were made.
            </Card.Text>

            <Card.Text className="text-muted mb-4">
              If you have any questions or need assistance, please don't hesitate to contact us.
            </Card.Text>

            <div className="d-flex gap-2 justify-content-center flex-wrap">
              <Button variant="primary" as={Link} to="/services">
                Return to Services
              </Button>
              <Button variant="outline-secondary" as={Link} to="/contact">
                Contact Us
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutCancelPage;

