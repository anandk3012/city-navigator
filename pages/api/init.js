// pages/api/init.js
import { sequelize } from '../../models';

export default async function handler(req, res) {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    res.status(200).json({ message: 'Database connected!' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
}
