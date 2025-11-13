import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { config } from '../config/env';
import MailchimpForm from '../components/MailchimpForm';

const BlogPage = () => {
  const blogPosts = [
    // Add your blog posts here as objects with 'title', 'description', 'date', and 'imageUrl' properties
  ];

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h2>Blog</h2>
          <p>Stay up-to-date with our latest news and insights:</p>
        </Col>
      </Row>
      <Row>
        {blogPosts.map((post, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={post.imageUrl} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Button variant="primary">Read More</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{post.date}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
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
