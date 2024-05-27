import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method === 'POST') {
    const { gameName, tagLine, summonerLevel } = req.body;

    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    if (!connectionString) {
      console.error('MongoDB connection string is not defined.');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    const client = new MongoClient(connectionString);

    try {
      await client.connect();
      const db = client.db('Hasagi');
      const collection = db.collection('summoners');
      const result = await collection.insertOne({ gameName, tagLine, summonerLevel });
      console.log('Insert result:', result);
      res.status(200).json({ message: 'Summoner data inserted!', id: result.insertedId });
    } catch (error) {
      console.error('Error inserting summoner data:', error);
      res.status(500).json({ message: 'Error inserting summoner data' });
    } finally {
      await client.close();
    }
  } else {
    res.status(400).json({ message: 'Invalid request method!' });
  }
}
