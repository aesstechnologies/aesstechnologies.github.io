import React, { useState } from 'react';
import { Card, Button, Badge, OverlayTrigger, Tooltip, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faCubes, 
  faMobileScreen, 
  faFileCode, 
  faGlobe,
  faInfoCircle,
  faShoppingCart,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const getIcon = (iconName) => {
  const iconMap = {
    faCode: faCode,
    faCubes: faCubes,
    faMobileScreen: faMobileScreen,
    faFileCode: faFileCode,
    faGlobe: faGlobe,
  };
  return iconMap[iconName] || faCode;
};

/**
 * Service Card Component
 * Displays service information with pricing, tooltips, and action buttons
 * Mobile-first responsive design
 */
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const icon = getIcon(service.icon);

  const handleBuyNow = () => {
    // Navigate to checkout with service ID
    navigate(`/checkout?service=${service.id}`);
  };

  const handleGetQuote = () => {
    // Navigate to quote request form with service ID
    navigate(`/contact?quote=${service.id}&service=${encodeURIComponent(service.name)}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const tooltip = (
    <Tooltip id={`tooltip-${service.id}`}>
      {service.tooltip}
    </Tooltip>
  );

  return (
    <Card className="h-100 shadow-sm service-card" style={{ 
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    }}>
      <Card.Header className="text-center py-4" style={{ 
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-primary)',
      }}>
        <FontAwesomeIcon 
          icon={icon} 
          size="3x" 
          className="mb-3"
          style={{ color: 'var(--color-primary)' }}
        />
        <Card.Title as="h4" className="mb-2 fw-bold">
          {service.name}
        </Card.Title>
        {service.pricingModel === 'fixed' && (
          <div className="mt-3">
            <Badge bg="primary" className="px-3 py-2" style={{ fontSize: '1rem' }}>
              {formatPrice(service.priceRange.min)} - {formatPrice(service.priceRange.max)}
            </Badge>
          </div>
        )}
        {service.pricingModel === 'quote' && (
          <div className="mt-3">
            <Badge bg="secondary" className="px-3 py-2" style={{ fontSize: '1rem' }}>
              Custom Quote
            </Badge>
          </div>
        )}
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Card.Text className="mb-3" style={{ 
          color: 'var(--color-textSecondary)',
          minHeight: '3rem',
        }}>
          {service.description}
        </Card.Text>

        <div className="mb-3">
          <OverlayTrigger placement="top" overlay={tooltip}>
            <Button
              variant="link"
              className="p-0 text-decoration-none d-flex align-items-center"
              onClick={() => setShowDetails(!showDetails)}
              style={{ color: 'var(--color-primary)' }}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
              <span>What's included?</span>
            </Button>
          </OverlayTrigger>

          {showDetails && (
            <ListGroup variant="flush" className="mt-2">
              {service.includes.map((item, index) => (
                <ListGroup.Item 
                  key={index}
                  className="px-0 py-2"
                  style={{ 
                    backgroundColor: 'transparent',
                    borderColor: 'var(--color-border)',
                    fontSize: '0.875rem',
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faCode} 
                    className="me-2" 
                    style={{ color: 'var(--color-success)', fontSize: '0.75rem' }}
                  />
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        <div className="mt-auto pt-3">
          {service.pricingModel === 'fixed' ? (
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={handleBuyNow}
              style={{ 
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Buy Now
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={handleGetQuote}
            >
              <FontAwesomeIcon icon={faFileAlt} className="me-2" />
              Get Quote
            </Button>
          )}
          
          <Button
            variant="outline-secondary"
            className="w-100"
            onClick={() => navigate('/contact')}
            size="sm"
          >
            Contact Us
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;

