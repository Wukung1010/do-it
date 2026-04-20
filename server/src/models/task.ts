import { v4 as uuidv4 } from 'uuid';

export enum TaskStatus {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2,
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string | null;
  beginTime: string | null;
  endTime: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  deadline?: string;
  beginTime?: string;
  endTime?: string;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  deadline?: string | null;
  beginTime?: string | null;
  endTime?: string | null;
}
