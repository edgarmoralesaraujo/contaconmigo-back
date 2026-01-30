import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service.js';
import { ok } from '../../shared/response/response.util.js';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await UserService.create(req.body);
      ok(res, { jwt: token });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    console.debug('Login attempt for user:', req.body.username);
    try {
      const token = await UserService.authenticate(req.body);
      ok(res, { jwt: token });
    } catch (err) {
      next(err);
    }
  }
}
