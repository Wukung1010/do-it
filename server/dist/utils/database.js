import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
const dbPath = path.join(process.cwd(), 'data', 'do-it.db');
// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
export default db;
