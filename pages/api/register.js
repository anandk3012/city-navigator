// pages/api/register.js
import { User } from '../../models';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = await User.create({ username, email, password });
      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
