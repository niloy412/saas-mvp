import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import userRoutes from './modules/user/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 SaaS MVP API is running',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date(),
    });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;