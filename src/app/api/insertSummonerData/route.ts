import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(request: Request, res: NextApiResponse) {
  const req = request.json()

    const { gameName, tagLine, summonerLevel } = await req

    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    if (!connectionString) {
      console.error('MongoDB connection string is not defined.');
      return new Response(JSON.stringify({ message: 'Server configuration error' }), {status: 500});
    }

    const client = new MongoClient(connectionString);

    try {
      await client.connect();
      const db = client.db('Hasagi');
      const collection = db.collection('summoners');
      const result = await collection.insertOne({ gameName, tagLine, summonerLevel });
      console.log('Insert result:', result);
      return Response.json({ message: 'Summoner data inserted!', id: result.insertedId });
    } catch (error) {
      console.error('Error inserting summoner data:', error);
      return new Response(JSON.stringify({ message: 'Error inserting summoner data' }), {status: 400});
    } finally {
      await client.close();
    }
}
