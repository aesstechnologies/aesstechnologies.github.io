import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import CircuitBackground from './components/CircuitBackground';
import { config } from './config/env';
import './App.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('./pages/CheckoutSuccessPage'));
const CheckoutCancelPage = lazy(() => import('./pages/CheckoutCancelPage'));

// Conditionally load pages based on feature flags
const PortfolioPage = config.features.enablePortfolio
  ? lazy(() => import('./pages/PortfolioPage'))
  : null;

const BlogPage = config.features.enableBlog
  ? lazy(() => import('./pages/BlogPage'))
  : null;

// Loading component
const LoadingFallback = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CircuitBackground 
          opacity={.2} 
          speed={.5} 
          density={1.2}
          floating={true}
          verticalScroll={false}
        />
        <Navbar />
        <div className="main-content-wrapper d-flex flex-column min-vh-100">
          <div className="flex-grow-1">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
                {config.features.enablePortfolio && PortfolioPage && (
                  <Route path="/portfolio" element={<PortfolioPage />} />
                )}
                {config.features.enableBlog && BlogPage && (
                  <Route path="/blog" element={<BlogPage />} />
                )}
                {/* 404 fallback */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
