import express from 'express';
import { Controller } from './interfaces';
import bodyParser from 'body-parser';
import winston, { Logger } from 'winston';
import { winstonConfig } from '@school/winston-logger';

class App {
  public app: express.Application;
  private logger: Logger;

  constructor(controllers: Controller[], private port: number) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.logger = winston.createLogger(winstonConfig('event-publisher'));
  }

  public listen() {
    this.app.listen(this.port, () => {
      this.logger.info(`App listening on port ${this.port}`);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
}

export default App;
