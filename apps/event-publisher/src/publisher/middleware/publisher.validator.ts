import { Response, Request, NextFunction } from 'express';
import { z } from 'zod';
import { EventRequest } from '../types';

const schema = z.object({
  topic: z.string().nonempty(),
  eventId: z.string().nonempty(),
  eventTime: z.string().nonempty(),
  eventType: z.string().nonempty(),
  payload: z.any(),
});

export const eventValidator = async (
  req: EventRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.parseAsync(req.body);
    const { topic, ...message } = req.body;
    req.topic = topic;
    req.message = message;
    req.partition = message.partition;
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
