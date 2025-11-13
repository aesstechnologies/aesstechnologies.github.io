import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { config } from '../config/env';
import ThemeSwitcher from './ThemeSwitcher';
import logo from '../assets/AESSLogo.png';

const Navigation = () => {
  const { features } = config;

  return (
    <Navbar expand="lg" className="shadow-sm fixed-top" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-text">
          <img src={logo} alt="AESS Logo" height="30" className="me-2" />
          <span className="d-none d-md-inline">Digitalization on Demand</span>
          <span className="d-md-none">AESS</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            {features.enablePortfolio && (
              <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
            )}
            {features.enableBlog && (
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            )}
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
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
