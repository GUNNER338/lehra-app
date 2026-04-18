import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import raagRoutes from './routes/raagRoutes';
import scaleRoutes from './routes/scaleRoutes';
import tempoRoutes from './routes/tempoRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/raag', raagRoutes);
app.use('/map-scale', scaleRoutes);
app.use('/tempo', tempoRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Dhir Dhir Music Academy Backend is running!' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
