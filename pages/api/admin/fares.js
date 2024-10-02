// pages/api/admin/fares.js
import { FareInfo } from '../../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const fares = await FareInfo.findAll({ where: { verified: false } });
    res.status(200).json(fares);
  } else if (req.method === 'PUT') {
    const { id, verified } = req.body;
    const fare = await FareInfo.findByPk(id);
    if (fare) {
      fare.verified = verified;
      await fare.save();
      res.status(200).json(fare);
    } else {
      res.status(404).json({ message: 'Fare not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
