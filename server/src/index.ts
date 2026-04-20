import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import dimensionRoutes from './routes/dimensionRoutes.js';
import * as taskRepo from './models/taskRepository.js';
import * as dimRepo from './models/dimensionRepository.js';
import * as tdRepo from './models/taskDimensionRepository.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database tables
taskRepo.initTaskTable();
dimRepo.initDimensionTable();
tdRepo.initTaskDimensionTable();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/dimensions', dimensionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
