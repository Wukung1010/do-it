import { Router } from 'express';
import * as taskRepo from '../models/taskRepository.js';
import * as tdRepo from '../models/taskDimensionRepository.js';
const router = Router();
// GET /api/tasks - List all tasks
router.get('/', (req, res) => {
    const tasks = taskRepo.getAllTasks();
    res.json(tasks);
});
// GET /api/tasks/:id - Get single task
router.get('/:id', (req, res) => {
    const task = taskRepo.getTaskById(req.params.id);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.json(task);
});
// POST /api/tasks - Create task
router.post('/', (req, res) => {
    const input = req.body;
    if (!input.title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }
    const task = taskRepo.createTask(input);
    res.status(201).json(task);
});
// PUT /api/tasks/:id - Update task
router.put('/:id', (req, res) => {
    const input = req.body;
    const task = taskRepo.updateTask(req.params.id, input);
    if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.json(task);
});
// DELETE /api/tasks/:id - Delete task
router.delete('/:id', (req, res) => {
    const deleted = taskRepo.deleteTask(req.params.id);
    if (!deleted) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    res.status(204).send();
});
// POST /api/tasks/:id/dimensions - Link dimension
router.post('/:id/dimensions', (req, res) => {
    const { dimensionId } = req.body;
    if (!dimensionId) {
        res.status(400).json({ error: 'dimensionId is required' });
        return;
    }
    tdRepo.linkTaskDimension(req.params.id, dimensionId);
    res.status(201).json({ success: true });
});
// DELETE /api/tasks/:id/dimensions/:dimId - Unlink dimension
router.delete('/:id/dimensions/:dimId', (req, res) => {
    tdRepo.unlinkTaskDimension(req.params.id, req.params.dimId);
    res.status(204).send();
});
export default router;
