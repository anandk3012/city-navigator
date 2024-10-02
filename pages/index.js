// pages/index.js
import { Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to City Navigator</Card.Title>
          <Card.Text>
            Navigate your new city with ease. Get real-time updates on transportation fares and public services to ensure you never get overcharged.
          </Card.Text>
          <a href="/" passHref>
            <Button variant="primary">View Fares</Button>
          </a>{' '}
          <a href="/services" passHref>
            <Button variant="secondary">View Services</Button>
          </a>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;
