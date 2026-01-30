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
}
