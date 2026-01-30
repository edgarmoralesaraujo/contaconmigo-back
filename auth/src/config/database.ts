import { MongoClient, Db } from 'mongodb';
import { env } from './env.js';

let client: MongoClient;
let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    client = new MongoClient(env.MONGO_URI);
    await client.connect();
    db = client.db(env.MONGO_DBNAME);
  }
  return db;
}
