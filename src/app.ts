import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import audioRoutes from './routes/audio.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/audio', audioRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Dhir Dhir Music Academy Backend is running' });
});

// Error handling
app.use(errorMiddleware);

export default app;
