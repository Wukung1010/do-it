import { Router, Request, Response } from 'express';
import * as taskRepo from '../models/taskRepository.js';
import * as tdRepo from '../models/taskDimensionRepository.js';
import { TaskCreateInput, TaskUpdateInput } from '../models/task.js';

const router = Router();

// GET /api/tasks - List all tasks
router.get('/', (req: Request, res: Response) => {
  const tasks = taskRepo.getAllTasks();
  res.json(tasks);
});

// GET /api/tasks/:id - Get single task
router.get('/:id', (req: Request, res: Response) => {
  const task = taskRepo.getTaskById(req.params.id as string);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.json(task);
});

// POST /api/tasks - Create task
router.post('/', (req: Request, res: Response) => {
  const input: TaskCreateInput = req.body;
  if (!input.title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  const task = taskRepo.createTask(input);
  res.status(201).json(task);
});

// PUT /api/tasks/:id - Update task
router.put('/:id', (req: Request, res: Response) => {
  const input: TaskUpdateInput = req.body;
  const task = taskRepo.updateTask(req.params.id as string, input);
  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.json(task);
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = taskRepo.deleteTask(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }
  res.status(204).send();
});

// POST /api/tasks/:id/dimensions - Link dimension
router.post('/:id/dimensions', (req: Request, res: Response) => {
  const { dimensionId } = req.body;
  if (!dimensionId) {
    res.status(400).json({ error: 'dimensionId is required' });
    return;
  }
  tdRepo.linkTaskDimension(req.params.id as string, dimensionId);
  res.status(201).json({ success: true });
});

// DELETE /api/tasks/:id/dimensions/:dimId - Unlink dimension
router.delete('/:id/dimensions/:dimId', (req: Request, res: Response) => {
  tdRepo.unlinkTaskDimension(req.params.id as string, req.params.dimId as string);
  res.status(204).send();
});

export default router;
