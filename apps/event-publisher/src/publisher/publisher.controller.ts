import { NextFunction, Response, Router } from 'express';
import { Controller } from '../interfaces';
import { eventValidator } from './middleware';
import { EventRequest } from './types';
import { logger } from '../lib';
import { KafkaProducer } from '@school/kafka-producer';

class PublisherController implements Controller {
  public path = '/publish';
  public router = Router();
  private publisher: KafkaProducer;

  constructor() {
    this.initializeRoutes();
    this.publisher = new KafkaProducer(
      process.env.KAFKA_CLIENT_ID,
      process.env.KAFKA_BROKERS.split(','),
      'main'
    );
  }

  private initializeRoutes() {
    this.router.post(this.path, eventValidator, this.publish);
  }

  private publish = async (req: EventRequest, res: Response) => {
    return this.publisher
      .publishMessage(req.topic, req.message, req.partition)
      .then(() => {
        return res.status(201).json({
          status: 201,
          message: 'Message Published successfully',
        });
      })
      .catch((e) => {
        logger.error(e.message);
        return res.status(400).json({
          status: 400,
          message: e.message,
        });
      });
  };
}

export default PublisherController;
