import db from '../utils/database.js';
import { v4 as uuidv4 } from 'uuid';
export function initDimensionTable() {
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
export function createDimension(input) {
    const now = new Date().toISOString();
    const dimension = {
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
    stmt.run(dimension.id, dimension.code, dimension.title, dimension.description, dimension.creator, dimension.beginTime, dimension.endTime, dimension.createdAt);
    return dimension;
}
export function getAllDimensions() {
    const stmt = db.prepare('SELECT * FROM dimensions ORDER BY createdAt DESC');
    return stmt.all();
}
export function getDimensionById(id) {
    const stmt = db.prepare('SELECT * FROM dimensions WHERE id = ?');
    return stmt.get(id);
}
export function updateDimension(id, input) {
    const existing = getDimensionById(id);
    if (!existing)
        return undefined;
    const updated = {
        ...existing,
        ...input,
    };
    const stmt = db.prepare(`
    UPDATE dimensions SET code = ?, title = ?, description = ?, creator = ?, beginTime = ?, endTime = ?
    WHERE id = ?
  `);
    stmt.run(updated.code, updated.title, updated.description, updated.creator, updated.beginTime, updated.endTime, id);
    return updated;
}
export function deleteDimension(id) {
    const stmt = db.prepare('DELETE FROM dimensions WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}
