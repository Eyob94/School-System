import { logger } from './lib';
import App from './main';
import PublisherController from './publisher/publisher.controller';
import { validateEnv } from './utils';

validateEnv()
  .then((port) => {
    const app = new App([new PublisherController()], Number(port));

    app.listen();
  })
  .catch((e) => {
    logger.error(e);
    return;
  });
