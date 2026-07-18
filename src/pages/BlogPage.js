import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { config } from '../config/env';
import MailchimpForm from '../components/MailchimpForm';
import { blogPosts } from '../data/blogPosts';
import usePageMeta from '../hooks/usePageMeta';
import { siteConfig } from '../config/site';

const BlogPage = () => {
  usePageMeta({
    title: `Blog | ${siteConfig.name}`,
    description:
      'Engineering insights from AESS Technologies — UI testing, real-time dashboards, and product updates.',
    canonicalPath: '/blog',
  });

  return (
    <Container className="my-4 my-md-5">
      <Row className="mb-4 mb-md-5">
        <Col xs={12} md={8}>
          <h1 className="display-6 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
            Blog
          </h1>
          <p className="lead mb-0" style={{ color: 'var(--color-textSecondary)' }}>
            Practical notes on software quality, real-time UIs, and how we build at AESS.
          </p>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {blogPosts.map((post) => (
          <Col key={post.slug}>
            <Card
              className="h-100 shadow-sm border-0"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              {post.heroImage && (
                <Card.Img
                  variant="top"
                  src={post.heroImage}
                  alt=""
                  style={{ maxHeight: '180px', objectFit: 'cover' }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      bg="secondary"
                      className="small"
                      style={{ backgroundColor: 'var(--color-surfaceElevated) !important' }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Card.Title as="h2" className="h5 fw-bold">
                  {post.title}
                </Card.Title>
                <Card.Text style={{ color: 'var(--color-textSecondary)' }}>
                  {post.excerpt}
                </Card.Text>
                <p className="small mt-auto mb-3" style={{ color: 'var(--color-textMuted)' }}>
                  {post.publishedAt}
                  <FontAwesomeIcon icon={faClock} className="ms-2 me-1" />
                  {post.readMinutes} min
                </p>
                <Button
                  as={Link}
                  to={`/blog/${post.slug}`}
                  variant="primary"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    borderColor: 'var(--color-accent)',
                  }}
                >
                  Read article
                  <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {blogPosts.length === 0 && (
        <p className="text-center py-5" style={{ color: 'var(--color-textMuted)' }}>
          New articles coming soon.
        </p>
      )}

      {config.features.enableNewsletter && (
        <Row className="my-5">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <MailchimpForm />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BlogPage;
