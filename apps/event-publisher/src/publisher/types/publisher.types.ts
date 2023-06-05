import { Request } from 'express';

export interface EventRequest extends Request {
  topic: string;
  message: Record<string, string>;
}
