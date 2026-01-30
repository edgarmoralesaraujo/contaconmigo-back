import { Router } from 'express';
import { UserController } from './user.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { userDto } from './user.dto.js';

const router = Router();

router.post('/register', validate(userDto), UserController.register);

export default router;
