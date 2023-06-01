import winston from 'winston';
import { utilities, WinstonModuleOptions } from 'nest-winston';

export const winstonConfig: WinstonModuleOptions = {
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'apps/notifications/logs/app.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    utilities.format.nestLike()
  ),
};

export default winstonConfig;
