// pages/fares.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button, Alert } from 'react-bootstrap';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

let socket;

const Fares = () => {
  const [fares, setFares] = useState([]);
  const [form, setForm] = useState({
    city: '',
    transportationType: '',
    fare: '',
  });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFares();

    // Initialize Socket.IO
    socket = io();

    socket.on('updateFares', (fare) => {
      setFares((prevFares) => [...prevFares, fare]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchFares = async () => {
    const response = await axios.get('/api/fares');
    setFares(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/fares', form);
    socket.emit('newFare', response.data);
    setForm({ city: '', transportationType: '', fare: '' });
    setSuccess('Fare information submitted successfully!');
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
        Local Transportation Fares
      </motion.h1>

      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>City</th>
            <th>Transportation Type</th>
            <th>Fare</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {fares.map((fare) => (
            <motion.tr
              key={fare.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td>{fare.city}</td>
              <td>{fare.transportationType}</td>
              <td>{fare.fare}</td>
              <td>{new Date(fare.lastUpdated).toLocaleDateString()}</td>
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
        Add New Fare Information
      </motion.h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTransportationType" className="mt-3">
          <Form.Label>Transportation Type</Form.Label>
          <Form.Control
            type="text"
            name="transportationType"
            value={form.transportationType}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFare" className="mt-3">
          <Form.Label>Fare</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="fare"
            value={form.fare}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Fares;
