import { MongoClient, Db } from "mongodb";

let cachedDb: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }
  const uri: any = process.env.MONGODB_URI || process.env.REACT_APP_MONGODB_ID
  const client: MongoClient = await MongoClient.connect(uri);
  const db: Db = client.db('gnu-reservation');

  cachedDb = db;
  return db;
}