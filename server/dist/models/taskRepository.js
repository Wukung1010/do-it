import db from '../utils/database.js';
import { TaskStatus } from './task.js';
import { v4 as uuidv4 } from 'uuid';
export function initTaskTable() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      status INTEGER DEFAULT 0,
      deadline TEXT,
      beginTime TEXT,
      endTime TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);
}
export function createTask(input) {
    const now = new Date().toISOString();
    const task = {
        id: uuidv4(),
        title: input.title,
        description: input.description || '',
        status: TaskStatus.TODO,
        deadline: input.deadline || null,
        beginTime: input.beginTime || null,
        endTime: input.endTime || null,
        createdAt: now,
        updatedAt: now,
    };
    const stmt = db.prepare(`
    INSERT INTO tasks (id, title, description, status, deadline, beginTime, endTime, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
    stmt.run(task.id, task.title, task.description, task.status, task.deadline, task.beginTime, task.endTime, task.createdAt, task.updatedAt);
    return task;
}
export function getAllTasks() {
    const stmt = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC');
    return stmt.all();
}
export function getTaskById(id) {
    const stmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    return stmt.get(id);
}
export function updateTask(id, input) {
    const existing = getTaskById(id);
    if (!existing)
        return undefined;
    const now = new Date().toISOString();
    const updated = {
        ...existing,
        ...input,
        updatedAt: now,
    };
    const stmt = db.prepare(`
    UPDATE tasks SET title = ?, description = ?, status = ?, deadline = ?, beginTime = ?, endTime = ?, updatedAt = ?
    WHERE id = ?
  `);
    stmt.run(updated.title, updated.description, updated.status, updated.deadline, updated.beginTime, updated.endTime, updated.updatedAt, id);
    return updated;
}
export function deleteTask(id) {
    const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
}
