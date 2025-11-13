import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
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
      <Container>
        <Row className="my-4 my-md-5">
          <Col>
            <h1 className="display-5 fw-bold mb-3">Welcome to AESS</h1>
            <p className="lead">
              We specialize in the design, development, and innovation of custom
              software applications and technological solutions.
            </p>
          </Col>
        </Row>
      </Container>
      
      {/* Full-width carousel */}
      <Row className="mb-4 mb-md-5">
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
                    className="d-block w-100"
                    src={item.image}
                    alt={item.title}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
