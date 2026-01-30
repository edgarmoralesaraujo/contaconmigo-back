import { MongoRepository } from '../../shared/database/mongo.repository.js';
import { User, UserLogin } from './user.types.js';
import { CustomError } from '../../shared/errors/CustomError.js';
import { generateToken } from '../../config/jwt.js';
import { comparePassword, encrypt } from '../utils/crypt.utils.js'

const repo = new MongoRepository<User>('users');

export class UserService {
  static async create(user: User) {
    const exists = await repo.findOne({ username: user.username });
    if (exists) {
      throw new CustomError('El usuario ya existe', 400);
    }

    const hashedPassword = await encrypt(user.password);
    user.password = hashedPassword;

    const result = await repo.insertOne(user);
    const { password, state, ...payload } = user;

    const token = generateToken({
      id: result.insertedId,
      ...payload,
    });

    return token;
  }

  static async authenticate(user: UserLogin) {
    const existingUser = await repo.findOne({ username: user.username }, {username: 1, password: 1, role: 1, name: 1});
    console.log(existingUser);
    if (!existingUser) {
      throw new CustomError('Credenciales inválidas', 401);
    }

    const isValid = await comparePassword(user.password, existingUser.password);
    if (!isValid) {
      throw new CustomError('Credenciales inválidas', 401);
    }

    const { password, _id, ...payload } = existingUser;

    const token = generateToken({
      id: existingUser._id,
      ...payload,
    });

    return token;
  }
}
