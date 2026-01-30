import Joi from 'joi';
import { User } from './user.types.js';

export const userDto = Joi.object<User>({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  state: Joi.string().required(),
  role: Joi.string().valid('USER_RFC', 'ADMIN').required(),
});

export const userLoginDto = Joi.object<User>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
