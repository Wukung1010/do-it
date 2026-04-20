import { Router, Request, Response } from 'express';
import * as dimRepo from '../models/dimensionRepository.js';
import { DimensionCreateInput, DimensionUpdateInput } from '../models/dimension.js';

const router = Router();

// GET /api/dimensions - List all dimensions
router.get('/', (req: Request, res: Response) => {
  const dimensions = dimRepo.getAllDimensions();
  res.json(dimensions);
});

// GET /api/dimensions/:id - Get single dimension
router.get('/:id', (req: Request, res: Response) => {
  const dimension = dimRepo.getDimensionById(req.params.id as string);
  if (!dimension) {
    res.status(404).json({ error: 'Dimension not found' });
    return;
  }
  res.json(dimension);
});

// POST /api/dimensions - Create dimension
router.post('/', (req: Request, res: Response) => {
  const input: DimensionCreateInput = req.body;
  if (!input.code || !input.title) {
    res.status(400).json({ error: 'Code and title are required' });
    return;
  }
  const dimension = dimRepo.createDimension(input);
  res.status(201).json(dimension);
});

// PUT /api/dimensions/:id - Update dimension
router.put('/:id', (req: Request, res: Response) => {
  const input: DimensionUpdateInput = req.body;
  const dimension = dimRepo.updateDimension(req.params.id as string, input);
  if (!dimension) {
    res.status(404).json({ error: 'Dimension not found' });
    return;
  }
  res.json(dimension);
});

// DELETE /api/dimensions/:id - Delete dimension
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = dimRepo.deleteDimension(req.params.id as string);
  if (!deleted) {
    res.status(404).json({ error: 'Dimension not found' });
    return;
  }
  res.status(204).send();
});

export default router;
