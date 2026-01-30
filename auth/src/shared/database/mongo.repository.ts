import { randomUUID } from 'crypto';
import { connectDB } from '../../config/database.js';
import { Filter, Document, UpdateFilter, OptionalUnlessRequiredId, FindOptions, UpdateOptions } from 'mongodb';

export class MongoRepository<T extends Record<string, any>> {
  constructor(private collectionName: string) {}

  private async collection() {
    const db = await connectDB();
    return db.collection<T>(this.collectionName);
  }

  async findOne(filter: Filter<T>, projection?: Partial<Record<keyof T, 1 | 0>>) {
    const options: FindOptions = projection ? { projection } : {};
    return (await this.collection()).findOne(filter, options);
  }

  async find(filter: Filter<T> = {}, projection?: Partial<Record<keyof T, 1 | 0>>) {
    const options: FindOptions = projection ? { projection } : {};
    return (await this.collection()).find(filter, options).toArray();
  }

  async insertOne(data: OptionalUnlessRequiredId<T>) {
    return (await this.collection()).insertOne({
      _id: randomUUID(),
      ...data,
    } as any);
  }

  async updateOne(
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
    options: UpdateOptions = {}
  ) {
    return (await this.collection()).updateOne(filter, update, options);
  }

  async update(
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
    options: UpdateOptions = {}
  ) {
    return (await this.collection()).updateMany(filter, update, options);
  }

  async delete(filter: Filter<T>) {
    return (await this.collection()).deleteMany(filter);
  }

  async deleteOne(filter: Filter<T>) {
    return (await this.collection()).deleteOne(filter);
  }
}
