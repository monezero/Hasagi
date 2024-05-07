import { MongoClient } from "mongodb";
import type {NextApiRequest, NextApiResponse} from "next";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const summonerData = req.body;
    const connectionString = "mongodb://localhost:27017/Hasagi";
    const client = await MongoClient.connect(connectionString);
    const db = client.db("Hasagi");
    const result = await db.collection("summoners").insertOne(summonerData);

    client.close();
    res.status(200).json({ message: "Summoner data inserted!"})
  } else {
    res.status(400).json ({message: "Invalid request method!"})
  }
}

export default handler;