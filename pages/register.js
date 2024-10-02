// pages/register.js
import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/register', form);
    router.push('/api/auth/signin');
  };

  return (
    <Container>
      <h1 className="my-4">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={form.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
