import fs from 'fs';
import path from 'path';
import { AgencyData } from '../src/types';
import { initialAgencyData } from './initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

// Ensure necessary directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

let cachedData: AgencyData | null = null;

export function getData(): AgencyData {
  if (cachedData) {
    return cachedData;
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
      cachedData = JSON.parse(fileContent) as AgencyData;
      return cachedData;
    }
  } catch (error) {
    console.error('Error reading db.json, falling back to initial data:', error);
  }

  // Initialize with seed data
  cachedData = JSON.parse(JSON.stringify(initialAgencyData));
  saveData(cachedData as AgencyData);
  return cachedData as AgencyData;
}

export function saveData(data: AgencyData): boolean {
  try {
    cachedData = data;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving data to db.json:', error);
    return false;
  }
}
