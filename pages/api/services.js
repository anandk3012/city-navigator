// pages/api/services.js
import { ServiceInfo } from '../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const services = await ServiceInfo.findAll();
    res.status(200).json(services);
  } else if (req.method === 'POST') {
    const { type, location, userRatings } = req.body;
    const newService = await ServiceInfo.create({
      type,
      location,
      userRatings: parseFloat(userRatings) || 0.0,
    });
    res.status(201).json(newService);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
