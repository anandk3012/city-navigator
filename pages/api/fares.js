// pages/api/fares.js
import { FareInfo } from '../../models'; // Ensure that FareInfo is correctly exported from your models
import { verifyFare } from '../../utils/ai'; // Function to verify the fare

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all verified fares
    try {
      const fares = await FareInfo.findAll({ where: { verified: true } });
      res.status(200).json(fares);
    } catch (error) {
      console.error('Error fetching fares:', error);
      res.status(500).json({ message: 'Failed to fetch fares' });
    }
  } else if (req.method === 'POST') {
    // Add a new fare entry
    const { city, transportationType, fare } = req.body;

    // Validate the fare using the utility function
    try {
      const isValid = await verifyFare({ city, transportationType, fare });
      
      // Create a new fare entry in the database
      const newFare = await FareInfo.create({
        city,
        transportationType,
        fare,
        lastUpdated: new Date(),
        verified: isValid,
      });

      res.status(201).json(newFare);
    } catch (error) {
      console.error('Error adding new fare:', error);
      res.status(500).json({ message: 'Failed to add new fare' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
