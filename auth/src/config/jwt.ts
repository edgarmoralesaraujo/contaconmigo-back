import jwt from 'jsonwebtoken';
import moment from 'moment';
import { env } from './env.js';

export function generateToken(payload: any, hours = 3) {
  const exp = moment().add(hours, 'hours').unix();

  return jwt.sign(
    { data: payload },
    env.JWT_SECRET,
    { expiresIn: exp }
  );
}
