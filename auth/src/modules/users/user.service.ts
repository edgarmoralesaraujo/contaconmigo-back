import { MongoRepository } from '../../shared/database/mongo.repository.js';
import { User } from './user.types.js';
import { CustomError } from '../../shared/errors/CustomError.js';
import { generateToken } from '../../config/jwt.js';

const repo = new MongoRepository<User>('users');

export class UserService {
  static async create(user: User) {
    const exists = await repo.findOne({ username: user.username });
    if (exists) {
      throw new CustomError('El usuario ya existe', 400);
    }

    const result = await repo.insertOne(user);
    const { password, ...payload } = user;

    const token = generateToken({
      id: result.insertedId,
      ...payload,
    });

    return token;
  }
}
