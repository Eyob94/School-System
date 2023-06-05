import { NextFunction, Response, Router } from 'express';
import { Controller } from '../interfaces';
import KafkaProducer from './publisher.service';
import { eventValidator } from './middleware';
import { EventRequest } from './types';
import { logger } from '../lib';

class PublisherController implements Controller {
  public path = '/publish';
  public router = Router();
  private publisher: KafkaProducer;

  constructor() {
    this.initializeRoutes();
    this.publisher = new KafkaProducer(
      process.env.KAFKA_CLIENT_ID,
      process.env.KAFKA_BROKERS.split(',')
    );
  }

  private initializeRoutes() {
    this.router.post(this.path, eventValidator, this.publish);
  }

  private publish = (req: EventRequest, res: Response, next: NextFunction) => {
    try {
      this.publisher.publishMessage(req.topic, req.message);
      return res.status(201).send('Message published successfully');
    } catch (e) {
      logger.error(e.message);
      return res.status(400).send('something went wrong');
    }
  };
}

export default PublisherController;