import { Router } from 'express';
import * as dimRepo from '../models/dimensionRepository.js';
const router = Router();
// GET /api/dimensions - List all dimensions
router.get('/', (req, res) => {
    const dimensions = dimRepo.getAllDimensions();
    res.json(dimensions);
});
// GET /api/dimensions/:id - Get single dimension
router.get('/:id', (req, res) => {
    const dimension = dimRepo.getDimensionById(req.params.id);
    if (!dimension) {
        res.status(404).json({ error: 'Dimension not found' });
        return;
    }
    res.json(dimension);
});
// POST /api/dimensions - Create dimension
router.post('/', (req, res) => {
    const input = req.body;
    if (!input.code || !input.title) {
        res.status(400).json({ error: 'Code and title are required' });
        return;
    }
    const dimension = dimRepo.createDimension(input);
    res.status(201).json(dimension);
});
// PUT /api/dimensions/:id - Update dimension
router.put('/:id', (req, res) => {
    const input = req.body;
    const dimension = dimRepo.updateDimension(req.params.id, input);
    if (!dimension) {
        res.status(404).json({ error: 'Dimension not found' });
        return;
    }
    res.json(dimension);
});
// DELETE /api/dimensions/:id - Delete dimension
router.delete('/:id', (req, res) => {
    const deleted = dimRepo.deleteDimension(req.params.id);
    if (!deleted) {
        res.status(404).json({ error: 'Dimension not found' });
        return;
    }
    res.status(204).send();
});
export default router;
