import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import customSoftwareImg from '../assets/customSoftware.jpg';
import webdevImg from '../assets/webdev.jpg';
import mobiledevImg from '../assets/mobiledev.jpg';
import platformImg from '../assets/platform.jpg';

const HomePage = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to prevent layout shift
  useEffect(() => {
    const images = [customSoftwareImg, webdevImg, mobiledevImg, platformImg];
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true)); // Show carousel even if some images fail
  }, []);

  const carouselItems = [
    {
      image: customSoftwareImg,
      title: "Custom Software Development",
      description: "We provide tailored solutions for your unique business needs. Let us help you overcome your domain-specific challenges with our custom software solutions.",
    },
    {
      image: webdevImg,
      title: "Web Development",
      description: "We create engaging, user-friendly websites that effectively communicate your brand message. Stand out in the digital landscape with our web development service.",
    },
    {
      image: mobiledevImg,
      title: "Mobile App Development",
      description: "We create intuitive, feature-rich mobile applications for iOS, Android, or both. Enhance your customer engagement with our mobile app development service.",
    },
    {
      image: platformImg,
      title: "Platform Engineering",
      description: "We design reliable, efficient platforms that can handle high volumes of data and traffic. Support your business growth with our platform engineering service.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Container>
        <Row className="my-5 my-md-5 py-4 py-md-5">
          <Col xs={12} className="text-center text-md-start">
            <h1 className="display-4 display-md-3 fw-bold mb-4" style={{ color: 'var(--color-text)' }}>
              Welcome to AESS
            </h1>
            <p className="lead fs-4 mb-0" style={{ color: 'var(--color-textSecondary)' }}>
              We specialize in the design, development, and innovation of custom
              software applications and technological solutions.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Spectra product spotlight */}
      <Container className="mb-5 pb-2">
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <Row className="g-0 align-items-center">
                <Col xs={12} md={5}>
                  <img
                    src={`${process.env.PUBLIC_URL}/spectra-demo.gif`}
                    alt="Spectra dashboard run graph"
                    className="w-100 d-block"
                    loading="lazy"
                    style={{ maxHeight: '280px', objectFit: 'cover' }}
                  />
                </Col>
                <Col xs={12} md={7} className="p-4 p-md-5">
                  <Badge
                    bg="secondary"
                    className="mb-3"
                    style={{ backgroundColor: 'var(--color-surfaceElevated) !important' }}
                  >
                    Product
                  </Badge>
                  <h2 className="h3 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
                    Spectra — test real-time operator UIs
                  </h2>
                  <p className="mb-4" style={{ color: 'var(--color-textSecondary)' }}>
                    YAML suites for browser actions, socket events, and screen baselines.
                    Dashboard for QA, CLI for CI — with a 30-day free trial.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      as={Link}
                      to="/spectra"
                      variant="primary"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        borderColor: 'var(--color-accent)',
                      }}
                    >
                      Explore Spectra
                      <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </Button>
                    <Button as={Link} to="/services" variant="outline-primary">
                      Custom services
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Full-width carousel with gradient overlay */}
      <div className="carousel-wrapper position-relative">
        <Row>
          <Col xs={12} className="p-0">
            {!imagesLoaded && (
              <div 
                className="carousel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                <div className="loading-spinner"></div>
              </div>
            )}
            {imagesLoaded && (
              <Carousel fade interval={5000} className="carousel">
                {carouselItems.map((item, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 carousel-image"
                      src={item.image}
                      alt={item.title}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="carousel-gradient-overlay"></div>
                    <Carousel.Caption className="carousel-caption-custom">
                      <h3 className="display-5 fw-bold mb-3">{item.title}</h3>
                      <p className="lead">{item.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
