import { v4 as uuidv4 } from 'uuid';

export interface Dimension {
  id: string;
  code: string;
  title: string;
  description: string;
  creator: string;
  beginTime: string | null;
  endTime: string | null;
  createdAt: string;
}

export interface DimensionCreateInput {
  code: string;
  title: string;
  description?: string;
  creator?: string;
  beginTime?: string;
  endTime?: string | null;
}

export interface DimensionUpdateInput {
  code?: string;
  title?: string;
  description?: string;
  creator?: string;
  beginTime?: string | null;
  endTime?: string | null;
}
