// pages/api/recommendations.js
import { ServiceInfo } from '../../models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userPreferences } = req.body;
    // Simple recommendation logic based on user preferences
    const recommendations = await ServiceInfo.findAll({
      where: {
        type: userPreferences.type,
      },
      limit: 5,
    });
    res.status(200).json(recommendations);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
