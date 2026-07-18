import React from 'react';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import { getBlogPost } from '../data/blogPosts';
import { blogPostContentBySlug } from '../content/blogPosts';
import usePageMeta from '../hooks/usePageMeta';
import { absoluteUrl, siteConfig } from '../config/site';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const Content = blogPostContentBySlug[slug];

  usePageMeta(
    post
      ? {
          title: `${post.title} | ${siteConfig.name}`,
          description: post.excerpt,
          canonicalPath: `/blog/${post.slug}`,
          ogImage: post.ogImage,
          ogType: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Organization',
              name: post.author,
              url: siteConfig.url,
            },
            publisher: {
              '@type': 'Organization',
              name: siteConfig.name,
              url: siteConfig.url,
            },
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            image: absoluteUrl(post.ogImage),
          },
        }
      : { title: `Post not found | ${siteConfig.name}`, noIndex: true },
  );

  if (!post || !Content) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Container className="my-4 my-md-5 blog-post-page">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Button
            as={Link}
            to="/blog"
            variant="link"
            className="ps-0 mb-4 text-decoration-none"
            style={{ color: 'var(--color-primary)' }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Back to blog
          </Button>

          <header className="mb-4">
            <div className="d-flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  bg="secondary"
                  style={{ backgroundColor: 'var(--color-surfaceElevated) !important' }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="display-6 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
              {post.title}
            </h1>
            <p className="mb-2" style={{ color: 'var(--color-textSecondary)' }}>
              {post.excerpt}
            </p>
            <p className="small mb-0" style={{ color: 'var(--color-textMuted)' }}>
              {post.author} · {post.publishedAt}
              <FontAwesomeIcon icon={faClock} className="ms-3 me-1" />
              {post.readMinutes} min read
            </p>
          </header>

          {post.heroImage && (
            <div
              className="rounded-3 overflow-hidden mb-5 shadow-sm"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <img src={post.heroImage} alt="" className="w-100 d-block" loading="lazy" />
            </div>
          )}

          <Content />
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostPage;
