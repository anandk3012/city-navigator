// pages/services.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

import dynamic from 'next/dynamic';
const Recommendation = dynamic(() => import('../components/Recommendations'), {
  loading: () => <p>Loading recommendations...</p>,
});
let socket;

const Services = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    type: '',
    location: '',
    userRatings: '',
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchServices();

    // Initialize Socket.IO
    socket = io();

    socket.on('updateServices', (service) => {
      setServices((prevServices) => [...prevServices, service]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchServices = async () => {
    const response = await axios.get('/api/services');
    setServices(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/services', form);
    socket.emit('newService', response.data);
    setForm({ type: '', location: '', userRatings: '' });
    setSuccess('Service information submitted successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Container>
      <motion.h1
        className="my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Local Public Services
      </motion.h1>

      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Location</th>
            <th>User Ratings</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <motion.tr
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td>{service.type}</td>
              <td>{service.location}</td>
              <td>{service.userRatings}</td>
            </motion.tr>
          ))}
        </tbody>
      </Table>

      <motion.h2
        className="my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add New Service Information
      </motion.h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formType">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLocation" className="mt-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserRatings" className="mt-3">
          <Form.Label>User Ratings</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            name="userRatings"
            value={form.userRatings}
            onChange={handleChange}
            min="0"
            max="5"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <Recommendation />
    </Container>
  );
};

export default Services;
