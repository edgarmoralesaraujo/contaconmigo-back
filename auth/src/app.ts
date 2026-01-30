import express from 'express';
import cors from 'cors';
import userRoutes from './modules/users/user.routes.js';
import { errorMiddleware } from './shared/errors/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use(errorMiddleware);

export default app;
