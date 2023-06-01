/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import fs from 'fs';

import { AppModule } from './app.module';
import { winstonConfig } from '@school/winston-logger';
import { WinstonModule } from 'nest-winston';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const logger = WinstonModule.createLogger(winstonConfig('notifications'));
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 100;
      },
      stream: process.stdout,
    })
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
