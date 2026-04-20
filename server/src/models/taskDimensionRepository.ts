import db from '../utils/database.js';
import { TaskDimension } from './taskDimension.js';

export function initTaskDimensionTable(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS task_dimensions (
      taskId TEXT NOT NULL,
      dimensionId TEXT NOT NULL,
      PRIMARY KEY (taskId, dimensionId),
      FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE,
      FOREIGN KEY (dimensionId) REFERENCES dimensions(id) ON DELETE CASCADE
    )
  `);
}

export function linkTaskDimension(taskId: string, dimensionId: string): boolean {
  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO task_dimensions (taskId, dimensionId) VALUES (?, ?)');
    stmt.run(taskId, dimensionId);
    return true;
  } catch {
    return false;
  }
}

export function unlinkTaskDimension(taskId: string, dimensionId: string): boolean {
  const stmt = db.prepare('DELETE FROM task_dimensions WHERE taskId = ? AND dimensionId = ?');
  const result = stmt.run(taskId, dimensionId);
  return result.changes > 0;
}

export function getDimensionsByTaskId(taskId: string): string[] {
  const stmt = db.prepare('SELECT dimensionId FROM task_dimensions WHERE taskId = ?');
  const rows = stmt.all(taskId) as { dimensionId: string }[];
  return rows.map(r => r.dimensionId);
}

export function getTasksByDimensionId(dimensionId: string): string[] {
  const stmt = db.prepare('SELECT taskId FROM task_dimensions WHERE dimensionId = ?');
  const rows = stmt.all(dimensionId) as { taskId: string }[];
  return rows.map(r => r.taskId);
}
