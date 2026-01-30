import { Router } from 'express';
import { UserController } from './user.controller.js';
import { validate } from '../../shared/middlewares/validate.middleware.js';
import { userDto, userLoginDto } from './user.dto.js';

const router = Router();

console.debug('Routing...');
router.post('/register', validate(userDto), UserController.register);

router.post('/login', validate(userLoginDto), UserController.login);

// router.get('/profile', UserController.getProfile);

// router.put('/profile', validate(userDto), UserController.updateProfile);

// router.get('/health', UserController.healthCheck);

export default router;
