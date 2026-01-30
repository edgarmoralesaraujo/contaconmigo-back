import { randomUUID } from 'crypto';
import { connectDB } from '../../config/database.js';
import { Filter } from 'mongodb';

export class MongoRepository<T extends Record<string, any>> {
  constructor(private collectionName: string) {}

  private async collection() {
    const db = await connectDB();
    return db.collection<T>(this.collectionName);
  }

  async findOne(filter: Filter<T>) {
    return (await this.collection()).findOne(filter);
  }

  async insertOne(data: T) {
    return (await this.collection()).insertOne({
      _id: randomUUID(),
      ...data,
    } as any);
  }
}
