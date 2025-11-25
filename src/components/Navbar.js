import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { config } from '../config/env';
import ThemeSwitcher from './ThemeSwitcher';
import logo from '../assets/AESSLogo.png';

const Navigation = () => {
  const { features } = config;
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    setExpanded(false);
  };

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm sticky-top" 
      style={{ backgroundColor: 'var(--color-surface)' }}
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-text" onClick={handleLinkClick}>
          <img src={logo} alt="AESS Logo" height="30" className="me-2" />
          <span className="d-none d-md-inline">Digitalization on Demand</span>
          <span className="d-md-none">Tech on Demand</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse-custom">
          <Nav className="me-auto d-lg-flex">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleLinkClick}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={handleLinkClick}>Services</Nav.Link>
            {features.enablePortfolio && (
              <Nav.Link as={Link} to="/portfolio" onClick={handleLinkClick}>Portfolio</Nav.Link>
            )}
            {features.enableBlog && (
              <Nav.Link as={Link} to="/blog" onClick={handleLinkClick}>Blog</Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact" onClick={handleLinkClick}>Contact Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-lg-flex">
            <Nav.Item className="d-flex align-items-center">
              <ThemeSwitcher />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
