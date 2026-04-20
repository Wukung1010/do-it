import db from '../utils/database.js';
export function initTaskDimensionTable() {
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
export function linkTaskDimension(taskId, dimensionId) {
    try {
        const stmt = db.prepare('INSERT OR IGNORE INTO task_dimensions (taskId, dimensionId) VALUES (?, ?)');
        stmt.run(taskId, dimensionId);
        return true;
    }
    catch {
        return false;
    }
}
export function unlinkTaskDimension(taskId, dimensionId) {
    const stmt = db.prepare('DELETE FROM task_dimensions WHERE taskId = ? AND dimensionId = ?');
    const result = stmt.run(taskId, dimensionId);
    return result.changes > 0;
}
export function getDimensionsByTaskId(taskId) {
    const stmt = db.prepare('SELECT dimensionId FROM task_dimensions WHERE taskId = ?');
    const rows = stmt.all(taskId);
    return rows.map(r => r.dimensionId);
}
export function getTasksByDimensionId(dimensionId) {
    const stmt = db.prepare('SELECT taskId FROM task_dimensions WHERE dimensionId = ?');
    const rows = stmt.all(dimensionId);
    return rows.map(r => r.taskId);
}
