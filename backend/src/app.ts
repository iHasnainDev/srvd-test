import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: 'Service healthy'
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
