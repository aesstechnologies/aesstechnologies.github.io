import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

/**
 * Error Boundary component for catching React errors
 * Provides user-friendly error pages
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, this could be sent to an error tracking service)
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Optional: Send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // This would be implemented when backend is ready
      // See BACKEND_REQUIREMENTS.md for endpoint specification
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Error fallback UI component
 */
const ErrorFallback = ({ error, errorInfo, onReset }) => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center">
            <h1 className="display-1 fw-bold text-danger">Oops!</h1>
            <h2 className="mb-4">Something went wrong</h2>
            <p className="lead mb-4">
              We're sorry, but something unexpected happened. Our team has been notified.
            </p>
            
            {process.env.NODE_ENV === 'development' && error && (
              <details className="text-start mb-4">
                <summary className="mb-2">Error Details (Development Only)</summary>
                <pre className="bg-light p-3 rounded" style={{ fontSize: '0.875rem' }}>
                  {error.toString()}
                  {errorInfo && errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button variant="primary" onClick={onReset}>
                Go to Homepage
              </Button>
              <Button variant="outline-secondary" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorBoundary;

