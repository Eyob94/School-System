import { z } from 'zod';
import { logger } from '../lib';

const schema = z.object({
  EVENT_PUBLISHER_PORT: z.string().nonempty(),
  KAFKA_CLIENT_ID: z.string().nonempty(),
  KAFKA_BROKERS: z.string().nonempty(),
});

export const validateEnv = async () => {
  logger.info('parsing');
  return new Promise((resolve, reject) => {
    const validation = schema.safeParse(process.env);
    if (!validation.success) {
      //@ts-expect-error err
      reject(validation?.error);
    }
    //@ts-expect-error data
    resolve(validation?.data.EVENT_PUBLISHER_PORT);
  });
};
