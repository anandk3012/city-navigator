// components/Recommendation.js
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';

const Recommendation = () => {
  const [preferences, setPreferences] = useState({ type: '' });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setPreferences({ ...preferences, [e.target.name]: e.target.value });

  const getRecommendations = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/recommendations', {
        userPreferences: preferences,
      });
      setRecommendations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch recommendations.');
    }
  };

  return (
    <>
      <h2 className="my-4">Get Service Recommendations</h2>
      <Form onSubmit={getRecommendations}>
        <Form.Group controlId="formType">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={preferences.type}
            onChange={handleChange}
            placeholder="e.g., Healthcare, Food"
            required
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          Recommend
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {recommendations.length > 0 && (
        <ListGroup className="mt-4">
          {recommendations.map((service) => (
            <ListGroup.Item key={service.id}>
              <strong>{service.type}</strong> at {service.location} (Rating: {service.userRatings})
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Recommendation;
