import db from '../utils/database.js';
import { Dimension, DimensionCreateInput, DimensionUpdateInput } from './dimension.js';
import { v4 as uuidv4 } from 'uuid';

export function initDimensionTable(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS dimensions (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      creator TEXT DEFAULT '',
      beginTime TEXT,
      endTime TEXT,
      createdAt TEXT NOT NULL
    )
  `);
}

export function createDimension(input: DimensionCreateInput): Dimension {
  const now = new Date().toISOString();
  const dimension: Dimension = {
    id: uuidv4(),
    code: input.code,
    title: input.title,
    description: input.description || '',
    creator: input.creator || '',
    beginTime: input.beginTime || null,
    endTime: input.endTime || null,
    createdAt: now,
  };

  const stmt = db.prepare(`
    INSERT INTO dimensions (id, code, title, description, creator, beginTime, endTime, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    dimension.id,
    dimension.code,
    dimension.title,
    dimension.description,
    dimension.creator,
    dimension.beginTime,
    dimension.endTime,
    dimension.createdAt
  );

  return dimension;
}

export function getAllDimensions(): Dimension[] {
  const stmt = db.prepare('SELECT * FROM dimensions ORDER BY createdAt DESC');
  return stmt.all() as Dimension[];
}

export function getDimensionById(id: string): Dimension | undefined {
  const stmt = db.prepare('SELECT * FROM dimensions WHERE id = ?');
  return stmt.get(id) as Dimension | undefined;
}

export function updateDimension(id: string, input: DimensionUpdateInput): Dimension | undefined {
  const existing = getDimensionById(id);
  if (!existing) return undefined;

  const updated: Dimension = {
    ...existing,
    ...input,
  };

  const stmt = db.prepare(`
    UPDATE dimensions SET code = ?, title = ?, description = ?, creator = ?, beginTime = ?, endTime = ?
    WHERE id = ?
  `);

  stmt.run(
    updated.code,
    updated.title,
    updated.description,
    updated.creator,
    updated.beginTime,
    updated.endTime,
    id
  );

  return updated;
}

export function deleteDimension(id: string): boolean {
  const stmt = db.prepare('DELETE FROM dimensions WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}
